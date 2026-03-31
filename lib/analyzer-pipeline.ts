import type {
  AnalysisRecommendation,
  AnalyzeGoal,
  AnalyzerPageType,
  PerformanceOpportunity,
  PerformancePageReport,
  PerformanceReport,
  VisualFinding,
} from "@/types/analyzer";

type PageDomFacts = {
  h1Count: number;
  h2Count: number;
  ctaCountAboveFold: number;
  stickyCtaPresent: boolean;
  trustSignalNearCta: boolean;
  variantBlockVisible: boolean;
};

export type RenderedPageArtifact = {
  pageType: AnalyzerPageType;
  requestedUrl: string;
  finalUrl: string;
  title: string;
  htmlSnapshot: string;
  screenshotDesktopBase64: string | null;
  screenshotMobileBase64: string | null;
  domFacts: PageDomFacts;
};

export type RenderAuditOutput = {
  isShopify: boolean;
  storeHost: string;
  pages: RenderedPageArtifact[];
  warnings: string[];
};

export type VisualReviewOutput = {
  findings: VisualFinding[];
  warnings: string[];
};

export type PerformanceAuditOutput = {
  performance: PerformanceReport;
  warnings: string[];
};

const shopifyMarkerPattern = /(cdn\.shopify\.com|shopify\.section|shopify\.theme|myshopify\.com)/i;
const trustPattern = /(shipping|delivery|returns|refund|review|trusted|money[- ]back)/i;
const cartPattern = /(add to cart|buy now|checkout)/i;
const visualModel = process.env.KRISH_ANALYZER_VISUAL_MODEL ?? "gpt-4.1-mini";

type OptionalModule<T> = T | null;
type PlaywrightPageLike = {
  goto: (url: string, options: Record<string, unknown>) => Promise<void>;
  waitForTimeout: (ms: number) => Promise<void>;
  url: () => string;
  content: () => Promise<string>;
  title: () => Promise<string>;
  screenshot: (options: Record<string, unknown>) => Promise<Buffer>;
  evaluate: <T>(pageFunction: () => T) => Promise<T>;
  close: () => Promise<void>;
};

type PlaywrightContextLike = {
  newPage: () => Promise<PlaywrightPageLike>;
  close: () => Promise<void>;
};

type PlaywrightBrowserLike = {
  newContext: (options: Record<string, unknown>) => Promise<PlaywrightContextLike>;
  close: () => Promise<void>;
};

type LighthouseAuditLike = {
  title?: string;
  numericValue?: number;
  details?: {
    overallSavingsMs?: number;
  };
};

type LighthouseResultLike = {
  lhr?: {
    categories?: {
      performance?: {
        score?: number;
      };
    };
    audits?: Record<string, LighthouseAuditLike>;
  };
};

type LighthouseRunnerLike = (
  url: string,
  options: Record<string, unknown>,
) => Promise<LighthouseResultLike>;

type ChromeLauncherLike = {
  launch: (options: {
    chromeFlags: string[];
  }) => Promise<{ port: number; kill: () => Promise<void> }>;
};

function getPageTypeOrder(pageType: AnalyzerPageType): number {
  if (pageType === "home") {
    return 0;
  }

  if (pageType === "pdp") {
    return 1;
  }

  if (pageType === "cart") {
    return 2;
  }

  return 3;
}

async function importOptionalModule<T>(moduleName: string): Promise<OptionalModule<T>> {
  try {
    const imported = (await import(moduleName)) as T;
    return imported;
  } catch {
    return null;
  }
}

