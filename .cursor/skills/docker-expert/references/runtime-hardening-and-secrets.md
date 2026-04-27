# Docker Runtime Hardening and Secrets

Use this module for runtime security posture, user permissions, secrets, and sensitive-data handling.

## Runtime Hardening Baselines

- Run as non-root unless a hard requirement says otherwise.
- Keep filesystem and process model as minimal as practical.
- Expose only required ports and env vars.
- Add health checks for critical service readiness/liveness workflows.

## Secrets Handling

- Do not pass secrets via `ARG` or plain `ENV` during build.
- Use BuildKit secrets mounts for build-time credentials.
- Ensure sensitive material is not persisted in final layers.
- Keep runtime secrets sourced from secure runtime mechanisms, not baked images.

## Supply-Chain and Security Hygiene

- Track base image provenance and update cadence.
- Prefer trusted official/verified images.
- Reduce package footprint to lower attack surface.
- Scan images for vulnerabilities in CI where available.

## Anti-Patterns

- Embedding credentials in Dockerfile or committed compose files.
- Running services as root by default.
- Treating health checks as optional for stateful critical services.

## Verification

- Confirm effective runtime user inside container.
- Verify no secrets appear in image history/layers/runtime logs.
- Validate security scan or equivalent checks for changed images.
