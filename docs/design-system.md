# design-system.md

## Purpose
This document defines Krish's current visual language and UI rules.
The site now follows a clean monochrome-first system with subtle accent usage.

## Core Direction
Design tone:
- Minimal
- Editorial and modern
- High contrast
- Rounded, soft geometry
- Generous whitespace

Primary visual rule:
- Use black/white/neutral as the base.
- Use color as semantic accent only (success and warning states).

## Color System
Defined in `/styles/variables.css`.

Primary colors:
- Background: `#FCFCFC`
- Surface: `#FFFFFF`
- Text: `#050505`
- Muted text: `#888888`
- Border: `#E4E4E7`

Semantic accents:
- Execution/success: `#10B981`
- Destructive: `#FF3B30`

Usage rules:
- Keep section backgrounds mostly neutral.
- Reserve accent colors for status, indicators, and comparison emphasis.

## Typography
Font family:
- Inter only (`next/font/google` in root layout)

Type behavior:
- Heavy headlines (`font-weight: 900`)
- Tight heading letter spacing
- Comfortable paragraph line-height (`1.6`)

Hierarchy:
- Hero: responsive clamp up to large display sizes
- Section titles: strong, compact, high-contrast
- Body: readable, medium size, muted when secondary

## Buttons
Base button style:
- Pill radius (`999px`)
- Bold label
- Compact vertical rhythm

Variants:
- Primary: dark fill, white text
- Secondary: white fill, neutral border

Interaction:
- Subtle lift on hover (`translateY(-1px)`)
- No aggressive glow or heavy animation

## Cards
Card baseline:
- White background
- Subtle border
- Large rounded corners
- Soft elevation

Default radius is intentionally larger than previous design language.

## Header and Footer
The old pastel navigation/footer style has been replaced.

Header:
- Sticky
- Semi-transparent background + blur
- Compact, high-contrast links
- Single primary CTA

Footer:
- Multi-column link layout
- Brand summary block
- Minimal social links row

## Motion
Motion style is lightweight:
- Small hover transitions
- Soft entrance effects
- Message/typing loops only for hero demo UI

Always respect reduced-motion preferences.

## Implementation Notes
- Global design tokens live in `/styles/variables.css`.
- Global foundations live in `/styles/globals.css`, `/styles/typography.css`, `/styles/components.css`.
- Homepage-specific visuals and animation live in `/app/HomePage.module.css`.
- Reusable components should consume tokens, not hardcoded ad-hoc values.
