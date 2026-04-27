# NestJS Security, Request Lifecycle, and Testing

Use this module for middleware order, CORS/CSRF/rate limiting, guards, and verification strategy.

## Security Middleware and Guards

- Register security middleware in correct order so all intended routes are covered.
- Configure CORS intentionally; do not use broad permissive defaults in production.
- Apply rate limiting to abuse-prone endpoints.
- Add CSRF protection where browser-cookie session flows require it.

## Lifecycle Awareness

- Understand request flow: middleware -> guards -> interceptors -> pipes -> handler -> filters.
- Ensure cross-cutting concerns are attached at the right phase.
- Remember caught exceptions inside handlers do not trigger global filter behavior.

## Testing Matrix

For changed features, include:
- unit tests for service logic,
- integration tests for module wiring,
- e2e tests for transport + validation/security behavior.

Also verify at least one failure path for:
- validation rejection,
- authz rejection,
- throttling/security rejection (if configured).

## Observability

- Emit structured logs with request correlation identifiers where available.
- Capture important failure signals without logging secrets or PII.

## Anti-Patterns

- Global guards/middleware configured too late.
- Security behavior untested in e2e flows.
- Logging full sensitive payloads in error paths.

## Verification

- Execute tests covering both happy and failure paths.
- Confirm middleware/guard/filter behavior on representative endpoints.
- Check logs/metrics/traces for changed flows.
