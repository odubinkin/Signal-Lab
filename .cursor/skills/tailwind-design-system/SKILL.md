---
name: tailwind-design-system
description: Use when creating or evolving a design system with Tailwind CSS. Focus on tokens, semantic utilities, component variants, consistency, accessibility, and maintainable styling patterns.
---

Use this skill when work touches visual foundations, reusable component styling, theming, or UI consistency in Tailwind-based applications.

## Working Approach

1. Define or refine design tokens first.
2. Map tokens to semantic usage patterns.
3. Implement reusable component variants.
4. Verify accessibility and responsive behavior.
5. Minimize one-off styles and style drift.

## Token Strategy

- Prefer Tailwind v4 token definitions via `@theme`.
- Keep a clear token taxonomy:
  - color,
  - typography,
  - spacing,
  - radius,
  - shadow,
  - motion.
- Use semantic naming for design intent (for example `surface`, `primary`, `danger`) rather than raw palette names in component APIs.
- Keep tokens centralized; avoid duplicating values across multiple files.

## Component System Patterns

- Build reusable component variants instead of repeating long class strings.
- Standardize state variants (`default`, `hover`, `focus-visible`, `disabled`, `error`) across components.
- Keep primitives small and composable.
- Keep variant APIs stable and explicit (size, tone, emphasis, intent).

## Layout and Responsiveness

- Design mobile-first.
- Use a consistent spacing scale tied to tokens.
- Keep breakpoints intentional; avoid ad-hoc one-off breakpoint behavior.
- Prefer container and layout primitives over repeated per-page layout hacks.

## Accessibility

- Ensure sufficient color contrast for text and interactive states.
- Provide clear focus-visible states for keyboard users.
- Do not rely on color alone to communicate status.
- Preserve readable font sizes and line heights across breakpoints.

## Maintainability Rules

- Prefer utilities and tokens over custom CSS unless necessary.
- Use `@utility` only when a repeated pattern cannot be expressed cleanly with existing utilities.
- Avoid deep specificity and `!important` unless there is a proven conflict requiring it.
- Remove dead style branches and obsolete variants during refactors.

## Verification Checklist

- Validate changed components in light and dark themes (if applicable).
- Check responsive behavior at common breakpoints.
- Run visual sanity checks on focus, hover, disabled, and error states.
- Confirm no new hardcoded colors or spacing values bypass token strategy.

## Common Anti-Patterns

- Hardcoding color values in components that should consume tokens.
- Creating many near-duplicate components instead of variants.
- Mixing semantic and raw palette naming in public component APIs.
- Expanding custom CSS instead of using Tailwind primitives and tokenized utilities.
