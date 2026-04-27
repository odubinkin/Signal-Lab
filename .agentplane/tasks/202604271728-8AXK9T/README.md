---
id: "202604271728-8AXK9T"
title: "Add custom Cursor skills for Next/Tailwind/NestJS/Docker"
result_summary: "Custom skills for Next.js, Tailwind design system, NestJS, and Docker are now available under .cursor/skills."
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
  updated_at: "2026-04-27T17:28:20.075Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T17:30:03.496Z"
  updated_by: "DOCS"
  note: "Created four Cursor skills under .cursor/skills with valid SKILL.md frontmatter and topic-specific best-practice checklists; validated file structure and naming matches."
commit:
  hash: "ad467b0a0cba92714ab827e1a0b787dd4448ee9b"
  message: "✨ cursor: enable sentry plugin in settings"
comments:
  -
    author: "DOCS"
    body: "Start: Adding four project-level Cursor skills with official-format SKILL.md files and curated best-practice guidance for Next.js, Tailwind CSS, NestJS, and Docker."
  -
    author: "DOCS"
    body: "Verified: Added four project-level Cursor skills with compliant frontmatter and practical checklists sourced from official docs, then validated structure, naming, and task verification records."
events:
  -
    type: "status"
    at: "2026-04-27T17:28:25.558Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Adding four project-level Cursor skills with official-format SKILL.md files and curated best-practice guidance for Next.js, Tailwind CSS, NestJS, and Docker."
  -
    type: "verify"
    at: "2026-04-27T17:30:03.496Z"
    author: "DOCS"
    state: "ok"
    note: "Created four Cursor skills under .cursor/skills with valid SKILL.md frontmatter and topic-specific best-practice checklists; validated file structure and naming matches."
  -
    type: "status"
    at: "2026-04-27T17:30:08.384Z"
    author: "DOCS"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added four project-level Cursor skills with compliant frontmatter and practical checklists sourced from official docs, then validated structure, naming, and task verification records."
doc_version: 3
doc_updated_at: "2026-04-27T17:30:08.385Z"
doc_updated_by: "DOCS"
description: "Create project-level Cursor skills with actionable best practices based on Cursor docs and official framework docs."
sections:
  Summary: |-
    Add custom Cursor skills for Next/Tailwind/NestJS/Docker
    
    Create project-level Cursor skills with actionable best practices based on Cursor docs and official framework docs.
  Scope: |-
    - In scope: Create project-level Cursor skills with actionable best practices based on Cursor docs and official framework docs.
    - Out of scope: unrelated refactors not required for "Add custom Cursor skills for Next/Tailwind/NestJS/Docker".
  Plan: |-
    Summary
    Create four project-level Cursor skills: next-best-practices, tailwind-design-system, nestjs-best-practices, docker-expert.
    
    Scope
    - Add files under .cursor/skills/*/SKILL.md
    - Use Cursor Skills format and actionable guidance
    - No application code/runtime changes
    
    Plan
    1. Collect format requirements from cursor.com/docs/skills and cursor agent best-practices guide.
    2. Gather official best-practices guidance from Next.js, Tailwind CSS, NestJS, Docker docs.
    3. Author 4 skills with clear usage conditions, architecture guardrails, implementation checklists, and verification commands.
    4. Validate file structure and run git diff review.
    
    Verify Steps
    - Confirm each skill has valid YAML frontmatter (name + description).
    - Confirm folder names match skill names.
    - Confirm content is focused and non-conflicting with existing project rules.
    
    Verification
    - Manual review of all new SKILL.md files and final diff.
    
    Rollback Plan
    - Remove .cursor/skills/* directories created by this task if quality check fails.
  Verify Steps: |-
    1. Review the requested outcome for "Add custom Cursor skills for Next/Tailwind/NestJS/Docker". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T17:30:03.496Z — VERIFY — ok
    
    By: DOCS
    
    Note: Created four Cursor skills under .cursor/skills with valid SKILL.md frontmatter and topic-specific best-practice checklists; validated file structure and naming matches.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T17:28:25.565Z, excerpt_hash=sha256:895b58e276cf1de676c03440350a2c75d4362dcd1696062b875441760e742ac7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add custom Cursor skills for Next/Tailwind/NestJS/Docker

Create project-level Cursor skills with actionable best practices based on Cursor docs and official framework docs.

## Scope

- In scope: Create project-level Cursor skills with actionable best practices based on Cursor docs and official framework docs.
- Out of scope: unrelated refactors not required for "Add custom Cursor skills for Next/Tailwind/NestJS/Docker".

## Plan

Summary
Create four project-level Cursor skills: next-best-practices, tailwind-design-system, nestjs-best-practices, docker-expert.

Scope
- Add files under .cursor/skills/*/SKILL.md
- Use Cursor Skills format and actionable guidance
- No application code/runtime changes

Plan
1. Collect format requirements from cursor.com/docs/skills and cursor agent best-practices guide.
2. Gather official best-practices guidance from Next.js, Tailwind CSS, NestJS, Docker docs.
3. Author 4 skills with clear usage conditions, architecture guardrails, implementation checklists, and verification commands.
4. Validate file structure and run git diff review.

Verify Steps
- Confirm each skill has valid YAML frontmatter (name + description).
- Confirm folder names match skill names.
- Confirm content is focused and non-conflicting with existing project rules.

Verification
- Manual review of all new SKILL.md files and final diff.

Rollback Plan
- Remove .cursor/skills/* directories created by this task if quality check fails.

## Verify Steps

1. Review the requested outcome for "Add custom Cursor skills for Next/Tailwind/NestJS/Docker". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T17:30:03.496Z — VERIFY — ok

By: DOCS

Note: Created four Cursor skills under .cursor/skills with valid SKILL.md frontmatter and topic-specific best-practice checklists; validated file structure and naming matches.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T17:28:25.565Z, excerpt_hash=sha256:895b58e276cf1de676c03440350a2c75d4362dcd1696062b875441760e742ac7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
