import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Anthropic from "@anthropic-ai/sdk";
import cron from "node-cron";
import dotenv from "dotenv";

import { buildBriefPrompt } from "./prompts/brief.js";
import { buildArticlePrompt } from "./prompts/article.js";
import { ARTICLE_SYSTEM_PROMPT, BRIEF_SYSTEM_PROMPT } from "./prompts/system.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env"), quiet: true });

const ARTICLES_FILE = path.resolve(__dirname, "articles.json");
const OUTPUT_DIR = path.resolve(__dirname, process.env.OUTPUT_DIR ?? "./output");
const LOG_FILE = path.resolve(__dirname, process.env.LOG_FILE ?? "./logs/run.log");
const SITE_BLOG_DIR = path.resolve(__dirname, "../content/blog");
const CRON_SCHEDULE = process.env.CRON_SCHEDULE ?? "0 8 * * *";
const MAX_TOKENS_BRIEF = Number.parseInt(process.env.MAX_TOKENS_BRIEF ?? "2000", 10);
const MAX_TOKENS_ARTICLE = Number.parseInt(process.env.MAX_TOKENS_ARTICLE ?? "8000", 10);
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";
const MIN_INTERNAL_LINKS = 3;
const MIN_EXTERNAL_LINKS = 5;
const INLINE_LINK_EXCLUDED_H2_PATTERNS = [
  /^##\s+table of contents/i,
  /^##\s+read more/i,
  /^##\s+sources/i,
  /^##\s+related guides/i,
  /^##\s+ready to stop managing shopify tasks/i
];
const REQUIRED_ARTICLE_SECTION_PATTERNS = [
  { label: "Table of Contents", pattern: /^##\s+table of contents\s*$/im },
  { label: "FAQ", pattern: /^##\s+faq:\s+.+$/im },
  { label: "Summary", pattern: /^##\s+summary\s*$/im },
  { label: "Read more", pattern: /^##\s+read more\s*$/im },
  { label: "Sources", pattern: /^##\s+sources\s*$/im },
  { label: "Related Guides", pattern: /^##\s+related guides\s*$/im }
];
const BRIEF_TAIL_SECTION_TEMPLATES = [
  {
    key: "faq",
    buildH2: (brief) => `FAQ: ${brief?.meta?.primaryKeyword ?? "Primary topic"}`,
    intent: "Address high-intent questions in concise answers tied to the article topic."
  },
  {
    key: "summary",
    buildH2: () => "Summary",
    intent: "Summarize key takeaways and implementation priorities."
  },
  {
    key: "read_more",
    buildH2: () => "Read more",
    intent: "List internal links for deeper related reading."
  },
  {
    key: "sources",
    buildH2: () => "Sources",
    intent: "List external verified sources used in the article."
  },
  {
    key: "related_guides",
    buildH2: () => "Related Guides",
    intent: "List additional internal guides relevant to adjacent topics."
  }
];

let anthropicClient = null;
let isProcessing = false;

function getAnthropicClient() {
  if (anthropicClient) {
    return anthropicClient;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("Missing ANTHROPIC_API_KEY in environment");
  }

  anthropicClient = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
  });

  return anthropicClient;
}

async function ensureRuntimeDirs() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.mkdir(path.dirname(LOG_FILE), { recursive: true });
  await fs.mkdir(SITE_BLOG_DIR, { recursive: true });
}

async function logEvent(articleId, status, message) {
  const timestamp = new Date().toISOString();
  const id = articleId ?? "queue";
  await fs.appendFile(LOG_FILE, `${timestamp} | ${id} | ${status} | ${message}\n`, "utf8");
}

async function readArticles() {
  const raw = await fs.readFile(ARTICLES_FILE, "utf8");
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed)) {
    throw new Error("articles.json must contain an array");
  }

  return parsed;
}

async function writeArticles(articles) {
  await fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2) + "\n", "utf8");
}

function priorityRank(priority) {
  if (priority === "high") {
    return 3;
  }

  if (priority === "medium") {
    return 2;
  }

  return 1;
}

