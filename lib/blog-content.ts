import fs from "node:fs";
import path from "node:path";

export type BlogPostFrontmatter = {
  author?: {
    name: string;
    role: string;
    linkedin: string;
    avatar?: string;
  };
  title: string;
  seoTitle?: string;
  description: string;
  slug: string;
  focusKeyword: string;
  secondaryKeywords: string[];
  pillar: number;
  pillarType: string;
  priority: "high" | "medium" | "low";
  publishedAt: string;
  updatedAt: string;
};

export type BlogPost = {
  frontmatter: BlogPostFrontmatter;
  content: string;
  readTimeMinutes: number;
  sectionHeadings: string[];
};

type SitemapBlogEntry = {
  slug: string;
  updatedAt: string;
};

const BLOG_CONTENT_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 220;

function estimateReadTimeMinutes(markdown: string): number {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/[#>*_\-\[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = text ? text.split(" ").length : 0;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

function extractSectionHeadings(markdown: string): string[] {
  const headings: string[] = [];
  const lines = markdown.split("\n");
  let inCodeFence = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const match = /^(##|###)\s+(.+)$/.exec(trimmed);
    if (!match) {
      continue;
    }

    const headingText = match[2]
      .replace(/[`*_~]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (!headingText) {
      continue;
    }

    headings.push(headingText);
  }

  return headings;
}

function extractFrontmatter(raw: string): { frontmatter: BlogPostFrontmatter; body: string } {
  if (!raw.startsWith("---\n")) {
    throw new Error("Blog file is missing frontmatter delimiter");
  }

  const endDelimiter = raw.indexOf("\n---\n", 4);
  if (endDelimiter === -1) {
    throw new Error("Blog file frontmatter is not closed");
  }

  const frontmatterRaw = raw.slice(4, endDelimiter).trim();
  const body = raw.slice(endDelimiter + 5).trim();

  const parsed = JSON.parse(frontmatterRaw) as BlogPostFrontmatter;
  return { frontmatter: parsed, body };
}

function sortByPublishedDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    return (
      new Date(b.frontmatter.publishedAt).getTime() - new Date(a.frontmatter.publishedAt).getTime()
    );
  });
}

function readBlogPostsFromDisk(): BlogPost[] {
  if (!fs.existsSync(BLOG_CONTENT_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_CONTENT_DIR).filter((file) => file.endsWith(".md"));

  const posts = files.map((fileName) => {
    const fullPath = path.join(BLOG_CONTENT_DIR, fileName);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { frontmatter, body } = extractFrontmatter(raw);

    return {
      frontmatter: {
        ...frontmatter,
        slug: frontmatter.slug || fileName.replace(/\.md$/, ""),
      },
      content: body,
      readTimeMinutes: estimateReadTimeMinutes(body),
      sectionHeadings: extractSectionHeadings(body),
    };
  });

  return sortByPublishedDateDesc(posts);
}

export function getAllBlogPosts(): BlogPost[] {
  return readBlogPostsFromDisk();
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = readBlogPostsFromDisk();
  return posts.find((post) => post.frontmatter.slug === slug) ?? null;
}

export function getBlogSitemapEntries(): SitemapBlogEntry[] {
  return readBlogPostsFromDisk().map((post) => ({
    slug: post.frontmatter.slug,
    updatedAt: post.frontmatter.updatedAt ?? post.frontmatter.publishedAt,
  }));
}
