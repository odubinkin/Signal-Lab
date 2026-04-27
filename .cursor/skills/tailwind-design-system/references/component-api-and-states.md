# Tailwind Component API and States

Use this module when building or refactoring reusable UI primitives and variant systems.

## Component API Design

- Keep primitive APIs small and explicit (`size`, `tone`, `intent`, `state` only when needed).
- Prefer variant mapping tables over runtime string construction.
- Keep layout concerns separate from visual variant concerns.

## State Coverage Requirements

For interactive components, verify at least:
- default,
- hover,
- focus-visible,
- active (if relevant),
- disabled,
- invalid/error,
- dark mode equivalents where supported.

## Accessibility Baselines

- Preserve visible focus styles (`focus-visible`) for keyboard navigation.
- Do not rely on color alone for error/success/warning states.
- Ensure disabled states remain understandable and contrast-safe.

## Composition Rules

- Build from small composable primitives first.
- Avoid deeply nested utility overrides that fight each other.
- Use custom utilities only when repeated patterns cannot be represented cleanly.

## Anti-Patterns

- Dynamic class-string interpolation that breaks static detection.
- Variant explosion without clear consumer value.
- Copy-pasted utility sets across similar components.

## Verification

- Visual check all supported states at target breakpoints.
- Ensure class names remain deterministic and statically detectable.
- Ensure API remains backward-compatible or document breaking changes.
