# /run-prd

Execute a PRD slice end-to-end in Signal Lab using a plan-first Cursor workflow.

## Prompt

You are working in the Signal Lab repository. Implement only the requested PRD scope using local repository context and existing project conventions.

Before any mutation:

1. Read the target PRD file and related local context (`README.md`, `.cursor/rules/*.mdc`, relevant source files).
2. Run preflight:

```bash
git status --short --untracked-files=no
git rev-parse --abbrev-ref HEAD
```

## Input Contract

Resolve these inputs from the user message. Ask one concise clarification question only if any required input is missing:

- PRD path (for example `prds/003_prd-cursor-ai-layer.md`).
- Requested scope inside the PRD (for example `R3.Commands` only).
- Constraints or exclusions.
- Expected output format (code/docs/config, or mixed).

## Required Execution Flow

1. Build a concrete plan for the requested PRD slice and obtain explicit user approval before mutating files.
2. Implement only in-scope files; if scope drifts, stop and request re-approval.
3. Prefer small, composable edits aligned with existing code patterns.
4. Run the smallest relevant verification set for touched areas.
5. If checks fail, fix and re-run until stable or report blocker with residual risk.
6. Summarize changed files, what was verified, and what remains out of scope.

## Guardrails

- Do not mutate files before explicit user approval.
- Keep edits in-repo only unless user explicitly approves outside-repo access.
- Do not introduce new frameworks or architectural patterns that conflict with `.cursor/rules`.
- Prefer referencing canonical files over inventing new structure.

## Final Response

Return:

- PRD section implemented.
- Files changed.
- Verification commands and results.
- Any skipped checks with blocker and residual risk.
- Whether remaining PRD items are out of scope or still pending.
