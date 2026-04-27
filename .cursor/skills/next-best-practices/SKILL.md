---
name: next-best-practices
description: Use when building, refactoring, or reviewing Next.js code. Provides a compact routing layer that loads focused modules for architecture, caching, and security/deployment decisions.
---

Use this skill for any non-trivial Next.js task.

## Module Loading Rules

Load only the modules needed for the current task.

1. If the task changes route structure, component boundaries, rendering model, or `app/` organization:
- Load `references/architecture-and-boundaries.md`

2. If the task changes data fetching, caching, revalidation, server actions, or route handlers:
- Load `references/data-caching-and-mutations.md`

3. If the task touches auth, secrets, runtime config, middleware/proxy behavior, or deployment strategy:
- Load `references/security-and-deployment.md`

4. If multiple concerns are present:
- Load modules incrementally in the order above and stop when sufficient.

## Execution Contract

- Default to Server Components and only opt into Client Components when required.
- Prefer explicit caching/revalidation behavior over implicit assumptions.
- Keep security checks at data boundaries before mutation.
- After implementation, run verification from loaded modules.

## Output Requirements

- Explain chosen rendering and caching strategy for affected routes.
- List key risks and anti-patterns avoided.
- Include concrete verification steps performed.