function sortQueue(articles) {
  return [...articles].sort((a, b) => {
    if (a.pillar !== b.pillar) {
      return a.pillar - b.pillar;
    }

    const priorityDelta = priorityRank(b.priority) - priorityRank(a.priority);
    if (priorityDelta !== 0) {
      return priorityDelta;
    }

    return a.id.localeCompare(b.id);
  });
}

function getNextPendingArticle(articles) {
  return sortQueue(articles).find((article) => article.status === "pending") ?? null;
}

async function updateArticle(articles, articleId, updates) {
  const index = articles.findIndex((item) => item.id === articleId);
  if (index === -1) {
    throw new Error(`Article not found: ${articleId}`);
  }

  articles[index] = {
    ...articles[index],
    ...updates,
    lastRun: new Date().toISOString()
  };

  await writeArticles(articles);
  return articles[index];
}

function extractTextResponse(contentBlocks) {
  const text = contentBlocks
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n\n")
    .trim();

  if (!text) {
    throw new Error("Claude response did not include text content");
  }

  return text;
}

async function callClaude({ articleId, system, prompt, maxTokens }) {
  const client = getAnthropicClient();

  await logEvent(articleId, "api", `Calling Anthropic model ${ANTHROPIC_MODEL}`);

  const response = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: prompt }],
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search"
      }
    ]
  });

  return extractTextResponse(response.content);
}

function extractJsonObject(raw) {
  const withoutFence = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const firstBrace = withoutFence.indexOf("{");
  const lastBrace = withoutFence.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return withoutFence;
  }

  return withoutFence.slice(firstBrace, lastBrace + 1);
}

function parseBriefJson(raw) {
  const candidate = extractJsonObject(raw);
  return JSON.parse(candidate);
}

function normalizeHeading(value = "") {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^\w\s:]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isFaqHeading(value = "") {
  return normalizeHeading(value).startsWith("faq:");
}

function isSummaryHeading(value = "") {
  return normalizeHeading(value) === "summary";
}

function isReadMoreHeading(value = "") {
  return normalizeHeading(value) === "read more";
}

function isSourcesHeading(value = "") {
  return normalizeHeading(value) === "sources";
}

function isRelatedGuidesHeading(value = "") {
  return normalizeHeading(value) === "related guides";
}

function isTailUtilityHeading(value = "") {
  return (
    isFaqHeading(value) ||
    isSummaryHeading(value) ||
    isReadMoreHeading(value) ||
    isSourcesHeading(value) ||
    isRelatedGuidesHeading(value)
  );
}

function ensureBriefCanonicalTailSections(brief) {
  const structure = brief?.structure ?? {};
  const sourceSections = Array.isArray(structure.sections) ? structure.sections : [];
  const baseSections = sourceSections.filter((section) => !isTailUtilityHeading(section?.h2 ?? ""));
  const normalizedSourceSections = sourceSections.map((section) => section ?? {});

  const tailSections = BRIEF_TAIL_SECTION_TEMPLATES.map((template) => {
    const existingSection = normalizedSourceSections.find((section) => {
      const h2 = section?.h2 ?? "";
      if (template.key === "faq") {
        return isFaqHeading(h2);
      }

      if (template.key === "summary") {
        return isSummaryHeading(h2);
      }

      if (template.key === "read_more") {
        return isReadMoreHeading(h2);
      }

      if (template.key === "sources") {
        return isSourcesHeading(h2);
      }

      return isRelatedGuidesHeading(h2);
    });

    if (existingSection) {
      return existingSection;
    }

    return {
      h2: template.buildH2(brief),
      intent: template.intent,
      eeatSignal: "trustworthiness",
      h3s: [],
      notes: "Required utility section for publishing contract."
    };
  });

  return {
    ...brief,
    structure: {
      ...structure,
      sections: [...baseSections, ...tailSections]
    }
  };
}

function uniqueLinksByUrl(links = []) {
  const seenUrls = new Set();

  return links.filter((link) => {
    const url = link?.url;
    if (!url || seenUrls.has(url)) {
      return false;
    }

    seenUrls.add(url);
    return true;
  });
}

