# Signal Lab — чеклист сдачи

Заполни этот файл перед сдачей. Он поможет интервьюеру быстро проверить решение.

---

## Репозиторий

- **URL**: `https://github.com/odubinkin/Signal-Lab`
- **Ветка**: `main`
- **Время работы** (приблизительно): `7` часов

---

## Запуск

```bash
# Команда запуска:
cp .env.example .env
docker compose up -d

# Команда проверки:
curl -fsS http://localhost:3001/api/health
curl -fsS http://localhost:3001/metrics

# Команда остановки:
docker compose down
```

**Предусловия**: Docker + Docker Compose, Node.js 22 если запускать npm-команды вне Docker.

---

## Стек — подтверждение использования

| Технология | Используется? | Где посмотреть |
|-----------|:------------:|----------------|
| Next.js (App Router) | ☑ | `apps/frontend/app/layout.tsx`, `apps/frontend/app/page.tsx` |
| shadcn/ui | ☑ | `apps/frontend/app/page.tsx` импортирует `Button`, `Card`, `Badge`, `Input`, `Select`; реализации находятся в `apps/frontend/components/ui/` |
| Tailwind CSS | ☑ | `apps/frontend/app/page.tsx` использует utility-классы Tailwind; токены и стили находятся в `apps/frontend/app/globals.css` |
| TanStack Query | ☑ | `apps/frontend/components/query-provider.tsx`; `useQuery`, `useMutation`, `useQueryClient` в `apps/frontend/app/page.tsx` |
| React Hook Form | ☑ | `useForm` и `Controller` в `apps/frontend/app/page.tsx` |
| NestJS | ☑ | `@Module` в `apps/backend/src/app.module.ts`; маршруты `@Controller` в `apps/backend/src/health/health.controller.ts`, `apps/backend/src/scenario-runs/scenario-runs.controller.ts`, `apps/backend/src/metrics/metrics.controller.ts` |
| PostgreSQL | ☑ | сервис `postgres` и настройка `DATABASE_URL` в `docker-compose.yml`; источник данных Prisma с провайдером PostgreSQL в `prisma/schema.prisma` |
| Prisma | ☑ | `PrismaService` в `apps/backend/src/prisma/prisma.service.ts`; `ScenarioRunsService` использует `prisma.scenarioRun` в `apps/backend/src/scenario-runs/scenario-runs.service.ts` |
| Sentry | ☑ | `Sentry.init` и capture при старте в `apps/backend/src/main.ts`; capture исключений в `apps/backend/src/shared/global-exception.filter.ts` и `apps/backend/src/scenario-runs/scenario-runs.service.ts` |
| Prometheus | ☑ | счётчики и гистограммы в `apps/backend/src/metrics/metrics.service.ts`; маршрут `/metrics` в `apps/backend/src/metrics/metrics.controller.ts`; scrape-конфиг в `observability/prometheus/prometheus.yml` |
| Grafana | ☑ | панели и запросы дашборда в `observability/grafana/dashboards/signal-lab.json`; источники данных в `observability/grafana/provisioning/datasources/datasources.yml` |
| Loki | ☑ | Promtail отправляет логи в Loki через `observability/promtail/promtail-config.yml`; источник данных и дашборд для Loki находятся в `observability/grafana/provisioning/datasources/datasources.yml` и `observability/grafana/dashboards/signal-lab.json` |

---

## Проверка наблюдаемости

Опиши, как интервьюер может проверить каждый сигнал:

| Сигнал | Как воспроизвести | Где посмотреть результат |
|--------|-------------------|------------------------|
| метрика Prometheus | `docker compose up -d`; `curl -s -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"success","name":"prometheus-check"}'`; `curl -s http://localhost:3001/metrics | grep -E 'scenario_runs_total|scenario_run_duration_seconds|http_requests_total'` | `http://localhost:3001/metrics` и Prometheus `http://localhost:9090` |
| дашборд Grafana | `docker compose up -d`; `curl -s -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"success","name":"grafana-success"}'`; `curl -s -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"slow_request","name":"grafana-slow"}'`; `curl -s -o /dev/null -w '%{http_code}\n' -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"system_error","name":"grafana-error"}'` | `http://localhost:3100/d/signal-lab-scenario-runs` |
| лог Loki | `docker compose up -d`; `curl -s -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"success","name":"loki-check"}'`; `curl -s --get 'http://localhost:3102/loki/api/v1/query_range' --data-urlencode 'query={app="signal-lab"} | json' --data-urlencode 'limit=5'` | Loki HTTP API `http://localhost:3102` или Grafana Explore |
| исключение Sentry | Задать валидный `SENTRY_DSN` в `.env`; `docker compose up -d`; `curl -s -o /dev/null -w '%{http_code}\n' -X POST http://localhost:3001/api/scenarios/run -H 'Content-Type: application/json' -d '{"type":"system_error","name":"sentry-check"}'` | Проект Sentry, соответствующий `SENTRY_DSN` |

---

## AI-слой Cursor

### Пользовательские skills

