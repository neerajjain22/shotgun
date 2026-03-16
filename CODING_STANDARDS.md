# CODING_STANDARDS.md

## Purpose
Defines coding conventions for consistency, readability, and maintainability across human and AI contributions.

## TypeScript Rules
- Use strict TypeScript at all times.
- Avoid `any`; use explicit types/interfaces.
- Prefer narrow types and readonly constants (`as const`) for config objects.
- Keep shared domain types in `types/`.
- Keep utility functions pure when possible.

## React and Next.js Conventions
- Default to server components unless client-side behavior is required.
- Keep page files focused on composition and metadata.
- Co-locate small route-specific helpers near the route only if not reused.
- Reusable logic belongs in `lib/`, reusable UI in `components/`.

## Naming Conventions
- Route folders: kebab-case (`use-cases`).
- React components: PascalCase (`SiteNavigation.tsx`).
- Utility files/functions: camelCase (`url.ts`, `toAbsoluteUrl`).
- Config keys/constants: descriptive and stable names.

## Folder Structure Rules
- `app/`: only routing and route-level composition.
- `components/`: shared UI building blocks.
- `layouts/`: wrapper patterns for page shells.
- `config/`: no runtime logic beyond simple object composition.
- `seo/`: metadata and crawler/indexing helpers.
- `styles/`: global layers + CSS Module files.

## CSS Rules
- Use CSS Modules for component-level styles.
- Keep global CSS limited to resets, tokens, typography, and layout primitives.
- Use design tokens from `styles/variables.css`.
- Avoid one-off inline style objects unless necessary for dynamic styles.

## Import Rules
- Use `@/*` path alias for internal imports.
- Prefer grouping imports by category:
  1. External packages
  2. Internal aliases
  3. Relative files (same folder)
- Remove unused imports and dead exports.

## Readability Rules
- Prefer small focused functions/components.
- Use early returns to reduce nesting.
- Keep comments concise and only where intent is non-obvious.
- Avoid over-abstraction in early implementation phases.

## Testing and Validation Baseline
Before finalizing code changes:
- `npm run lint`
- `npm run typecheck`
- `npm run format:check`

If checks are skipped, note the reason clearly in task output.