function getBriefLinkStats(brief) {
  const internalLinks = Array.isArray(brief?.internalLinks)
    ? uniqueLinksByUrl(brief.internalLinks.filter((item) => item?.url && item?.anchor))
    : [];
  const externalLinks = Array.isArray(brief?.verifiedLinks)
    ? uniqueLinksByUrl(
        brief.verifiedLinks.filter((item) => item?.url && item?.anchor && item.type === "external")
      )
    : [];

  return {
    internal: internalLinks.length,
    external: externalLinks.length
  };
}

function assertBriefLinkMinimums(brief) {
  const linkStats = getBriefLinkStats(brief);

  if (linkStats.external < MIN_EXTERNAL_LINKS || linkStats.internal < MIN_INTERNAL_LINKS) {
    throw new Error(
      `Brief link minimums not met (external: ${linkStats.external}/${MIN_EXTERNAL_LINKS}, internal: ${linkStats.internal}/${MIN_INTERNAL_LINKS})`
    );
  }
}

function findFirstH2Index(markdown, matcher) {
  const lines = markdown.split("\n");
  let inCodeFence = false;
  let h2Index = -1;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const match = /^##\s+(.+)$/.exec(trimmed);
    if (!match) {
      continue;
    }

    h2Index += 1;
    const headingText = normalizeHeading(match[1]);

    if (matcher(headingText)) {
      return h2Index;
    }
  }

  return -1;
}

function getArticleContractIssues(markdown) {
  const missingSections = REQUIRED_ARTICLE_SECTION_PATTERNS
    .filter((section) => !section.pattern.test(markdown))
    .map((section) => section.label);

  const issues = [...missingSections];
  const tableOfContentsIndex = findFirstH2Index(markdown, (heading) => heading === "table of contents");
  const faqIndex = findFirstH2Index(markdown, (heading) => heading.startsWith("faq:"));
  const summaryIndex = findFirstH2Index(markdown, (heading) => heading === "summary");
  const readMoreIndex = findFirstH2Index(markdown, (heading) => heading === "read more");
  const sourcesIndex = findFirstH2Index(markdown, (heading) => heading === "sources");
  const relatedGuidesIndex = findFirstH2Index(markdown, (heading) => heading === "related guides");

  if (
    tableOfContentsIndex !== -1 &&
    faqIndex !== -1 &&
    summaryIndex !== -1 &&
    readMoreIndex !== -1 &&
    sourcesIndex !== -1 &&
    relatedGuidesIndex !== -1
  ) {
    const validOrder =
      faqIndex > tableOfContentsIndex &&
      summaryIndex > faqIndex &&
      readMoreIndex > summaryIndex &&
      sourcesIndex > readMoreIndex &&
      relatedGuidesIndex > sourcesIndex;

    if (!validOrder) {
      issues.push("Section order (FAQ -> Summary -> Read more -> Sources -> Related Guides)");
    }
  }

  return issues;
}

function toListMarkdown(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return "- _None_";
  }

  return items.map((item) => `- ${item}`).join("\n");
}

function toLinksMarkdown(links = []) {
  if (!Array.isArray(links) || links.length === 0) {
    return "- _None_";
  }

  return links
    .map((link) => `- [${link.anchor}](${link.url}) (${link.type}) - ${link.reason}`)
    .join("\n");
}

function toInternalLinksMarkdown(links = []) {
  if (!Array.isArray(links) || links.length === 0) {
    return "- _None_";
  }

  return links
    .map((link) => `- [${link.anchor}](${link.url}) (placed in: ${link.placedIn})`)
    .join("\n");
}

function toSectionsMarkdown(sections = []) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return "_None_";
  }

  return sections
    .map((section, index) => {
      const h3s =
        Array.isArray(section.h3s) && section.h3s.length > 0
          ? section.h3s.map((h3) => `  - ${h3}`).join("\n")
          : "  - _None_";
      return [
        `### ${index + 1}. ${section.h2}`,
        `- Intent: ${section.intent}`,
        `- EEAT Signal: ${section.eeatSignal}`,
        "- H3s:",
        h3s,
        `- Notes: ${section.notes}`
      ].join("\n");
    })
    .join("\n\n");
}

