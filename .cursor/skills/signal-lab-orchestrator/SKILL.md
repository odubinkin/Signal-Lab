---
name: signal-lab-orchestrator
description: Use when implementing a Signal Lab PRD slice end-to-end through a phased, resumable pipeline. Delegates work to subagents, keeps context in execution files, and optimizes for fast-model task execution.
---

Use this skill when the user asks to execute a PRD in Signal Lab, especially for multi-step delivery that should be decomposed, delegated, resumable, and reviewable.

## When To Use

- The task is a PRD or a PRD section, not a single-file tweak.
- You need decomposition, dependency-aware execution, and explicit status tracking.
- You want most implementation tasks completed by a fast model and only escalations to default model.

## Input Contract

Required inputs:
- PRD source as file path or pasted text.
- Scope boundary (full PRD or selected sections).

Optional inputs:
- Exclusions.
- Time budget.
- Verification strictness.

If required input is missing, ask one short clarifying question.

## Core Operating Rules

1. The orchestrator coordinates and delegates through the Task tool. It does not perform implementation directly unless delegation is impossible.
2. Persist state in files under `.execution/<executionId>/` so the run can resume after interruption.
3. Keep main-chat context small. Store heavy outputs in execution files and reference them.
4. Do not rely on repository-specific task CLIs or process frameworks.

## Delegation Protocol (Strict)

For every delegated action, run this sequence in order:
1. Load `context.json` and confirm `currentPhase`.
2. Write phase/task status to `in_progress` before delegation.
3. Send a bounded prompt with explicit input and output contracts.
4. Accept result only if it matches the required output contract.
5. Persist outputs to execution files and update `context.json`.
6. Run gate checks for the current phase.
7. Only after passing gates, move to the next phase.

If a delegate response is incomplete or off-contract, do not advance phase status. Re-run delegation with a corrective prompt.

## Execution Workspace

Create:
- `.execution/<executionId>/context.json`
- `.execution/<executionId>/analysis.md`
- `.execution/<executionId>/plan.md`
- `.execution/<executionId>/tasks.json`
- `.execution/<executionId>/review.md`
- `.execution/<executionId>/report.md`

`<executionId>` format: `YYYY-MM-DD-HH-mm` in local time.

If `.execution/latest` exists, use it to find the latest run quickly. Keep it updated to the active execution id.

## Phase Pipeline

Run phases in order, recording each transition in `context.json`.

1. `analysis` (model: fast)
- Extract requirements, constraints, acceptance criteria, and out-of-scope items.
- Save structured findings to `analysis.md`.

2. `codebase` (model: fast)
- Map relevant modules, files, and integration points.
- Save findings to `analysis.md` under a separate codebase section.

3. `planning` (model: default)
- Produce implementation strategy, risks, and verification plan.
- Save to `plan.md`.

4. `decomposition` (model: default)
- Produce atomic tasks with dependencies and domain ownership.
- Save canonical task list to `tasks.json`.

5. `implementation` (model: fast for most tasks, default for escalations)
- Execute tasks by dependency-ready groups.
- Update task status in `tasks.json` and aggregate progress into `context.json`.

6. `review` (model: fast, read-only reviewers)
- Review by domain (`database`, `backend`, `frontend`) with a retry loop.
- Save review output and retry details in `review.md`.

7. `report` (model: fast)
- Create a concise final execution report in `report.md` and chat response.

## Phase Gates (Mandatory Exit Criteria)

Do not transition a phase from `in_progress` to `completed` unless all checks pass:

- `analysis`: requirements, constraints, acceptance criteria, and open questions are present in `analysis.md`.
- `codebase`: relevant files, integration points, and reuse patterns are documented in `analysis.md`.
- `planning`: milestones, risk controls, and verification plan exist in `plan.md`.
- `decomposition`: `tasks.json` exists and every task has required fields.
- `implementation`: all dependency-ready tasks processed; each task is `completed` or `failed` with attempts tracked.
- `review`: each domain has reviewer outcome; failed domains have retry history (max 3).
- `report`: final summary includes totals, model usage, failures, retries, and next steps.

If any gate fails, keep phase `in_progress` and continue remediation.

## Task Decomposition Standard

Each task must include:
- `id`, `title`, `domain`, `description`
- `dependencies` (task ids)
- `complexity`: `low | medium | high`
- `model`: `fast | default`
- `skill`: recommended implementation skill
- `status`: `pending | in_progress | completed | failed`
- `attempts`: integer

Task quality bar:
- 5-10 minutes each.
- 1-3 sentence description.
- Clear completion condition.

## Skill Routing

When creating tasks, assign a concrete implementation skill where possible:
- Backend/API tasks: `nestjs-best-practices`
- Frontend/UI tasks: `next-best-practices`, `tailwind-design-system`
- Containers/runtime tasks: `docker-expert`
- Cross-cutting architecture/planning: use default model without forcing a domain skill

If marketplace or project-specific skills are available for a task domain, prefer those over generic instructions.

## Model Selection Policy

Use `fast` by default for:
- Prisma schema field/model additions.
- DTOs, validation wiring, simple endpoints.
- Straightforward metrics and structured logging additions.
- UI components/forms without complex architecture.

Use `default` for:
- Architecture and planning.
- Multi-system orchestration or tricky business logic.
- Conflict-heavy integration work.
- Final quality trade-off decisions.

Target ratio: at least 80% tasks assigned to `fast` when feasible.

## Review Loop Contract

Per domain (`database`, `backend`, `frontend`):
1. Run reviewer subagent in read-only mode.
2. If rejected, run implementer with concrete reviewer feedback.
3. Re-run reviewer.
4. Max 3 attempts per failed area.
5. On persistent failure, mark affected tasks `failed` and continue.

Record each attempt in `context.json` and `review.md` with:
- `attemptNumber`
- `reviewerVerdict`
- `fixTaskIds`
- `result` (`passed` or `failed`)

## Resume And Retry

On start:
1. If a matching execution exists and `status != completed`, resume from `currentPhase`.
2. Skip already completed phases.
3. Retry only failed or interrupted tasks.
4. Never reset completed tasks unless user explicitly requests rerun.

During resume, validate that required artifacts for completed phases still exist. If artifacts are missing, set that phase to `in_progress` and rebuild it.

## Final Report Format

Return a short report with:
- Overall status.
- Task totals: completed, failed, retries.
- Duration estimate.
- Model usage counts (`fast` vs `default`).
- Completed highlights.
- Failed items.
- Next actions.

## File References

- Prompt and handoff templates: `COORDINATION.md`
- Usage examples: `EXAMPLE.md`
- Context schema starter: `references/context.template.json`
