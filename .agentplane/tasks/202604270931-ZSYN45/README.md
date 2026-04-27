---
id: "202604270931-ZSYN45"
title: "Switch dev containers to Dockerfile.dev with anonymous node_modules volumes"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T09:37:42.843Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-27T09:50:17.474Z"
  updated_by: "CODER"
  note: "Variant 2 implemented and verified: Dockerfile.dev for backend and frontend bake npm ci into the image; docker-compose backend/frontend now use build: + anonymous volumes /workspace/node_modules and per-service /workspace/apps/<svc>/node_modules. Removed shared named volumes root_node_modules/backend_node_modules/frontend_node_modules. Backend reaches healthy on first probe; Nest watcher detects source bind-mount changes and triggers incremental rebuild + restart (procps added to backend image because nest --watch shells out to ps). Frontend (Next.js 16 Turbopack) is Ready in 445ms and responds 200 on /. ENOTEMPTY race is structurally impossible because npm install no longer runs at container startup. Lockfile fix (fsevents marked as dev) bundled per user request."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing Variant 2 — adding Dockerfile.dev for backend and frontend services, switching docker-compose to build: instead of inline npm install, replacing shared root_node_modules named volume with anonymous volumes per service to keep hot reload while removing ENOTEMPTY race."
events:
  -
    type: "status"
    at: "2026-04-27T09:32:46.933Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing Variant 2 — adding Dockerfile.dev for backend and frontend services, switching docker-compose to build: instead of inline npm install, replacing shared root_node_modules named volume with anonymous volumes per service to keep hot reload while removing ENOTEMPTY race."
  -
    type: "verify"
    at: "2026-04-27T09:50:17.474Z"
    author: "CODER"
    state: "ok"
    note: "Variant 2 implemented and verified: Dockerfile.dev for backend and frontend bake npm ci into the image; docker-compose backend/frontend now use build: + anonymous volumes /workspace/node_modules and per-service /workspace/apps/<svc>/node_modules. Removed shared named volumes root_node_modules/backend_node_modules/frontend_node_modules. Backend reaches healthy on first probe; Nest watcher detects source bind-mount changes and triggers incremental rebuild + restart (procps added to backend image because nest --watch shells out to ps). Frontend (Next.js 16 Turbopack) is Ready in 445ms and responds 200 on /. ENOTEMPTY race is structurally impossible because npm install no longer runs at container startup. Lockfile fix (fsevents marked as dev) bundled per user request."
