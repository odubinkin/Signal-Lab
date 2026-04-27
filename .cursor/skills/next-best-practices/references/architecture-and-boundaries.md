# Next.js Architecture and Boundaries

Use this module when changing App Router structure, component ownership, route behavior, or server/client boundaries.

## Decision Tree

1. Does the UI require browser-only APIs, event handlers, or local interactive state?
- Yes: use Client Component for that leaf.
- No: keep as Server Component.

2. Does data depend on request-specific context (cookies, headers, search params, auth context)?
- Yes: dynamic rendering path.
- No: static/cached rendering path.

3. Is shared layout logic stable across child routes?
- Yes: move into nearest `layout.tsx`.
- No: keep route-specific logic in segment-level `page.tsx`.

## Structural Practices

- Treat `app/` as routing contract, not a generic dumping folder.
- Keep route-only files (`page`, `layout`, `loading`, `error`, `not-found`, `route`) explicit.
- Use private segment folders (`_components`, `_lib`) for non-routable internals.
- Keep providers as deep as possible to preserve static optimization of outer shells.

## Boundary Guardrails

- Do not import server-only modules into client trees.
- Avoid broad `'use client'` at high-level layouts.
- Keep route handlers thin and push domain logic to shared server modules.
- Keep feature code colocated by route/domain to reduce cross-cutting coupling.

## Anti-Patterns

- Large client-only trees because of one interactive control.
- Fetching all route data at root layout without need.
- Blending transport, domain logic, and presentation in one file.

## Verification

- Validate route hierarchy behavior (nested layouts, loading, error boundaries).
- Confirm intended server/client split in changed files.
- Confirm no server-only modules leak into client bundle paths.
