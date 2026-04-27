---
id: "202604271647-WS7ZCH"
title: "Exit backend on DB bootstrap failure with Sentry capture"
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
  updated_at: "2026-04-27T16:47:20.889Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T16:48:33.849Z"
  updated_by: "CODER"
  note: "Implemented fail-fast bootstrap handling: DB/startup errors are captured to Sentry, flushed, and process exits with code 1; backend typecheck and unit tests passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Investigate backend bootstrap path, implement fail-fast DB startup behavior with Sentry capture, then verify with focused checks."
events:
  -
    type: "status"
    at: "2026-04-27T16:47:26.515Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Investigate backend bootstrap path, implement fail-fast DB startup behavior with Sentry capture, then verify with focused checks."
  -
    type: "verify"
    at: "2026-04-27T16:48:33.849Z"
    author: "CODER"
    state: "ok"
    note: "Implemented fail-fast bootstrap handling: DB/startup errors are captured to Sentry, flushed, and process exits with code 1; backend typecheck and unit tests passed."
doc_version: 3
doc_updated_at: "2026-04-27T16:48:33.858Z"
doc_updated_by: "CODER"
description: "If backend cannot connect to DB during startup, capture error to Sentry and terminate process with non-zero exit code instead of staying alive."
sections:
  Summary: |-
    Exit backend on DB bootstrap failure with Sentry capture
    
    If backend cannot connect to DB during startup, capture error to Sentry and terminate process with non-zero exit code instead of staying alive.
  Scope: |-
    - In scope: If backend cannot connect to DB during startup, capture error to Sentry and terminate process with non-zero exit code instead of staying alive.
    - Out of scope: unrelated refactors not required for "Exit backend on DB bootstrap failure with Sentry capture".
  Plan: "1) Locate backend startup bootstrap and current DB connection error path. 2) Ensure DB startup failure is reported to Sentry and then forces process termination with non-zero exit. 3) Add or update automated verification for startup failure behavior. 4) Run targeted checks and record verification results."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T16:48:33.849Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented fail-fast bootstrap handling: DB/startup errors are captured to Sentry, flushed, and process exits with code 1; backend typecheck and unit tests passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T16:47:26.523Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Exit backend on DB bootstrap failure with Sentry capture

If backend cannot connect to DB during startup, capture error to Sentry and terminate process with non-zero exit code instead of staying alive.

## Scope

- In scope: If backend cannot connect to DB during startup, capture error to Sentry and terminate process with non-zero exit code instead of staying alive.
- Out of scope: unrelated refactors not required for "Exit backend on DB bootstrap failure with Sentry capture".

## Plan

1) Locate backend startup bootstrap and current DB connection error path. 2) Ensure DB startup failure is reported to Sentry and then forces process termination with non-zero exit. 3) Add or update automated verification for startup failure behavior. 4) Run targeted checks and record verification results.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T16:48:33.849Z — VERIFY — ok

By: CODER

Note: Implemented fail-fast bootstrap handling: DB/startup errors are captured to Sentry, flushed, and process exits with code 1; backend typecheck and unit tests passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T16:47:26.523Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