function buildBriefMarkdown(brief) {
  return `# Article Brief

## SERP Summary

### Top Content Types
${toListMarkdown(brief.serpSummary?.topContentTypes)}

### Consensus H2s
${toListMarkdown(brief.serpSummary?.consensusH2s)}

### People Also Ask
${toListMarkdown(brief.serpSummary?.peopleAlsoAsk)}

### Featured Snippet Format
${brief.serpSummary?.featuredSnippetFormat ?? ""}

### SERP Gap
${brief.serpSummary?.serpGap ?? ""}

## Metadata
- Title Tag: ${brief.meta?.titleTag ?? ""}
- Meta Description: ${brief.meta?.metaDescription ?? ""}
- Primary Keyword: ${brief.meta?.primaryKeyword ?? ""}
- Secondary Keywords: ${(brief.meta?.secondaryKeywords ?? []).join(", ")}
- Suggested Slug: ${brief.meta?.suggestedSlug ?? ""}
- Word Count Target: ${brief.meta?.wordCountTarget ?? ""}
- Featured Snippet Target: ${brief.meta?.featuredSnippetTarget ?? ""}

## Structure

### Hook
${brief.structure?.hook ?? ""}

### Sections
${toSectionsMarkdown(brief.structure?.sections)}

### CTA
- CTA H2: ${brief.structure?.ctaH2 ?? ""}
- CTA Copy: ${brief.structure?.ctaCopy ?? ""}

## Verified Links
${toLinksMarkdown(brief.verifiedLinks)}

## Internal Links
${toInternalLinksMarkdown(brief.internalLinks)}

## Tone Notes
${brief.toneNotes ?? ""}
`;
}

function sanitizeSlug(slug) {
  return slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "");
}

function isStructuralBlock(block) {
  const trimmed = block.trim();

  return (
    trimmed.startsWith("#") ||
    trimmed.startsWith(">") ||
    trimmed.startsWith("- ") ||
    trimmed.startsWith("* ") ||
    trimmed.startsWith("```") ||
    trimmed.startsWith("|") ||
    trimmed === "---" ||
    /^\d+\.\s/.test(trimmed)
  );
}

