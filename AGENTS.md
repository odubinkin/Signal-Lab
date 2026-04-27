# AGENTS Gateway (Cursor)

## Source Of Truth Priority

1. Enforcement surfaces: tests, linters, build checks, runtime validations.
2. This `AGENTS.md` (global constraints and routing contract).
3. Project rules: `.cursor/rules/*.mdc`.
4. Skills: `.cursor/skills/**/SKILL.md`.
5. Hooks: `.cursor/hooks.json` and `.cursor/hooks/*`.
6. Slash commands: `.cursor/commands/*.md`.
7. Cursor plugin toggles: `.cursor/settings.json`.

If sources conflict, follow the higher-priority item.

## Global Constraints

- Keep all read/write actions inside this repository unless the user explicitly approves otherwise.
- Never access global user secrets/config (`~`, `/etc`, keychains, SSH keys, global git config) without explicit user approval.
- Do not mutate files before explicit user approval.
- For non-trivial work, use a plan-first flow and keep scope/checkpoints explicit.
- If scope or risk materially changes, stop and request re-approval.

## Routing Contract

### Always load first

- `.cursor/rules/stack-constraints.mdc`: load on every implementation task to enforce the repository stack and prevent incompatible dependency or architecture choices.

### Then load only task-relevant local rules

- `.cursor/rules/error-handling.mdc`: use when changing error contracts, exception handling, request validation outcomes, or user-facing failure behavior.
- `.cursor/rules/frontend-patterns.mdc`: use for frontend UI, state-management, forms, and API-integration changes to stay aligned with project conventions.
- `.cursor/rules/observability-conventions.mdc`: use when changing metrics, structured logging, error monitoring, or observability-related runtime wiring.
- `.cursor/rules/prisma-patterns.mdc`: use when changing database schema, migrations, or persistence-layer behavior.

### Skills

- `.cursor/skills/signal-lab-orchestrator/SKILL.md`: primary choice for PRD slices and other multi-step tasks that require phased orchestration, delegation, and resumable execution state.
- `.cursor/skills/nestjs-best-practices/SKILL.md`: use for non-trivial backend/API work in NestJS, especially module boundaries, DTO validation, lifecycle behavior, and backend testing.
- `.cursor/skills/next-best-practices/SKILL.md`: use for non-trivial Next.js route/component/data-flow changes, including caching/revalidation and deployment-sensitive decisions.
- `.cursor/skills/tailwind-design-system/SKILL.md`: use when evolving design tokens, reusable UI primitives, variants, and Tailwind build/source-detection constraints.
- `.cursor/skills/docker-expert/SKILL.md`: use for Dockerfile, Compose, image hardening, or CI container delivery work where runtime security and reproducibility matter.

### Hooks

Project hooks are configured and triggered automatically by Cursor. Always comply with hook decisions and messages during execution.

### Plugins

- `shadcn`: use for frontend component scaffolding and UI consistency tasks that should follow shadcn-compatible patterns.
- `prisma`: use for schema/client/migration workflows and persistence-aware code changes in backend paths.
- `sentry`: use when implementing or validating exception capture and error-monitoring behavior for unexpected failures.

## Execution Standard

- Use the smallest sufficient context (`@file`, `@folder`) and avoid irrelevant context bloat.
- Prefer reversible, scoped changes over broad refactors.
- Verify touched behavior with focused checks and report residual risk if any check is skipped.
- Keep outputs and repository artifacts in English by default unless the user explicitly requests another language for a specific artifact.
