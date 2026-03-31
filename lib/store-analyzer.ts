import { randomUUID } from "node:crypto";

import {
  renderStorefrontForAnalysis,
  reviewVisualLayout,
  runPerformanceAudit,
  synthesizeAnalyzerResult,
} from "@/lib/analyzer-pipeline";
import { readFreshCachedAnalysis, writeCachedAnalysis } from "@/lib/analyzer-db";
import type {
  AnalysisArtifactsReady,
  AnalyzeDoneResponse,
  AnalyzeErrorResponse,
  AnalyzeGoal,
  AnalyzeProfile,
  AnalyzeQueueResponse,
  AnalyzeQueuedResponse,
  AnalyzeRequest,
  AnalyzerStage,
  CompletedAnalysisResult,
} from "@/types/analyzer";

type AnalysisRecord = {
  id: string;
  storeUrl: string;
  goal: AnalyzeGoal;
  analysisProfile: AnalyzeProfile;
  createdAt: number;
  response: AnalyzeQueueResponse;
};

type EmailCapture = {
  analysisId: string;
  email: string;
  createdAt: string;
};

type AnalyzerStores = {
  analysisStore: Map<string, AnalysisRecord>;
  emailCaptures: EmailCapture[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const shopifyMarkerPattern = /(cdn\.shopify\.com|shopify\.section|shopify\.theme|myshopify\.com)/i;

declare global {
  // eslint-disable-next-line no-var
  var __krishAnalyzerStores: AnalyzerStores | undefined;
}

function getStores(): AnalyzerStores {
  if (!globalThis.__krishAnalyzerStores) {
    globalThis.__krishAnalyzerStores = {
      analysisStore: new Map<string, AnalysisRecord>(),
      emailCaptures: [],
    };
  }

  return globalThis.__krishAnalyzerStores;
}

export class AnalyzerInputError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);
    this.name = "AnalyzerInputError";
    this.statusCode = statusCode;
  }
}

function defaultArtifactsReady(): AnalysisArtifactsReady {
  return {
    renderedPages: false,
    visualReview: false,
    lighthouse: false,
    synthesis: false,
  };
}

function buildQueuedResponse(input: {
  analysisId: string;
  stage: AnalyzerStage;
  progress: number;
  artifactsReady?: AnalysisArtifactsReady;
}): AnalyzeQueuedResponse {
  return {
    analysisId: input.analysisId,
    status: "queued",
    stage: input.stage,
    progress: input.progress,
    artifactsReady: input.artifactsReady ?? defaultArtifactsReady(),
    servedFromCache: false,
  };
}

function buildDoneResponse(input: {
  analysisId: string;
  servedFromCache: boolean;
  cachedAt?: string;
  result: Omit<
    AnalyzeDoneResponse,
    | "analysisId"
    | "status"
    | "stage"
    | "progress"
    | "servedFromCache"
    | "cachedAt"
    | "artifactsReady"
  >;
  artifactsReady?: AnalysisArtifactsReady;
}): AnalyzeDoneResponse {
  return {
    analysisId: input.analysisId,
    status: "done",
    stage: "done",
    progress: 100,
    artifactsReady: input.artifactsReady ?? {
      renderedPages: true,
      visualReview: true,
      lighthouse: true,
      synthesis: true,
    },
    servedFromCache: input.servedFromCache,
    cachedAt: input.cachedAt,
    ...input.result,
  };
}

function buildErrorResponse(input: {
  analysisId: string;
  message: string;
  artifactsReady: AnalysisArtifactsReady;
}): AnalyzeErrorResponse {
  return {
    analysisId: input.analysisId,
    status: "error",
    stage: "error",
    progress: 100,
    artifactsReady: input.artifactsReady,
    servedFromCache: false,
    message: input.message,
  };
}

export function normalizeStoreUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(normalizeStoreUrl(value));
    return Boolean(parsed.hostname) && parsed.hostname.includes(".");
  } catch {
    return false;
  }
}

function toGoal(goal?: string): AnalyzeGoal {
  if (goal === "speed" || goal === "pdp") {
    return goal;
  }

  return "conversion";
}

function toAnalysisProfile(profile?: string): AnalyzeProfile {
  if (profile === "advanced") {
    return profile;
  }

  if (profile === "basic") {
    return profile;
  }

  return "basic";
}

function updateQueuedStage(
  record: AnalysisRecord,
  stage: AnalyzerStage,
  progress: number,
  mutateArtifacts?: (artifacts: AnalysisArtifactsReady) => AnalysisArtifactsReady,
) {
  if (record.response.status !== "queued") {
    return;
  }

  const nextArtifacts = mutateArtifacts
    ? mutateArtifacts(record.response.artifactsReady)
    : record.response.artifactsReady;

  record.response = {
    ...record.response,
    stage,
    progress,
    artifactsReady: nextArtifacts,
  };
}

