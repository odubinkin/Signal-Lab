---
id: "202604270625-2RD3VJ"
title: "Add Cursor development rules from PRD 003"
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
  updated_at: "2026-04-27T06:25:47.782Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T06:31:33.508Z"
  updated_by: "DOCS"
  note: "Verified: updated Cursor rules so teapot is treated as a required scenario type, not optional; targeted rg found no optional teapot wording; node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Creating scoped Cursor rule files from PRD 003 and related PRDs, with verification limited to docs policy checks and no commit or finish."
events:
  -
    type: "status"
    at: "2026-04-27T06:25:53.742Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Creating scoped Cursor rule files from PRD 003 and related PRDs, with verification limited to docs policy checks and no commit or finish."
  -
    type: "verify"
    at: "2026-04-27T06:27:32.594Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: created five scoped Cursor rule files under .cursor/rules from PRD 003 and related PRDs; node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed; targeted rg inspection confirmed stack, observability, Prisma, frontend, and error-handling coverage."
  -
    type: "verify"
    at: "2026-04-27T06:31:33.508Z"
    author: "DOCS"
    state: "ok"
    note: "Verified: updated Cursor rules so teapot is treated as a required scenario type, not optional; targeted rg found no optional teapot wording; node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed."
doc_version: 3
doc_updated_at: "2026-04-27T06:31:33.517Z"
doc_updated_by: "DOCS"
description: "Create Cursor development rule files under .cursor/rules based on PRD 003 and the Signal Lab PRDs, without committing or finishing the task."
sections:
  Summary: |-
    Add Cursor development rules from PRD 003
    
    Create Cursor development rule files under .cursor/rules based on PRD 003 and the Signal Lab PRDs, without committing or finishing the task.
  Scope: |-
    - In scope: Create Cursor development rule files under .cursor/rules based on PRD 003 and the Signal Lab PRDs, without committing or finishing the task.
    - Out of scope: unrelated refactors not required for "Add Cursor development rules from PRD 003".
  Plan: "Scope: create .cursor/rules files required by prds/003_prd-cursor-ai-layer.md, grounded in prds/001-004. Files: stack constraints, observability conventions, Prisma patterns, frontend patterns, error handling. No commits and no task finish until explicit user confirmation. Verification: node .agentplane/policy/check-routing.mjs, agentplane doctor, inspect created rule files for clear non-overlapping responsibility and PRD alignment."
  Verify Steps: |-
    1. Review the requested outcome for "Add Cursor development rules from PRD 003". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T06:27:32.594Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified: created five scoped Cursor rule files under .cursor/rules from PRD 003 and related PRDs; node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed; targeted rg inspection confirmed stack, observability, Prisma, frontend, and error-handling coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T06:25:53.750Z, excerpt_hash=sha256:7a254db941cae7e38e14ad3e164c1a6e83b503cb0958796c90a0208ab762f060
    
    ### 2026-04-27T06:31:33.508Z — VERIFY — ok
    
    By: DOCS
    
    Note: Verified: updated Cursor rules so teapot is treated as a required scenario type, not optional; targeted rg found no optional teapot wording; node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T06:27:32.603Z, excerpt_hash=sha256:7a254db941cae7e38e14ad3e164c1a6e83b503cb0958796c90a0208ab762f060
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add Cursor development rules from PRD 003

Create Cursor development rule files under .cursor/rules based on PRD 003 and the Signal Lab PRDs, without committing or finishing the task.

## Scope

- In scope: Create Cursor development rule files under .cursor/rules based on PRD 003 and the Signal Lab PRDs, without committing or finishing the task.
- Out of scope: unrelated refactors not required for "Add Cursor development rules from PRD 003".

## Plan

Scope: create .cursor/rules files required by prds/003_prd-cursor-ai-layer.md, grounded in prds/001-004. Files: stack constraints, observability conventions, Prisma patterns, frontend patterns, error handling. No commits and no task finish until explicit user confirmation. Verification: node .agentplane/policy/check-routing.mjs, agentplane doctor, inspect created rule files for clear non-overlapping responsibility and PRD alignment.

## Verify Steps

1. Review the requested outcome for "Add Cursor development rules from PRD 003". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T06:27:32.594Z — VERIFY — ok

By: DOCS

Note: Verified: created five scoped Cursor rule files under .cursor/rules from PRD 003 and related PRDs; node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed; targeted rg inspection confirmed stack, observability, Prisma, frontend, and error-handling coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T06:25:53.750Z, excerpt_hash=sha256:7a254db941cae7e38e14ad3e164c1a6e83b503cb0958796c90a0208ab762f060

### 2026-04-27T06:31:33.508Z — VERIFY — ok

By: DOCS

Note: Verified: updated Cursor rules so teapot is treated as a required scenario type, not optional; targeted rg found no optional teapot wording; node .agentplane/policy/check-routing.mjs passed; agentplane doctor passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T06:27:32.603Z, excerpt_hash=sha256:7a254db941cae7e38e14ad3e164c1a6e83b503cb0958796c90a0208ab762f060

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
