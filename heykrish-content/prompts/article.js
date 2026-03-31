export function buildArticlePrompt(article, brief) {
  return `Write the full article using this brief:

${JSON.stringify(brief, null, 2)}

Output clean Markdown only. Start with the H1. No preamble.`;
}
