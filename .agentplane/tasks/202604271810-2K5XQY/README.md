---
id: "202604271810-2K5XQY"
title: "Document Cursor AI layer"
result_summary: "Documented Cursor AI layer, checklist, screenshots, and approved frontend policy-file cleanup."
status: "DONE"
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
  updated_at: "2026-04-27T18:10:30.987Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-04-27T18:14:09.885Z"
  updated_by: "DOCS"
  note: "Command: node .agentplane/policy/check-routing.mjs. Result: fail. Evidence: root AGENTS.md does not satisfy Agentplane routing gateway headings/import requirements; this predates and is outside the approved docs scope. Command: agentplane doctor. Result: pass/OK with one info item about missing local pre-push script fallback. Command: referenced-file existence shell check. Result: pass. Scope: AI-LAYER.md, README.md, SUBMISSION_CHECKLIST.md, approved frontend AGENTS/CLAUDE deletions, and task artifact."
commit:
  hash: "03261453cf3a4ed701f40fc0a610b62f535939d2"
  message: "✅ 2K5XQY docs: done"
comments:
  -
    author: "DOCS"
    body: "Start: Documenting the Cursor AI layer from PRD 003 and PRD 004, updating README and submission checklist, and preserving the approved frontend policy file deletions."
  -
    author: "DOCS"
    body: "Verified: AI layer docs, README link, submission checklist, approved frontend policy-file deletions, and screenshot links are committed; agentplane doctor passed, while check-routing still reports the known pre-existing root AGENTS gateway mismatch outside this task scope."
events:
  -
    type: "status"
    at: "2026-04-27T18:10:34.542Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Documenting the Cursor AI layer from PRD 003 and PRD 004, updating README and submission checklist, and preserving the approved frontend policy file deletions."
  -
    type: "verify"
    at: "2026-04-27T18:14:09.885Z"
    author: "DOCS"
    state: "needs_rework"
    note: "Command: node .agentplane/policy/check-routing.mjs. Result: fail. Evidence: root AGENTS.md does not satisfy Agentplane routing gateway headings/import requirements; this predates and is outside the approved docs scope. Command: agentplane doctor. Result: pass/OK with one info item about missing local pre-push script fallback. Command: referenced-file existence shell check. Result: pass. Scope: AI-LAYER.md, README.md, SUBMISSION_CHECKLIST.md, approved frontend AGENTS/CLAUDE deletions, and task artifact."
  -
    type: "status"
    at: "2026-04-27T18:53:33.472Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: AI layer docs, README link, submission checklist, approved frontend policy-file deletions, and screenshot links are committed; agentplane doctor passed, while check-routing still reports the known pre-existing root AGENTS gateway mismatch outside this task scope."
doc_version: 3
doc_updated_at: "2026-04-27T18:53:33.473Z"
doc_updated_by: "DOCS"
description: "Create Russian AI-LAYER.md from PRD 003/004, reduce README to a link, fill SUBMISSION_CHECKLIST with known facts and <?КАК?> placeholders, and include approved frontend AGENTS/CLAUDE deletions."
sections:
  Summary: |-
    Document Cursor AI layer
    
    Create Russian AI-LAYER.md from PRD 003/004, reduce README to a link, fill SUBMISSION_CHECKLIST with known facts and <?КАК?> placeholders, and include approved frontend AGENTS/CLAUDE deletions.
  Scope: |-
    - In scope: Create Russian AI-LAYER.md from PRD 003/004, reduce README to a link, fill SUBMISSION_CHECKLIST with known facts and <?КАК?> placeholders, and include approved frontend AGENTS/CLAUDE deletions.
    - Out of scope: unrelated refactors not required for "Document Cursor AI layer".
  Plan: |-
    Summary
    Document the Cursor AI layer required by PRD 003 and PRD 004 in a dedicated Russian AI-LAYER.md file, move README AI-layer details into that document while leaving a link, fill SUBMISSION_CHECKLIST.md with repository-known facts and <?КАК?> placeholders for unknown user-provided values, and include already-approved deletions of apps/frontend/AGENTS.md and apps/frontend/CLAUDE.md.
    
    Scope
    - Add AI-LAYER.md.
    - Update README.md.
    - Update SUBMISSION_CHECKLIST.md.
    - Preserve approved deletions: apps/frontend/AGENTS.md, apps/frontend/CLAUDE.md.
    
    Plan
    1. Inventory .cursor rules, commands, hooks, settings, and skills against PRD 003/004.
    2. Write AI-LAYER.md in Russian with concise but complete usage and verification documentation.
    3. Replace README AI-layer detail with a link to AI-LAYER.md.
    4. Fill SUBMISSION_CHECKLIST.md; use <?КАК?> for unknown values.
    5. Run docs/policy checks: node .agentplane/policy/check-routing.mjs and agentplane doctor.
    6. Commit scoped changes but do not finish/close the Agentplane task until user confirmation.
    
    Verification
    - node .agentplane/policy/check-routing.mjs passes.
    - agentplane doctor passes or residual docs-only risk is recorded.
    - git diff contains only approved paths.
  Verify Steps: |-
    1. Review the requested outcome for "Document Cursor AI layer". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T18:14:09.885Z — VERIFY — needs_rework
    
    By: DOCS
    
    Note: Command: node .agentplane/policy/check-routing.mjs. Result: fail. Evidence: root AGENTS.md does not satisfy Agentplane routing gateway headings/import requirements; this predates and is outside the approved docs scope. Command: agentplane doctor. Result: pass/OK with one info item about missing local pre-push script fallback. Command: referenced-file existence shell check. Result: pass. Scope: AI-LAYER.md, README.md, SUBMISSION_CHECKLIST.md, approved frontend AGENTS/CLAUDE deletions, and task artifact.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T18:10:34.550Z, excerpt_hash=sha256:b25b7c46cfd667af5f6c6b57f1e38471f16caa5a28fa278337d45c1d34a86a47
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Document Cursor AI layer

