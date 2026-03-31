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

type ChartType = "bar" | "line" | "area";

type ChartSeries = {
  key: string;
  label: string;
  color: string;
};

type ChartDataPoint = Record<string, string | number>;

type ChartPayload = {
  title: string;
  type: ChartType;
  xKey: string;
  series: ChartSeries[];
  data: ChartDataPoint[];
  source: string;
};

const TOC_EXCLUDED_HEADINGS = [
  /^table of contents$/i,
  /^read more$/i,
  /^sources$/i,
  /^related guides$/i,
];
const CHART_COLORS = ["#4e58d8", "#2d8cff", "#00a3a3", "#f59e0b", "#ef4444"];

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
      level,
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
        children: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (!currentSection) {
      continue;
    }

    currentSection.children.push({
      id: item.id,
      text: item.text,
    });
  }

  return sections;
}

function formatDate(value: string): string {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
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

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function toNumber(value: string | number | undefined): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function parseChartPayload(raw: string): ChartPayload | null {
  try {
    const parsed = JSON.parse(raw) as {
      title?: unknown;
      type?: unknown;
      xKey?: unknown;
      series?: unknown;
      data?: unknown;
      source?: unknown;
    };

    if (
      typeof parsed.title !== "string" ||
      !["bar", "line", "area"].includes(String(parsed.type)) ||
      typeof parsed.xKey !== "string" ||
      !Array.isArray(parsed.series) ||
      !Array.isArray(parsed.data) ||
      typeof parsed.source !== "string"
    ) {
      return null;
    }

    if (!isValidHttpUrl(parsed.source)) {
      return null;
    }

    const series = parsed.series
      .map((entry, index) => {
        if (typeof entry === "string" && entry.trim()) {
          return {
            key: entry,
            label: entry,
            color: CHART_COLORS[index % CHART_COLORS.length],
          };
        }

        if (
          entry &&
          typeof entry === "object" &&
          typeof (entry as { key?: unknown }).key === "string" &&
          (entry as { key?: string }).key?.trim()
        ) {
          const item = entry as { key: string; label?: string; color?: string };
          return {
            key: item.key,
            label: typeof item.label === "string" && item.label.trim() ? item.label : item.key,
            color:
              typeof item.color === "string" && item.color.trim()
                ? item.color
                : CHART_COLORS[index % CHART_COLORS.length],
          };
        }

        return null;
      })
      .filter((item): item is ChartSeries => item !== null);

    const data = parsed.data.filter(
      (item): item is ChartDataPoint =>
        item !== null && typeof item === "object" && !Array.isArray(item),
    );

    if (series.length === 0 || data.length === 0) {
      return null;
    }

    const hasValues = data.some((row) =>
      series.some(
        (seriesItem) => toNumber(row[seriesItem.key] as string | number | undefined) !== null,
      ),
    );
    if (!hasValues) {
      return null;
    }

    return {
      title: parsed.title.trim(),
      type: parsed.type as ChartType,
      xKey: parsed.xKey.trim(),
      series,
      data,
      source: parsed.source,
    };
  } catch {
    return null;
  }
}

function buildLinePath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) {
    return "";
  }

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join(" ");
}

function buildAreaPath(points: Array<{ x: number; y: number }>, baseline: number): string {
  if (points.length === 0) {
    return "";
  }

  const linePath = buildLinePath(points);
  const first = points[0];
  const last = points[points.length - 1];
  return `${linePath} L${last.x.toFixed(2)} ${baseline.toFixed(2)} L${first.x.toFixed(2)} ${baseline.toFixed(2)} Z`;
}