function shouldJoinParagraphs(previous, current) {
  const previousTrimmed = previous.trim();
  const currentTrimmed = current.trim();

  if (!previousTrimmed || !currentTrimmed) {
    return false;
  }

  if (isStructuralBlock(previousTrimmed) || isStructuralBlock(currentTrimmed)) {
    return false;
  }

  if (/^[,.;:)\]]/.test(currentTrimmed)) {
    return true;
  }

  if (/^(and|or|but|yet|so)\b/i.test(currentTrimmed)) {
    return true;
  }

  if (/\b(while|and|or|but|because|although|though|with|for|to|as)\s*$/i.test(previousTrimmed)) {
    return true;
  }

  const previousEndsSentence = /[.!?:]["')\]]?$/.test(previousTrimmed);
  if (!previousEndsSentence && /^[a-z0-9(]/.test(currentTrimmed)) {
    return true;
  }

  return false;
}

function normalizeProseSegment(segment) {
  const blocks = segment
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const merged = [];
  for (const block of blocks) {
    if (merged.length === 0) {
      merged.push(block);
      continue;
    }

    const previous = merged[merged.length - 1];
    if (shouldJoinParagraphs(previous, block)) {
      merged[merged.length - 1] = `${previous.replace(/\s+$/, "")} ${block.replace(/^\s+/, "")}`;
      continue;
    }

    merged.push(block);
  }

  return merged.join("\n\n").replace(/\s+([,.;:!?])/g, "$1");
}

function normalizeArticleMarkdown(markdown) {
  const segments = markdown.split(/(```[\s\S]*?```)/g);
  let output = "";

  for (const segment of segments) {
    if (!segment) {
      continue;
    }

    if (segment.startsWith("```")) {
      const fenceBlock = segment.trim();

      if (output && !output.endsWith("\n\n")) {
        output += output.endsWith("\n") ? "\n" : "\n\n";
      }

      output += fenceBlock;
      if (!output.endsWith("\n")) {
        output += "\n";
      }

      continue;
    }

    const proseBlock = normalizeProseSegment(segment);
    if (!proseBlock) {
      continue;
    }

    if (output && !output.endsWith("\n\n")) {
      output += output.endsWith("\n") ? "\n" : "\n\n";
    }

    output += proseBlock;
  }

  const normalized = output.replace(/\n{3,}/g, "\n\n").trim();
  return `${normalized}\n`;
}

function getMarkdownLinkUrls(markdown) {
  const urls = new Set();
  const linkRegex = /\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/gi;

  let match = linkRegex.exec(markdown);
  while (match) {
    urls.add(match[1]);
    match = linkRegex.exec(markdown);
  }

  return urls;
}

function getLinkStats(markdown) {
  const totalInternal = new Set();
  const totalExternal = new Set();
  const inlineInternal = new Set();
  const inlineExternal = new Set();

  const lines = markdown.split("\n");
  let inCodeFence = false;
  let currentH2Heading = "";

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    if (trimmed.startsWith("## ")) {
      currentH2Heading = trimmed;
    }

    const inExcludedSection = INLINE_LINK_EXCLUDED_H2_PATTERNS.some((pattern) =>
      pattern.test(currentH2Heading)
    );
    const linkRegex = /\[[^\]]+\]\((https?:\/\/[^)\s]+)\)/gi;
    let match = linkRegex.exec(line);

    while (match) {
      const url = match[1];
      const isInternal = url.includes("heykrish.ai");

      if (isInternal) {
        totalInternal.add(url);
        if (!inExcludedSection) {
          inlineInternal.add(url);
        }
      } else {
        totalExternal.add(url);
        if (!inExcludedSection) {
          inlineExternal.add(url);
        }
      }

      match = linkRegex.exec(line);
    }
  }

  return {
    internal: totalInternal.size,
    external: totalExternal.size,
    inlineInternal: inlineInternal.size,
    inlineExternal: inlineExternal.size
  };
}

function getInlineLinkTargetIndexes(lines) {
  const indexes = [];
  let inCodeFence = false;

  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index].trim();

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence || !trimmed.startsWith("## ")) {
      continue;
    }

    if (INLINE_LINK_EXCLUDED_H2_PATTERNS.some((pattern) => pattern.test(trimmed))) {
      continue;
    }

    indexes.push(index);
  }

  return indexes;
}

function buildInlineLinkSentence(link, type) {
  const markdownLink = `[${link.anchor}](${link.url})`;

  if (type === "external") {
    return `For deeper reference, see ${markdownLink}.`;
  }

  return `Related Krish resource: ${markdownLink}.`;
}

function injectInlineLinks(markdown, links, type, needed, existingUrls) {
  if (needed <= 0 || links.length === 0) {
    return markdown;
  }

  const lines = markdown.trimEnd().split("\n");
  const targetIndexes = getInlineLinkTargetIndexes(lines);
  if (targetIndexes.length === 0) {
    return markdown;
  }

  const candidates = links.filter((link) => !existingUrls.has(link.url)).slice(0, needed);
  if (candidates.length === 0) {
    return markdown;
  }

  const groupedInsertions = new Map();

  for (let index = 0; index < candidates.length; index += 1) {
    const targetIndex = targetIndexes[index % targetIndexes.length];
    const existingGroup = groupedInsertions.get(targetIndex) ?? [];
    existingGroup.push(candidates[index]);
    groupedInsertions.set(targetIndex, existingGroup);
  }

  const sortedTargets = [...groupedInsertions.keys()].sort((a, b) => b - a);
  for (const target of sortedTargets) {
    const linksForSection = groupedInsertions.get(target) ?? [];
    if (linksForSection.length === 0) {
      continue;
    }

    const sentence = linksForSection.map((link) => {
      existingUrls.add(link.url);
      return buildInlineLinkSentence(link, type);
    }).join(" ");

    lines.splice(target + 1, 0, "", sentence);
  }

  return `${lines.join("\n").trimEnd()}\n`;
}

