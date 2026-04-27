---
id: "202604270749-V61J47"
title: "Add Cursor command prompts"
result_summary: "Updated .cursor/rules and .cursor/commands for best-practice guidance and Cursor-only workflows; verified via check-routing, doctor, and command/rule content checks."
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 20
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T17:03:16.776Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T17:03:54.373Z"
  updated_by: "DOCS"
  note: "Aligned Cursor rules with best-practice structure and canonical references, removed agentplane workflow mentions from Cursor commands, and normalized command health endpoint references to /api/health. Docs-policy verification checks passed."
commit:
  hash: "6a3d3f944392c7b404765958ed67d15b1a8bea95"
  message: "📝 cursor: align rules best practices and remove agentplane mentions"
comments:
  -
    author: "DOCS"
    body: "Start: Add two Cursor command markdown prompts under .cursor/commands and verify the docs-only policy checks for task 202604270749-V61J47."
  -
    author: "DOCS"
    body: "Verified: Cursor command set for PRD 003 R3 is complete, rules were aligned to best practices with canonical references, and command prompts are now Cursor-native without agentplane workflow coupling."
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
  -
    type: "verify"
    at: "2026-04-27T16:52:07.837Z"
    author: "DOCS"
    state: "ok"
    note: "Completed PRD 003 R3.Commands scope by adding .cursor/commands/check-obs.md and .cursor/commands/run-prd.md, aligning .cursor/commands/health-check.md with /api/health, and updating README command inventory/status to 4 commands. Verification rerun with check-routing and doctor."
  -
    type: "verify"
    at: "2026-04-27T17:03:54.373Z"
    author: "DOCS"
    state: "ok"
    note: "Aligned Cursor rules with best-practice structure and canonical references, removed agentplane workflow mentions from Cursor commands, and normalized command health endpoint references to /api/health. Docs-policy verification checks passed."
  -
    type: "status"
    at: "2026-04-27T17:04:18.856Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Cursor command set for PRD 003 R3 is complete, rules were aligned to best practices with canonical references, and command prompts are now Cursor-native without agentplane workflow coupling."
