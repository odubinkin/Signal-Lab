---
id: "202604271753-VZBAYK"
title: "Migrate AGENTS gateway to Cursor workflow"
result_summary: "Cursor gateway active at root AGENTS.md; archived policy at .agentplane/AGENTS.md; task artifact READMEs tracked."
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
  updated_at: "2026-04-27T17:53:38.244Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T18:04:36.088Z"
  updated_by: "DOCS"
  note: "AGENTS gateway migrated to Cursor-native routing: root AGENTS.md references .cursor rules/skills/hooks/plugins without agentplane dependency; legacy gateway preserved at .agentplane/AGENTS.md; included pending task README artifacts for DONE tasks."
commit:
  hash: "a3b273d1dafcab4ceea11835bfe2f08481a44e85"
  message: "📝 docs: migrate AGENTS gateway to Cursor"
comments:
  -
    author: "DOCS"
    body: "Start: Migrating AGENTS gateway from agentplane-specific policy to Cursor-native, skill-driven workflow based on local .cursor assets and current Cursor docs best practices."
  -
    author: "DOCS"
    body: "Verified: AGENTS gateway moved to Cursor-native contract with references to .cursor rules/skills/hooks/plugins; legacy gateway archived in .agentplane; task artifact READMEs committed."
events:
  -
    type: "status"
    at: "2026-04-27T17:53:38.482Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Migrating AGENTS gateway from agentplane-specific policy to Cursor-native, skill-driven workflow based on local .cursor assets and current Cursor docs best practices."
  -
    type: "verify"
    at: "2026-04-27T18:04:36.088Z"
    author: "DOCS"
    state: "ok"
    note: "AGENTS gateway migrated to Cursor-native routing: root AGENTS.md references .cursor rules/skills/hooks/plugins without agentplane dependency; legacy gateway preserved at .agentplane/AGENTS.md; included pending task README artifacts for DONE tasks."
  -
    type: "status"
    at: "2026-04-27T18:04:56.259Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: AGENTS gateway moved to Cursor-native contract with references to .cursor rules/skills/hooks/plugins; legacy gateway archived in .agentplane; task artifact READMEs committed."
doc_version: 3
doc_updated_at: "2026-04-27T18:04:56.259Z"
doc_updated_by: "DOCS"
description: "Move current AGENTS.md into .agentplane and create new root AGENTS.md for Cursor-native workflow using .cursor skills/plugins and Cursor docs best practices"
sections:
  Summary: |-
    Migrate AGENTS gateway to Cursor workflow
    
    Move current AGENTS.md into .agentplane and create new root AGENTS.md for Cursor-native workflow using .cursor skills/plugins and Cursor docs best practices
  Scope: |-
    - In scope: Move current AGENTS.md into .agentplane and create new root AGENTS.md for Cursor-native workflow using .cursor skills/plugins and Cursor docs best practices.
    - Out of scope: unrelated refactors not required for "Migrate AGENTS gateway to Cursor workflow".
  Plan: "1) Preserve current policy gateway by moving AGENTS.md into .agentplane/. 2) Draft a new root AGENTS.md for Cursor-native workflow using .cursor skills/plugins and Cursor documentation best practices. 3) Ensure the new file has no mentions/dependencies on agentplane and references only relevant .cursor assets. 4) Validate tracked changes and summarize."
  Verify Steps: |-
    1. Review the requested outcome for "Migrate AGENTS gateway to Cursor workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T18:04:36.088Z — VERIFY — ok
    
    By: DOCS
    
    Note: AGENTS gateway migrated to Cursor-native routing: root AGENTS.md references .cursor rules/skills/hooks/plugins without agentplane dependency; legacy gateway preserved at .agentplane/AGENTS.md; included pending task README artifacts for DONE tasks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T17:53:38.489Z, excerpt_hash=sha256:bd8770f619a37af2f1b34cf7697cef7428919621909796e20b1686020fb78a8b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Migrate AGENTS gateway to Cursor workflow

Move current AGENTS.md into .agentplane and create new root AGENTS.md for Cursor-native workflow using .cursor skills/plugins and Cursor docs best practices

## Scope

- In scope: Move current AGENTS.md into .agentplane and create new root AGENTS.md for Cursor-native workflow using .cursor skills/plugins and Cursor docs best practices.
- Out of scope: unrelated refactors not required for "Migrate AGENTS gateway to Cursor workflow".

## Plan

1) Preserve current policy gateway by moving AGENTS.md into .agentplane/. 2) Draft a new root AGENTS.md for Cursor-native workflow using .cursor skills/plugins and Cursor documentation best practices. 3) Ensure the new file has no mentions/dependencies on agentplane and references only relevant .cursor assets. 4) Validate tracked changes and summarize.

## Verify Steps

1. Review the requested outcome for "Migrate AGENTS gateway to Cursor workflow". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T18:04:36.088Z — VERIFY — ok

By: DOCS

Note: AGENTS gateway migrated to Cursor-native routing: root AGENTS.md references .cursor rules/skills/hooks/plugins without agentplane dependency; legacy gateway preserved at .agentplane/AGENTS.md; included pending task README artifacts for DONE tasks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T17:53:38.489Z, excerpt_hash=sha256:bd8770f619a37af2f1b34cf7697cef7428919621909796e20b1686020fb78a8b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