function normalizeFactValue(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function toPageDomFacts(partial: Partial<PageDomFacts>): PageDomFacts {
  return {
    h1Count: normalizeFactValue(partial.h1Count),
    h2Count: normalizeFactValue(partial.h2Count),
    ctaCountAboveFold: normalizeFactValue(partial.ctaCountAboveFold),
    stickyCtaPresent: Boolean(partial.stickyCtaPresent),
    trustSignalNearCta: Boolean(partial.trustSignalNearCta),
    variantBlockVisible: Boolean(partial.variantBlockVisible),
  };
}

function detectProductPathFromHtml(html: string): string | null {
  const match = html.match(/href=["']([^"']*\/products\/[^"']+)["']/i);
  if (!match) {
    return null;
  }

  return match[1] ?? null;
}

function resolveUrl(pathOrUrl: string, baseUrl: string): string {
  try {
    return new URL(pathOrUrl, baseUrl).toString();
  } catch {
    return baseUrl;
  }
}

async function fetchHtml(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "KrishAnalyzerBot/2.0 (+https://www.heykrish.ai)",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return null;
    }

    return (await response.text()).slice(0, 150000);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function toFallbackFacts(html: string): PageDomFacts {
  return {
    h1Count: (html.match(/<h1[\s>]/gi) ?? []).length,
    h2Count: (html.match(/<h2[\s>]/gi) ?? []).length,
    ctaCountAboveFold: Math.min(
      (html.match(/(add to cart|buy now|shop now|checkout)/gi) ?? []).length,
      4,
    ),
    stickyCtaPresent: /(position:\s*(sticky|fixed))/i.test(html) && cartPattern.test(html),
    trustSignalNearCta: trustPattern.test(html),
    variantBlockVisible: /(variant|option|size|color|name=["']id["'])/i.test(html),
  };
}

async function runFallbackRendering(storeUrl: string): Promise<RenderAuditOutput> {
  const warnings: string[] = [
    "Playwright is not available in runtime. Rendering fell back to lightweight HTML analysis.",
  ];
  const homeHtml = (await fetchHtml(storeUrl)) ?? "";
  const productPath = detectProductPathFromHtml(homeHtml);
  const productUrl = productPath ? resolveUrl(productPath, storeUrl) : storeUrl;
  const cartUrl = resolveUrl("/cart", storeUrl);
  const pdpHtml = (await fetchHtml(productUrl)) ?? "";
  const cartHtml = (await fetchHtml(cartUrl)) ?? "";

  const pages: RenderedPageArtifact[] = [
    {
      pageType: "home",
      requestedUrl: storeUrl,
      finalUrl: storeUrl,
      title: "Homepage",
      htmlSnapshot: homeHtml,
      screenshotDesktopBase64: null,
      screenshotMobileBase64: null,
      domFacts: toFallbackFacts(homeHtml),
    },
    {
      pageType: "pdp",
      requestedUrl: productUrl,
      finalUrl: productUrl,
      title: "Product Detail Page",
      htmlSnapshot: pdpHtml,
      screenshotDesktopBase64: null,
      screenshotMobileBase64: null,
      domFacts: toFallbackFacts(pdpHtml),
    },
    {
      pageType: "cart",
      requestedUrl: cartUrl,
      finalUrl: cartUrl,
      title: "Cart",
      htmlSnapshot: cartHtml,
      screenshotDesktopBase64: null,
      screenshotMobileBase64: null,
      domFacts: toFallbackFacts(cartHtml),
    },
  ];

  const isShopify =
    pages.some((page) => shopifyMarkerPattern.test(page.htmlSnapshot)) ||
    storeUrl.includes(".myshopify.com");
  return {
    isShopify,
    storeHost: new URL(storeUrl).hostname,
    pages,
    warnings,
  };
}

export async function renderStorefrontForAnalysis(storeUrl: string): Promise<RenderAuditOutput> {
  const playwrightModule = await importOptionalModule<{ chromium?: unknown }>("playwright");
  const chromium =
    playwrightModule && "chromium" in playwrightModule ? playwrightModule.chromium : null;

  if (!chromium) {
    return runFallbackRendering(storeUrl);
  }

  const warnings: string[] = [];
  const desktopBrowser = await (
    chromium as {
      launch: (options: { headless: boolean; args: string[] }) => Promise<PlaywrightBrowserLike>;
    }
  ).launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  const desktopContext = await desktopBrowser.newContext({
    viewport: { width: 1366, height: 900 },
  });
  const mobileContext = await desktopBrowser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    isMobile: true,
    hasTouch: true,
  });

  async function auditPage(
    pageType: AnalyzerPageType,
    requestedUrl: string,
  ): Promise<RenderedPageArtifact> {
    const desktopPage = await desktopContext.newPage();
    const mobilePage = await mobileContext.newPage();

    try {
      await desktopPage.goto(requestedUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
      await desktopPage.waitForTimeout(1000);

      const finalUrl = desktopPage.url();
      const htmlSnapshot = (await desktopPage.content()).slice(0, 160000);
      const title = await desktopPage.title();
      const screenshotDesktopBase64 = (
        await desktopPage.screenshot({
          fullPage: true,
          type: "jpeg",
          quality: 55,
        })
      ).toString("base64");

      await mobilePage.goto(finalUrl, { waitUntil: "domcontentloaded", timeout: 45000 });
      await mobilePage.waitForTimeout(800);
      const screenshotMobileBase64 = (
        await mobilePage.screenshot({
          fullPage: true,
          type: "jpeg",
          quality: 55,
        })
      ).toString("base64");

      const facts = await desktopPage.evaluate(() => {
        const trustRegex = /(shipping|delivery|returns|refund|review|trusted|money[- ]back)/i;
        const ctaRegex = /(add to cart|buy now|checkout|shop|start|get)/i;
        const variantRegex = /(variant|size|color|option)/i;
        const aboveFoldHeight = window.innerHeight;
        const ctaCandidates = Array.from(
          document.querySelectorAll("a,button,input[type='submit'],input[type='button']"),
        );
        const ctaCountAboveFold = ctaCandidates.filter((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom <= 0 || rect.top >= aboveFoldHeight) {
            return false;
          }

          const text =
            `${(element as HTMLInputElement).value ?? ""} ${element.textContent ?? ""}`.toLowerCase();
          return ctaRegex.test(text);
        }).length;

        const purchaseCandidates = ctaCandidates.filter((element) => {
          const text =
            `${(element as HTMLInputElement).value ?? ""} ${element.textContent ?? ""}`.toLowerCase();
          return /(add to cart|buy now|checkout)/i.test(text);
        });

        const stickyCtaPresent = purchaseCandidates.some((element) => {
          const style = window.getComputedStyle(element);
          return style.position === "sticky" || style.position === "fixed";
        });

        const bodyText = document.body?.innerText ?? "";
        const trustSignalNearCta = trustRegex.test(bodyText);

        const variantBlockVisible = Boolean(
          document.querySelector(
            "select[name*='id'], input[name='id'], [data-variant], [data-option]",
          ) || variantRegex.test(bodyText),
        );

        return {
          h1Count: document.querySelectorAll("h1").length,
          h2Count: document.querySelectorAll("h2").length,
          ctaCountAboveFold,
          stickyCtaPresent,
          trustSignalNearCta,
          variantBlockVisible,
        };
      });

      return {
        pageType,
        requestedUrl,
        finalUrl,
        title,
        htmlSnapshot,
        screenshotDesktopBase64,
        screenshotMobileBase64,
        domFacts: toPageDomFacts(facts),
      };
    } catch {
      warnings.push(
        `Failed to fully render ${requestedUrl}. Fallback signals were used for this page.`,
      );
      const fallbackHtml = (await fetchHtml(requestedUrl)) ?? "";
      return {
        pageType,
        requestedUrl,
        finalUrl: requestedUrl,
        title: "Unavailable",
        htmlSnapshot: fallbackHtml,
        screenshotDesktopBase64: null,
        screenshotMobileBase64: null,
        domFacts: toFallbackFacts(fallbackHtml),
      };
    } finally {
      await desktopPage.close();
      await mobilePage.close();
    }
  }

  const homePage = await auditPage("home", storeUrl);
  const productPath = detectProductPathFromHtml(homePage.htmlSnapshot);
  const productUrl = productPath ? resolveUrl(productPath, homePage.finalUrl) : homePage.finalUrl;
  const cartUrl = resolveUrl("/cart", homePage.finalUrl);

  const pdpPage = await auditPage("pdp", productUrl);
  const cartPage = await auditPage("cart", cartUrl);

  await desktopContext.close();
  await mobileContext.close();
  await desktopBrowser.close();

  const pages = [homePage, pdpPage, cartPage].sort(
    (left, right) => getPageTypeOrder(left.pageType) - getPageTypeOrder(right.pageType),
  );
  const isShopify =
    storeUrl.includes(".myshopify.com") ||
    pages.some(
      (page) =>
        shopifyMarkerPattern.test(page.htmlSnapshot) || page.finalUrl.includes(".myshopify.com"),
    );

  return {
    isShopify,
    storeHost: new URL(homePage.finalUrl).hostname,
    pages,
    warnings,
  };
}

function createRuleVisualFindings(pages: RenderedPageArtifact[]): VisualFinding[] {
  const findings: VisualFinding[] = [];

  function addFinding(finding: VisualFinding) {
    findings.push(finding);
  }

  for (const page of pages) {
    if (page.domFacts.h1Count !== 1) {
      addFinding({
        id: `${page.pageType}-h1-structure`,
        title: "Heading hierarchy is inconsistent",
        severity: "high",
        evidence: `${page.pageType.toUpperCase()} page has ${page.domFacts.h1Count} H1 headings.`,
        whyItMatters:
          "Inconsistent heading structure harms readability and weakens search intent clarity.",
        fixHint: "Keep exactly one H1 and move supporting headings to H2/H3 levels.",
        confidence: "high",
        pageType: page.pageType,
        source: "rules",
      });
    }

    if (page.domFacts.ctaCountAboveFold === 0) {
      addFinding({
        id: `${page.pageType}-cta-above-fold`,
        title: "Primary CTA is not visible above the fold",
        severity: page.pageType === "home" ? "high" : "medium",
        evidence: `${page.pageType.toUpperCase()} page has no strong CTA detected above the first viewport.`,
        whyItMatters: "Users should see a clear next action immediately to reduce drop-offs.",
        fixHint: "Place one clear action button in the first viewport with high contrast styling.",
        confidence: "medium",
        pageType: page.pageType,
        source: "rules",
      });
    }

    if (page.pageType === "pdp" && !page.domFacts.variantBlockVisible) {
      addFinding({
        id: "pdp-variant-visibility",
        title: "Variant controls are hard to detect",
        severity: "high",
        evidence: "PDP signals did not detect a clear variant selection block.",
        whyItMatters:
          "If shoppers cannot pick size/color quickly, they abandon before add-to-cart.",
        fixHint:
          "Ensure variant options appear above or near the add-to-cart button with clear labels.",
        confidence: "high",
        pageType: page.pageType,
        source: "rules",
      });
    }

    if (page.pageType === "pdp" && !page.domFacts.trustSignalNearCta) {
      addFinding({
        id: "pdp-trust-near-cta",
        title: "Trust signals are weak near purchase controls",
        severity: "medium",
        evidence: "PDP signals did not detect shipping/returns/review language near decision area.",
        whyItMatters: "Trust cues near CTA reduce anxiety and improve purchase intent.",
        fixHint:
          "Add short trust row under CTA: shipping timeline, returns policy, and review proof.",
        confidence: "medium",
        pageType: page.pageType,
        source: "rules",
      });
    }
  }

  return findings;
}

type OpenAiResponse = {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

function extractOutputText(payload: OpenAiResponse): string {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  const textParts =
    payload.output
      ?.flatMap((item) => item.content ?? [])
      .map((content) => (typeof content.text === "string" ? content.text : ""))
      .filter(Boolean) ?? [];

  return textParts.join("\n");
}

function parseJsonObject(value: string): unknown {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    const jsonMatch = trimmed.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return null;
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return null;
    }
  }
}

function normalizeAiFinding(input: unknown): VisualFinding | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const item = input as Record<string, unknown>;
  const title = typeof item.title === "string" ? item.title.trim() : "";
  const evidence = typeof item.evidence === "string" ? item.evidence.trim() : "";
  const whyItMatters = typeof item.why_it_matters === "string" ? item.why_it_matters.trim() : "";
  const fixHint = typeof item.fix_hint === "string" ? item.fix_hint.trim() : "";

  if (!title || !evidence || !whyItMatters || !fixHint) {
    return null;
  }

  const severityRaw = typeof item.severity === "string" ? item.severity.toLowerCase() : "medium";
  const severity = severityRaw === "high" || severityRaw === "low" ? severityRaw : "medium";

  const confidenceRaw =
    typeof item.confidence === "string" ? item.confidence.toLowerCase() : "medium";
  const confidence = confidenceRaw === "high" ? "high" : "medium";

  const pageTypeRaw = typeof item.page_type === "string" ? item.page_type.toLowerCase() : "unknown";
  const pageType: AnalyzerPageType =
    pageTypeRaw === "home" || pageTypeRaw === "pdp" || pageTypeRaw === "cart"
      ? pageTypeRaw
      : "unknown";

  return {
    id: `ai-${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 64)}`,
    title,
    severity,
    evidence,
    whyItMatters,
    fixHint,
    confidence,
    pageType,
    source: "ai",
  };
}

