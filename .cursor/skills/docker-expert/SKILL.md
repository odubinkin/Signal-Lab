---
name: docker-expert
description: Use when creating or improving Dockerfiles, container images, and local container workflows. Focus on secure and minimal images, reproducible builds, cache-aware layering, and production-grade runtime defaults.
---

Use this skill when containerization, Dockerfile quality, image performance, or Docker Compose workflows are part of the task.

## Working Approach

1. Define runtime requirements and deployment target.
2. Design a minimal, secure image build path.
3. Optimize build cache and layer ordering.
4. Harden runtime behavior (non-root, health checks, env handling).
5. Verify image correctness and startup behavior.

## Dockerfile Best Practices

- Prefer multi-stage builds to keep final images lean.
- Choose trusted, minimal base images suited to workload requirements.
- Pin base image tags with deliberate update strategy.
- Exclude unnecessary files with `.dockerignore`.
- Keep dependency install layers cache-friendly:
  - copy lockfiles first,
  - install dependencies,
  - then copy application sources.
- Remove temporary build artifacts and package manager caches in build stages.

## Runtime Hardening

- Run as a non-root user where possible.
- Keep containers ephemeral and stateless.
- Expose only required ports and env vars.
- Use explicit `WORKDIR`, `CMD`/`ENTRYPOINT`, and predictable startup behavior.
- Add health checks when service readiness must be monitored automatically.

## Compose and Local Dev Reliability

- Keep service boundaries clear (app, db, cache, observability, etc.).
- Use named networks and explicit dependencies where required.
- Avoid embedding secrets in compose files committed to VCS.
- Keep dev-only and prod-like settings clearly separated.

## Build and Delivery

- Build and test images in CI for every significant change.
- Use `--pull` and periodic clean builds to keep base layers fresh.
- Prefer deterministic build inputs (locked dependencies and explicit build args).
- Verify image size and attack surface after dependency or base image changes.

## Verification Checklist

- `docker build` succeeds for the changed image(s).
- Container starts and passes health/readiness checks.
- Runtime user is non-root where expected.
- No secrets are baked into image layers.
- Compose stack still boots and service-to-service connectivity works.

## Common Anti-Patterns

- Single-stage images that include compilers and dev toolchains in production.
- Copying the full repository too early, causing cache misses and bloated images.
- Running everything as root without justification.
- Using mutable `latest` tags without lifecycle control.