function renderChart(chart: ChartPayload) {
  const width = 640;
  const height = 320;
  const padding = { top: 24, right: 16, bottom: 46, left: 44 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const xLabelCount = Math.max(1, chart.data.length - 1);

  const numericValues = chart.data.flatMap((row) =>
    chart.series
      .map((series) => toNumber(row[series.key] as string | number | undefined))
      .filter((value): value is number => value !== null),
  );

  const maxValue = Math.max(1, ...numericValues);

  const xPositions = chart.data.map(
    (_, index) => padding.left + (index / xLabelCount) * chartWidth,
  );
  const yFromValue = (value: number) =>
    padding.top + chartHeight - (value / maxValue) * chartHeight;

  const basePlot = (
    <>
      <line
        x1={padding.left}
        y1={padding.top + chartHeight}
        x2={padding.left + chartWidth}
        y2={padding.top + chartHeight}
        stroke="color-mix(in srgb, var(--color-text-muted) 50%, transparent)"
      />
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={padding.top + chartHeight}
        stroke="color-mix(in srgb, var(--color-text-muted) 50%, transparent)"
      />
      {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
        const y = padding.top + chartHeight - chartHeight * ratio;
        const label = Math.round(maxValue * ratio);
        return (
          <g key={ratio}>
            <line
              x1={padding.left}
              y1={y}
              x2={padding.left + chartWidth}
              y2={y}
              stroke="color-mix(in srgb, var(--color-border) 70%, transparent)"
              strokeDasharray="3 4"
            />
            <text
              x={padding.left - 8}
              y={y + 4}
              textAnchor="end"
              fontSize="11"
              fill="var(--color-text-muted)"
            >
              {label}
            </text>
          </g>
        );
      })}
      {chart.data.map((datum, index) => {
        const x = xPositions[index];
        const labelValue = String(datum[chart.xKey] ?? index + 1);
        return (
          <text
            key={`${labelValue}-${index}`}
            x={x}
            y={padding.top + chartHeight + 18}
            textAnchor="middle"
            fontSize="11"
            fill="var(--color-text-muted)"
          >
            {labelValue}
          </text>
        );
      })}
    </>
  );

  const bars =
    chart.type === "bar"
      ? chart.series.map((series, seriesIndex) => {
          const barGroupWidth = chartWidth / chart.data.length;
          const barWidth = Math.max(8, (barGroupWidth * 0.75) / chart.series.length);
          const groupOffset = ((chart.series.length - 1) * barWidth) / 2;

          return chart.data.map((datum, index) => {
            const value = toNumber(datum[series.key] as string | number | undefined);
            if (value === null) {
              return null;
            }

            const x = xPositions[index] - groupOffset + seriesIndex * barWidth;
            const y = yFromValue(value);
            const barHeight = padding.top + chartHeight - y;
            return (
              <rect
                key={`${series.key}-${index}`}
                x={x}
                y={y}
                width={barWidth - 2}
                height={barHeight}
                fill={series.color ?? CHART_COLORS[seriesIndex % CHART_COLORS.length]}
                rx="2"
              />
            );
          });
        })
      : null;

  const lineOrArea =
    chart.type === "line" || chart.type === "area"
      ? chart.series.map((series, seriesIndex) => {
          const points = chart.data
            .map((datum, index) => {
              const value = toNumber(datum[series.key] as string | number | undefined);
              if (value === null) {
                return null;
              }

              return { x: xPositions[index], y: yFromValue(value) };
            })
            .filter((point): point is { x: number; y: number } => point !== null);

          if (points.length === 0) {
            return null;
          }

          const color = series.color ?? CHART_COLORS[seriesIndex % CHART_COLORS.length];
          const linePath = buildLinePath(points);

          return (
            <g key={series.key}>
              {chart.type === "area" ? (
                <path
                  d={buildAreaPath(points, padding.top + chartHeight)}
                  fill={color}
                  opacity={0.2}
                />
              ) : null}
              <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" />
              {points.map((point, index) => (
                <circle
                  key={`${series.key}-pt-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill={color}
                />
              ))}
            </g>
          );
        })
      : null;

  return (
    <figure className={styles.chartFigure}>
      <figcaption>{chart.title}</figcaption>
      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={chart.title}
      >
        {basePlot}
        {bars}
        {lineOrArea}
      </svg>
      <div className={styles.chartLegend}>
        {chart.series.map((series, index) => (
          <span key={series.key}>
            <i
              style={{
                backgroundColor: series.color ?? CHART_COLORS[index % CHART_COLORS.length],
              }}
            />
            {series.label}
          </span>
        ))}
      </div>
      <p className={styles.chartSource}>
        Source:{" "}
        <a href={chart.source} target="_blank" rel="noopener noreferrer">
          {chart.source}
        </a>
      </p>
    </figure>
  );
}

function renderExpandable(content: ReactNode, label: string) {
  return (
    <details className={styles.expandDetails}>
      <summary>{label}</summary>
      <div className={styles.expandBody}>{content}</div>
    </details>
  );
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({
    slug: post.frontmatter.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return createPageMetadata({
      title: "Not Found",
      path: `/blog/${params.slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: post.frontmatter.seoTitle ?? post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/blog/${post.frontmatter.slug}`,
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
    ...post.sectionHeadings,
  ]).slice(0, 24);

  const articleJsonLd = createArticleStructuredData({
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    url: toAbsoluteUrl(`/blog/${post.frontmatter.slug}`, siteConfig.url),
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.updatedAt,
    keywords: articleKeywords,
  });

  let renderedTableCount = 0;
  let renderedChartCount = 0;

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
            {post.frontmatter.author ? (
              <section className={styles.authorCard} aria-label="Author">
                <p className={styles.authorName}>{post.frontmatter.author.name}</p>
                <p className={styles.authorRole}>{post.frontmatter.author.role}</p>
                <a
                  className={styles.authorLink}
                  href={post.frontmatter.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </section>
            ) : null}
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
                    },
                    table: ({ children, ...props }) => {
                      renderedTableCount += 1;
                      const tableNode = (
                        <div className={styles.tableScroll}>
                          <table {...props}>{children}</table>
                        </div>
                      );

                      if (renderedTableCount === 1) {
                        return renderExpandable(tableNode, "Expand view");
                      }

                      return tableNode;
                    },
                    pre: ({ children, ...props }) => {
                      const firstChild = Array.isArray(children) ? children[0] : children;
                      if (
                        isValidElement(firstChild) &&
                        (firstChild.props as { "data-chart-block"?: string })?.[
                          "data-chart-block"
                        ] === "true"
                      ) {
                        return <>{children}</>;
                      }

                      return <pre {...props}>{children}</pre>;
                    },
                    code: ({ className, children, ...props }) => {
                      const language = /language-([\w-]+)/
                        .exec(className ?? "")?.[1]
                        ?.toLowerCase();
                      const rawValue = String(children).replace(/\n$/, "");

                      if (language === "chart") {
                        const parsedChart = parseChartPayload(rawValue);
                        if (!parsedChart) {
                          return (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        }

                        renderedChartCount += 1;
                        const chartNode = (
                          <div data-chart-block="true" className={styles.chartBlock}>
                            {renderChart(parsedChart)}
                          </div>
                        );

                        if (renderedChartCount === 1) {
                          return (
                            <div data-chart-block="true" className={styles.chartBlock}>
                              {renderExpandable(chartNode, "Expand view")}
                            </div>
                          );
                        }

                        return chartNode;
                      }

                      return (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              <section className={styles.ctaStack} aria-label="Blog CTA">
                <article className={styles.ctaCard}>
                  <h2>Analyze My Website</h2>
                  <p>
                    Share your store URL and we&apos;ll review execution bottlenecks impacting
                    conversion.
                  </p>
                  <Link className={styles.ctaButton} href="/contact?intent=analyze&source=blog">
                    Analyze My Website
                  </Link>
                </article>

                <article className={styles.ctaCard}>
                  <h2>Ready to operationalize AI influence and execution?</h2>
                  <p>
                    Book a quick walkthrough tailored to your Shopify backlog and growth priorities.
                  </p>
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
                    {post.frontmatter.author ? (
                      <div>
                        <dt>Author</dt>
                        <dd>{post.frontmatter.author.name}</dd>
                      </div>
                    ) : null}
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
