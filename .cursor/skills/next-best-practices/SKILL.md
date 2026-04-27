---
name: next-best-practices
description: Use when building, refactoring, or reviewing a Next.js application. Focus on App Router architecture, Server/Client boundaries, data fetching, caching, security, and deployment-ready defaults.
---

Use this skill when the task involves Next.js architecture decisions, performance, data loading behavior, rendering strategy, or production hardening.

## Working Approach

1. Identify whether the affected route/component should be Server or Client.
2. Choose a data fetching strategy per route segment (static, dynamic, or mixed).
3. Apply caching and revalidation intentionally.
4. Validate security boundaries for data access and sensitive values.
5. Confirm changes with targeted checks and route-level verification.

## App Router Baselines

- Prefer the App Router (`app/`) for new work.
- Keep route files focused:
  - `page.tsx` for route entry.
  - `layout.tsx` for shared UI.
  - `loading.tsx` for streaming fallbacks.
  - `error.tsx` and `not-found.tsx` for resilient UX.
  - `route.ts` for API endpoints.
- Keep non-routable internals in private folders like `_components` and `_lib`.

## Server and Client Boundaries

- Default to Server Components.
- Add `'use client'` only where browser APIs, local interaction state, or client-side hooks are required.
- Keep providers as deep as possible in the tree to preserve static optimization.
- Avoid pulling server-only logic into Client Components.

## Data Fetching and Caching

- Fetch data where it is used; avoid unnecessary top-level waterfalls.
- Use `fetch` caching options and revalidation APIs intentionally:
  - Cache stable data.
  - Use revalidation (`revalidatePath`, `revalidateTag`) for mutable domains.
  - Use dynamic behavior only when request-specific data is required.
- Use `loading.tsx` and Suspense boundaries to reduce blocked rendering.
- Do not disable caching globally as a shortcut.

## Security and Runtime Guardrails

- Keep secrets server-side and out of client bundles.
- Avoid side effects during render.
- Validate external inputs at boundaries (route handlers, server actions, API integrations).
- Enforce auth/authorization checks before data mutation or sensitive reads.

## Performance and DX

- Prefer route-level colocation with clear ownership.
- Keep client bundles small by limiting client-only dependencies.
- Use built-in Next.js primitives before introducing custom abstractions.
- Treat configuration changes in `next.config.*` as high-risk and verify behavior after edits.

## Verification Checklist

- Run project checks for lint/type/test/build.
- Manually verify affected routes:
  - initial render state,
  - loading state,
  - error state,
  - not-found behavior (if route params exist).
- Verify cache and revalidation paths for the changed data flow.
- Confirm no secret values are exposed in client-rendered output.

## Common Anti-Patterns

- Marking large trees as client-only without need.
- Fetching everything in one root component when route-segment fetching is clearer.
- Disabling cache/revalidation instead of modeling data freshness correctly.
- Mixing API route logic and UI concerns in the same modules.