function ensureLinkCoverage(markdown, brief) {
  let output = markdown.trimEnd();
  const existingUrls = getMarkdownLinkUrls(output);
  const stats = getLinkStats(output);

  const internalCandidates = Array.isArray(brief?.internalLinks)
    ? uniqueLinksByUrl(brief.internalLinks.filter((item) => item?.url && item?.anchor))
    : [];
  const externalCandidates = Array.isArray(brief?.verifiedLinks)
    ? uniqueLinksByUrl(
        brief.verifiedLinks.filter((item) => item?.url && item?.anchor && item.type === "external")
      )
    : [];

  if (stats.inlineExternal < MIN_EXTERNAL_LINKS) {
    const needed = MIN_EXTERNAL_LINKS - stats.inlineExternal;
    output = injectInlineLinks(output, externalCandidates, "external", needed, existingUrls);
  }

  const externalStatsAfterInline = getLinkStats(output);
  if (externalStatsAfterInline.inlineExternal < MIN_EXTERNAL_LINKS) {
    const needed = MIN_EXTERNAL_LINKS - externalStatsAfterInline.inlineExternal;
    const linksToAdd = externalCandidates.filter((item) => !existingUrls.has(item.url)).slice(0, needed + 2);

    if (linksToAdd.length > 0) {
      output += "\n\n## Sources\n\n";
      output += linksToAdd.map((link) => `- [${link.anchor}](${link.url})`).join("\n");

      for (const link of linksToAdd) {
        existingUrls.add(link.url);
      }
    }
  }

  const refreshedStats = getLinkStats(output);
  if (refreshedStats.inlineInternal < MIN_INTERNAL_LINKS) {
    const needed = MIN_INTERNAL_LINKS - refreshedStats.inlineInternal;
    output = injectInlineLinks(output, internalCandidates, "internal", needed, existingUrls);
  }

  const internalStatsAfterInline = getLinkStats(output);
  if (internalStatsAfterInline.inlineInternal < MIN_INTERNAL_LINKS) {
    const needed = MIN_INTERNAL_LINKS - internalStatsAfterInline.inlineInternal;
    const linksToAdd = internalCandidates.filter((item) => !existingUrls.has(item.url)).slice(0, needed + 2);

    if (linksToAdd.length > 0) {
      output += "\n\n## Read more\n\n";
      output += linksToAdd.map((link) => `- [${link.anchor}](${link.url})`).join("\n");

      for (const link of linksToAdd) {
        existingUrls.add(link.url);
      }
    }
  }

  const finalInternalStats = getLinkStats(output);
  if (finalInternalStats.inlineInternal < MIN_INTERNAL_LINKS) {
    const needed = MIN_INTERNAL_LINKS - finalInternalStats.inlineInternal;
    const linksToAdd = internalCandidates.filter((item) => !existingUrls.has(item.url)).slice(0, needed + 2);

    if (linksToAdd.length > 0) {
      output += "\n\n## Related Guides\n\n";
      output += linksToAdd.map((link) => `- [${link.anchor}](${link.url})`).join("\n");

      for (const link of linksToAdd) {
        existingUrls.add(link.url);
      }
    }
  }

  return `${output.trimEnd()}\n`;
}

function assertArticleLinkMinimums(markdown) {
  const linkStats = getLinkStats(markdown);

  if (linkStats.inlineExternal < MIN_EXTERNAL_LINKS || linkStats.inlineInternal < MIN_INTERNAL_LINKS) {
    throw new Error(
      `Article link minimums not met (inline external: ${linkStats.inlineExternal}/${MIN_EXTERNAL_LINKS}, inline internal: ${linkStats.inlineInternal}/${MIN_INTERNAL_LINKS})`
    );
  }
}