async function runAiVisualReview(pages: RenderedPageArtifact[]): Promise<VisualFinding[] | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const images = pages
    .filter((page) => Boolean(page.screenshotDesktopBase64))
    .slice(0, 3)
    .map((page) => ({
      type: "input_image",
      image_url: `data:image/jpeg;base64,${page.screenshotDesktopBase64}`,
      detail: "low",
    }));

  if (images.length === 0) {
    return null;
  }

  const domSummary = pages.map((page) => ({
    page_type: page.pageType,
    url: page.finalUrl,
    title: page.title,
    dom_facts: page.domFacts,
  }));

  const instructions = `You are auditing Shopify storefront screenshots and DOM facts.
Return strict JSON only with this shape:
{"findings":[{"title":"...","severity":"high|medium|low","evidence":"...","why_it_matters":"...","fix_hint":"...","confidence":"high|medium","page_type":"home|pdp|cart|unknown"}]}
Rules:
- Keep findings concrete and conversion-focused.
- No marketing fluff.
- Max 6 findings.
- Use evidence from screenshot + provided facts.
- If unsure, lower confidence to medium.`;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: visualModel,
        temperature: 0.1,
        input: [
          {
            role: "system",
            content: [{ type: "input_text", text: "You are a strict JSON audit extractor." }],
          },
          {
            role: "user",
            content: [
              { type: "input_text", text: instructions },
              { type: "input_text", text: `DOM facts:\n${JSON.stringify(domSummary, null, 2)}` },
              ...images,
            ],
          },
        ],
      }),
    }).catch(() => null);

    if (!response || !response.ok) {
      continue;
    }

    const payload = (await response.json().catch(() => null)) as OpenAiResponse | null;
    if (!payload) {
      continue;
    }

    const outputText = extractOutputText(payload);
    const parsed = parseJsonObject(outputText);

    if (!parsed || typeof parsed !== "object" || !("findings" in parsed)) {
      continue;
    }

    const findingsRaw = (parsed as { findings?: unknown }).findings;
    if (!Array.isArray(findingsRaw)) {
      continue;
    }

    const normalizedFindings = findingsRaw
      .map(normalizeAiFinding)
      .filter(Boolean) as VisualFinding[];
    if (normalizedFindings.length === 0) {
      continue;
    }

    return normalizedFindings;
  }

  return null;
}

