---
name: nestjs-best-practices
description: Use when implementing or reviewing NestJS services. Keeps core context compact and loads focused modules for architecture, validation/config, and security/lifecycle/testing.
---

Use this skill for any non-trivial NestJS task.

## Module Loading Rules

1. If the task affects module boundaries, dependency flow, controller/service responsibilities, or error contracts:
- Load `references/architecture-and-error-contracts.md`

2. If the task affects DTOs, pipes, request validation, config, env handling, or startup safety:
- Load `references/validation-and-configuration.md`

3. If the task affects security middleware order, CORS/CSRF/rate-limits, request lifecycle behavior, testing, or observability:
- Load `references/security-lifecycle-and-testing.md`

4. For cross-cutting changes:
- Load modules incrementally in the order above and stop at sufficiency.

## Execution Contract

- Enforce boundary validation and explicit error contracts.
- Keep transport, domain logic, and infrastructure concerns separated.
- Apply security middleware and guards in correct lifecycle order.
- Verify with focused unit/integration/e2e checks for changed behavior.

## Output Requirements

- Describe module boundary decisions.
- Document validation/security settings changed.
- Provide concrete verification outcomes, including failure-path checks.
