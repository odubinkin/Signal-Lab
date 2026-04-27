# NestJS Validation and Configuration

Use this module when modifying DTOs, pipes, payload validation, or environment/config behavior.

## Validation Baselines

- Validate all external input at boundaries (body, params, query).
- Use DTO classes with explicit constraints.
- Configure global validation behavior deliberately (for example stripping or rejecting unknown fields, and controlled transformation behavior).
- Avoid silent coercion that can hide malformed input.

## Pipe Strategy

- Use built-in parse pipes for scalar coercion where possible.
- Add custom pipes only for domain-specific normalization/validation that cannot be expressed cleanly with DTO constraints.
- Keep pipe behavior predictable and documented.

## Configuration Rules

- Centralize config access through `@nestjs/config` patterns.
- Validate required env at startup and fail fast on critical missing/invalid values.
- Keep per-environment overrides explicit and reviewable.
- Do not scatter `process.env` reads across the codebase.

## Anti-Patterns

- Relying on ad-hoc validation inside services.
- Permissive payload handling in write endpoints.
- Treating startup with invalid config as recoverable when it is not.

## Verification

- Add tests for DTO validation failure cases.
- Verify startup behavior with missing/invalid env values.
- Confirm changed endpoints reject malformed payloads as expected.
