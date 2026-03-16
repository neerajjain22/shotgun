# component-patterns.md

## Purpose
Defines reusable component patterns to keep UI implementation consistent and maintainable.

## Component Hierarchy
The reusable UI system is organized in layers:

1. Base UI primitives (`components/ui`)
- `Button`
- `Card`
- `Badge`

2. Structural layout primitives (`components/layout`, `components/sections`)
- `PageContainer`
- `MarketingPageTemplate`
- `Section`

3. Reusable feature blocks (`components/hero`, `components/cards`, `components/cta`)
- `Hero`
- `FeatureCard`
- `UseCaseCard`
- `CTASection`

Section library (`components/sections`) is the standard page-composition layer:
- `FeatureGrid`
- `StepsSection`
- `TwoColumnSection`
- `LogoGrid`
- `FAQSection`
- `ExampleTasksSection`
- `CTASection`

4. Global chrome (`components/navigation`, `components/footer`)
- `Navbar`
- `Footer`

## Reuse Patterns
- Prefer composing page UI from higher-level blocks first (`Hero`, `Section`, `CTASection`).
- Use base primitives (`Button`, `Card`, `Badge`) inside higher-level blocks for consistency.
- Keep navigation config-driven via `config/navigation.ts`.
- Keep route files focused on content composition, not styling logic.

## Content-Driven Page Template Pattern
- `components/layout/MarketingPageTemplate.tsx` is the default renderer for non-homepage marketing pages.
- Page copy and section composition should come from `content/site-content.ts`.
- Route files should only:
  - select a content object
  - generate metadata
  - render `MarketingPageTemplate`
- This keeps page architecture scalable while preserving consistent visuals across hubs and subpages.

## Simplified Steps Workflow Pattern
- `components/sections/StepsSection.tsx` supports a concise process section for marketing pages.
- Preferred default is a 3-step flow for clarity:
  - `STEP 1`: request submission
  - `STEP 2`: execution
  - `STEP 3`: completed result
- Step items accept:
  - `stepNumber`
  - `title`
  - `description`
  - optional `icon` (emoji or React node)
- Layout behavior:
  - 3 cards in a single row on desktop
  - stacked cards on smaller screens
- Use this section when explaining linear workflows in simple language.

## Recognition-First Task Cards Pattern
- `components/sections/ExampleTasksSection.tsx` should be used for concrete Shopify task recognition.
- Each card should include:
  - task title
  - one-sentence merchant pain point
  - subtle difficulty label (implementation context)
- Apply data-driven `theme` tokens so each card uses a colored top accent line and a matching pill style, while card backgrounds stay neutral.
- Keep the first few tasks ordered by highest user recognition (common frustrations first).
- Optional `taskPrompt` block can be rendered below the grid to collect open-ended task descriptions in a highlighted pastel container.

## Navigation Configuration Pattern
- `config/navigation.ts` is the single source of truth for:
  - `navigation.main` (header links)
  - `navigation.footer` (footer link groups)
  - `navigation.ctas` (header CTA labels and URLs)
- `Navbar` and `Footer` should render links from config only (no hardcoded link lists).
- When adding, renaming, or removing nav links, update config first and let components consume updated arrays.

## Hero Workflow Animation Pattern
- `components/hero/HeroWorkflow.tsx` provides the animated hero visual used to explain request-to-delivery flow.
- Animation uses HTML + CSS only (`styles/hero-workflow.css`) and avoids video or heavy animation libraries.
- Sequence communicates:
  - store before state
  - founder request bubble
  - Shotgun working response
  - store after state
  - completion confirmation
- On small screens, hide animated state and show static fallback visual for readability and performance.

## Execution Pipeline Diagram
- `components/sections/ExecutionPipeline.tsx` provides a static process diagram for request-to-delivery explanation.
- This section is used when pages need to clearly show AI + human collaboration per stage.
- Pipeline includes five stages:
  - Founder request
  - Task evaluation
  - Implementation
  - Quality check
  - Shopify store updated
- Styling is in `styles/execution-pipeline.css` and should remain lightweight and token-based.

## Naming Conventions
- Component files: PascalCase (`FeatureCard.tsx`).
- CSS Module files: matching PascalCase (`FeatureCard.module.css`).
- Component folders: lowercase by domain (`components/cards`, `components/navigation`).
- Props/types: descriptive and explicit (`HeroProps`, `CTAAction`).

## File Pattern (Standard)
For reusable components:
- `ComponentName.tsx`
- `ComponentName.module.css`
- Optional colocated helper/type file when needed

## Styling Rules
- Use CSS Modules only for component-level styling.
- Use design tokens from `styles/variables.css`.
- Reuse shared spacing/radius/shadow/motion tokens before introducing one-off values.
- Avoid inline styles for standard UI states.

## Accessibility and Semantics
- Use semantic elements (`header`, `nav`, `section`, `footer`, `article`) where applicable.
- Keep link/button usage correct by intent.
- Ensure interactive controls include accessible labels and state attributes.

## Maintenance Notes
Update this document whenever:
- a new component layer is introduced,
- base primitive contracts change,
- naming conventions or reuse patterns are updated.

See also:
- `docs/section-library.md` for section purposes, props, and examples.
