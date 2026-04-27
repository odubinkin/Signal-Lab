# AI-слой Cursor для Signal Lab

Документ описывает AI-слой репозитория по PRD 003 и PRD 004. Его задача — дать новому чату Cursor достаточный reusable context: стек, ограничения, workflows, observability conventions и правила выполнения PRD через orchestrator.

## Источники требований

- PRD 003: `prds/003_prd-orchestrator.md` — Cursor AI Layer: rules, skills, commands, hooks, marketplace/plugins и документация.
- PRD 004: `prds/004_prd-orchestrator.md` — Small-Model PRD Orchestrator: resumable skill для phased PRD execution.
- Gateway: `AGENTS.md` и `.agentplane/AGENTS.md` — process-policy, approval gates и task lifecycle.
- Обязательное правило для implementation tasks: `.cursor/rules/stack-constraints.mdc`.

## Что закрывает AI-слой

- Фиксирует разрешённый стек и запрещённые альтернативы.
- Даёт правила для backend, frontend, Prisma, observability и error handling.
- Подключает marketplace-плагины там, где они доступны в Cursor.
- Компенсирует недостающие marketplace skills локальными custom/project skills.
- Даёт команды и hooks для типовых задач и частых ошибок.
- Реализует PRD orchestrator с persisted state, resume/retry и fast/default model routing.

## Rules (`.cursor/rules/`)

| Rule file | Когда загружать | Что фиксирует |
|---|---|---|
| `.cursor/rules/stack-constraints.mdc` | Всегда на implementation task | Обязательный стек: Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Hook Form, NestJS, PostgreSQL 16, Prisma, Docker Compose, Prometheus, Loki, Sentry. Запрещает альтернативные state/query libraries и ORM. |
| `.cursor/rules/observability-conventions.mdc` | Endpoint, scenario execution, metrics, logs, dashboards, Sentry | Имена метрик `scenario_runs_total`, `scenario_run_duration_seconds`, `http_requests_total`, low-cardinality labels, JSON logs для Loki, Sentry для unexpected 5xx. |
| `.cursor/rules/prisma-patterns.mdc` | Prisma schema, migrations, persistence | `ScenarioRun` contract, Prisma-only доступ к PostgreSQL, запрет raw SQL/других ORM, миграции и regenerate Prisma Client после schema changes. |
| `.cursor/rules/frontend-patterns.mdc` | Next.js frontend changes | App Router, TanStack Query для server state, React Hook Form для форм, shadcn/ui и Tailwind для UI, mutation-driven invalidation. |
| `.cursor/rules/error-handling.mdc` | API routes, exception filters, client requests, forms, user feedback | NestJS HTTP exceptions, consistent JSON error bodies, frontend non-2xx handling, safe UI messages, Sentry для unexpected 5xx. |

Rules разделены по зонам ответственности. Если rule конфликтует с тестом, линтером, build check или runtime validation, приоритет у enforcement surface.

## Marketplace-плагины (`.cursor/settings.json`)

В доступном Cursor marketplace я нашёл и подключил 3 релевантных плагина. Перечисленные в PRD 003 marketplace skills в точном виде не нашёл, поэтому их назначение закрыто локальными skills и rules ниже.

| Plugin | Описание | Что закрывает в Signal Lab |
|---|---|---|
| `prisma` | Официальный Prisma plugin для Cursor: MCP, rules, skills и automation для database development. В marketplace заявлено 40+ skills для Prisma CLI, Prisma Client и database workflows. | Усиливает Prisma schema/client/migration workflow и правило `.cursor/rules/prisma-patterns.mdc`. |
| `shadcn` | Плагин для shadcn/ui и design-system workflows: поиск registry, установка компонентов source-code, аудит проекта и работа с `components.json`. | Помогает scaffold/fix/style shadcn-compatible UI и дополняет frontend/design-system правила. |
| `sentry` | Плагин Sentry для debugging через MCP, commands и skills; в marketplace заявлены skills для разных платформ. | Помогает разбирать ошибки и поддерживает Sentry capture/error-monitoring conventions. |

