# Docker Compose and CI Delivery

Use this module when changing multi-service orchestration, env-specific overlays, or build/push pipelines.

## Compose Architecture

- Keep each service single-purpose and explicit about dependencies.
- Use environment-specific overrides instead of one overloaded compose file.
- Keep network boundaries and service discovery explicit.
- Avoid committing production secrets in compose manifests.

## Delivery and CI Patterns

- Build/test images in CI for significant changes.
- Use buildx when needed for advanced cache and multi-platform flows.
- Keep tags/versioning strategy explicit and auditable.
- Fail pipeline early on build/test/security gate failures.

## Operations Guardrails

- Validate startup ordering assumptions with readiness checks, not sleeps.
- Ensure observability endpoints/log routing remain intact after topology edits.
- Document operational commands for roll-forward/rollback paths.

## Anti-Patterns

- Treating local compose defaults as production-safe settings.
- Opaque tags that make rollback uncertain.
- CI pipelines that push images without running validation.

## Verification

- Bring up stack with intended compose files and verify service connectivity.
- Validate env override behavior for target environment.
- Confirm CI build path reproduces local build expectations.
