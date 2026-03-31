# deployment.md

## Purpose
Documents deployment workflow for the Krish. website on Vercel.

## Platform
- Hosting: Vercel
- Framework preset: Next.js
- Runtime: Node.js

## Pre-Deployment Checklist
- Lint passes: `npm run lint`
- Typecheck passes: `npm run typecheck`
- Formatting check passes: `npm run format:check`
- Build succeeds: `npm run build`

## Vercel Setup (Template)
1. Connect repository to Vercel.
2. Select project root (`HeyKrish-site` if monorepo parent exists).
3. Confirm Next.js framework detection.
4. Configure environment variables.
5. Enable preview deployments for branches/PRs.

## Environment Variables (Template)
- `NEXT_PUBLIC_SITE_URL` for canonical URL/environment-specific origin
- Add future integration keys as needed (analytics/CMS) with least privilege

## Branch and Release Guidance
- Use feature branches for isolated changes.
- Validate in preview deployment before production merge.
- Keep production deploys tied to protected main branch flow.
- Default git push remote is `shotgun-xyz` unless a task explicitly asks for another remote.

## Blog Generation Scheduling
- Daily article generation runs outside Vercel runtime through GitHub Actions.
- Scheduled workflow: `.github/workflows/daily-blog-generation.yml`.
- Workflow runs one generation cycle and commits published Markdown blog content to `main` for Vercel deployment.

## Rollback Notes
Use Vercel deployment history to promote a previous stable deployment if needed.

## Maintenance Notes
Update this file when deployment process, environment variables, or hosting strategy changes.
