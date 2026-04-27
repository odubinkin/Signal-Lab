# /add-endpoint

Scaffold a new NestJS endpoint with Signal Lab observability conventions.

## Prompt

You are working in the Signal Lab repository. Add a new NestJS endpoint only after reading the relevant local context:

- `.cursor/rules/stack-constraints.mdc`
- `.cursor/rules/observability-conventions.mdc`
- `.cursor/rules/error-handling.mdc`
- `apps/backend/src/app.module.ts`
- Existing backend modules under `apps/backend/src/**`

Ask one concise clarification question if the endpoint path, HTTP method, DTO shape, or persistence behavior is missing. Otherwise proceed with conservative defaults that match the existing backend patterns.

## Inputs To Resolve

- Endpoint name and route, for example `POST /widgets`.
- Request DTO fields and validation rules.
- Response shape.
- Whether the endpoint reads/writes Prisma models.
- Expected success, validation error, and system error behavior.

## Required Implementation

1. Create or update the NestJS module files under `apps/backend/src/<feature>/`:
   - `<feature>.controller.ts`
   - `<feature>.service.ts`
   - DTO files under `dto/` when the endpoint accepts input
   - unit and integration tests when behavior is non-trivial
2. Register the module in `apps/backend/src/app.module.ts`.
3. Add Swagger decorators that describe the route, request DTO, and success/error responses.
4. Use `class-validator` and `class-transformer` DTO patterns for input validation.
5. Use Prisma only through `PrismaService` when persistence is required. Do not add another ORM or raw SQL.
6. Add structured JSON logging through the existing logger service. Include safe fields such as feature name, route, status, duration, and stable IDs. Do not log secrets, tokens, full request bodies, raw stack traces, or DSNs.
7. Add Prometheus metrics through the existing metrics service or extend it with low-cardinality labels only. Do not use user input, IDs, error messages, timestamps, or request bodies as metric labels.
8. Capture unexpected 5xx/system exceptions with Sentry using the existing project pattern. Do not report expected 400 validation failures as Sentry exceptions.
9. Keep error handling aligned with the global exception filter and existing HTTP exception patterns.

## Verification

Run the smallest relevant checks after editing:

```bash
npm run backend:build
npm run test:unit -w apps/backend
npm run test:integration -w apps/backend
```

If Docker behavior or database migrations changed, also run:

```bash
docker compose up -d
docker compose ps
curl -fsS http://localhost:${BACKEND_PORT:-3001}/health
curl -fsS http://localhost:${BACKEND_PORT:-3001}/metrics
```

## Final Response

Report:

- Files changed.
- Endpoint route and method.
- Observability added: metrics, logs, and Sentry behavior.
- Verification commands run and results.
- Any skipped verification with the concrete blocker and residual risk.