doc_version: 3
doc_updated_at: "2026-04-27T09:50:17.485Z"
doc_updated_by: "CODER"
description: "Replace inline npm install in docker-compose backend/frontend services with dedicated Dockerfile.dev images that bake npm ci. Use anonymous volumes for node_modules to preserve hot reload via source bind-mount while eliminating ENOTEMPTY race in the shared root_node_modules named volume."
sections:
  Summary: |-
    Switch dev containers to Dockerfile.dev with anonymous node_modules volumes
    
    Replace inline npm install in docker-compose backend/frontend services with dedicated Dockerfile.dev images that bake npm ci. Use anonymous volumes for node_modules to preserve hot reload via source bind-mount while eliminating ENOTEMPTY race in the shared root_node_modules named volume.
  Scope: |-
    - In scope: Replace inline npm install in docker-compose backend/frontend services with dedicated Dockerfile.dev images that bake npm ci. Use anonymous volumes for node_modules to preserve hot reload via source bind-mount while eliminating ENOTEMPTY race in the shared root_node_modules named volume.
    - Out of scope: unrelated refactors not required for "Switch dev containers to Dockerfile.dev with anonymous node_modules volumes".
  Plan: |-
    Goal: keep PRD requirement "containers use hot reload (volume mounts for source)" while eliminating recurring npm ENOTEMPTY in shared node_modules volume.
    
    Approach (Variant 2 from design discussion):
    1. Add apps/backend/Dockerfile.dev: FROM node:22-bookworm-slim, install openssl, COPY package.json + package-lock.json + apps/*/package.json (workspace manifests), run npm ci, set WORKDIR=/workspace. No source COPY (source comes via bind-mount at runtime).
    2. Add apps/frontend/Dockerfile.dev with same pattern.
    3. Update docker-compose.yml backend service:
       - Replace image: node:22-bookworm-slim with build: { context: ., dockerfile: apps/backend/Dockerfile.dev }.
       - Simplify command to: prisma:generate && prisma:deploy && backend:dev (no apt-get, no npm install).
       - Replace named volumes root_node_modules and backend_node_modules with anonymous volumes (bare paths /workspace/node_modules and /workspace/apps/backend/node_modules) to shadow the .:/workspace bind-mount.
    4. Same for frontend service (anonymous /workspace/node_modules and /workspace/apps/frontend/node_modules; remove npm install from command).
    5. Remove now-unused named volumes from top-level volumes: section (root_node_modules, backend_node_modules, frontend_node_modules).
    6. Include pending package-lock.json change (one-line: fsevents marked as dev dependency) per user request to commit it within this task.
    
    Verify (see Verify Steps): docker compose build, healthy backend, hot reload triggers rebuild on src edit.
    
    Rollback: git revert; if local node_modules state corrupts again, docker volume rm or rebuild image.
    
    Out of scope: CI changes, prod Dockerfiles.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-27T09:50:17.474Z — VERIFY — ok
    
    By: CODER
    
    Note: Variant 2 implemented and verified: Dockerfile.dev for backend and frontend bake npm ci into the image; docker-compose backend/frontend now use build: + anonymous volumes /workspace/node_modules and per-service /workspace/apps/<svc>/node_modules. Removed shared named volumes root_node_modules/backend_node_modules/frontend_node_modules. Backend reaches healthy on first probe; Nest watcher detects source bind-mount changes and triggers incremental rebuild + restart (procps added to backend image because nest --watch shells out to ps). Frontend (Next.js 16 Turbopack) is Ready in 445ms and responds 200 on /. ENOTEMPTY race is structurally impossible because npm install no longer runs at container startup. Lockfile fix (fsevents marked as dev) bundled per user request.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T09:37:35.539Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Inside an agentplane worktree, the repo root contains a node_modules symlink to the main checkout. Docker Desktop on macOS resolves this host symlink transparently, which can defeat the anonymous volume shadowing if the symlink is left in place. Verification was therefore performed after temporarily removing the worktree symlink; the symlink was restored afterwards. In a regular checkout (no worktree symlink), the anonymous volume shadows correctly out of the box.
      Impact: Verification only; no production impact. Developers running compose from inside an agentplane worktree may need to bypass the worktree node_modules symlink to use the image-baked node_modules; in a normal checkout this is non-issue.
      Resolution: Documented in task Findings; no compose-level workaround required for normal use. Future improvement could be a .dockerignore-style approach or a compose override if worktree-based dev becomes common.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Switch dev containers to Dockerfile.dev with anonymous node_modules volumes

Replace inline npm install in docker-compose backend/frontend services with dedicated Dockerfile.dev images that bake npm ci. Use anonymous volumes for node_modules to preserve hot reload via source bind-mount while eliminating ENOTEMPTY race in the shared root_node_modules named volume.

## Scope

- In scope: Replace inline npm install in docker-compose backend/frontend services with dedicated Dockerfile.dev images that bake npm ci. Use anonymous volumes for node_modules to preserve hot reload via source bind-mount while eliminating ENOTEMPTY race in the shared root_node_modules named volume.
- Out of scope: unrelated refactors not required for "Switch dev containers to Dockerfile.dev with anonymous node_modules volumes".

## Plan

Goal: keep PRD requirement "containers use hot reload (volume mounts for source)" while eliminating recurring npm ENOTEMPTY in shared node_modules volume.

Approach (Variant 2 from design discussion):
1. Add apps/backend/Dockerfile.dev: FROM node:22-bookworm-slim, install openssl, COPY package.json + package-lock.json + apps/*/package.json (workspace manifests), run npm ci, set WORKDIR=/workspace. No source COPY (source comes via bind-mount at runtime).
2. Add apps/frontend/Dockerfile.dev with same pattern.
3. Update docker-compose.yml backend service:
   - Replace image: node:22-bookworm-slim with build: { context: ., dockerfile: apps/backend/Dockerfile.dev }.
   - Simplify command to: prisma:generate && prisma:deploy && backend:dev (no apt-get, no npm install).
   - Replace named volumes root_node_modules and backend_node_modules with anonymous volumes (bare paths /workspace/node_modules and /workspace/apps/backend/node_modules) to shadow the .:/workspace bind-mount.
4. Same for frontend service (anonymous /workspace/node_modules and /workspace/apps/frontend/node_modules; remove npm install from command).
5. Remove now-unused named volumes from top-level volumes: section (root_node_modules, backend_node_modules, frontend_node_modules).
6. Include pending package-lock.json change (one-line: fsevents marked as dev dependency) per user request to commit it within this task.

Verify (see Verify Steps): docker compose build, healthy backend, hot reload triggers rebuild on src edit.

Rollback: git revert; if local node_modules state corrupts again, docker volume rm or rebuild image.

Out of scope: CI changes, prod Dockerfiles.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-27T09:50:17.474Z — VERIFY — ok

By: CODER

Note: Variant 2 implemented and verified: Dockerfile.dev for backend and frontend bake npm ci into the image; docker-compose backend/frontend now use build: + anonymous volumes /workspace/node_modules and per-service /workspace/apps/<svc>/node_modules. Removed shared named volumes root_node_modules/backend_node_modules/frontend_node_modules. Backend reaches healthy on first probe; Nest watcher detects source bind-mount changes and triggers incremental rebuild + restart (procps added to backend image because nest --watch shells out to ps). Frontend (Next.js 16 Turbopack) is Ready in 445ms and responds 200 on /. ENOTEMPTY race is structurally impossible because npm install no longer runs at container startup. Lockfile fix (fsevents marked as dev) bundled per user request.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-27T09:37:35.539Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Inside an agentplane worktree, the repo root contains a node_modules symlink to the main checkout. Docker Desktop on macOS resolves this host symlink transparently, which can defeat the anonymous volume shadowing if the symlink is left in place. Verification was therefore performed after temporarily removing the worktree symlink; the symlink was restored afterwards. In a regular checkout (no worktree symlink), the anonymous volume shadows correctly out of the box.
  Impact: Verification only; no production impact. Developers running compose from inside an agentplane worktree may need to bypass the worktree node_modules symlink to use the image-baked node_modules; in a normal checkout this is non-issue.
  Resolution: Documented in task Findings; no compose-level workaround required for normal use. Future improvement could be a .dockerignore-style approach or a compose override if worktree-based dev becomes common.
  Promotion: incident-candidate
  Fixability: external
