# seo-architecture.md

## Purpose
Explains how SEO is implemented technically across the Krish. website and how pages should consume shared SEO utilities.

## SEO Layers
1. Global defaults (`config/metadata.ts`)
2. Reusable metadata factory (`seo/metadata.ts`)
3. Structured data builders (`seo/structured-data.ts`)
4. Crawling/indexing builders (`seo/sitemap.ts`, `seo/robots.ts`)
5. Next.js App Router adapters (`app/sitemap.ts`, `app/robots.ts`)

## Metadata System
Primary helper:
- `createPageMetadata(...)` from `seo/metadata.ts`

Supported fields:
- `title`
- `description`
- `path` (used for canonical URL)
- `noIndex`
- `openGraphImage`

Built outputs:
- Canonical URL via `alternates.canonical`
- Open Graph metadata
- Twitter card metadata
- Optional noindex robots directives

### Title Format Rules
- Homepage title: `Krish. — Shopify development execution`
- Other pages: `Page Title | Krish.`

Implementation notes:
- Homepage title is enforced by route path (`/`).
- Title formatting logic is centralized in `seo/metadata.ts`.

## App Router Integration
Page-level usage pattern:

```ts
import { createPageMetadata } from "@/seo/metadata";

export const metadata = createPageMetadata({
  title: "Product",
  path: "/product"
});
```

Global defaults:
- `app/layout.tsx` exports `defaultMetadata` from `config/metadata.ts`.

## Structured Data System
Structured-data helpers in `seo/structured-data.ts` include:
- `createOrganizationStructuredData(...)`
- `createWebSiteStructuredData(...)`
- `createBreadcrumbListStructuredData(...)`
- `serializeJsonLd(...)`

Initial schema coverage:
- Organization
- WebSite
- BreadcrumbList

Planned future schema coverage (reserved):
- Article
- FAQPage
- Product

## Sitemap Generation
Central builder:
- `buildSitemap(...)` in `seo/sitemap.ts`

Includes:
- Homepage
- Core static pages
- Future blog entries
- Future guide entries

Dynamic extension pattern:
- `buildSitemap` accepts optional `blogEntries` and `guideEntries` inputs.
- Until content integration is added, fallback providers return empty arrays.
- When blog/guides content sources are implemented, connect them to these inputs or replace fallback providers.

## Robots Configuration
Central builder:
- `buildRobots()` in `seo/robots.ts`

Behavior:
- Allows indexing of public pages
- Publishes sitemap URL
- Exposes host for crawler clarity

## Canonical URL Strategy
- Canonicals are generated from `config/site.ts` base URL + page path.
- Each page should map to one stable canonical URL.

## Maintenance Rules
When SEO architecture changes:
1. Update `seo/*` builders
2. Update App Router adapters if integration changes
3. Update this document in the same task
4. Keep `SEO_RULES.md` and copywriting rules aligned with implementation behavior