## Custom и project skills (`.cursor/skills/`)

Marketplace-плагины закрывают общие возможности Prisma, shadcn/ui и Sentry. Локальные skills ниже нужны для проектных решений Signal Lab, которых нет в marketplace в готовом виде.

| Skill | Когда использовать | Что именно закрывает |
|---|---|---|
| `signal-lab-orchestrator` | Когда нужно выполнить PRD или его часть через управляемый pipeline. | Ведение `.execution/<executionId>/context.json`, фазы PRD 004, resume/retry, review loop по доменам, распределение задач между `fast` и `default` моделями. |
| `nestjs-best-practices` | Когда меняется backend/API на NestJS. | Границы модулей, разделение controller/service, DTO-валидация, error contracts, startup/config safety, backend-тесты и observability для endpoint-ов Signal Lab. |
| `next-best-practices` | Когда меняется frontend на Next.js. | App Router conventions, границы server/client components, TanStack Query для server state, мутации, кэширование, runtime config и безопасная интеграция с backend API. |
| `tailwind-design-system` | Когда меняются UI primitives, tokens, variants или Tailwind-классы. | Проектные UI-токены, варианты компонентов, состояния, responsive/accessibility checks и ограничения Tailwind source detection. |
| `docker-expert` | Когда меняются Dockerfile, Compose или runtime-контуры. | Docker Compose как основной запуск Signal Lab, dev Dockerfiles, воспроизводимость контейнеров, runtime hardening, секреты и проверки старта stack. |

## Commands (`.cursor/commands/`)

| Command | Назначение | Основные проверки/результат |
|---|---|---|
| `/add-endpoint` | Scaffold нового NestJS endpoint с observability conventions | DTO validation, Swagger, Prisma через `PrismaService`, JSON logs, Prometheus metrics, Sentry для 5xx, backend checks. |
| `/check-obs` | Проверить observability wiring локального Docker stack | Compose, `/api/health`, `/metrics`, scenario flows, backend logs, Prometheus query, Loki query. |
| `/health-check` | Проверить готовность Docker Compose stack к разработке | Compose parse/start, service states, backend health, metrics, PostgreSQL readiness, logs. |
| `/run-prd` | Plan-first выполнение PRD slice | Читает PRD и rules, требует approval до mutation, реализует scoped changes, запускает focused verification. |

## Hooks (`.cursor/hooks.json`, `.cursor/hooks/`)

| Hook | Trigger | Какую проблему решает |
|---|---|---|
| `schema-change-reminder.py` | `afterFileEdit` для `.prisma`/`prisma/schema.prisma` | Напоминает создать/применить миграцию и regenerate Prisma client/types после schema changes. |
| `new-endpoint-observability-reminder.py` | `afterFileEdit` для controller/route/resolver files | Напоминает проверить request metrics, structured logs и Sentry capture при добавлении endpoint. |
| `api-change-reminder.py` | `afterFileEdit` для controller/DTO/API/OpenAPI/Swagger paths | Напоминает обновить Swagger/OpenAPI и синхронизировать frontend API contracts. |
| `pre-commit-secrets-guard.py` | `beforeShellExecution` для `git commit` | Блокирует commit, если staged diff похож на hardcoded secret. |

Hooks пишут deduplicated reminders в `.cursor/hooks/.state/reminders.log`, чтобы не спамить одинаковыми сообщениями.

## Orchestrator skill по PRD 004

Основной файл: `.cursor/skills/signal-lab-orchestrator/SKILL.md`.

Дополнительные файлы:

- `.cursor/skills/signal-lab-orchestrator/COORDINATION.md` — prompt/handoff templates для фаз и universal delegate output contract.
- `.cursor/skills/signal-lab-orchestrator/EXAMPLE.md` — full PRD execution, scoped execution и resume examples.
- `.cursor/skills/signal-lab-orchestrator/references/context.template.json` — стартовая структура `context.json`.

### Когда использовать

