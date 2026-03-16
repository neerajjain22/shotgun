# design-system.md

## Purpose
This document is the source of truth for Shotgun's global UI design system.
It defines the baseline visual language for all pages and components.

## Design Philosophy
Shotgun UI should feel:
- Minimal
- Soft
- Modern
- Pastel-forward
- Rounded
- Spacious and breathable
- Highly readable

Avoid harsh neon palettes, dense layout blocks, heavy shadows, and sharp-edged UI.

## Color System
Defined in `styles/variables.css`.

Primary palette:
- Background: `#F7F8FC`
- Primary accent: `#7C8CFF`
- Secondary accent: `#9FE3D7`
- Highlight accent: `#F8D7DA`
- Primary text: `#1F2937`

Neutral scale:
- `#FFFFFF`
- `#F3F4F6`
- `#E5E7EB`
- `#6B7280`
- `#111827`

Gradient rule:
- Use only subtle multi-stop gradients with very low opacity.
- Gradients should support atmosphere, not dominate visual hierarchy.

## Typography Rules
Global type scale:
- Hero title: `56px`
- Section title: `36px`
- Subheading: `24px`
- Body text: `18px`
- Small UI text: `14px`

Font families:
- Primary: `Inter`
- Headings: `Inter` (same family for cleaner consistency)

Readability:
- Body line-height target: `~1.6`
- Use strong contrast for primary text
- Keep paragraph width comfortable in content layouts (`max-width: 640px`)

## Buttons
Defined in `styles/components.css`.

Primary button baseline:
- Background: primary accent
- Text: white
- Radius: `14px`
- Padding: `12px 22px`
- Weight: `600`
- Interaction: subtle hover lift (`translateY(-1px)`) with `200ms` ease transition

Secondary button baseline:
- Background: white
- Border: 1px subtle neutral
- Radius: `14px`
- Padding: `12px 20px`
- Interaction: subtle hover lift and border emphasis

## Navigation Readability
Navbar links should prioritize scanning clarity:
- Font size: `16px`
- Font weight: `500`
- Horizontal gap: `28px`
- Default color from neutral text tokens
- Hover color from stronger neutral text token

## Card Style
Defined in `styles/components.css`.

Standard card baseline:
- White background
- Radius: `18px`
- Subtle neutral border
- Soft shadow
- Optional hover interaction: `translateY(-4px)`

Cards should feel light and floating, not heavy.

## Layout and Spacing
Defined in `styles/layout.css` and `styles/variables.css`.

Layout standards:
- Container max width: `1200px`
- Section vertical spacing: up to `120px` (responsive clamp)
- Grid gap: `24px`

Spacing principle:
- Prefer generous spacing over dense packing.
- Preserve rhythm between sections for calm scanning.

## Icon Style
Icons should follow:
- Outline style
- Thin stroke
- Rounded caps and joins
- No heavy filled icon defaults

Baseline icon token behavior is defined in `.icon` / `.ui-icon` styles.

## Motion Principles
Motion must remain subtle and purposeful.

Allowed interactions:
- Button hover feedback
- Card hover lift
- Gentle fade-in

Motion baseline:
- Duration around `200ms`
- Soft easing curve
- Respect reduced-motion preferences

## Global Application Rules
- All global style layers must be loaded through `styles/globals.css`.
- `app/layout.tsx` must import `globals.css`.
- New page-level styling can be introduced later, but should extend (not contradict) this system.

## Maintenance Rules
When core styling principles change:
1. Update `styles/variables.css` and related style layer files.
2. Update this document in the same task.
3. Ensure AGENTS/workflow docs remain aligned with any process changes.
