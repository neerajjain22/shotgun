# folder-structure.md

## Purpose
Documents the repository layout and ownership boundaries for scalable implementation.

## Root Structure
- `app/`: Next.js route segments and metadata route entry points
- `components/`: reusable UI components grouped by concern
- `layouts/`: reusable page wrappers
- `lib/`: utility functions/helpers
- `styles/`: global style layers and tokens
- `public/`: static assets
- `content/`: structured content sources
- `seo/`: SEO and indexing helper modules
- `config/`: centralized site config
- `scripts/`: development automation scripts
- `types/`: shared TypeScript definitions
- `heykrish-content/`: Node.js article-generation workspace (queue, prompts, scheduler runner)
- `docs/`: long-form project documentation

## App Directory Guidelines
- Keep `app/layout.tsx` as global shell.
- Keep each route in its own folder with `page.tsx`.
- Use dynamic route segments (`[slug]`) for scalable section subpages.
- Keep route metadata generated from shared helpers.
- Keep `app/sitemap.ts` and `app/robots.ts` as adapters only.

## Components Directory Guidelines
Recommended grouping:
- `navigation/`
- `hero/`
- `sections/`
- `cards/`
- `forms/`
- `layout/`
- `seo/`

## Ownership Rules
- Avoid duplicating helper logic across route files.
- Keep marketing page copy in `content/site-content.ts` (single source of truth).
- Keep published blog articles in `content/blog/*.md` (JSON frontmatter + Markdown body).
- Promote reused logic to `lib/`, `config/`, `seo/`, or `types/`.
- Keep folder responsibilities stable over time.

## Maintenance Notes
Update this doc whenever folders are added, removed, renamed, or repurposed.
Structural changes should be accompanied by same-task updates to `ARCHITECTURE.md`, `AGENTS.md` (if index/discovery changes), and related docs.
