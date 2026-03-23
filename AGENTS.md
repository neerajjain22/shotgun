# AGENTS.md

## Purpose
This file is the entry point for AI coding agents working in the Krish. website repository. It provides a quick project summary and points to deeper documentation.

## Project Overview
Krish. is a Shopify-focused execution platform. This website communicates product value, use cases, and SEO content for founders, operators, and ecommerce teams.

## Tech Stack
- Next.js (App Router, server-rendered React)
- TypeScript (strict mode)
- CSS Modules + global style layers
- Node.js runtime
- Vercel deployment

## Build Commands
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run typecheck`
- `npm run format:check`

## Repository Structure (Summary)
- `app/`: routes and page entry points
- `components/`: reusable UI modules
- `config/`: site-wide constants and metadata defaults
- `content/`: page content maps (including dynamic section subpages)
- `seo/`: metadata, structured data, sitemap, robots helpers
- `styles/`: globals and design tokens
- `docs/`: deeper architecture and workflow references

See detailed structure: `docs/folder-structure.md`

## Coding Rules
Use strict TypeScript, CSS Modules for component styling, and centralized config/SEO helpers.

See: `CODING_STANDARDS.md`

## SEO Rules
All pages should follow canonical URL, metadata, and heading/linking rules.
Copy must follow clarity-first and ICP-focused guidance.

See: `SEO_RULES.md`
See: `docs/seo-copywriting-guidelines.md`

## Workflow Rules
Use small focused changes, avoid unrelated edits, and validate with lint/type checks.
Before any file edits, provide analysis + proposed file changes and wait for explicit confirmation.
After significant changes, review and update relevant documentation in the same task.
Use `shotgun-xyz` as the default remote for `git push` operations unless explicitly instructed otherwise.

See: `DEVELOPMENT_WORKFLOW.md`

## Safety Rules
- Do not modify unrelated files.
- Do not introduce dependencies unless required and justified.
- Preserve existing architecture patterns unless explicitly changed.
- When architecture changes, update relevant docs in the same task.

## Deep Documentation Index
- High-level architecture: `ARCHITECTURE.md`
- Coding conventions: `CODING_STANDARDS.md`
- SEO policy: `SEO_RULES.md`
- SEO copywriting standards: `docs/seo-copywriting-guidelines.md`
- Delivery process: `DEVELOPMENT_WORKFLOW.md`
- Product/context docs: `docs/project-overview.md`
- Folder map: `docs/folder-structure.md`
- Component patterns: `docs/component-patterns.md`
- SEO implementation details: `docs/seo-architecture.md`
- Deployment guide: `docs/deployment.md`