async function writeBriefFiles(article, brief) {
  const articleOutputDir = path.join(OUTPUT_DIR, sanitizeSlug(article.slug));
  await fs.mkdir(articleOutputDir, { recursive: true });

  const briefJsonPath = path.join(articleOutputDir, "brief.json");
  const briefMarkdownPath = path.join(articleOutputDir, "brief.md");

  await fs.writeFile(briefJsonPath, JSON.stringify(brief, null, 2) + "\n", "utf8");
  await fs.writeFile(briefMarkdownPath, buildBriefMarkdown(brief), "utf8");

  return articleOutputDir;
}

async function writeArticleFile(article, markdown) {
  const articleOutputDir = path.join(OUTPUT_DIR, sanitizeSlug(article.slug));
  await fs.mkdir(articleOutputDir, { recursive: true });

  const articlePath = path.join(articleOutputDir, "article.md");
  await fs.writeFile(articlePath, markdown.trim() + "\n", "utf8");

  return articlePath;
}

function buildPublishedFrontmatter(article, brief) {
  const now = new Date().toISOString();
  return {
    title: article.title,
    seoTitle: brief.meta?.titleTag ?? article.title,
    description: brief.meta?.metaDescription ?? "",
    slug: article.slug,
    focusKeyword: article.focusKeyword,
    secondaryKeywords: article.secondaryKeywords,
    pillar: article.pillar,
    pillarType: article.pillarType,
    priority: article.priority,
    publishedAt: now,
    updatedAt: now
  };
}

async function publishArticleToSite(article, brief, articleMarkdown) {
  const frontmatter = buildPublishedFrontmatter(article, brief);
  const publishedFilePath = path.join(SITE_BLOG_DIR, `${sanitizeSlug(article.slug)}.md`);

  const content = `---
${JSON.stringify(frontmatter, null, 2)}
---

${articleMarkdown.trim()}
`;
  await fs.mkdir(SITE_BLOG_DIR, { recursive: true });
  await fs.writeFile(publishedFilePath, content, "utf8");

  return publishedFilePath;
}

async function createBrief(article) {
  const basePrompt = buildBriefPrompt(article);
  let prompt = basePrompt;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const rawResponse = await callClaude({
      articleId: article.id,
      system: BRIEF_SYSTEM_PROMPT,
      prompt,
      maxTokens: MAX_TOKENS_BRIEF
    });

    try {
      const brief = ensureBriefCanonicalTailSections(parseBriefJson(rawResponse));
      assertBriefLinkMinimums(brief);
      return brief;
    } catch (error) {
      if (attempt === 2) {
        throw error;
      }

      await logEvent(article.id, "retry", `Brief validation failed: ${error.message}. Retrying once.`);
      prompt = `${basePrompt}

Your previous response failed validation: ${error.message}
Return only valid JSON (no markdown fences, no preamble).
The JSON must include at least ${MIN_EXTERNAL_LINKS} unique external links in verifiedLinks (type = "external")
and at least ${MIN_INTERNAL_LINKS} unique internal links in internalLinks.`;
    }
  }

  throw new Error("Unexpected brief generation flow");
}

async function createArticle(article, brief) {
  const basePrompt = buildArticlePrompt(article, brief);
  let prompt = basePrompt;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    const articleMarkdown = await callClaude({
      articleId: article.id,
      system: ARTICLE_SYSTEM_PROMPT,
      prompt,
      maxTokens: MAX_TOKENS_ARTICLE
    });

    const normalizedArticle = normalizeArticleMarkdown(articleMarkdown);
    const articleWithValidatedLinks = ensureLinkCoverage(normalizedArticle, brief);
    const missingSections = getArticleContractIssues(articleWithValidatedLinks);

    if (missingSections.length === 0) {
      assertArticleLinkMinimums(articleWithValidatedLinks);
      return articleWithValidatedLinks;
    }

    if (attempt === 2) {
      throw new Error(`Article contract missing sections: ${missingSections.join(", ")}`);
    }

    await logEvent(
      article.id,
      "retry",
      `Article contract missing sections (${missingSections.join(", ")}). Retrying once.`
    );

    prompt = `${basePrompt}

Your previous draft is missing required sections: ${missingSections.join(", ")}.
Regenerate the full article with the required section order and exact headings where specified.`;
  }

  throw new Error("Unexpected article generation flow");
}