function dedupeVisualFindings(findings: VisualFinding[]): VisualFinding[] {
  const seen = new Set<string>();
  const deduped: VisualFinding[] = [];

  for (const finding of findings) {
    const key = `${finding.title.toLowerCase()}::${finding.pageType}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(finding);
  }

  return deduped;
}

export async function reviewVisualLayout(
  pages: RenderedPageArtifact[],
): Promise<VisualReviewOutput> {
  const ruleFindings = createRuleVisualFindings(pages);
  const aiFindings = await runAiVisualReview(pages);

  if (!aiFindings) {
    return {
      findings: ruleFindings,
      warnings: ["AI visual review unavailable. Used deterministic visual rules."],
    };
  }

  const findings = dedupeVisualFindings([...aiFindings, ...ruleFindings]);
  return {
    findings,
    warnings: [],
  };
}

function toOpportunityTitle(id: string): string {
  return id.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  return null;
}

export async function runPerformanceAudit(
  pages: RenderedPageArtifact[],
): Promise<PerformanceAuditOutput> {
  const lighthouseModule = await importOptionalModule<unknown>("lighthouse");
  const chromeLauncherModule = await importOptionalModule<unknown>("chrome-launcher");

  if (!lighthouseModule || !chromeLauncherModule) {
    return {
      performance: {
        available: false,
        summary:
          "Lighthouse runtime is unavailable in this environment. Performance recommendations use fallback heuristics.",
        pages: pages.map((page) => ({
          pageType: page.pageType,
          url: page.finalUrl,
          score: null,
          vitals: { lcpMs: null, cls: null, inpMs: null, fcpMs: null },
          opportunities: [],
        })),
        topOpportunities: [],
      },
      warnings: ["Lighthouse/chrome-launcher dependency not available at runtime."],
    };
  }

  const lighthouseFn =
    typeof lighthouseModule === "function"
      ? (lighthouseModule as LighthouseRunnerLike)
      : typeof (lighthouseModule as { default?: unknown }).default === "function"
        ? ((lighthouseModule as { default: unknown }).default as LighthouseRunnerLike)
        : null;

  const launch =
    typeof (chromeLauncherModule as { launch?: unknown }).launch === "function"
      ? ((chromeLauncherModule as { launch: unknown }).launch as ChromeLauncherLike["launch"])
      : typeof (chromeLauncherModule as { default?: { launch?: unknown } }).default?.launch ===
          "function"
        ? ((chromeLauncherModule as { default: { launch: unknown } }).default
            .launch as ChromeLauncherLike["launch"])
        : null;

  if (!lighthouseFn || !launch) {
    return {
      performance: {
        available: false,
        summary: "Lighthouse module could not be initialized.",
        pages: [],
        topOpportunities: [],
      },
      warnings: ["Lighthouse module initialization failed."],
    };
  }

  const warnings: string[] = [];
  const pageReports: PerformancePageReport[] = [];
  const allOpportunities: PerformanceOpportunity[] = [];

  const chrome = await launch({
    chromeFlags: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    for (const page of pages) {
      try {
        const result = await lighthouseFn(page.finalUrl, {
          port: chrome.port,
          output: "json",
          logLevel: "error",
          onlyCategories: ["performance"],
          throttlingMethod: "simulate",
          emulatedFormFactor: "mobile",
        });

        const lhr = result?.lhr;
        const scoreRaw = toNumber(lhr?.categories?.performance?.score);
        const score = scoreRaw === null ? null : Math.round(scoreRaw * 100);
        const audits: Record<string, LighthouseAuditLike> = lhr?.audits ?? {};

        const report: PerformancePageReport = {
          pageType: page.pageType,
          url: page.finalUrl,
          score,
          vitals: {
            lcpMs: toNumber(audits["largest-contentful-paint"]?.numericValue),
            cls: toNumber(audits["cumulative-layout-shift"]?.numericValue),
            inpMs:
              toNumber(audits["interaction-to-next-paint"]?.numericValue) ??
              toNumber(audits["max-potential-fid"]?.numericValue),
            fcpMs: toNumber(audits["first-contentful-paint"]?.numericValue),
          },
          opportunities: [],
        };

        for (const [auditId, auditValue] of Object.entries(audits)) {
          const savings = toNumber(auditValue?.details?.overallSavingsMs);
          if (!savings || savings < 50) {
            continue;
          }

          const opportunity: PerformanceOpportunity = {
            title: auditValue?.title ?? toOpportunityTitle(auditId),
            potentialSavingsMs: Math.round(savings),
            pageType: page.pageType,
            url: page.finalUrl,
          };
          report.opportunities.push(opportunity);
          allOpportunities.push(opportunity);
        }

        pageReports.push(report);
      } catch {
        warnings.push(`Lighthouse run failed for ${page.finalUrl}.`);
        pageReports.push({
          pageType: page.pageType,
          url: page.finalUrl,
          score: null,
          vitals: { lcpMs: null, cls: null, inpMs: null, fcpMs: null },
          opportunities: [],
        });
      }
    }
  } finally {
    await chrome.kill();
  }

  const topOpportunities = [...allOpportunities]
    .sort((left, right) => right.potentialSavingsMs - left.potentialSavingsMs)
    .slice(0, 6);

  const available = pageReports.some((page) => page.score !== null);
  const summary = available
    ? "Performance metrics were collected from Lighthouse mobile runs."
    : "Lighthouse could not produce page scores in this run.";

  return {
    performance: {
      available,
      summary,
      pages: pageReports,
      topOpportunities,
    },
    warnings,
  };
}

function createRecommendation(
  input: Omit<AnalysisRecommendation, "implementationPrompt" | "safeValidationStep"> & {
    implementationPrompt?: string;
    safeValidationStep?: string;
  },
): AnalysisRecommendation {
  return {
    ...input,
    implementationPrompt:
      input.implementationPrompt ??
      `Implement "${input.title}" in Shopify theme editor and validate changes in preview mode.`,
    safeValidationStep:
      input.safeValidationStep ??
      "Validate this change on homepage, product page, and cart on both desktop and mobile.",
  };
}

function getPage(
  pages: RenderedPageArtifact[],
  pageType: AnalyzerPageType,
): RenderedPageArtifact | null {
  return pages.find((page) => page.pageType === pageType) ?? null;
}

function buildPerformanceRecommendation(
  performance: PerformanceReport,
): AnalysisRecommendation | null {
  if (!performance.available || performance.topOpportunities.length === 0) {
    return null;
  }

  const topOpportunity = performance.topOpportunities[0];
  return createRecommendation({
    title: `Improve ${topOpportunity.pageType.toUpperCase()} performance: ${topOpportunity.title}`,
    whyItMatters:
      "Slow pages increase bounce and reduce conversion intent, especially for paid traffic and mobile users.",
    effort: "M",
    impact: "High",
    confidence: "Medium",
    flaggedBecause: `Lighthouse found ~${topOpportunity.potentialSavingsMs}ms potential savings on ${topOpportunity.url}.`,
    howToFix:
      "Address the top performance bottleneck first (usually render-blocking assets, heavy scripts, or oversized media).",
    evidenceSources: ["Performance"],
    implementationPrompt: `Run a focused theme optimization for ${topOpportunity.pageType} page at ${topOpportunity.url}, starting with "${topOpportunity.title}". Reduce blocking assets and re-test until Lighthouse score improves.`,
  });
}

export function synthesizeAnalyzerResult(input: {
  storeUrl: string;
  goal: AnalyzeGoal;
  pages: RenderedPageArtifact[];
  visualFindings: VisualFinding[];
  performance: PerformanceReport;
  warnings: string[];
}): {
  result: {
    summary: {
      headline: string;
      overview: string;
      estimatedMinutes: number;
    };
    todayPlan: AnalysisRecommendation[];
    quickWins: AnalysisRecommendation[];
    blockers: AnalysisRecommendation[];
    visualFindings: VisualFinding[];
    performance: PerformanceReport;
    themeCodeAnalysis: {
      status: "coming_soon";
      note: string;
      plannedInputs: string[];
    };
  };
} {
  const home = getPage(input.pages, "home");
  const pdp = getPage(input.pages, "pdp");
  const cart = getPage(input.pages, "cart");
  const hostname = new URL(input.storeUrl).hostname;

  const candidates: AnalysisRecommendation[] = [];

  candidates.push(
    createRecommendation({
      title: "Prioritize one primary CTA in the homepage hero",
      whyItMatters:
        "A single above-the-fold action reduces hesitation and improves click-through quality.",
      effort: "S",
      impact: "High",
      confidence: "High",
      flaggedBecause: home
        ? `Home page (${home.finalUrl}) shows ${home.domFacts.ctaCountAboveFold} CTA-like controls above the fold.`
        : `Homepage intent flow for ${hostname} needs clearer CTA prioritization.`,
      howToFix:
        "Keep one dominant hero CTA and de-emphasize secondary links in the first viewport.",
      evidenceSources: ["DOM", "Visual"],
      implementationPrompt:
        "In Shopify theme editor, keep one primary hero CTA with solid style. Move secondary CTA below and style as secondary outline.",
    }),
  );

  candidates.push(
    createRecommendation({
      title: "Improve trust cues near add-to-cart",
      whyItMatters:
        "Trust microcopy close to purchase controls reduces anxiety and supports faster checkout decisions.",
      effort: "S",
      impact: "High",
      confidence: pdp?.domFacts.trustSignalNearCta ? "Medium" : "High",
      flaggedBecause: pdp
        ? `PDP (${pdp.finalUrl}) trust signal near CTA: ${pdp.domFacts.trustSignalNearCta ? "detected but weak" : "not detected"}.`
        : "Product detail page trust cues should be validated near purchase controls.",
      howToFix:
        "Add a compact trust strip under the CTA with shipping window, returns policy, and customer proof.",
      evidenceSources: ["DOM", "Visual"],
    }),
  );

  candidates.push(
    createRecommendation({
      title: "Simplify PDP hierarchy above the fold",
      whyItMatters:
        "When the decision area is noisy, users take longer to choose and drop off before adding to cart.",
      effort: "M",
      impact: "High",
      confidence: "High",
      flaggedBecause: pdp
        ? `PDP (${pdp.finalUrl}) should prioritize title -> price -> benefits -> variant -> CTA.`
        : "PDP information hierarchy should prioritize decision-critical elements first.",
      howToFix:
        "Limit above-the-fold content to price, core benefits, variants, and CTA. Move secondary details lower.",
      evidenceSources: ["Visual", "DOM"],
    }),
  );

  candidates.push(
    createRecommendation({
      title: "Add sticky mobile purchase action",
      whyItMatters:
        "Persistent mobile purchase controls reduce friction for users scrolling long product pages.",
      effort: "S",
      impact: "Med",
      confidence: pdp?.domFacts.stickyCtaPresent ? "Medium" : "High",
      flaggedBecause: pdp
        ? `Sticky CTA presence on PDP (${pdp.finalUrl}): ${pdp.domFacts.stickyCtaPresent ? "detected but verify usability" : "not detected"}.`
        : "No clear sticky purchase control signal detected on product page.",
      howToFix: "Show a compact sticky bar with product name, price, and add-to-cart on mobile.",
      evidenceSources: ["DOM", "Visual"],
      safeValidationStep:
        "On a mobile viewport, scroll through PDP and confirm sticky CTA remains visible without blocking key content.",
    }),
  );

  if (cart && cart.domFacts.ctaCountAboveFold === 0) {
    candidates.push(
      createRecommendation({
        title: "Make cart checkout path visible immediately",
        whyItMatters:
          "Cart drop-offs increase when checkout action is not obvious in the first viewport.",
        effort: "S",
        impact: "High",
        confidence: "High",
        flaggedBecause: `Cart page (${cart.finalUrl}) does not show a strong checkout CTA above fold.`,
        howToFix:
          "Bring checkout CTA higher and keep totals, shipping expectation, and payment trust cues nearby.",
        evidenceSources: ["DOM", "Visual"],
      }),
    );
  }

  const performanceRecommendation = buildPerformanceRecommendation(input.performance);
  if (performanceRecommendation) {
    candidates.push(performanceRecommendation);
  } else if (!input.performance.available) {
    candidates.push(
      createRecommendation({
        title: "Run targeted speed pass on homepage and PDP",
        whyItMatters:
          "Page speed is one of the highest leverage conversion drivers for mobile Shopify traffic.",
        effort: "M",
        impact: input.goal === "speed" ? "High" : "Med",
        confidence: "Medium",
        flaggedBecause:
          "Lighthouse metrics were unavailable in this run; fallback speed recommendation applied.",
        howToFix:
          "Optimize hero media, remove unused app scripts, and defer non-critical assets before first interaction.",
        evidenceSources: ["Performance"],
      }),
    );
  }

  const visualBlockers = input.visualFindings
    .filter((finding) => finding.severity === "high")
    .slice(0, 2)
    .map((finding) =>
      createRecommendation({
        title: finding.title,
        whyItMatters: finding.whyItMatters,
        effort: "M",
        impact: "High",
        confidence: finding.confidence === "high" ? "High" : "Medium",
        flaggedBecause: `${finding.evidence} (${finding.pageType.toUpperCase()})`,
        howToFix: finding.fixHint,
        evidenceSources: ["Visual", "DOM"],
      }),
    );

  const ranked = [...candidates].sort((left, right) => {
    const impactScore = (value: AnalysisRecommendation["impact"]) =>
      value === "High" ? 3 : value === "Med" ? 2 : 1;
    const effortScore = (value: AnalysisRecommendation["effort"]) =>
      value === "S" ? 3 : value === "M" ? 2 : 1;
    const leftScore = impactScore(left.impact) * 10 + effortScore(left.effort);
    const rightScore = impactScore(right.impact) * 10 + effortScore(right.effort);
    return rightScore - leftScore;
  });

  const todayPlan = ranked.slice(0, 3);
  const remaining = ranked.slice(3);

  const quickWins = remaining.filter((item) => item.effort === "S").slice(0, 3);
  const quickWinTitles = new Set(quickWins.map((item) => item.title));
  const blockerCandidates = [
    ...visualBlockers,
    ...remaining.filter((item) => item.impact === "High"),
  ];

  const blockers = blockerCandidates
    .filter(
      (item) =>
        !quickWinTitles.has(item.title) && !todayPlan.some((today) => today.title === item.title),
    )
    .slice(0, 3);

  while (quickWins.length < 2 && remaining.length > 0) {
    const fallback = remaining.shift();
    if (!fallback) {
      break;
    }

    if (!quickWinTitles.has(fallback.title)) {
      quickWins.push({ ...fallback, effort: "S" });
      quickWinTitles.add(fallback.title);
    }
  }

  const warningsText = input.warnings.length > 0 ? ` Notes: ${input.warnings.join(" ")}` : "";

  return {
    result: {
      summary: {
        headline: "Your multi-signal action plan is ready",
        overview: `We reviewed ${hostname} using rendered DOM, visual layout checks, and performance analysis to prioritize high-impact fixes.${warningsText}`,
        estimatedMinutes: 10,
      },
      todayPlan,
      quickWins,
      blockers,
      visualFindings: input.visualFindings,
      performance: input.performance,
      themeCodeAnalysis: {
        status: "coming_soon",
        note: "Theme code analysis will be added in Phase 2.",
        plannedInputs: [
          "Shopify theme ZIP upload",
          "GitHub repository URL",
          "Targeted snippet input",
        ],
      },
    },
  };
}
