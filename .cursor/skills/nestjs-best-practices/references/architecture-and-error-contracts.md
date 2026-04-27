# NestJS Architecture and Error Contracts

Use this module when changing module structure, service boundaries, controllers, exception mapping, or cross-cutting interceptors.

## Architectural Baselines

- Keep modules cohesive by business domain.
- Keep controllers thin (transport in/out), services for use-case logic, providers for integrations.
- Use dependency injection, avoid hidden global state.
- Encapsulate external systems behind adapter/provider interfaces.

## Error Contract Strategy

- Prefer explicit domain exceptions mapped to stable HTTP error payloads.
- Use exception filters for consistent response shaping and logging policies.
- Keep internal exception details out of public responses.
- Ensure known business failures and unexpected failures are distinguishable.

## Interceptors and Cross-Cutting Concerns

- Use interceptors for response mapping, timing, and consistent envelopes.
- Avoid burying business rules inside interceptors.
- Keep logging, tracing, and error transformation intentional and testable.

## Anti-Patterns

- Business logic in controllers.
- Copy-pasted error formatting across handlers.
- Leaking internal stack/context fields in API responses.

## Verification

- Confirm response schemas for success and common failure paths.
- Validate filter/interceptor order for changed modules.
- Verify logs are informative without exposing secrets.
