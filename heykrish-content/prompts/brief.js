export function buildBriefPrompt(article) {
  return `Generate a structured article brief for the following article:

TITLE: ${article.title}
PRIMARY KEYWORD: ${article.focusKeyword}
SECONDARY KEYWORDS: ${article.secondaryKeywords.join(", ")}
PILLAR TYPE: ${article.pillarType}
SLUG: ${article.slug}

Target reader: A Shopify store operator or DTC brand team — founder, marketing director,
or e-commerce manager — frustrated by slow or expensive Shopify development execution.

Run your SERP research, verify external links, then return the brief as valid JSON.`;
}