doc_version: 3
doc_updated_at: "2026-04-27T17:04:18.857Z"
doc_updated_by: "DOCS"
description: "Add Cursor command markdown prompts for /add-endpoint and /health-check according to PRD 003."
sections:
  Summary: |-
    Complete PRD 003 R3.Commands and align Cursor authoring assets to best practices.
    
    Deliver four Cursor commands (/add-endpoint, /health-check, /check-obs, /run-prd), remove agentplane-specific workflow from command prompts, and tighten .cursor/rules with focused guidance plus canonical file references.
  Scope: "In scope: update .cursor/commands and .cursor/rules for PRD 003 R3 with Cursor-native workflow prompts (no agentplane references), align command endpoint references with current backend routes, and improve rules per Cursor best practices (focused/composable instructions, reduced duplication, canonical @file references). Out of scope: backend/frontend runtime implementation behavior changes, hooks, custom skills, marketplace skills, and PRD-wide completion beyond R3/rules quality."
  Plan: "Finalize PRD 003 R3 updates by aligning Cursor rules with best practices (focused/composable guidance + canonical file references), remove agentplane references from Cursor commands, keep command health routes aligned with current backend endpoints, run docs-policy verification, then commit and finish task."
  Verify Steps: |-
    1. Review the requested outcome for "Add Cursor command prompts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    - Command: rg -n "agentplane" .cursor/commands || true
      Result: pass
      Evidence: No agentplane mentions remain in Cursor command files.
      Scope: .cursor/commands/*.md
      Links: .cursor/commands/run-prd.md
    - Command: sed -n '1,260p' .cursor/commands/run-prd.md && sed -n '1,220p' .cursor/commands/add-endpoint.md
      Result: pass
      Evidence: /run-prd uses Cursor-native plan-first flow; /add-endpoint health check uses /api/health.
      Scope: .cursor/commands/run-prd.md, .cursor/commands/add-endpoint.md
      Links: prds/003_prd-cursor-ai-layer.md
    - Command: sed -n '1,260p' .cursor/rules/stack-constraints.mdc && sed -n '1,260p' .cursor/rules/error-handling.mdc && sed -n '1,260p' .cursor/rules/frontend-patterns.mdc && sed -n '1,260p' .cursor/rules/observability-conventions.mdc && sed -n '1,260p' .cursor/rules/prisma-patterns.mdc
      Result: pass
      Evidence: Rules remain scoped and concise, now include canonical @file references, and reduce duplicated/edge-case-heavy guidance.
      Scope: .cursor/rules/*.mdc
      Links: https://cursor.com/blog/agent-best-practices, https://cursor.com/docs/rules
    - Command: node .agentplane/policy/check-routing.mjs
      Result: pass
      Evidence: policy routing OK
      Scope: policy routing validity
      Links: .agentplane/policy/check-routing.mjs
    - Command: agentplane doctor
      Result: pass
      Evidence: doctor OK; one informational fallback note about missing scripts/run-pre-push-hook.mjs.
      Scope: agentplane workflow health
      Links: .agentplane/policy/dod.docs.md
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T17:03:54.373Z — VERIFY — ok
    
    By: DOCS
    
    Note: Aligned Cursor rules with best-practice structure and canonical references, removed agentplane workflow mentions from Cursor commands, and normalized command health endpoint references to /api/health. Docs-policy verification checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T17:03:47.842Z, excerpt_hash=sha256:13e0053df5050eabdc1aee8a53b13ffd9ab77db2242530904f7ba931db4bb87e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Complete PRD 003 R3.Commands and align Cursor authoring assets to best practices.

Deliver four Cursor commands (/add-endpoint, /health-check, /check-obs, /run-prd), remove agentplane-specific workflow from command prompts, and tighten .cursor/rules with focused guidance plus canonical file references.

## Scope

In scope: update .cursor/commands and .cursor/rules for PRD 003 R3 with Cursor-native workflow prompts (no agentplane references), align command endpoint references with current backend routes, and improve rules per Cursor best practices (focused/composable instructions, reduced duplication, canonical @file references). Out of scope: backend/frontend runtime implementation behavior changes, hooks, custom skills, marketplace skills, and PRD-wide completion beyond R3/rules quality.

## Plan

Finalize PRD 003 R3 updates by aligning Cursor rules with best practices (focused/composable guidance + canonical file references), remove agentplane references from Cursor commands, keep command health routes aligned with current backend endpoints, run docs-policy verification, then commit and finish task.

## Verify Steps

1. Review the requested outcome for "Add Cursor command prompts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

- Command: rg -n "agentplane" .cursor/commands || true
  Result: pass
  Evidence: No agentplane mentions remain in Cursor command files.
  Scope: .cursor/commands/*.md
  Links: .cursor/commands/run-prd.md
- Command: sed -n '1,260p' .cursor/commands/run-prd.md && sed -n '1,220p' .cursor/commands/add-endpoint.md
  Result: pass
  Evidence: /run-prd uses Cursor-native plan-first flow; /add-endpoint health check uses /api/health.
  Scope: .cursor/commands/run-prd.md, .cursor/commands/add-endpoint.md
  Links: prds/003_prd-cursor-ai-layer.md
- Command: sed -n '1,260p' .cursor/rules/stack-constraints.mdc && sed -n '1,260p' .cursor/rules/error-handling.mdc && sed -n '1,260p' .cursor/rules/frontend-patterns.mdc && sed -n '1,260p' .cursor/rules/observability-conventions.mdc && sed -n '1,260p' .cursor/rules/prisma-patterns.mdc
  Result: pass
  Evidence: Rules remain scoped and concise, now include canonical @file references, and reduce duplicated/edge-case-heavy guidance.
  Scope: .cursor/rules/*.mdc
  Links: https://cursor.com/blog/agent-best-practices, https://cursor.com/docs/rules
- Command: node .agentplane/policy/check-routing.mjs
  Result: pass
  Evidence: policy routing OK
  Scope: policy routing validity
  Links: .agentplane/policy/check-routing.mjs
- Command: agentplane doctor
  Result: pass
  Evidence: doctor OK; one informational fallback note about missing scripts/run-pre-push-hook.mjs.
  Scope: agentplane workflow health
  Links: .agentplane/policy/dod.docs.md

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T17:03:54.373Z — VERIFY — ok

By: DOCS

Note: Aligned Cursor rules with best-practice structure and canonical references, removed agentplane workflow mentions from Cursor commands, and normalized command health endpoint references to /api/health. Docs-policy verification checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T17:03:47.842Z, excerpt_hash=sha256:13e0053df5050eabdc1aee8a53b13ffd9ab77db2242530904f7ba931db4bb87e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
