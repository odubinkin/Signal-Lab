---
name: nestjs-best-practices
description: Use when designing, implementing, or reviewing NestJS services. Focus on modular architecture, DTO validation, configuration hygiene, security middleware order, data access boundaries, and testing.
---

Use this skill when tasks involve NestJS architecture, API contracts, module design, validation, security hardening, or service reliability.

## Working Approach

1. Clarify module boundaries and ownership.
2. Define DTO contracts before controller/service implementation.
3. Enforce runtime validation and transformation at the boundary.
4. Apply security and configuration guardrails early in bootstrap.
5. Add or update tests for changed behavior.

## Architecture and Modules

- Keep modules cohesive by domain and avoid cross-module leakage.
- Use controllers for transport concerns, services for business logic, and providers for shared infrastructure.
- Favor dependency injection over static/global helpers.
- Keep external integrations behind dedicated gateway/provider abstractions.

## DTOs and Validation

- Use DTO classes for all request payloads and query params.
- Enable global `ValidationPipe` with strict options (for example whitelist and transformation behavior) unless project policy requires otherwise.
- Validate all untrusted input at the system boundary.
- Return clear, stable API error shapes for validation failures.

## Configuration and Environment

- Use `@nestjs/config` and typed config access patterns.
- Validate required environment variables at startup.
- Keep secrets in environment/runtime secret stores, not source files.
- Fail fast on invalid critical configuration.

## Security and Middleware Order

- Apply security middleware (for example Helmet) before route registration side effects.
- Configure CORS explicitly; do not leave permissive defaults in production paths.
- Ensure authentication and authorization are enforced for protected routes.
- Keep rate-limiting and abuse controls aligned with endpoint sensitivity.

## Data and Persistence Boundaries

- Keep ORM/database access in dedicated services (for example Prisma service wrappers).
- Keep transactions explicit for multi-step writes.
- Avoid leaking persistence-layer models directly as public API contracts when transformation is needed.
- Model idempotency for retry-prone write paths.

## Testing and Verification

- Maintain a mix of unit and integration/e2e tests for changed modules.
- Use Nest testing utilities (`@nestjs/testing`) for module-level tests.
- Verify success and failure paths, including validation and auth failures.
- Run lint/type/test before considering task completion.

## Common Anti-Patterns

- Putting business logic directly in controllers.
- Skipping global validation and depending on ad-hoc checks.
- Accessing `process.env` across the codebase instead of centralized config.
- Applying security middleware after route setup where it no longer protects earlier routes.
