# section-library.md

## Purpose
Defines the reusable section blocks used to assemble Krish. pages consistently across homepage, use-case pages, comparison pages, and SEO guides.

## Composition Principle
Pages should be built by composing section library components instead of creating one-off layouts.

Shared foundations used by section components:
- `Section` wrapper for consistent vertical rhythm
- `PageContainer` for max-width and horizontal padding
- `Card` and `Button` primitives for visual consistency

## Sections

### FeatureGrid
File:
- `components/sections/FeatureGrid.tsx`

Use when:
- presenting product features
- listing benefits
- describing common problems solved

Props:
- `sectionTitle: string`
- `sectionDescription?: string`
- `features: Array<{ title: string; description: string; icon?: ReactNode }>`

Example:
```tsx
<FeatureGrid
  sectionTitle="What Krish. helps you ship"
  sectionDescription="Common Shopify development requests we execute every week."
  features={[
    { title: "Theme updates", description: "Ship layout and section changes fast." },
    { title: "Bug fixes", description: "Resolve storefront issues quickly." }
  ]}
/>
```

### StepsSection
File:
- `components/sections/StepsSection.tsx`

Use when:
- explaining workflows
- showing how Krish. works

Props:
- `sectionTitle: string`
- `steps: Array<{ stepNumber: string; title: string; description: string }>`

### InsightSection
File:
- `components/sections/InsightSection.tsx`

Use when:
- adding contextual depth after core section blocks
- explaining risks, tradeoffs, or operator decisions

Props:
- `sectionTitle: string`
- `sectionDescription: string`
- `bullets: string[]`

### ChecklistSection
File:
- `components/sections/ChecklistSection.tsx`

Use when:
- turning strategy into practical execution actions
- providing implementation-ready handoff items

Props:
- `sectionTitle: string`
- `sectionDescription?: string`
- `items: string[]`

Guide usage recommendation:
- For guide subpages, checklist items should be direct actions teams can execute.
- Target at least 8 items so the section is operationally useful, not conceptual.

### TwoColumnSection
File:
- `components/sections/TwoColumnSection.tsx`

Use when:
- product explanation + visual
- problem/solution storytelling

Props:
- `headline: string`
- `description: string`
- `image: { src: string; alt: string; width?: number; height?: number }`

### LogoGrid
File:
- `components/sections/LogoGrid.tsx`

Use when:
- customer logos
- partner logos
- social proof rows

Props:
- `sectionTitle: string`
- `logos: Array<{ name: string; logo: string }>`

### FAQSection
File:
- `components/sections/FAQSection.tsx`

Use when:
- SEO FAQs
- product objections/questions

Props:
- `sectionTitle: string`
- `faqs: Array<{ question: string; answer: string }>`

### ExampleTasksSection
File:
- `components/sections/ExampleTasksSection.tsx`

Use when:
- showing concrete examples of tasks Krish. can execute
- surfacing recognizable merchant problems with implementation context

Props:
- `sectionTitle: string`
- `tasks: Array<{ title: string; problemDescription: string; difficultyLabel: string; theme: "peach" | "blue" | "violet" | "mint" | "amber" | "rose" | "green" | "slate" }>`
- `taskPrompt?: { title: string; description: string; inputPlaceholder: string; inputAriaLabel?: string }`

Recommended task examples:
- Make a homepage banner clickable
- Add personalization field to product page
- Fix mobile layout issues
- Launch a flash sale promotion

Pattern notes:
- Keep task copy recognition-first: title (task), one-sentence real-world problem, then subtle difficulty label.
- Order tasks by merchant familiarity so high-recognition issues appear first.
- Use task-level `theme` tokens to apply top accent borders and matching difficulty-pill colors while keeping card backgrounds neutral.
- Use `taskPrompt` to capture open-ended task requests without backend coupling.

### CTASection
File:
- `components/sections/CTASection.tsx`

Use when:
- ending a page with clear next action

Props:
- `headline: string`
- `description: string`
- `primaryCTA: { label: string; href: string }`
- `secondaryCTA?: { label: string; href: string }`

Backwards compatibility:
- `components/cta/CTASection.tsx` re-exports this section version.

## Usage Rules
- Keep section headlines clear and ICP-focused.
- Use concrete copy and examples.
- Reuse section components before creating new custom blocks.
- Add new generic sections to this library and document them here.

Guide page composition guidance:
- Guide subpages should combine:
  - `StepsSection` for ordered workflow
  - `ChecklistSection` for execution detail
  - `FAQSection` for objections and edge cases
  - final `CTASection` for next-step conversion

## Maintenance
When section APIs or usage patterns change:
1. Update this document.
2. Update `docs/component-patterns.md` if hierarchy/patterns changed.
3. Keep examples aligned with current component props.