Использовать orchestrator, если задача является PRD или PRD-секцией и требует multi-step delivery. Для single-file tweak orchestrator не нужен.

### Workspace и persisted state

При запуске создаётся:

```text
.execution/<executionId>/
├── context.json
├── analysis.md
├── plan.md
├── tasks.json
├── review.md
└── report.md
```

`context.json` хранит execution id, PRD path, current phase, phase statuses, `signal: 42`, model usage и tasks с domain/dependencies/complexity/model/skill/status/attempts.

### Фазы

| # | Фаза | Модель | Выход |
|---|---|---|---|
| 1 | `analysis` | `fast` | Requirements, constraints, acceptance criteria, open questions в `analysis.md`. |
| 2 | `codebase` | `fast` | Relevant files, integration points, reuse patterns в `analysis.md`. |
| 3 | `planning` | `default` | Milestones, risks, verification plan в `plan.md`. |
| 4 | `decomposition` | `default` | Atomic tasks в `tasks.json`. |
| 5 | `implementation` | `fast` для большинства задач, `default` для escalations | Dependency-ready task groups, обновление `tasks.json` и `context.json`. |
| 6 | `review` | `fast`, read-only | Domain reviews по `database`, `backend`, `frontend`, retry loop до 3 попыток. |
| 7 | `report` | `fast` | Totals, model usage, failures, retries и next actions в `report.md`. |

### Task decomposition и model routing

Каждая задача должна быть атомарной: 5-10 минут, описание 1-3 предложения, явные dependencies и completion condition. Обязательные поля: `id`, `title`, `domain`, `description`, `dependencies`, `complexity`, `model`, `skill`, `status`, `attempts`.

`fast` использовать для простых Prisma additions, DTO validation, simple endpoints, metrics/logging wiring и UI components/forms без сложной архитектуры. `default` использовать для planning, decomposition, complex business logic, multi-system integration и trade-off decisions. Цель PRD 004: 80%+ implementation tasks должны подходить для fast/small model, если scope это позволяет.

### Delegation, resume и review loop

Orchestrator координирует, а не реализует напрямую. Для каждой фазы он читает `context.json`, ставит статус `in_progress`, отправляет bounded prompt subagent, принимает только output по contract, сохраняет artifacts, обновляет `context.json` и проходит phase gate.

При resume orchestrator продолжает с `currentPhase`, пропускает completed phases и retry делает только для failed/interrupted tasks. Если artifact completed phase отсутствует, фаза возвращается в `in_progress` и пересобирается.

Review loop запускается по доменам `database`, `backend`, `frontend`: read-only reviewer, implementer с feedback при fail, повторная проверка, максимум 3 попытки. Persistent failures помечаются как `failed`, execution продолжается.

## Как проверять PRD 003

1. Открыть новый чат Cursor в репозитории.
2. Проверить `.cursor/rules/`, `.cursor/skills/`, `.cursor/commands/`, `.cursor/hooks.json` и `.cursor/settings.json`.
3. Вызвать `/add-endpoint` и убедиться, что prompt требует observability и error handling.
4. Вызвать `/check-obs` и убедиться, что команда делает Docker/metrics/logs/Loki/Prometheus walkthrough без изменения файлов.
5. Изменить endpoint/controller или Prisma schema в тестовом branch и проверить, что hooks выдают reminders.

## Как проверять PRD 004

1. В новом чате попросить: `Use signal-lab-orchestrator for prds/004_prd-orchestrator.md scoped to documentation only`.
2. Проверить создание `.execution/<executionId>/context.json`.
3. Убедиться, что phases идут в порядке `analysis -> codebase -> planning -> decomposition -> implementation -> review -> report`.
4. Проверить `tasks.json`: tasks должны быть atomic, иметь `complexity`, `model`, `skill`, dependencies и attempts.
5. Прервать выполнение и повторно попросить resume; orchestrator должен продолжить с `currentPhase`, не перевыполняя completed phases.
6. Проверить `report.md`: totals, failed/retries, model usage, completed highlights и next actions.
