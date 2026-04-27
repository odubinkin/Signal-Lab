# Signal Lab

Backend foundation for Signal Lab.

## Prerequisites

- Docker with Docker Compose
- Node.js 22 if you want to run commands outside Docker

## Run

```bash
cp .env.example .env
docker compose up -d
```

The backend is available at `http://localhost:3001`.

`slow_request` waits for `SLOW_REQUEST_TIMEOUT_MS`; the default is `5000`.

## Check

```bash
curl http://localhost:3001/api/health
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

## Stop

```bash
docker compose down
```