async function runAnalysisPipeline(record: AnalysisRecord): Promise<void> {
  try {
    updateQueuedStage(record, "rendering", 25);
    const rendering = await renderStorefrontForAnalysis(record.storeUrl);

    if (!rendering.isShopify) {
      throw new AnalyzerInputError(
        "We could not confirm this is a Shopify storefront. Try your *.myshopify.com URL or a live Shopify domain.",
        400,
      );
    }

    updateQueuedStage(record, "visual_review", 50, (artifacts) => ({
      ...artifacts,
      renderedPages: true,
    }));
    const visualReview = await reviewVisualLayout(rendering.pages);

    updateQueuedStage(record, "lighthouse", 72, (artifacts) => ({
      ...artifacts,
      visualReview: true,
    }));
    const performanceAudit = await runPerformanceAudit(rendering.pages);

    updateQueuedStage(record, "synthesis", 90, (artifacts) => ({
      ...artifacts,
      lighthouse: true,
    }));
    const synthesis = synthesizeAnalyzerResult({
      storeUrl: record.storeUrl,
      goal: record.goal,
      pages: rendering.pages,
      visualFindings: visualReview.findings,
      performance: performanceAudit.performance,
      warnings: [...rendering.warnings, ...visualReview.warnings, ...performanceAudit.warnings],
    });

    const done = buildDoneResponse({
      analysisId: record.id,
      servedFromCache: false,
      result: synthesis.result,
      artifactsReady: {
        renderedPages: true,
        visualReview: true,
        lighthouse: true,
        synthesis: true,
      },
    });
    record.response = done;

    await writeCachedAnalysis({
      analysisId: record.id,
      storeUrl: record.storeUrl,
      goal: record.goal,
      analysisProfile: record.analysisProfile,
      result: synthesis.result,
    });
  } catch (error) {
    const message =
      error instanceof AnalyzerInputError
        ? error.message
        : "We could not complete this analysis run. Please try again.";

    const artifactsReady =
      record.response.status === "queued"
        ? record.response.artifactsReady
        : defaultArtifactsReady();
    record.response = buildErrorResponse({
      analysisId: record.id,
      message,
      artifactsReady,
    });
  }
}

