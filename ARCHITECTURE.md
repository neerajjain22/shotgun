# ARCHITECTURE.md

## Purpose
Defines the high-level website architecture so future contributors and AI agents can make consistent changes without re-discovering design intent.

## System Overview
Shotgun website is a server-rendered Next.js App Router application optimized for SEO growth and maintainability.

Core principles:
- Route-driven content architecture
- Reusable component composition
- Centralized configuration
- SEO helpers as shared infrastructure

## App Router Architecture
- `app/layout.tsx` defines global HTML shell, metadata base, global styles, navigation, and footer placeholders.
- `app/page.tsx` and nested route segment pages are page entry points.
- `app/sitemap.ts` and `app/robots.ts` expose metadata routes.

Routing strategy:
- Static top-level marketing and informational routes under `app/*`.
- Dynamic section routes are used for scalable content clusters:
  - `app/product/[slug]/page.tsx`
  - `app/use-cases/[slug]/page.tsx`
  - `app/guides/[slug]/page.tsx`
  - `app/compare/[slug]/page.tsx`
  - `app/resources/[slug]/page.tsx`
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

## SEO Infrastructure
SEO is implemented as a layered system:
- `config/metadata.ts`: global metadata defaults
- `seo/metadata.ts`: per-page metadata generation helper
- `seo/structured-data.ts`: schema generation and serialization
- `seo/sitemap.ts`: sitemap builder
- `seo/robots.ts`: robots config builder
- `app/sitemap.ts` and `app/robots.ts`: Next.js metadata route adapters

## Configuration System
- `config/site.ts`: canonical site constants (name, URL, locale)
- `config/navigation.ts`: navigation structure
- `config/metadata.ts`: default metadata templates

Rules:
- Keep constants in `config/`, not inline in page components.
- Keep SEO logic in `seo/`, not duplicated in routes.
- Keep utility helpers in `lib/`.

## Content Strategy Foundation
- `content/site-content.ts` is the source of truth for page copy and section composition across hubs and dynamic subpages.
- Route files should read page definitions from content maps rather than duplicating copy inline.
- Content model types are defined in `types/marketing-page.ts`.

## Change Management Rule
Any architectural change (new layer, pattern, or cross-cutting convention) must update:
1. `ARCHITECTURE.md`
2. Related detailed doc in `docs/`
3. `AGENTS.md` index if discoverability changes