| # | Skill | Назначение |
|---|-----------|-----------|
| 1 | `signal-lab-orchestrator` | Фазовое выполнение PRD: анализ, сканирование кодовой базы, планирование, декомпозиция, реализация, проверка и отчёт с состоянием в `.execution/<executionId>/context.json`. |
| 2 | `nestjs-best-practices` | Нетривиальная работа с backend/API в NestJS: границы модулей, DTO-валидация, конфигурация, жизненный цикл, безопасность и тестирование. |
| 3 | `next-best-practices` | Нетривиальная работа в Next.js: границы App Router, загрузка данных, кэширование, мутации, безопасность и развёртывание. |
| 4 | `tailwind-design-system` | Токены Tailwind, варианты компонентов, ограничения поиска классов и сборки. |
| 5 | `docker-expert` | Dockerfile, Compose, усиление среды выполнения и доставка контейнеров. |

### Команды

| # | Команда | Что делает |
|---|---------|-----------|
| 1 | `/add-endpoint` | Создаёт заготовку маршрута NestJS с DTO-валидацией, Swagger, сохранением данных только через Prisma, метриками, JSON-логами и Sentry для неожиданных 5xx. |
| 2 | `/check-obs` | Проверяет подключение наблюдаемости: Docker-стек, health-проверку, метрики, сценарии, логи, Prometheus и Loki. |
| 3 | `/health-check` | Проверяет готовность Docker Compose-стека: сервисы, health-проверка backend, метрики, готовность PostgreSQL и логи. |
| 4 | `/run-prd` | Запускает workflow с планом перед реализацией для ограниченной реализации PRD с подтверждением до изменения файлов. |

### Hooks

| # | Hook | Какую проблему решает |
|---|------|----------------------|
| 1 | `schema-change-reminder.py` | После изменения Prisma schema напоминает про миграцию и пересборку Prisma Client/types. |
| 2 | `new-endpoint-observability-reminder.py` | После изменения endpoint/controller напоминает проверить метрики, структурированные логи и capture в Sentry. |
| 3 | `api-change-reminder.py` | После изменения API surface напоминает обновить Swagger/OpenAPI и frontend-контракты. |
| 4 | `pre-commit-secrets-guard.py` | Перед `git commit` блокирует staged diff с потенциальными захардкоженными секретами. |

### Rules

| # | Файл rule | Что фиксирует |
|---|----------|---------------|
| 1 | `stack-constraints.mdc` | Обязательный стек и запреты на несовместимые библиотеки, ORM и менеджеры состояния. |
| 2 | `observability-conventions.mdc` | Имена и labels метрик Prometheus, JSON-логи для Loki, поведение Sentry и совместимость дашбордов. |
| 3 | `prisma-patterns.mdc` | Паттерны Prisma/PostgreSQL, `ScenarioRun`, миграции, запрет других ORM и raw SQL. |
| 4 | `frontend-patterns.mdc` | Next.js App Router, TanStack Query, React Hook Form, shadcn/ui и UX наблюдаемости. |
| 5 | `error-handling.mdc` | Контракты ошибок backend/frontend, Sentry для 5xx и безопасные сообщения пользователю. |

### Marketplace-плагины

| # | Плагин | Зачем подключён |
|---|-------|----------------|
| 1 | `prisma` | Подключён для Prisma schema, Prisma Client, миграций и workflows базы данных через официальный плагин Cursor. |
| 2 | `shadcn` | Подключён для работы с shadcn/ui: поиск registry, установка компонентов исходным кодом, стилизация, исправление и аудит проекта. |
| 3 | `sentry` | Подключён для отладки и проверки поведения мониторинга ошибок через Sentry MCP, команды и skills. |

**Что закрыли пользовательские skills, чего нет в marketplace:** PRD-оркестрацию под Signal Lab, состояние в `.execution/<executionId>/context.json`, `signal: 42`, цикл проверки по доменам, локальные соглашения наблюдаемости, контракт `ScenarioRun`, Docker Compose как основную среду запуска и маршрутизация задач между моделями fast/default.

---

## Orchestrator

- **Путь к skill**: `.cursor/skills/signal-lab-orchestrator/SKILL.md`
- **Путь к context file** (пример): `.execution/2026-04-28-00-00/context.json`
- **Сколько фаз**: `7` (`analysis`, `codebase`, `planning`, `decomposition`, `implementation`, `review`, `report`)
- **Какие задачи для fast model**: `добавление Prisma schema/model, DTO-валидация, простые endpoints, подключение метрик/логов, простые UI-компоненты и формы`
- **Поддерживает resume**: да

---

## Скриншоты / видео

- [x] интерфейс приложения
- [x] дашборд Grafana с данными
- [x] логи Loki
- [x] ошибка Sentry

Файлы:

- интерфейс приложения: [screenshots/app.png](screenshots/app.png)
- дашборд Grafana с данными: [screenshots/grafana.png](screenshots/grafana.png)
- логи Loki: [screenshots/loki.png](screenshots/loki.png)
- ошибка Sentry: [screenshots/sentry.png](screenshots/sentry.png)

---

## Что не успел и что сделал бы первым при +4 часах

`Проработал бы более детально prds 003 и 004.`


