import Link from "next/link";

import { PageContainer } from "@/components/layout/PageContainer";
import { getAllBlogPosts, getPillarLabel } from "@/lib/blog-content";
import { createPageMetadata } from "@/seo/metadata";

import styles from "./BlogIndexPage.module.css";

type BlogIndexPageProps = {
  searchParams?: {
    pillar?: string;
  };
};

const PILLAR_FILTERS = [
  { label: "All", value: null as number | null },
  { label: getPillarLabel(1), value: 1 },
  { label: getPillarLabel(2), value: 2 },
  { label: getPillarLabel(3), value: 3 },
  { label: getPillarLabel(4), value: 4 },
];

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Read practical Shopify execution guides, troubleshooting breakdowns, and cost-focused articles for operators and DTC teams.",
  path: "/blog",
});

function formatDate(value: string): string {
  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function parsePillarFilter(value?: string): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed < 1 || parsed > 4) {
    return null;
  }

  return parsed;
}

export default function BlogIndexPage({ searchParams }: BlogIndexPageProps) {
  const posts = getAllBlogPosts();
  const selectedPillar = parsePillarFilter(searchParams?.pillar);

  const filteredPosts =
    selectedPillar === null
      ? posts
      : posts.filter((post) => post.frontmatter.pillar === selectedPillar);

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <main className={styles.page}>
      <PageContainer>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>Blog</p>
          <h1 className={styles.title}>Shopify execution insights for operators</h1>
          <p className={styles.description}>
            Tactical breakdowns for teams that want predictable shipping velocity, clean execution
            quality, and higher conversion outcomes.
          </p>
          <p className={styles.countLabel}>
            Showing {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}
            {selectedPillar ? ` in ${getPillarLabel(selectedPillar)}` : ""}
          </p>
        </header>

        <nav aria-label="Filter blog articles by topic" className={styles.filters}>
          {PILLAR_FILTERS.map((filter) => {
            const isActive = selectedPillar === filter.value;
            const href = filter.value === null ? "/blog" : `/blog?pillar=${filter.value}`;

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={`${styles.filterChip} ${isActive ? styles.filterChipActive : ""}`}
                href={href}
                key={filter.label}
              >
                {filter.label}
              </Link>
            );
          })}
        </nav>

        {filteredPosts.length === 0 ? (
          <section className={styles.emptyState}>
            <h2>No published blog articles in this filter yet</h2>
            <p>Try another topic filter or check back after the next daily publish cycle.</p>
          </section>
        ) : (
          <>
            {featuredPost ? (
              <section className={styles.featuredSection} aria-label="Featured article">
                <article className={styles.featuredCard}>
                  <p className={styles.meta}>
                    <span>{formatDate(featuredPost.frontmatter.publishedAt)}</span>
                    <span>•</span>
                    <span>{featuredPost.readTimeMinutes} min read</span>
                    <span>•</span>
                    <span>{getPillarLabel(featuredPost.frontmatter.pillar)}</span>
                  </p>
                  <h2 className={styles.featuredTitle}>
                    <Link href={`/blog/${featuredPost.frontmatter.slug}`}>
                      {featuredPost.frontmatter.title}
                    </Link>
                  </h2>
                  <p className={styles.featuredDescription}>
                    {featuredPost.frontmatter.description}
                  </p>
                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>{featuredPost.frontmatter.focusKeyword}</span>
                    <span className={styles.badge}>{featuredPost.frontmatter.priority}</span>
                  </div>
                  <Link className={styles.readLink} href={`/blog/${featuredPost.frontmatter.slug}`}>
                    Read featured article
                  </Link>
                </article>
              </section>
            ) : null}

            <section aria-label="Blog article list" className={styles.grid}>
              {remainingPosts.map((post) => (
                <article className={styles.card} key={post.frontmatter.slug}>
                  <p className={styles.meta}>
                    <span>{formatDate(post.frontmatter.publishedAt)}</span>
                    <span>•</span>
                    <span>{post.readTimeMinutes} min read</span>
                  </p>
                  <h3 className={styles.cardTitle}>
                    <Link href={`/blog/${post.frontmatter.slug}`}>{post.frontmatter.title}</Link>
                  </h3>
                  <p className={styles.cardDescription}>{post.frontmatter.description}</p>
                  <div className={styles.badgeRow}>
                    <span className={styles.badge}>{getPillarLabel(post.frontmatter.pillar)}</span>
                    <span className={styles.badge}>{post.frontmatter.focusKeyword}</span>
                  </div>
                  <Link className={styles.readLink} href={`/blog/${post.frontmatter.slug}`}>
                    Read article
                  </Link>
                </article>
              ))}
            </section>
          </>
        )}
      </PageContainer>
    </main>
  );
}
