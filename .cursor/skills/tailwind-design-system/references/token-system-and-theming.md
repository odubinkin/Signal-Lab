# Tailwind Token System and Theming

Use this module when defining design tokens, color systems, typography scales, spacing systems, or dark mode strategy.

## Token Architecture

- Define token primitives with `@theme` and keep them centralized.
- Separate primitive scale tokens from semantic role tokens.
- Prefer semantic consumption in components (`surface`, `text-muted`, `accent`) over raw palette references.
- Keep naming predictable and avoid parallel token taxonomies.

## Theming Strategy

- Decide theme trigger model early: media-query, class, or data-attribute based.
- Keep light/dark mappings explicit for semantic tokens.
- Validate neutral and interactive token contrast in both themes.

## Scale and Consistency Rules

- Use a constrained spacing and radius scale; avoid one-off increments unless justified.
- Keep typography pairings and size ramps consistent across primitives.
- Standardize motion/easing tokens for interaction patterns.

## Anti-Patterns

- Hardcoded color values inside shared primitives.
- Mixing semantic and raw token naming in one component API.
- Creating multiple near-equivalent tokens with unclear ownership.

## Verification

- Check token usage coverage in changed components.
- Validate both theme states for text, surfaces, and interactive controls.
- Confirm no new hardcoded visual constants bypass token layer.
