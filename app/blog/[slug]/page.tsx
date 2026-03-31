import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { PageContainer } from "@/components/layout/PageContainer";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog-content";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/seo/metadata";
import { createArticleStructuredData, serializeJsonLd } from "@/seo/structured-data";
import { toAbsoluteUrl } from "@/lib/url";

import styles from "./BlogPostPage.module.css";

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

type TocSection = {
  id: string;
  text: string;
  children: Array<{
    id: string;
    text: string;
  }>;
};

const TOC_EXCLUDED_HEADINGS = [/^table of contents$/i, /^read more$/i, /^sources$/i, /^related guides$/i];

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map((item) => getNodeText(item)).join("");
  }

  if (isValidElement(node)) {
    return getNodeText(node.props.children as ReactNode);
  }

  return "";
}

function stripMarkdownFormatting(value: string): string {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function toHeadingId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function extractTocItems(markdown: string): TocItem[] {
  const items: TocItem[] = [];
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

    const level = match[1] === "##" ? 2 : 3;
    const text = stripMarkdownFormatting(match[2]);

    if (!text || TOC_EXCLUDED_HEADINGS.some((pattern) => pattern.test(text))) {
      continue;
    }

    items.push({
      id: toHeadingId(text),
      text,
      level
    });
  }

  return items;
}

function groupTocItems(items: TocItem[]): TocSection[] {
  const sections: TocSection[] = [];
  let currentSection: TocSection | null = null;

  for (const item of items) {
    if (item.level === 2) {
      currentSection = {
        id: item.id,
        text: item.text,
        children: []
      };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection) {
      continue;
    }

    currentSection.children.push({
      id: item.id,
      text: item.text
    });
  }

  return sections;
}

