# Signal Lab

Platform foundation and observability demo for Signal Lab.

## Prerequisites

- Docker with Docker Compose
- Node.js 22 if you want to run commands outside Docker

## Run

```bash
cp .env.example .env
docker compose up -d
```

The frontend is available at `http://localhost:3000`.
The backend is available at `http://localhost:3001`.
Grafana is available at `http://localhost:3100` (anonymous Viewer; admin login `admin` / `admin`).
Prometheus is available at `http://localhost:9090`.
Loki HTTP API is available at `http://localhost:3102` (containers reach it as `loki:3100`).

`slow_request` waits for `SLOW_REQUEST_TIMEOUT_MS`; the default is `5000`.

## Check

```bash
curl http://localhost:3001/api/health
open http://localhost:3000
curl http://localhost:3001/api/docs
curl -X POST http://localhost:3001/api/scenarios/run \
  -H 'Content-Type: application/json' \
  -d '{"type":"success","name":"Smoke test"}'
curl -X POST http://localhost:3001/api/scenarios/run \
  -H 'Content-Type: application/json' \
  -d '{"type":"slow_request"}'
curl http://localhost:3001/metrics
```

Expected health response:

```json
{"status":"ok","timestamp":"2026-04-27T00:00:00.000Z"}
```

Swagger UI is served from `http://localhost:3001/api/docs`.

The frontend scenario runner uses:

- `GET /api/health` for API status.
- `POST /api/scenarios/run` for scenario execution.
- `GET /api/scenarios/runs` for the latest 20 persisted runs.

## Database

PostgreSQL 16 runs in Docker on `localhost:5432`. Prisma migrations are applied on backend container startup with:

```bash
npm run prisma:deploy
```

If local PostgreSQL already uses port `5432`, set another host port before starting Docker:

```bash
POSTGRES_PORT=55432 docker compose up -d
```

For local development outside Docker:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run backend:dev
```

## Observability stack

`docker compose up -d` also starts Prometheus, Loki, Promtail, and Grafana.

- Prometheus scrapes `backend:3001/metrics` every 5s.
- Promtail discovers containers labeled `com.signal-lab.observe=true` (the backend), parses the JSON log lines emitted by `JsonLogger`, and ships them to Loki with the labels `app="signal-lab"`, `service`, `level`, `context`, and `scenarioType`.
- Grafana is provisioned with Prometheus and Loki datasources plus the dashboard **Signal Lab — Scenario Runs** (folder *Signal Lab*), which has panels for *Scenario Runs by Type*, *Latency Distribution* (p50/p95/p99 from `scenario_run_duration_seconds`), *Error Rate by status*, and a Loki logs panel.

### Verification walkthrough

```bash
docker compose up -d

# 1. Trigger one of each scenario from the UI or via curl.
curl -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"success"}'
curl -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"validation_error"}' || true
curl -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"system_error"}' || true

# 2. Confirm Prometheus has the counters.
curl -s http://localhost:3001/metrics | grep '^scenario_runs_total'
curl -s 'http://localhost:9090/api/v1/query?query=scenario_runs_total' | jq

# 3. Confirm Loki ingested the JSON logs.
curl -s --get 'http://localhost:3102/loki/api/v1/query_range' \
  --data-urlencode 'query={app="signal-lab"} | json' \
  --data-urlencode 'limit=5' | jq

# 4. Open Grafana and the dashboard.
open http://localhost:3100/d/signal-lab-scenario-runs
```

### Sentry

Sentry is optional. Set `SENTRY_DSN` in `.env` before `docker compose up -d` to capture `system_error` exceptions; leaving it empty disables event delivery.

## Stop

```bash
docker compose down
```
