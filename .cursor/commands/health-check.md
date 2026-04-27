# /health-check

Check the local Docker Compose stack and report whether Signal Lab is ready for development.

## Prompt

You are working in the Signal Lab repository. Verify the local runtime using Docker Compose as the canonical entrypoint. Read these files before running checks:

- `.cursor/rules/stack-constraints.mdc`
- `.cursor/rules/observability-conventions.mdc`
- `docker-compose.yml`
- `package.json`
- `apps/backend/package.json`

Do not modify files. Do not read secrets or global user configuration. If Docker is unavailable, stop after reporting the blocker and the commands that could not run.

## Required Checks

1. Confirm Docker Compose can parse the stack:

```bash
docker compose config --quiet
```

2. Start or reuse the local stack:

```bash
docker compose up -d
```

3. Inspect service state and health:

```bash
docker compose ps
docker compose logs --tail=120 postgres
docker compose logs --tail=120 backend
```

4. Verify the backend health endpoint:

```bash
curl -fsS http://localhost:${BACKEND_PORT:-3001}/health
```

5. Verify Prometheus metrics are exposed and include required application metrics:

```bash
curl -fsS http://localhost:${BACKEND_PORT:-3001}/metrics
```

Required metric names to look for:

- `scenario_runs_total`
- `scenario_run_duration_seconds`
- `http_requests_total`

6. Confirm the database is reachable from the running stack:

```bash
docker compose exec -T postgres pg_isready -U ${POSTGRES_USER:-signal_lab} -d ${POSTGRES_DB:-signal_lab}
```

7. If backend startup failed or migrations look suspicious, inspect migration state without changing schema:

```bash
npm run prisma:generate
npx prisma migrate status --schema prisma/schema.prisma
```

## Pass Criteria

- `docker compose config --quiet` exits successfully.
- `postgres` is healthy or `pg_isready` reports accepting connections.
- `backend` is running.
- `/health` returns a successful response.
- `/metrics` returns Prometheus text and includes the required application metrics.
- Logs do not show repeated crash loops, migration failures, missing environment variables, or uncaught startup exceptions.

## Final Response

Return a concise status report with:

- Overall status: `pass`, `degraded`, or `fail`.
- Service states from `docker compose ps`.
- Health endpoint result.
- Metrics endpoint result and whether required metric names are present.
- Database readiness result.
- Relevant log findings.
- Exact commands run.
- Recommended next action for each failure.
