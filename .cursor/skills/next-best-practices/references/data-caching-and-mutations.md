# Next.js Data, Caching, and Mutations

Use this module when changing fetch patterns, cache behavior, revalidation, server actions, or route handlers.

## Caching Strategy Selection

1. Data rarely changes and can be shared broadly:
- Use cached fetch or cache-enabled computation.

2. Data changes on schedule:
- Use time-based revalidation (`next.revalidate`).

3. Data changes on events (CMS updates, user writes, webhooks):
- Use on-demand invalidation with tags or paths (`revalidateTag`, `revalidatePath`, `updateTag` where applicable).

4. Data must be request-fresh:
- Use dynamic/no-store path deliberately and document reason.

## Mutation Patterns

- For Server Actions that need read-your-own-writes behavior, prefer immediate invalidation path where appropriate.
- For webhook/external events, use Route Handlers that trigger revalidation.
- Use stable cache tagging taxonomy by domain (`posts`, `user:<id>`, etc.).

## Data-Fetching Guardrails

- Avoid accidental waterfalls in nested async trees.
- Place Suspense/loading boundaries where latency is expected.
- Keep fetch ownership near consuming component/segment.
- Do not disable caching globally to work around one stale data bug.

## Route Handler Notes

- Keep handlers deterministic and explicit about static vs dynamic behavior.
- Validate input payloads before side effects.
- Keep non-idempotent logic explicit and auditable.

## Verification

- Verify stale -> fresh transition for each invalidation path.
- Test at least one mutation flow and one read flow after invalidation.
- Confirm route behavior after deploy-style refresh (no stale critical data).