function formatDate(value: string): string {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

function formatReadTime(value: number): string {
  return `${value} min read`;
}

function toUniqueKeywords(values: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) {
      continue;
    }

    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(trimmed);
  }

  return unique;
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.frontmatter.slug
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return createPageMetadata({
      title: "Not Found",
      path: `/blog/${params.slug}`,
      noIndex: true
    });
  }

  return createPageMetadata({
    title: post.frontmatter.seoTitle ?? post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blog/${post.frontmatter.slug}`
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const tocItems = extractTocItems(post.content);
  const tocSections = groupTocItems(tocItems);
  const articleKeywords = toUniqueKeywords([
    post.frontmatter.focusKeyword,
    ...post.frontmatter.secondaryKeywords,
    ...post.sectionHeadings
  ]).slice(0, 24);

  const articleJsonLd = createArticleStructuredData({
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    url: toAbsoluteUrl(`/blog/${post.frontmatter.slug}`, siteConfig.url),
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.updatedAt,
    keywords: articleKeywords
  });

  return (
    <main className={styles.page}>
      <PageContainer>
        <article className={styles.article}>
          <header className={styles.hero}>
            <p className={styles.meta}>
              <span>{formatDate(post.frontmatter.publishedAt)}</span>
              <span>•</span>
              <span>{formatReadTime(post.readTimeMinutes)}</span>
              <span>•</span>
              <span>Pillar {post.frontmatter.pillar}</span>
            </p>
            <h1>{post.frontmatter.title}</h1>
            <p className={styles.description}>{post.frontmatter.description}</p>
            <div className={styles.heroTags}>
              <span className={styles.tag}>{post.frontmatter.focusKeyword}</span>
              <span className={styles.tag}>{post.frontmatter.priority}</span>
            </div>
          </header>

          <div className={styles.layoutGrid}>
            <div className={styles.mainColumn}>
              {tocSections.length > 0 ? (
                <section className={styles.mobileToc} aria-label="On this page">
                  <h2>On this page</h2>
                  <ol className={styles.tocList}>
                    {tocSections.map((section, sectionIndex) => (
                      <li className={styles.tocSectionItem} key={section.id}>
                        <a href={`#${section.id}`}>
                          <span className={styles.tocNumber}>{sectionIndex + 1}.</span>
                          <span>{section.text}</span>
                        </a>
                        {section.children.length > 0 ? (
                          <ol className={styles.tocSubList}>
                            {section.children.map((child, childIndex) => (
                              <li className={styles.tocSubItem} key={child.id}>
                                <a href={`#${child.id}`}>
                                  <span className={styles.tocNumber}>
                                    {sectionIndex + 1}.{childIndex + 1}
                                  </span>
                                  <span>{child.text}</span>
                                </a>
                              </li>
                            ))}
                          </ol>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              <div className={styles.content}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children, ...props }) => {
                      const id = toHeadingId(getNodeText(children));
                      return (
                        <h2 id={id} {...props}>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ children, ...props }) => {
                      const id = toHeadingId(getNodeText(children));
                      return (
                        <h3 id={id} {...props}>
                          {children}
                        </h3>
                      );
                    },
                    h4: ({ children, ...props }) => {
                      const id = toHeadingId(getNodeText(children));
                      return (
                        <h4 id={id} {...props}>
                          {children}
                        </h4>
                      );
                    },
                    a: ({ href = "", children, ...props }) => {
                      const isExternal = /^https?:\/\//i.test(href);

                      return (
                        <a
                          {...props}
                          href={href}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          target={isExternal ? "_blank" : undefined}
                        >
                          {children}
                        </a>
                      );
                    }
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              <section className={styles.ctaStack} aria-label="Blog CTA">
                <article className={styles.ctaCard}>
                  <h2>Analyze My Website</h2>
                  <p>Share your store URL and we&apos;ll review execution bottlenecks impacting conversion.</p>
                  <Link className={styles.ctaButton} href="/contact?intent=analyze&source=blog">
                    Analyze My Website
                  </Link>
                </article>

                <article className={styles.ctaCard}>
                  <h2>Ready to operationalize AI influence and execution?</h2>
                  <p>Book a quick walkthrough tailored to your Shopify backlog and growth priorities.</p>
                  <Link className={styles.ctaButton} href="/contact?intent=demo&source=blog">
                    Book a Demo
                  </Link>
                </article>
              </section>

              <footer className={styles.footer}>
                <Link href="/blog">Back to Blog</Link>
              </footer>
            </div>

            <aside className={styles.rail} aria-label="Article navigation and metadata">
              <div className={styles.stickyRail}>
                {tocSections.length > 0 ? (
                  <section className={styles.tocCard}>
                    <h2>On this page</h2>
                    <ol className={styles.tocList}>
                      {tocSections.map((section, sectionIndex) => (
                        <li className={styles.tocSectionItem} key={section.id}>
                          <a href={`#${section.id}`}>
                            <span className={styles.tocNumber}>{sectionIndex + 1}.</span>
                            <span>{section.text}</span>
                          </a>
                          {section.children.length > 0 ? (
                            <ol className={styles.tocSubList}>
                              {section.children.map((child, childIndex) => (
                                <li className={styles.tocSubItem} key={child.id}>
                                  <a href={`#${child.id}`}>
                                    <span className={styles.tocNumber}>
                                      {sectionIndex + 1}.{childIndex + 1}
                                    </span>
                                    <span>{child.text}</span>
                                  </a>
                                </li>
                              ))}
                            </ol>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                  </section>
                ) : null}

                <section className={styles.factsCard}>
                  <h2>Article details</h2>
                  <dl>
                    <div>
                      <dt>Published</dt>
                      <dd>{formatDate(post.frontmatter.publishedAt)}</dd>
                    </div>
                    <div>
                      <dt>Reading time</dt>
                      <dd>{formatReadTime(post.readTimeMinutes)}</dd>
                    </div>
                    <div>
                      <dt>Pillar</dt>
                      <dd>
                        {post.frontmatter.pillar} · {post.frontmatter.pillarType}
                      </dd>
                    </div>
                    <div>
                      <dt>Priority</dt>
                      <dd>{post.frontmatter.priority}</dd>
                    </div>
                  </dl>
                </section>
              </div>
            </aside>
          </div>
        </article>
      </PageContainer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
    </main>
  );
}
