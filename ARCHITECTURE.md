# ARCHITECTURE.md

## Purpose
Defines the high-level website architecture so future contributors and AI agents can make consistent changes without re-discovering design intent.

## System Overview
Krish. website is a server-rendered Next.js App Router application optimized for SEO growth and maintainability.

Core principles:
- Route-driven content architecture
- Reusable component composition
- Centralized configuration
- SEO helpers as shared infrastructure

## App Router Architecture
- `app/layout.tsx` defines global HTML shell, metadata base, global styles, navigation, breadcrumbs, and footer placeholders.
- `app/page.tsx` and nested route segment pages are page entry points.
- `app/sitemap.ts` and `app/robots.ts` expose metadata routes.

Routing strategy:
- Static top-level marketing and informational routes under `app/*`.
- Conversion flow routes:
  - `/` (homepage intent + CTA entry)
  - `/contact` (dedicated lead capture)
  - `/contact/success` (post-submit confirmation state)
- Dynamic section routes are used for scalable content clusters:
  - `app/product/[slug]/page.tsx`
  - `app/use-cases/[slug]/page.tsx`
  - `app/guides/[slug]/page.tsx`
  - `app/compare/[slug]/page.tsx`
  - `app/resources/[slug]/page.tsx`
  - `app/blog/[slug]/page.tsx`
- Route names use kebab-case.

## Component Hierarchy
- Route files in `app/` should orchestrate page sections, not hold complex UI logic.
- Reusable UI lives in `components/` grouped by domain:
  - `navigation/`
  - `hero/`
  - `sections/`
  - `cards/`
  - `forms/`
  - `layout/`
  - `seo/`
- Shared wrappers may live in `layouts/`.
- Shared route composition is handled through `components/layout/MarketingPageTemplate.tsx` for content-driven marketing pages.
- Conversion-specific form logic lives in `components/forms/LeadCaptureForm.tsx`.
- Long-form template sections include `InsightSection` and `ChecklistSection` for conversion-focused depth.

## Lead Submission Flow
- `app/contact/page.tsx` renders a dedicated conversion experience for task intake.
- `app/api/leads/route.ts` accepts lead payloads with server-side validation.
- `app/contact/success/page.tsx` confirms submission and communicates response expectations.
- Failure responses should preserve form input and surface field-level or form-level errors.

## SEO Infrastructure
SEO is implemented as a layered system:
- `config/metadata.ts`: global metadata defaults
- `seo/metadata.ts`: per-page metadata generation helper
- `seo/structured-data.ts`: schema generation and serialization
- `seo/sitemap.ts`: sitemap builder
- `seo/robots.ts`: robots config builder
- `app/sitemap.ts` and `app/robots.ts`: Next.js metadata route adapters

Global breadcrumbs are rendered from route metadata maps in `content/site-content.ts`.

## Configuration System
- `config/site.ts`: canonical site constants (name, URL, locale)
- `config/navigation.ts`: navigation structure
- `config/metadata.ts`: default metadata templates
- `config/cta.ts`: standardized conversion CTA labels and microcopy

Rules:
- Keep constants in `config/`, not inline in page components.
- Keep SEO logic in `seo/`, not duplicated in routes.
- Keep utility helpers in `lib/`.

## Content Strategy Foundation
- `content/site-content.ts` is the source of truth for page copy and section composition across hubs and dynamic subpages.
- Route files should read page definitions from content maps rather than duplicating copy inline.
- Long-form blog posts are stored as Markdown files in `content/blog/*.md` with JSON frontmatter and rendered by `/blog/[slug]`.
- Content model types are defined in `types/marketing-page.ts`.
- `MarketingPageTemplate` renders a fixed section order to keep page narrative and CTA flow consistent across hubs.
- CTA wording and response-time microcopy should use `config/cta.ts` values for buyer-intent pages.

## Change Management Rule
Any architectural change (new layer, pattern, or cross-cutting convention) must update:
1. `ARCHITECTURE.md`
2. Related detailed doc in `docs/`
3. `AGENTS.md` index if discoverability changes