Create Russian AI-LAYER.md from PRD 003/004, reduce README to a link, fill SUBMISSION_CHECKLIST with known facts and <?КАК?> placeholders, and include approved frontend AGENTS/CLAUDE deletions.

## Scope

- In scope: Create Russian AI-LAYER.md from PRD 003/004, reduce README to a link, fill SUBMISSION_CHECKLIST with known facts and <?КАК?> placeholders, and include approved frontend AGENTS/CLAUDE deletions.
- Out of scope: unrelated refactors not required for "Document Cursor AI layer".

## Plan

Summary
Document the Cursor AI layer required by PRD 003 and PRD 004 in a dedicated Russian AI-LAYER.md file, move README AI-layer details into that document while leaving a link, fill SUBMISSION_CHECKLIST.md with repository-known facts and <?КАК?> placeholders for unknown user-provided values, and include already-approved deletions of apps/frontend/AGENTS.md and apps/frontend/CLAUDE.md.

Scope
- Add AI-LAYER.md.
- Update README.md.
- Update SUBMISSION_CHECKLIST.md.
- Preserve approved deletions: apps/frontend/AGENTS.md, apps/frontend/CLAUDE.md.

Plan
1. Inventory .cursor rules, commands, hooks, settings, and skills against PRD 003/004.
2. Write AI-LAYER.md in Russian with concise but complete usage and verification documentation.
3. Replace README AI-layer detail with a link to AI-LAYER.md.
4. Fill SUBMISSION_CHECKLIST.md; use <?КАК?> for unknown values.
5. Run docs/policy checks: node .agentplane/policy/check-routing.mjs and agentplane doctor.
6. Commit scoped changes but do not finish/close the Agentplane task until user confirmation.

Verification
- node .agentplane/policy/check-routing.mjs passes.
- agentplane doctor passes or residual docs-only risk is recorded.
- git diff contains only approved paths.

## Verify Steps

1. Review the requested outcome for "Document Cursor AI layer". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T18:14:09.885Z — VERIFY — needs_rework

By: DOCS

Note: Command: node .agentplane/policy/check-routing.mjs. Result: fail. Evidence: root AGENTS.md does not satisfy Agentplane routing gateway headings/import requirements; this predates and is outside the approved docs scope. Command: agentplane doctor. Result: pass/OK with one info item about missing local pre-push script fallback. Command: referenced-file existence shell check. Result: pass. Scope: AI-LAYER.md, README.md, SUBMISSION_CHECKLIST.md, approved frontend AGENTS/CLAUDE deletions, and task artifact.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T18:10:34.550Z, excerpt_hash=sha256:b25b7c46cfd667af5f6c6b57f1e38471f16caa5a28fa278337d45c1d34a86a47

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
