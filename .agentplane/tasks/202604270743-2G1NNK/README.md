---
id: "202604270743-2G1NNK"
title: "Build frontend observability demo"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T07:43:32.527Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T07:54:49.023Z"
  updated_by: "CODER"
  note: "Implemented frontend observability demo and minimal run-history API; local lint, build, backend focused tests, compose config, and Playwright render check completed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing approved frontend observability demo in the dedicated task worktree, with minimal backend support only for required run history."
events:
  -
    type: "status"
    at: "2026-04-27T07:43:45.931Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing approved frontend observability demo in the dedicated task worktree, with minimal backend support only for required run history."
  -
    type: "verify"
    at: "2026-04-27T07:54:49.023Z"
    author: "CODER"
    state: "ok"
    note: "Implemented frontend observability demo and minimal run-history API; local lint, build, backend focused tests, compose config, and Playwright render check completed."
doc_version: 3
doc_updated_at: "2026-04-27T07:54:49.027Z"
doc_updated_by: "CODER"
description: "Implement the Signal Lab frontend from PRD 001 and PRD 002 using Next.js scaffold utilities, Tailwind, shadcn-style UI, TanStack Query, and React Hook Form. Add only minimal backend/API support required for frontend run history."
sections:
  Summary: |-
    Build frontend observability demo
    
    Implement the Signal Lab frontend from PRD 001 and PRD 002 using Next.js scaffold utilities, Tailwind, shadcn-style UI, TanStack Query, and React Hook Form. Add only minimal backend/API support required for frontend run history.
  Scope: |-
    - In scope: Implement the Signal Lab frontend from PRD 001 and PRD 002 using Next.js scaffold utilities, Tailwind, shadcn-style UI, TanStack Query, and React Hook Form. Add only minimal backend/API support required for frontend run history.
    - Out of scope: unrelated refactors not required for "Build frontend observability demo".
  Plan: |-
    1. Start a branch_pr worktree for CODER from the approved task.
    2. Scaffold apps/frontend with the official Next.js creation utility, then align it with the repo workspace.
    3. Add Tailwind-based operational UI, shadcn-style Button/Card/Input/Select/Badge/toast components, TanStack Query provider, and React Hook Form scenario runner.
    4. Wire API reads/mutations for health, scenario execution, and latest run history; add a minimal backend latest-runs endpoint only if absent.
    5. Update Docker Compose, root scripts, env example, and README so docker compose starts frontend on localhost:3000 and backend remains on localhost:3001.
    6. Run declared verification checks, record evidence with agentplane verify, and open/update PR artifacts for the task branch.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T07:54:49.023Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented frontend observability demo and minimal run-history API; local lint, build, backend focused tests, compose config, and Playwright render check completed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T07:43:45.940Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Command: npm run frontend:lint | Result: pass | Evidence: eslint exited 0 | Scope: apps/frontend lint.
    Command: npm run frontend:build | Result: pass | Evidence: Next.js 16.2.4 compiled, typechecked, generated static pages | Scope: apps/frontend production build.
    Command: npm run backend:build | Result: pass | Evidence: nest build exited 0 | Scope: backend production compile after excluding spec files.
    Command: npm run test:unit -w apps/backend -- scenario-runs.service.spec.ts | Result: pass | Evidence: 6 tests passed | Scope: ScenarioRunsService including listRecent.
    Command: npm run test:integration -w apps/backend -- scenario-runs.int-spec.ts | Result: pass | Evidence: 9 tests passed | Scope: HTTP endpoints including GET /api/scenarios/runs.
    Command: docker compose config --quiet | Result: pass | Evidence: compose config exited 0 | Scope: Docker Compose syntax.
    Command: Playwright navigate http://127.0.0.1:3000 | Result: pass | Evidence: page title Signal Lab; scenario form, history panel, API badge, observability links rendered. Backend was not running during this visual check, so browser console showed expected connection refused fetches.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Build frontend observability demo

Implement the Signal Lab frontend from PRD 001 and PRD 002 using Next.js scaffold utilities, Tailwind, shadcn-style UI, TanStack Query, and React Hook Form. Add only minimal backend/API support required for frontend run history.

## Scope

- In scope: Implement the Signal Lab frontend from PRD 001 and PRD 002 using Next.js scaffold utilities, Tailwind, shadcn-style UI, TanStack Query, and React Hook Form. Add only minimal backend/API support required for frontend run history.
- Out of scope: unrelated refactors not required for "Build frontend observability demo".

## Plan

1. Start a branch_pr worktree for CODER from the approved task.
2. Scaffold apps/frontend with the official Next.js creation utility, then align it with the repo workspace.
3. Add Tailwind-based operational UI, shadcn-style Button/Card/Input/Select/Badge/toast components, TanStack Query provider, and React Hook Form scenario runner.
4. Wire API reads/mutations for health, scenario execution, and latest run history; add a minimal backend latest-runs endpoint only if absent.
5. Update Docker Compose, root scripts, env example, and README so docker compose starts frontend on localhost:3000 and backend remains on localhost:3001.
6. Run declared verification checks, record evidence with agentplane verify, and open/update PR artifacts for the task branch.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T07:54:49.023Z — VERIFY — ok

By: CODER

Note: Implemented frontend observability demo and minimal run-history API; local lint, build, backend focused tests, compose config, and Playwright render check completed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T07:43:45.940Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Command: npm run frontend:lint | Result: pass | Evidence: eslint exited 0 | Scope: apps/frontend lint.
Command: npm run frontend:build | Result: pass | Evidence: Next.js 16.2.4 compiled, typechecked, generated static pages | Scope: apps/frontend production build.
Command: npm run backend:build | Result: pass | Evidence: nest build exited 0 | Scope: backend production compile after excluding spec files.
Command: npm run test:unit -w apps/backend -- scenario-runs.service.spec.ts | Result: pass | Evidence: 6 tests passed | Scope: ScenarioRunsService including listRecent.
Command: npm run test:integration -w apps/backend -- scenario-runs.int-spec.ts | Result: pass | Evidence: 9 tests passed | Scope: HTTP endpoints including GET /api/scenarios/runs.
Command: docker compose config --quiet | Result: pass | Evidence: compose config exited 0 | Scope: Docker Compose syntax.
Command: Playwright navigate http://127.0.0.1:3000 | Result: pass | Evidence: page title Signal Lab; scenario form, history panel, API badge, observability links rendered. Backend was not running during this visual check, so browser console showed expected connection refused fetches.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