async function processNextArticle() {
  const articles = await readArticles();
  const nextArticle = getNextPendingArticle(articles);

  if (!nextArticle) {
    await logEvent("queue", "idle", "Queue empty, nothing to process");
    return;
  }

  const outputPath = path.posix.join("output", sanitizeSlug(nextArticle.slug));
  await logEvent(nextArticle.id, "start", `Processing article ${nextArticle.slug}`);

  let brief = null;

  try {
    brief = await createBrief(nextArticle);
    await writeBriefFiles(nextArticle, brief);

    await updateArticle(articles, nextArticle.id, {
      status: "brief_done",
      outputPath
    });

    await logEvent(nextArticle.id, "brief_done", "Brief generated and saved");
  } catch (error) {
    await updateArticle(articles, nextArticle.id, {
      status: "error",
      outputPath
    });

    await logEvent(nextArticle.id, "error", `Brief generation failed: ${error.message}`);
    return;
  }

  try {
    const articleWithValidatedLinks = await createArticle(nextArticle, brief);
    assertArticleLinkMinimums(articleWithValidatedLinks);

    await writeArticleFile(nextArticle, articleWithValidatedLinks);
    await publishArticleToSite(nextArticle, brief, articleWithValidatedLinks);

    await updateArticle(articles, nextArticle.id, {
      status: "done",
      outputPath
    });

    await logEvent(nextArticle.id, "done", "Article generated, published, and marked complete");
  } catch (error) {
    await updateArticle(articles, nextArticle.id, {
      status: "error",
      outputPath
    });

    await logEvent(nextArticle.id, "error", `Article generation failed: ${error.message}`);
  }
}

function printStatus(articles) {
  const total = articles.length;
  const done = articles.filter((item) => item.status === "done").length;
  const pending = articles.filter((item) => item.status === "pending").length;
  const errors = articles.filter((item) => item.status === "error").length;
  const briefDone = articles.filter((item) => item.status === "brief_done").length;

  const nextThree = sortQueue(articles)
    .filter((item) => item.status === "pending")
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      pillar: item.pillar,
      priority: item.priority,
      title: item.title
    }));

  console.table([
    { metric: "total_articles", value: total },
    { metric: "done", value: done },
    { metric: "pending", value: pending },
    { metric: "brief_done", value: briefDone },
    { metric: "error", value: errors }
  ]);

  console.table(nextThree);
}

async function runCron() {
  if (!cron.validate(CRON_SCHEDULE)) {
    throw new Error(`Invalid CRON_SCHEDULE: ${CRON_SCHEDULE}`);
  }

  await ensureRuntimeDirs();
  await logEvent("queue", "cron", `Cron started with schedule ${CRON_SCHEDULE}`);

  cron.schedule(CRON_SCHEDULE, async () => {
    if (isProcessing) {
      await logEvent("queue", "skip", "Skipped run because previous run is still processing");
      return;
    }

    try {
      isProcessing = true;
      await processNextArticle();
    } catch (error) {
      await logEvent("queue", "error", `Unhandled run error: ${error.message}`);
    } finally {
      isProcessing = false;
    }
  });
}

async function main() {
  const args = new Set(process.argv.slice(2));

  if (args.has("--status")) {
    const articles = await readArticles();
    printStatus(articles);
    return;
  }

  await ensureRuntimeDirs();

  if (args.has("--once")) {
    await processNextArticle();
    return;
  }

  await runCron();
}

main().catch(async (error) => {
  try {
    await ensureRuntimeDirs();
    await logEvent("queue", "fatal", error.message);
  } catch {
    // Ignore secondary logging failures.
  }

  process.exitCode = 1;
});
