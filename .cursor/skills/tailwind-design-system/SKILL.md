---
name: tailwind-design-system
description: Use when creating or evolving Tailwind-based design systems. Keeps SKILL.md compact by loading focused modules for tokens, component architecture, and source/build correctness.
---

Use this skill for non-trivial design-system work in Tailwind projects.

## Module Loading Rules

1. If the task affects design tokens, scales, theming, or semantic naming:
- Load `references/token-system-and-theming.md`

2. If the task affects reusable components, variants, or state behavior:
- Load `references/component-api-and-states.md`

3. If the task affects class detection, monorepo scanning, safelisting, or CSS output size:
- Load `references/source-detection-and-build-controls.md`

4. If multiple concerns exist:
- Load modules in the order above and stop when enough context is gathered.

## Execution Contract

- Prefer token-driven utilities over ad-hoc values.
- Keep component APIs semantic and stable.
- Ensure classes remain statically detectable.
- Run accessibility and responsive verification for changed primitives.

## Output Requirements

- State token and variant decisions clearly.
- List rejected anti-patterns and why.
- Include verification evidence for states, contrast, and responsiveness.
