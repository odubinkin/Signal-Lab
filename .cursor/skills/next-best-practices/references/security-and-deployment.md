# Next.js Security and Deployment

Use this module when touching secrets, auth-sensitive logic, runtime config, proxy/middleware, or deploy setup.

## Security Baselines

- Keep secrets server-only; never expose through client props, logs, or serialized payloads.
- Treat `route.ts` and `proxy.ts` as privileged surfaces.
- Validate untrusted input before DB or external API operations.
- Apply authz checks at mutation boundaries, not only in UI.

## Runtime and Infra Guidance

- For self-hosting, place a reverse proxy in front of Next.js server.
- Explicitly configure payload/rate protections at edge/proxy layer.
- Keep environment variable contracts documented and validated at startup.
- Prefer minimal production artifacts (for example standalone output strategy where used by your deployment model).

## Deployment Risk Checks

- Watch for cache incompatibility issues across deployments.
- Validate image/static asset delivery behavior when infra changes.
- Confirm no sensitive headers or debug surfaces are exposed.

## Anti-Patterns

- Using client-side checks as the only authorization mechanism.
- Relying on implicit infra defaults for security controls.
- Logging request bodies containing sensitive credentials.

## Verification

- Review changed paths for secret exposure.
- Smoke-test auth-protected and public routes.
- Verify security headers and proxy behavior in staging-like environment.