async function fetchHtmlForBasicAnalysis(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "KrishAnalyzerBot/1.0 (+https://www.heykrish.ai)",
      },
      redirect: "follow",
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return null;
    }

    const html = await response.text();
    return html.slice(0, 220000);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function resolveProductPath(homeHtml: string): string | null {
  const productMatch = homeHtml.match(/href=["']([^"']*\/products\/[^"']+)["']/i);
  if (!productMatch) {
    return null;
  }

  return productMatch[1] ?? null;
}

function resolveAbsoluteUrl(pathOrUrl: string, baseUrl: string): string {
  try {
    return new URL(pathOrUrl, baseUrl).toString();
  } catch {
    return baseUrl;
  }
}

function hasSignal(html: string | null, pattern: RegExp): boolean {
  if (!html) {
    return false;
  }

  return pattern.test(html.toLowerCase());
}

function countTag(html: string | null, tagName: string): number {
  if (!html) {
    return 0;
  }

  const matches = html.match(new RegExp(`<${tagName}\\b`, "gi"));
  return matches?.length ?? 0;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function countCtaLikeElements(html: string | null): number {
  if (!html) {
    return 0;
  }

  const snippet = html.slice(0, 130_000);
  const actionVerbPattern =
    /(shop|buy|add to cart|get started|discover|start now|view collection|shop now|explore)/i;
  const clickablePattern = /<(a|button)\b[^>]*>([\s\S]{0,180}?)<\/(a|button)>/gi;

  let count = 0;
  for (const match of snippet.matchAll(clickablePattern)) {
    const content = stripHtml(match[2] ?? "").toLowerCase();
    if (!content) {
      continue;
    }

    if (actionVerbPattern.test(content)) {
      count += 1;
    }
  }

  return count;
}

type BasicSection = "todayPlan" | "quickWins" | "blockers";
type BasicCandidate = {
  id: string;
  section: BasicSection;
  score: number;
  recommendation: CompletedAnalysisResult["todayPlan"][number];
};

function scoreCandidate(input: {
  base: number;
  goal: AnalyzeGoal;
  goalTags: AnalyzeGoal[];
  confidence: "High" | "Medium";
}): number {
  const goalBonus = input.goalTags.includes(input.goal) ? 18 : 0;
  const confidenceBonus = input.confidence === "High" ? 5 : 2;
  return input.base + goalBonus + confidenceBonus;
}

function pickSectionRecommendations(input: {
  candidates: BasicCandidate[];
  section: BasicSection;
  count: number;
  selectedIds: Set<string>;
}): CompletedAnalysisResult["todayPlan"] {
  const picked: CompletedAnalysisResult["todayPlan"] = [];
  const sectionCandidates = input.candidates
    .filter((candidate) => candidate.section === input.section)
    .sort((left, right) => right.score - left.score);

  for (const candidate of sectionCandidates) {
    if (picked.length >= input.count) {
      break;
    }

    if (input.selectedIds.has(candidate.id)) {
      continue;
    }

    input.selectedIds.add(candidate.id);
    picked.push(candidate.recommendation);
  }

  if (picked.length < input.count) {
    const fallbackCandidates = input.candidates
      .filter((candidate) => !input.selectedIds.has(candidate.id))
      .sort((left, right) => right.score - left.score);

    for (const candidate of fallbackCandidates) {
      if (picked.length >= input.count) {
        break;
      }

      input.selectedIds.add(candidate.id);
      picked.push(candidate.recommendation);
    }
  }

  return picked;
}

function toBasicRecommendation(input: {
  title: string;
  whyItMatters: string;
  effort: "S" | "M" | "L";
  impact: "High" | "Med" | "Low";
  confidence: "High" | "Medium";
  flaggedBecause: string;
  howToFix: string;
  implementationPrompt?: string;
  safeValidationStep?: string;
}): CompletedAnalysisResult["todayPlan"][number] {
  return {
    ...input,
    evidenceSources: ["DOM"],
    implementationPrompt:
      input.implementationPrompt ??
      `Audit and implement "${input.title}" in Shopify theme editor without app installs or backend changes.`,
    safeValidationStep:
      input.safeValidationStep ??
      "Preview the update in Shopify theme preview, then verify on homepage + one product page on mobile and desktop.",
  };
}

async function runBasicHeuristicAnalysis(input: {
  storeUrl: string;
  goal: AnalyzeGoal;
}): Promise<CompletedAnalysisResult> {
  const homeHtml = await fetchHtmlForBasicAnalysis(input.storeUrl);
  const productPath = homeHtml ? resolveProductPath(homeHtml) : null;
  const productUrl = productPath ? resolveAbsoluteUrl(productPath, input.storeUrl) : input.storeUrl;
  const productHtml = await fetchHtmlForBasicAnalysis(productUrl);
  const cartUrl = resolveAbsoluteUrl("/cart", input.storeUrl);
  const cartHtml = await fetchHtmlForBasicAnalysis(cartUrl);

  const isMyShopify = input.storeUrl.includes(".myshopify.com");
  const hasShopifyMarkers = Boolean(
    (homeHtml && shopifyMarkerPattern.test(homeHtml)) ||
    (productHtml && shopifyMarkerPattern.test(productHtml)),
  );

  if (!isMyShopify && !hasShopifyMarkers) {
    throw new AnalyzerInputError(
      "We could not confirm this is a Shopify storefront. Try your *.myshopify.com URL or a live Shopify domain.",
      400,
    );
  }

  const hostname = new URL(input.storeUrl).hostname;
  const productPageLabel = productUrl || "your first product detail page";
  const cartPageLabel = cartUrl || "your cart page";

  const hasAtcLanguage = hasSignal(productHtml, /(add to cart|buy now|checkout|purchase)/i);
  const hasReviewSignal = hasSignal(productHtml, /(review|rating|star)/i);
  const hasGuaranteeSignal = hasSignal(
    productHtml,
    /(money[- ]back|guarantee|secure checkout|trusted|satisfaction)/i,
  );
  const hasTrustSignals = hasReviewSignal || hasGuaranteeSignal;
  const hasLazyImages = hasSignal(homeHtml, /loading=["']lazy["']/i);
  const hasShippingNotice = hasSignal(productHtml, /(shipping|delivery|dispatch)/i);
  const hasReturnsNotice = hasSignal(productHtml, /(returns?|refund|exchange)/i);
  const hasFaqSignals = hasSignal(productHtml, /(faq|frequently asked|questions)/i);
  const hasStickyAtc = hasSignal(
    productHtml,
    /(sticky[^<]{0,40}(add to cart|buy now)|(add to cart|buy now)[^<]{0,40}sticky)/i,
  );
  const hasVariantSelectors = hasSignal(
    productHtml,
    /(variant|swatch|option-selector|product-form__input|name=["']options\[)/i,
  );
  const hasVariantStateText = hasSignal(
    productHtml,
    /(in stock|out of stock|sold out|only \d+ left|unavailable)/i,
  );
  const hasCollectionNavigation = hasSignal(homeHtml, /\/collections\//i);
  const hasExpressCheckout = hasSignal(
    cartHtml,
    /(shop pay|apple pay|google pay|paypal|express checkout)/i,
  );
  const hasCartTrustSignals = hasSignal(
    cartHtml,
    /(secure checkout|encrypted|trusted|money[- ]back|buyer protection)/i,
  );
  const hasCartShippingThreshold = hasSignal(
    cartHtml,
    /(free shipping|away from free shipping|shipping calculated|delivery)/i,
  );

  const homepageCtaCount = countCtaLikeElements(homeHtml);
  const homeHeadingCount = countTag(homeHtml, "h1") + countTag(homeHtml, "h2") + countTag(homeHtml, "h3");
  const homeImageCount = countTag(homeHtml, "img");
  const pdpHeadingCount =
    countTag(productHtml, "h1") + countTag(productHtml, "h2") + countTag(productHtml, "h3");
  const pdpAccordionCount =
    countTag(productHtml, "details") +
    countTag(productHtml, "summary") +
    countTag(productHtml, "accordion");

  const candidates: BasicCandidate[] = [];
  const pushCandidate = (inputCandidate: {
    id: string;
    section: BasicSection;
    baseScore: number;
    goalTags: AnalyzeGoal[];
    recommendation: CompletedAnalysisResult["todayPlan"][number];
  }) => {
    candidates.push({
      id: inputCandidate.id,
      section: inputCandidate.section,
      score: scoreCandidate({
        base: inputCandidate.baseScore,
        goal: input.goal,
        goalTags: inputCandidate.goalTags,
        confidence: inputCandidate.recommendation.confidence,
      }),
      recommendation: inputCandidate.recommendation,
    });
  };

  if (homepageCtaCount >= 3 || homeHeadingCount >= 14) {
    pushCandidate({
      id: "hero-cta-focus",
      section: "todayPlan",
      baseScore: 80,
      goalTags: ["conversion"],
      recommendation: toBasicRecommendation({
        title: "Reduce homepage hero CTA competition",
        whyItMatters:
          "When multiple primary buttons compete above the fold, shoppers hesitate and click depth drops.",
        effort: "S",
        impact: "High",
        confidence: homeHtml ? "High" : "Medium",
        flaggedBecause: `Homepage DOM on ${hostname} shows ~${homepageCtaCount} CTA-like elements and ${homeHeadingCount} headings in prime real estate.`,
        howToFix:
          "Keep one clear primary CTA in the hero and demote other actions to text links or secondary style.",
        implementationPrompt:
          "In Shopify theme editor, set one solid primary hero button (for example: Shop Bestsellers). Convert all other hero actions to secondary text style.",
      }),
    });
  } else {
    pushCandidate({
      id: "hero-message-clarity",
      section: "quickWins",
      baseScore: 52,
      goalTags: ["conversion"],
      recommendation: toBasicRecommendation({
        title: "Tighten hero message and CTA copy",
        whyItMatters:
          "A sharper first-screen message helps new visitors understand value and click into products faster.",
        effort: "S",
        impact: "Med",
        confidence: homeHtml ? "High" : "Medium",
        flaggedBecause: `Homepage structure on ${hostname} is relatively clean, so copy clarity is likely the faster gain.`,
        howToFix:
          "Use one audience-specific value line and one action CTA that names the collection or product family.",
      }),
    });
  }

  if (!hasTrustSignals) {
    pushCandidate({
      id: "pdp-trust-near-atc",
      section: "todayPlan",
      baseScore: 82,
      goalTags: ["conversion", "pdp"],
      recommendation: toBasicRecommendation({
        title: "Place trust proof directly under add-to-cart",
        whyItMatters:
          "Shoppers commit on the product page. Trust proof near purchase controls lowers hesitation at the key decision moment.",
        effort: "M",
        impact: "High",
        confidence: hasAtcLanguage ? "High" : "Medium",
        flaggedBecause: hasAtcLanguage
          ? `On ${productPageLabel}, purchase intent language exists but trust cues (reviews/guarantee) are weak near the purchase block.`
          : `We could not confidently map the purchase block on ${productPageLabel}; trust placement should still be validated near CTA.`,
        howToFix:
          "Add a compact trust row below price/CTA: rating snippet, shipping window, and return policy summary.",
      }),
    });
  } else {
    pushCandidate({
      id: "pdp-trust-density",
      section: "quickWins",
      baseScore: 56,
      goalTags: ["conversion", "pdp"],
      recommendation: toBasicRecommendation({
        title: "Condense trust signals into one scannable trust row",
        whyItMatters:
          "Distributed trust copy is easy to miss. A compact trust row keeps reassurance visible during purchase decisions.",
        effort: "S",
        impact: "Med",
        confidence: "High",
        flaggedBecause: `Trust language exists on ${productPageLabel}, but signal density can be improved near pricing and CTA.`,
        howToFix:
          "Combine rating, returns, and shipping snippets into one horizontal row directly below the purchase controls.",
      }),
    });
  }

  if (pdpHeadingCount >= 13 || pdpAccordionCount >= 7) {
    pushCandidate({
      id: "pdp-hierarchy",
      section: "todayPlan",
      baseScore: 74,
      goalTags: ["pdp", "conversion"],
      recommendation: toBasicRecommendation({
        title: "Simplify product-page above-the-fold hierarchy",
        whyItMatters:
          "Too much visual hierarchy on the first screen increases decision friction and slows conversion.",
        effort: "M",
        impact: "High",
        confidence: productHtml ? "High" : "Medium",
        flaggedBecause: `PDP DOM on ${productPageLabel} contains ${pdpHeadingCount} heading tags and ${pdpAccordionCount} accordion markers, suggesting high cognitive load.`,
        howToFix:
          "Keep title, price, variant selector, 3 benefit bullets, and CTA above the fold; move secondary details below.",
      }),
    });
  } else {
    pushCandidate({
      id: "pdp-benefit-bullets",
      section: "quickWins",
      baseScore: 58,
      goalTags: ["pdp", "conversion"],
      recommendation: toBasicRecommendation({
        title: "Add three benefit bullets above the CTA",
        whyItMatters:
          "Benefit bullets accelerate understanding and reduce hesitation for first-time visitors on PDP.",
        effort: "S",
        impact: "Med",
        confidence: productHtml ? "High" : "Medium",
        flaggedBecause: `PDP structure on ${productPageLabel} appears compact enough to add concise value bullets without layout risk.`,
        howToFix:
          "Insert three short, outcome-focused bullet points between price and variant/CTA controls.",
      }),
    });
  }

  if (!hasStickyAtc) {
    pushCandidate({
      id: "mobile-sticky-atc",
      section: "quickWins",
      baseScore: 72,
      goalTags: ["conversion", "pdp"],
      recommendation: toBasicRecommendation({
        title: "Add a sticky mobile add-to-cart bar",
        whyItMatters:
          "Mobile shoppers scroll long product sections. Persistent purchase controls recover high-intent users.",
        effort: "S",
        impact: "High",
        confidence: productHtml ? "High" : "Medium",
        flaggedBecause: `No sticky purchase-control signal detected on ${productPageLabel}.`,
        howToFix:
          "Enable a mobile-only sticky bar with product name, selected variant, price, and add-to-cart action.",
      }),
    });
  } else {
    pushCandidate({
      id: "sticky-atc-copy",
      section: "quickWins",
      baseScore: 48,
      goalTags: ["conversion", "pdp"],
      recommendation: toBasicRecommendation({
        title: "Improve sticky CTA clarity for selected variant",
        whyItMatters:
          "Sticky bars convert better when they clearly reflect selected options, price, and availability state.",
        effort: "S",
        impact: "Med",
        confidence: "High",
        flaggedBecause: `Sticky purchase behavior is present on ${productPageLabel}; copy/state clarity is the likely conversion lever.`,
        howToFix:
          "Show selected variant label and current price in the sticky CTA and disable button with clear reason when unavailable.",
      }),
    });
  }

  if (!hasLazyImages || homeImageCount >= 18) {
    pushCandidate({
      id: "image-optimization",
      section: "quickWins",
      baseScore: 70,
      goalTags: ["speed"],
      recommendation: toBasicRecommendation({
        title: "Optimize homepage and collection media payload",
        whyItMatters:
          "Large media files delay first interaction and hurt conversion quality on paid mobile traffic.",
        effort: "S",
        impact: input.goal === "speed" ? "High" : "Med",
        confidence: homeHtml ? "High" : "Medium",
        flaggedBecause: hasLazyImages
          ? `Homepage on ${hostname} includes lazy loading but still has ${homeImageCount} image tags, so payload trimming is likely available.`
          : `Homepage on ${hostname} shows ${homeImageCount} image tags with weak lazy-loading signals.`,
        howToFix:
          "Compress hero/collection assets, use modern formats, and ensure non-critical media is lazy-loaded.",
      }),
    });
  }

  if (!hasShippingNotice || !hasReturnsNotice) {
    pushCandidate({
      id: "shipping-returns-microcopy",
      section: "quickWins",
      baseScore: 66,
      goalTags: ["conversion", "pdp"],
      recommendation: toBasicRecommendation({
        title: "Add shipping and returns microcopy near price",
        whyItMatters:
          "Missing policy clarity creates checkout hesitation and increases pre-purchase support questions.",
        effort: "S",
        impact: "Med",
        confidence: productHtml ? "High" : "Medium",
        flaggedBecause: `PDP scan on ${productPageLabel} found shipping=${hasShippingNotice ? "yes" : "no"}, returns=${hasReturnsNotice ? "yes" : "no"} near core purchase copy.`,
        howToFix:
          "Add one concise line under price with delivery window and return terms, linking to full policies.",
      }),
    });
  }

  if (!hasCollectionNavigation) {
    pushCandidate({
      id: "collection-path",
      section: "quickWins",
      baseScore: 59,
      goalTags: ["conversion"],
      recommendation: toBasicRecommendation({
        title: "Strengthen home-to-collection pathing",
        whyItMatters:
          "Weak collection pathways increase bounce for new visitors who are not ready to choose a single product immediately.",
        effort: "S",
        impact: "Med",
        confidence: homeHtml ? "High" : "Medium",
        flaggedBecause: `Homepage on ${hostname} has limited /collections/ navigation signals in key sections.`,
        howToFix:
          "Add one featured collection strip above the fold and one curated collection block before footer.",
      }),
    });
  }

  if (hasVariantSelectors && !hasVariantStateText) {
    pushCandidate({
      id: "variant-feedback",
      section: "blockers",
      baseScore: 80,
      goalTags: ["pdp", "conversion"],
      recommendation: toBasicRecommendation({
        title: "Fix variant selection feedback and stock state",
        whyItMatters:
          "Unclear variant state can feel like a broken checkout path and causes avoidable drop-off.",
        effort: "M",
        impact: "High",
        confidence: "High",
        flaggedBecause: `Variant selector exists on ${productPageLabel} but clear selected-state/availability language is weak.`,
        howToFix:
          "Use high-contrast selected state, update price/media instantly, and show explicit stock status next to CTA.",
      }),
    });
  }

  if (cartHtml && !hasExpressCheckout) {
    pushCandidate({
      id: "cart-express-checkout",
      section: "blockers",
      baseScore: 78,
      goalTags: ["conversion"],
      recommendation: toBasicRecommendation({
        title: "Surface express checkout options on cart",
        whyItMatters:
          "Express checkout shortens purchase flow and recovers users who hesitate at long forms.",
        effort: "M",
        impact: "High",
        confidence: "High",
        flaggedBecause: `Cart scan on ${cartPageLabel} did not detect Shop Pay/PayPal/Apple Pay style express checkout signals.`,
        howToFix:
          "Enable dynamic checkout buttons on cart and keep them visually adjacent to the primary checkout action.",
      }),
    });
  }

  if (cartHtml && !hasCartTrustSignals) {
    pushCandidate({
      id: "cart-trust-reinforcement",
      section: "blockers",
      baseScore: 70,
      goalTags: ["conversion"],
      recommendation: toBasicRecommendation({
        title: "Add cart-level trust reinforcement near checkout",
        whyItMatters:
          "Final-step anxiety spikes on cart; trust reinforcement near checkout reduces abandonment.",
        effort: "S",
        impact: "Med",
        confidence: "High",
        flaggedBecause: `Cart DOM on ${cartPageLabel} has weak secure-checkout reassurance signals.`,
        howToFix:
          "Place a short secure-checkout and returns reassurance row directly under checkout buttons.",
      }),
    });
  }

  if (!hasFaqSignals) {
    pushCandidate({
      id: "pdp-faq",
      section: "blockers",
      baseScore: 60,
      goalTags: ["pdp", "conversion"],
      recommendation: toBasicRecommendation({
        title: "Add PDP FAQ accordion for top objections",
        whyItMatters:
          "Shoppers often leave to search answers externally when objections are unresolved on-page.",
        effort: "S",
        impact: "Med",
        confidence: productHtml ? "High" : "Medium",
        flaggedBecause: `No strong FAQ/objection-handling signal detected on ${productPageLabel}.`,
        howToFix:
          "Add 3-5 FAQs covering fit/compatibility, shipping, returns, and support expectations.",
      }),
    });
  }

  if (cartHtml && !hasCartShippingThreshold) {
    pushCandidate({
      id: "cart-shipping-threshold",
      section: "quickWins",
      baseScore: 64,
      goalTags: ["conversion"],
      recommendation: toBasicRecommendation({
        title: "Show shipping threshold progress in cart",
        whyItMatters:
          "Transparent shipping incentives improve average order value and reduce cart exit due to surprise costs.",
        effort: "S",
        impact: "Med",
        confidence: "High",
        flaggedBecause: `Cart scan on ${cartPageLabel} found limited shipping-threshold communication.`,
        howToFix:
          "Display a progress message (for example: You're $X away from free shipping) above checkout CTA.",
      }),
    });
  }

  const todayCount = candidates.filter((candidate) => candidate.section === "todayPlan").length;
  if (todayCount === 0) {
    pushCandidate({
      id: "homepage-intent-clarity",
      section: "todayPlan",
      baseScore: 62,
      goalTags: ["conversion"],
      recommendation: toBasicRecommendation({
        title: "Align homepage first screen to one buyer intent",
        whyItMatters:
          "Mixed first-screen intent dilutes attention and lowers click-through to revenue-driving pages.",
        effort: "S",
        impact: "Med",
        confidence: homeHtml ? "High" : "Medium",
        flaggedBecause: `Homepage on ${hostname} passed basic friction checks, so intent clarity is the next likely lever.`,
        howToFix:
          "Pair one clear value line with one CTA tied to your main buyer journey (for example: starter kit, bestsellers, or bundles).",
      }),
    });
  }

  const quickWinCount = candidates.filter((candidate) => candidate.section === "quickWins").length;
  if (quickWinCount === 0) {
    pushCandidate({
      id: "quick-copy-clarity",
      section: "quickWins",
      baseScore: 57,
      goalTags: ["conversion", "pdp"],
      recommendation: toBasicRecommendation({
        title: "Improve CTA and policy copy clarity on PDP",
        whyItMatters:
          "Small copy clarity fixes are fast to ship and can reduce hesitation for first-time buyers.",
        effort: "S",
        impact: "Med",
        confidence: productHtml ? "High" : "Medium",
        flaggedBecause: `PDP on ${productPageLabel} has no critical structural failures, making copy clarity a high-speed optimization.`,
        howToFix:
          "Simplify CTA label language and add one-line policy reassurance directly adjacent to purchase actions.",
      }),
    });
  }

  const blockerCount = candidates.filter((candidate) => candidate.section === "blockers").length;
  if (blockerCount === 0) {
    pushCandidate({
      id: "checkout-friction-audit",
      section: "blockers",
      baseScore: 56,
      goalTags: ["conversion"],
      recommendation: toBasicRecommendation({
        title: "Run a cart-to-checkout friction pass",
        whyItMatters:
          "Final-step friction often hides in edge states and can suppress conversion even when PDP looks healthy.",
        effort: "M",
        impact: "Med",
        confidence: cartHtml ? "High" : "Medium",
        flaggedBecause: cartHtml
          ? `Cart structure on ${cartPageLabel} is accessible, but we need explicit friction hardening in checkout handoff states.`
          : `Cart page on ${hostname} could not be fully validated, so checkout handoff risk remains.`,
        howToFix:
          "Test cart with 3 variant combinations and verify totals, shipping messaging, coupon handling, and checkout button behavior are clear.",
      }),
    });
  }

  if (candidates.length < 5) {
    pushCandidate({
      id: "app-script-budget",
      section: "todayPlan",
      baseScore: 61,
      goalTags: ["speed", "conversion"],
      recommendation: toBasicRecommendation({
        title: "Reduce app script load on homepage and PDP",
        whyItMatters:
          "Extra app scripts can hurt responsiveness and conversion, especially on mobile networks.",
        effort: "M",
        impact: input.goal === "speed" ? "High" : "Med",
        confidence: "Medium",
        flaggedBecause: `Limited DOM certainty from ${hostname}; script-budget review is a safe high-leverage validation step.`,
        howToFix:
          "Disable unused app embeds, defer non-critical scripts, and keep only scripts needed for above-the-fold interactions.",
        safeValidationStep:
          "In Shopify theme preview, compare interaction speed on homepage and one PDP before/after disabling non-essential app embeds.",
      }),
    });
  }

  const selectedIds = new Set<string>();
  const todayPlan = pickSectionRecommendations({
    candidates,
    section: "todayPlan",
    count: 3,
    selectedIds,
  });
  const quickWins = pickSectionRecommendations({
    candidates,
    section: "quickWins",
    count: 3,
    selectedIds,
  });
  const blockers = pickSectionRecommendations({
    candidates,
    section: "blockers",
    count: 2,
    selectedIds,
  });

  const pageCoverage = [
    homeHtml ? "home" : "home (partial)",
    productHtml ? "pdp" : "pdp (partial)",
    cartHtml ? "cart" : "cart (partial)",
  ].join(", ");
  const highConfidenceCount = [...todayPlan, ...quickWins, ...blockers].filter(
    (item) => item.confidence === "High",
  ).length;

  return {
    summary: {
      headline: "Your 10-minute action plan is ready",
      overview: `We reviewed ${hostname} (${pageCoverage}) using fast page-structure checks. ${highConfidenceCount} recommendations are high-confidence and ready to ship today.`,
      estimatedMinutes: 10,
    },
    todayPlan,
    quickWins,
    blockers,
    visualFindings: [],
    performance: {
      available: false,
      summary: "Basic analysis does not run Lighthouse/Core Web Vitals.",
      pages: [],
      topOpportunities: [],
    },
    themeCodeAnalysis: {
      status: "coming_soon",
      note: "Theme code analysis is part of advanced analysis and is not included in basic mode.",
      plannedInputs: [
        "Shopify theme ZIP upload",
        "GitHub repository URL",
        "Targeted snippet input",
      ],
    },
  };
}

async function runBasicAnalysisPipeline(record: AnalysisRecord): Promise<void> {
  try {
    updateQueuedStage(record, "synthesis", 65);

    const result = await runBasicHeuristicAnalysis({
      storeUrl: record.storeUrl,
      goal: record.goal,
    });

    const done = buildDoneResponse({
      analysisId: record.id,
      servedFromCache: false,
      result,
      artifactsReady: {
        renderedPages: false,
        visualReview: false,
        lighthouse: false,
        synthesis: true,
      },
    });

    record.response = done;

    await writeCachedAnalysis({
      analysisId: record.id,
      storeUrl: record.storeUrl,
      goal: record.goal,
      analysisProfile: record.analysisProfile,
      result,
    });
  } catch (error) {
    const message =
      error instanceof AnalyzerInputError
        ? error.message
        : "We could not complete this analysis run. Please try again.";

    const artifactsReady =
      record.response.status === "queued"
        ? record.response.artifactsReady
        : defaultArtifactsReady();
    record.response = buildErrorResponse({
      analysisId: record.id,
      message,
      artifactsReady,
    });
  }
}

export async function queueAnalysis(input: AnalyzeRequest): Promise<AnalyzeQueueResponse> {
  const normalizedUrl = normalizeStoreUrl(input.storeUrl ?? "");

  if (!normalizedUrl || !isValidUrl(normalizedUrl)) {
    throw new AnalyzerInputError(
      "Enter a valid Shopify store URL (for example: yourstore.myshopify.com).",
      400,
    );
  }

  const goal = toGoal(input.goal);
  const analysisProfile = toAnalysisProfile(input.analysisProfile);

  if (!input.forceFresh) {
    const cached = await readFreshCachedAnalysis({
      storeUrl: normalizedUrl,
      goal,
      analysisProfile,
    });

    if (cached) {
      const done = buildDoneResponse({
        analysisId: cached.analysisId,
        servedFromCache: true,
        cachedAt: cached.createdAt,
        result: cached.result,
      });

      getStores().analysisStore.set(cached.analysisId, {
        id: cached.analysisId,
        storeUrl: normalizedUrl,
        goal,
        analysisProfile,
        createdAt: Date.now(),
        response: done,
      });

      return done;
    }
  }

  const analysisId = randomUUID();
  const queued = buildQueuedResponse({
    analysisId,
    stage: "queued",
    progress: 8,
  });

  const record: AnalysisRecord = {
    id: analysisId,
    storeUrl: normalizedUrl,
    goal,
    analysisProfile,
    createdAt: Date.now(),
    response: queued,
  };

  getStores().analysisStore.set(analysisId, record);
  if (analysisProfile === "advanced") {
    void runAnalysisPipeline(record);
  } else {
    void runBasicAnalysisPipeline(record);
  }

  return queued;
}

export function getAnalysis(analysisId: string): AnalyzeQueueResponse | null {
  const record = getStores().analysisStore.get(analysisId);
  if (!record) {
    return null;
  }

  return record.response;
}

export function captureAnalysisEmail(input: { analysisId: string; email: string }): void {
  const normalizedEmail = input.email.trim().toLowerCase();
  if (!emailPattern.test(normalizedEmail)) {
    throw new AnalyzerInputError("Enter a valid email so we can send your action plan.");
  }

  const record = getStores().analysisStore.get(input.analysisId);
  if (!record || record.response.status !== "done") {
    throw new AnalyzerInputError("Analyze your store first, then request the email action plan.");
  }

  getStores().emailCaptures.push({
    analysisId: input.analysisId,
    email: normalizedEmail,
    createdAt: new Date().toISOString(),
  });
}
