# Signal Lab

Signal Lab — демо-платформа для сценариев backend-ошибок и наблюдаемости (PRD 001/002), с дополнительным AI-слоем для Cursor (PRD 003) и отдельным PRD на orchestrator skill (PRD 004).

## Что в репозитории

```text
signal-lab/
├── apps/
│   ├── frontend/    # Next.js App Router
│   └── backend/     # NestJS
├── prisma/          # Prisma schema + migrations
├── observability/   # Prometheus, Loki, Promtail, Grafana provisioning
├── prds/            # PRD 001..004
└── docker-compose.yml
```

## Стек

- Frontend: Next.js, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form.
- Backend: NestJS, TypeScript strict, Swagger.
- Database: PostgreSQL 16 + Prisma.
- Observability: Prometheus, Loki, Promtail, Grafana, Sentry.
- Local runtime: Docker Compose.

## Предусловия

- Docker + Docker Compose.
- Node.js 22 (только если запускаете вне Docker).

## Быстрый старт

```bash
cp .env.example .env
docker compose up -d
```

Сервисы по умолчанию:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:3001`
- Swagger: `http://localhost:3001/api/docs`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3100`
- Loki HTTP API: `http://localhost:3102`
- PostgreSQL: `localhost:5432`

## Проверка (PRD 001)

```bash
curl -s http://localhost:3001/api/health
curl -s http://localhost:3001/api/docs > /dev/null
curl -s http://localhost:3001/metrics | head -n 20
curl -s -X POST http://localhost:3001/api/scenarios/run \
  -H 'Content-Type: application/json' \
  -d '{"type":"success","name":"Smoke test"}'
```

Ожидаемый health-ответ:

```json
{"status":"ok","timestamp":"2026-04-27T00:00:00.000Z"}
```

## Сценарии (PRD 002)

`POST /api/scenarios/run` принимает `{ "type": "...", "name?": "..." }`.
`slow_request` использует `SLOW_REQUEST_TIMEOUT_MS` (по умолчанию `5000` мс).

- `success` -> `200`, успешный run.
- `validation_error` -> `400`.
- `system_error` -> `500` + capture в Sentry (если задан `SENTRY_DSN`).
- `slow_request` -> `200` после искусственной задержки.
- `teapot` (пасхальный сценарий) -> `418`, тело `{ "signal": 42, "message": "I'm a teapot" }`, metadata `{ "easter": true }`.

Frontend использует:

- `GET /api/health` (статус API).
- `POST /api/scenarios/run` (запуск сценария).
- `GET /api/scenarios/runs` (последние 20 запусков).

## База данных (Prisma)

Модель `ScenarioRun` (см. `prisma/schema.prisma`) соответствует требованиям PRD:

- `id`, `type`, `status`, `duration`, `error`, `metadata`, `createdAt`.

Миграции применяются в контейнере backend при старте:

```bash
npm run prisma:generate
npm run prisma:deploy
```

## Наблюдаемость (PRD 002)

После `docker compose up -d` поднимаются `prometheus`, `loki`, `promtail`, `grafana`.

- Prometheus скрейпит `backend:3001/metrics`.
- Promtail отправляет JSON-логи backend в Loki.
- Grafana провижинится с datasource для Prometheus и Loki и дашбордом `Signal Lab — Scenario Runs`.

Обязательные метрики:

- `scenario_runs_total`
- `scenario_run_duration_seconds`
- `http_requests_total`

### Verification walkthrough (PRD 002)

```bash
docker compose up -d

# 1) Запустить несколько сценариев:
curl -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"success"}'
curl -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"validation_error"}' || true
curl -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"system_error"}' || true
curl -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"slow_request"}'

# 2) Проверить метрики:
curl -s http://localhost:3001/metrics | grep -E 'scenario_runs_total|scenario_run_duration_seconds|http_requests_total'

# 3) Проверить Loki:
curl -s --get 'http://localhost:3102/loki/api/v1/query_range' \
  --data-urlencode 'query={app="signal-lab"} | json' \
  --data-urlencode 'limit=5'
```

Откройте Grafana: `http://localhost:3100/d/signal-lab-scenario-runs`.

Sentry опционален: задайте `SENTRY_DSN` в `.env`, иначе отправка событий отключена.

## AI-слой Cursor (PRD 003)

Текущая реализация в репозитории:

- Rules (`.cursor/rules/`):
  - `stack-constraints.mdc`
  - `observability-conventions.mdc`
  - `prisma-patterns.mdc`
  - `frontend-patterns.mdc`
  - `error-handling.mdc`
- Commands (`.cursor/commands/`):
  - `/add-endpoint`
  - `/health-check`
- Plugins (`.cursor/settings.json`):
  - `shadcn`
  - `prisma`

Статус относительно PRD 003:

- Требование по rules (>=5) выполнено.
- Требование по commands (>=3) пока не выполнено: сейчас 2 команды.
- Папка `.cursor/skills/` (custom skills) отсутствует.
- Hooks в `.cursor` не добавлены.
- Marketplace skills (>=6) отдельно не задекларированы.

## Orchestrator skill (PRD 004)

PRD 004 описывает orchestrator в `.cursor/skills/signal-lab-orchestrator/`. На текущий момент эта структура в репозитории не создана.

## Остановка

```bash
docker compose down
```
