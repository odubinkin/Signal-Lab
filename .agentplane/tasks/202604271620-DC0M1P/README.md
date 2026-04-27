---
id: "202604271620-DC0M1P"
title: "Align observability links and env ports"
result_summary: "Observability links now use NEXT_PUBLIC base URLs with Sentry fallback; run history refresh is configurable via NEXT_PUBLIC env; backend accepts SENTRY_PROJECT_SLUG metadata with default signal-lab."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T16:20:32.817Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T16:28:53.921Z"
  updated_by: "CODER"
  note: "Updated observability links to use NEXT_PUBLIC service URLs, removed BACKEND_HOST_PORT mapping, added Sentry slug env wiring and dynamic run-history refresh. Validation: npm run lint -w apps/frontend; npm run build -w apps/frontend; docker compose config."
commit:
  hash: "79ea141a3d4b147d603f1a43e5e4c2afe1af9901"
  message: "✅ JDZNKZ close: Ignored playwright mcp artifacts and committed lifecycle traceability updates. (202604271612-JDZNKZ) [meta]"
comments:
  -
    author: "CODER"
    body: "Start: Implement env-driven observability links and refresh interval, remove BACKEND_HOST_PORT coupling, and update frontend wiring with safe fallbacks."
  -
    author: "CODER"
    body: "Verified: Completed env-driven observability links, removed BACKEND_HOST_PORT coupling, added Sentry slug wiring, and validated frontend/build plus compose config."
events:
  -
    type: "status"
    at: "2026-04-27T16:20:35.589Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement env-driven observability links and refresh interval, remove BACKEND_HOST_PORT coupling, and update frontend wiring with safe fallbacks."
  -
    type: "verify"
    at: "2026-04-27T16:28:53.921Z"
    author: "CODER"
    state: "ok"
    note: "Updated observability links to use NEXT_PUBLIC service URLs, removed BACKEND_HOST_PORT mapping, added Sentry slug env wiring and dynamic run-history refresh. Validation: npm run lint -w apps/frontend; npm run build -w apps/frontend; docker compose config."
  -
    type: "status"
    at: "2026-04-27T16:36:32.584Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Completed env-driven observability links, removed BACKEND_HOST_PORT coupling, added Sentry slug wiring, and validated frontend/build plus compose config."
doc_version: 3
doc_updated_at: "2026-04-27T16:36:32.584Z"
doc_updated_by: "CODER"
description: "Remove BACKEND_HOST_PORT, add Sentry URL parts envs, wire frontend observability links and dynamic run history refresh interval"
sections:
  Summary: |-
    Align observability links and env ports
    
    Remove BACKEND_HOST_PORT, add Sentry URL parts envs, wire frontend observability links and dynamic run history refresh interval
  Scope: |-
    - In scope: Remove BACKEND_HOST_PORT, add Sentry URL parts envs, wire frontend observability links and dynamic run history refresh interval.
    - Out of scope: unrelated refactors not required for "Align observability links and env ports".
  Plan: "1) Remove BACKEND_HOST_PORT and align backend published host port with BACKEND_PORT in env docs and compose. 2) Add Sentry dashboard env inputs (SENTRY_BASE_URL, SENTRY_ORG_SLUG, SENTRY_PROJECT_SLUG) and expose as NEXT_PUBLIC envs for frontend. 3) Update frontend Observability Links: Grafana dashboard deep link using env-derived port, rename Backend Metrics to Prometheus and point to backend metrics endpoint via env-derived port, Loki query link to Grafana Loki panel, Sentry link generated from Sentry envs with text fallback. 4) Add env-controlled run history refresh interval and replace hardcoded 5s. 5) Run targeted frontend checks and record verification evidence."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T16:28:53.921Z — VERIFY — ok
    
    By: CODER
    
    Note: Updated observability links to use NEXT_PUBLIC service URLs, removed BACKEND_HOST_PORT mapping, added Sentry slug env wiring and dynamic run-history refresh. Validation: npm run lint -w apps/frontend; npm run build -w apps/frontend; docker compose config.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T16:20:35.597Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Align observability links and env ports

Remove BACKEND_HOST_PORT, add Sentry URL parts envs, wire frontend observability links and dynamic run history refresh interval

## Scope

- In scope: Remove BACKEND_HOST_PORT, add Sentry URL parts envs, wire frontend observability links and dynamic run history refresh interval.
- Out of scope: unrelated refactors not required for "Align observability links and env ports".

## Plan

1) Remove BACKEND_HOST_PORT and align backend published host port with BACKEND_PORT in env docs and compose. 2) Add Sentry dashboard env inputs (SENTRY_BASE_URL, SENTRY_ORG_SLUG, SENTRY_PROJECT_SLUG) and expose as NEXT_PUBLIC envs for frontend. 3) Update frontend Observability Links: Grafana dashboard deep link using env-derived port, rename Backend Metrics to Prometheus and point to backend metrics endpoint via env-derived port, Loki query link to Grafana Loki panel, Sentry link generated from Sentry envs with text fallback. 4) Add env-controlled run history refresh interval and replace hardcoded 5s. 5) Run targeted frontend checks and record verification evidence.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T16:28:53.921Z — VERIFY — ok

By: CODER

Note: Updated observability links to use NEXT_PUBLIC service URLs, removed BACKEND_HOST_PORT mapping, added Sentry slug env wiring and dynamic run-history refresh. Validation: npm run lint -w apps/frontend; npm run build -w apps/frontend; docker compose config.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T16:20:35.597Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
