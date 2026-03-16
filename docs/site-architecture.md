# site-architecture.md

## Purpose
Defines the information architecture for the Shotgun website so navigation, SEO, and content expansion stay consistent as the site grows.

## Audience Alignment
Architecture is designed for:
- Shopify founders
- Ecommerce operators
- Growth and marketing teams
- Product managers managing Shopify stores

These users need quick paths to understand what Shotgun does, how it works, and which Shopify tasks can be handled.

## Architecture Principles
- Keep navigation shallow and predictable.
- Group pages by user intent, not internal team structure.
- Use keyword-focused URLs for SEO discoverability.
- Connect related pages through contextual internal links.
- Keep section hubs as stable entry points for future expansion.

## Top-Level Navigation
Main navigation sections:
- Product (`/product`)
- Use Cases (`/use-cases`)
- Guides (`/guides`)
- Compare (`/compare`)
- Resources (`/resources`)

Additional top-level informational routes:
- About (`/about`)
- Contact (`/contact`)
- Blog (`/blog`)
- Privacy (`/privacy`)
- Terms (`/terms`)

## Section Structure
### Product
Hub: `/product`

Primary subpages:
- `/product/how-shotgun-works`
- `/product/what-shotgun-can-do`
- `/product/pricing`

Purpose:
- Explain the service model, scope of work, and pricing clarity.

### Use Cases
Hub: `/use-cases`

Primary subpages:
- `/use-cases/shopify-theme-changes`
- `/use-cases/shopify-homepage-updates`
- `/use-cases/shopify-product-page-customization`
- `/use-cases/shopify-promotions-and-discounts`
- `/use-cases/shopify-bug-fixes`
- `/use-cases/shopify-mobile-fixes`
- `/use-cases/shopify-speed-optimization`

Purpose:
- Capture high-intent Shopify task searches and map directly to execution outcomes.

### Compare
Hub: `/compare`

Primary subpages:
- `/compare/freelancers-vs-shotgun`
- `/compare/shopify-agencies-vs-shotgun`
- `/compare/task-services-vs-shotgun`
- `/compare/storetasker-vs-shotgun`
- `/compare/taskhusky-vs-shotgun`

Purpose:
- Help operators evaluate alternatives with clear tradeoffs and execution fit.

### Guides
Hub: `/guides`

Primary subpages:
- `/guides/shopify-theme-customization`
- `/guides/shopify-homepage-optimization`
- `/guides/shopify-product-page-optimization`
- `/guides/shopify-store-speed-optimization`
- `/guides/shopify-conversion-optimization`

Purpose:
- Build long-form SEO authority and educate users who are researching implementation tactics.

### Resources
Hub: `/resources`

Primary subpages:
- `/resources/blog`
- `/resources/case-studies`
- `/resources/docs`

Purpose:
- Group editorial, proof, and product education content in one discoverable cluster.

## Navigation System
Source of truth:
- `config/navigation.ts`

Content source for route composition:
- `content/site-content.ts`

Key objects:
- `navigation.main`: top-level navbar links
- `navigation.sections`: section-level page maps for dropdowns, sidebars, and breadcrumbs
- `navigationConfig`: navbar runtime config (logo, CTA, mobile label)

Route implementation pattern:
- Hub pages use static routes (for example `/use-cases`).
- Subpages are rendered from dynamic route segments (for example `/use-cases/[slug]`) backed by content maps.

This enables consistent navigation rendering and internal linking across templates.

## Footer Structure
Source of truth:
- `config/footer.ts`

Footer groups:
- Product
- Use Cases
- Resources
- Company

Footer complements top navigation by surfacing high-value destination pages and evergreen links.

## SEO Considerations
- Logical hierarchy: section hubs -> intent-driven subpages.
- Shallow depth: key pages are within 1-2 clicks from homepage.
- Descriptive URLs: lowercase, kebab-case, keyword-based slugs.
- Internal linking: each page should link to its hub and adjacent related pages.
- Cluster strategy: use-case pages link to guides/compare pages and vice versa.

## Expansion Rules
When adding new pages:
1. Place page under the correct intent cluster (`/use-cases`, `/guides`, `/compare`, `/resources`).
2. Add links to `config/navigation.ts` (section map) when page should be discoverable in nav systems.
3. Add important evergreen links to `config/footer.ts` when relevant.
4. Ensure metadata, internal links, and sitemap coverage are updated.
5. Update this document if section strategy or hierarchy changes.
