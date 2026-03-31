# SEO_RULES.md

## Purpose
Defines non-negotiable SEO standards for all Krish. website pages and content additions.

## Copywriting Standard
Use direct, practical language for Shopify operators and founders. Favor clarity over cleverness.

## Metadata Rules
- Every indexable page must define metadata via shared helper (`createPageMetadata`).
- Every page must have a canonical URL.
- Titles must be unique, descriptive, and aligned with search intent.
- Descriptions should be concise and human-readable.
- Open Graph and Twitter metadata should be present via shared defaults/helpers.

## Title Rules
- Format: `<Page-Specific Title> | Krish.`.
- Keep titles concise and intent-focused.
- Avoid duplicate titles across routes.

## URL Structure Standards
- Use lowercase kebab-case paths.
- Keep URLs short and semantic.
- Avoid query-parameter dependent canonical content when possible.
- Content hubs should map to stable route segments (`/blog`, `/guides`, `/compare`).

## Heading Hierarchy
- Exactly one logical `<h1>` per page.
- Use heading levels in order (`h2` under `h1`, etc.).
- Headings must reflect user intent and page structure, not just styling.

## Internal Linking Rules
- Add contextual links to related product, use-case, blog, and guide pages.
- Use descriptive anchor text (avoid generic "click here").
- Prefer crawlable links (`<a>` / `next/link`) over JS-only navigation.

## Structured Data Rules
- Use schema markup where applicable through centralized helpers in `seo/structured-data.ts`.
- Keep schema accurate to visible page content.
- Avoid adding unsupported or misleading schema types.

## Indexing and Crawl Rules
- Robots policy is generated through shared helper (`seo/robots.ts`).
- Sitemap entries are generated through shared helper (`seo/sitemap.ts`).
- Non-indexable pages must explicitly set `noIndex` metadata.

## Content Quality Baseline
- Prioritize clarity and intent-match for Shopify founders/operators.
- Avoid thin pages with minimal unique value.
- Keep topical depth and internal linking consistent with the site information architecture.
- Use direct language and concrete examples over abstract marketing claims.
- Ensure copy answers operator-focused questions quickly.

## Enforcement
Any new route/content template should include an SEO checklist in implementation notes:
1. Metadata present
2. Canonical set
3. Heading hierarchy valid
4. Internal links added
5. Structured data considered
6. Sitemap/robots impact reviewed
7. Copy reviewed for clarity, intent-match, and ICP relevance
