# /check-obs

Validate Signal Lab observability wiring for the local Docker stack and backend runtime.

## Prompt

You are working in the Signal Lab repository. Run an observability-focused verification without changing source files. Read these files before running checks:

- `.cursor/rules/observability-conventions.mdc`
- `.cursor/rules/error-handling.mdc`
- `README.md`
- `apps/backend/src/main.ts`
- `apps/backend/src/metrics/metrics.service.ts`
- `apps/backend/src/shared/global-exception.filter.ts`

Do not edit files. Do not read secrets from outside this repository. If Docker is unavailable, stop and report the blocker with the list of checks that could not run.

## Required Checks

1. Validate Compose config:

```bash
docker compose config --quiet
```

2. Start or reuse local services:

```bash
docker compose up -d
docker compose ps
```

3. Verify backend liveness and metrics endpoints:

```bash
curl -fsS http://localhost:${BACKEND_PORT:-3001}/api/health
curl -fsS http://localhost:${BACKEND_PORT:-3001}/metrics
```

4. Confirm required metric names are present in `/metrics` output:

- `scenario_runs_total`
- `scenario_run_duration_seconds`
- `http_requests_total`

5. Exercise scenario flows to produce logs/metrics across statuses:

```bash
curl -fsS -X POST http://localhost:${BACKEND_PORT:-3001}/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"success","name":"obs-check-success"}'
curl -sS -o /dev/null -w "%{http_code}\n" -X POST http://localhost:${BACKEND_PORT:-3001}/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"validation_error","name":"obs-check-validation"}'
curl -sS -o /dev/null -w "%{http_code}\n" -X POST http://localhost:${BACKEND_PORT:-3001}/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"system_error","name":"obs-check-system"}'
```

6. Inspect backend logs for structured entries and error handling behavior:

```bash
docker compose logs --tail=200 backend
```

7. If Loki and Prometheus are running, verify they receive data:

```bash
curl -fsS --get 'http://localhost:9090/api/v1/query' --data-urlencode 'query=scenario_runs_total'
curl -fsS --get 'http://localhost:3102/loki/api/v1/query_range' --data-urlencode 'query={app="signal-lab"} | json' --data-urlencode 'limit=5'
```

## Pass Criteria

- `docker compose config --quiet` exits successfully.
- Backend service is running.
- `GET /api/health` returns success.
- `GET /metrics` returns Prometheus text with required metric names.
- Scenario runs generate expected status mix (`200`, `400`, `500`) without backend crash loops.
- Backend logs remain structured JSON and do not expose secrets, DSNs, tokens, or raw request bodies.

## Final Response

Return:

- Overall status: `pass`, `degraded`, or `fail`.
- Exact commands run.
- Service status summary from `docker compose ps`.
- Health result and metrics result.
- Confirmation for required metric names.
- Log findings (including any Sentry/error-related signals visible in logs).
- Concrete remediation steps for every failed check.
