# Shotgun Site

Production-ready Next.js App Router skeleton for the Shotgun marketing website.

## Architecture Overview

This repository is intentionally scaffolded for long-term SEO content growth and maintainability:

- Server-rendered React with Next.js App Router
- TypeScript in strict mode
- CSS Modules + layered global style tokens
- Centralized SEO and site configuration
- Reusable component and layout boundaries
- Vercel-first deployment workflow

## Folder Responsibilities

- `app/`: Route segments, page entry points, route metadata hooks (`sitemap.ts`, `robots.ts`)
- `components/`: Reusable UI building blocks grouped by domain
- `layouts/`: Shared layout wrappers for route composition
- `lib/`: Generic utility functions
- `styles/`: Global style layers and design tokens
- `public/`: Static files served directly
- `content/`: Source content for blog, guides, and comparison pages
- `seo/`: SEO helpers (metadata factory, JSON-LD, sitemap/robots builders)
- `config/`: Site constants, navigation, global metadata defaults
- `scripts/`: Dev tooling/automation scripts
- `types/`: Shared TypeScript types

## Coding Conventions

- Use TypeScript strictly (`strict: true`)
- Prefer server components by default
- Use CSS Modules for component styles; keep globals limited to resets/tokens
- Keep business constants in `config/`, not inline in pages
- Use the `@/*` path alias for internal imports
- Use kebab-case for route segments and folders, PascalCase for React components, camelCase for functions/variables

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Quality checks:
   ```bash
   npm run lint
   npm run typecheck
   npm run format:check
   ```

## Deployment (Vercel)

1. Push repository to GitHub/GitLab/Bitbucket
2. Import the project in Vercel
3. Framework preset: `Next.js`
4. Build command: `npm run build`
5. Output setting: default Next.js output
6. Configure production env vars (for example `NEXT_PUBLIC_SITE_URL`)

Vercel will handle preview deployments per branch/PR and production deployment from the selected branch.
