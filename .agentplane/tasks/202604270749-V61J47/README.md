---
id: "202604270749-V61J47"
title: "Add Cursor command prompts"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T07:49:34.814Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T07:50:57.895Z"
  updated_by: "DOCS"
  note: "Added .cursor/commands/add-endpoint.md and .cursor/commands/health-check.md; verified command prompts by inspection, node .agentplane/policy/check-routing.mjs, and agentplane doctor."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Add two Cursor command markdown prompts under .cursor/commands and verify the docs-only policy checks for task 202604270749-V61J47."
events:
  -
    type: "status"
    at: "2026-04-27T07:49:46.398Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Add two Cursor command markdown prompts under .cursor/commands and verify the docs-only policy checks for task 202604270749-V61J47."
  -
    type: "verify"
    at: "2026-04-27T07:50:57.895Z"
    author: "DOCS"
    state: "ok"
    note: "Added .cursor/commands/add-endpoint.md and .cursor/commands/health-check.md; verified command prompts by inspection, node .agentplane/policy/check-routing.mjs, and agentplane doctor."
doc_version: 3
doc_updated_at: "2026-04-27T07:50:57.902Z"
doc_updated_by: "DOCS"
description: "Add Cursor command markdown prompts for /add-endpoint and /health-check according to PRD 003."
sections:
  Summary: |-
    Add Cursor command prompts
    
    Add Cursor command markdown prompts for /add-endpoint and /health-check according to PRD 003.
  Scope: "In scope: add two Cursor command markdown prompts under .cursor/commands for /add-endpoint and /health-check. Out of scope: implementation code changes, additional commands, hooks, skills, marketplace skill setup, and PRD-wide completion."
  Plan: |-
    1. Implement the change for "Add Cursor command prompts".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Add Cursor command prompts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    - Command: sed -n '1,220p' .cursor/commands/add-endpoint.md && sed -n '1,220p' .cursor/commands/health-check.md
      Result: pass
      Evidence: Both command markdown files exist and contain executable prompts aligned to PRD 003 for /add-endpoint and /health-check.
      Scope: .cursor/commands/add-endpoint.md, .cursor/commands/health-check.md
      Links: prds/003_prd-cursor-ai-layer.md, .cursor/rules/stack-constraints.mdc, .cursor/rules/observability-conventions.mdc
    - Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK
      Scope: docs-only routing policy
      Links: .agentplane/policy/dod.docs.md
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor OK; informational note reports installed clean-project fallback pre-push checks because scripts/run-pre-push-hook.mjs is absent.
      Scope: agentplane workflow health
      Links: .agentplane/policy/dod.docs.md
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T07:50:57.895Z — VERIFY — ok
    
    By: DOCS
    
    Note: Added .cursor/commands/add-endpoint.md and .cursor/commands/health-check.md; verified command prompts by inspection, node .agentplane/policy/check-routing.mjs, and agentplane doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T07:50:53.271Z, excerpt_hash=sha256:13e0053df5050eabdc1aee8a53b13ffd9ab77db2242530904f7ba931db4bb87e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add Cursor command prompts

Add Cursor command markdown prompts for /add-endpoint and /health-check according to PRD 003.

## Scope

In scope: add two Cursor command markdown prompts under .cursor/commands for /add-endpoint and /health-check. Out of scope: implementation code changes, additional commands, hooks, skills, marketplace skill setup, and PRD-wide completion.

## Plan

1. Implement the change for "Add Cursor command prompts".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Add Cursor command prompts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

- Command: sed -n '1,220p' .cursor/commands/add-endpoint.md && sed -n '1,220p' .cursor/commands/health-check.md
  Result: pass
  Evidence: Both command markdown files exist and contain executable prompts aligned to PRD 003 for /add-endpoint and /health-check.
  Scope: .cursor/commands/add-endpoint.md, .cursor/commands/health-check.md
  Links: prds/003_prd-cursor-ai-layer.md, .cursor/rules/stack-constraints.mdc, .cursor/rules/observability-conventions.mdc
- Command: node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: policy routing OK
  Scope: docs-only routing policy
  Links: .agentplane/policy/dod.docs.md
- Command: agentplane doctor
  Result: pass
  Evidence: doctor OK; informational note reports installed clean-project fallback pre-push checks because scripts/run-pre-push-hook.mjs is absent.
  Scope: agentplane workflow health
  Links: .agentplane/policy/dod.docs.md

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T07:50:57.895Z — VERIFY — ok

By: DOCS

Note: Added .cursor/commands/add-endpoint.md and .cursor/commands/health-check.md; verified command prompts by inspection, node .agentplane/policy/check-routing.mjs, and agentplane doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T07:50:53.271Z, excerpt_hash=sha256:13e0053df5050eabdc1aee8a53b13ffd9ab77db2242530904f7ba931db4bb87e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
