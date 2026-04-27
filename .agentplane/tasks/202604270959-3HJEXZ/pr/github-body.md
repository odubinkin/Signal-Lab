## Summary

Fix Next.js Turbopack root inference under docker-compose anonymous volumes

After ZSYN45, frontend fails on docker compose up with 'Next.js inferred your workspace root, but it may not be correct... couldn't find next/package.json from /workspace/apps/frontend/app'. Cause: npm workspaces hoist next to /workspace/node_modules, but the anonymous volume at /workspace/apps/frontend/node_modules creates an empty directory that stops Turbopack from walking up to the hoisted package. Fix by setting turbopack.root in apps/frontend/next.config.ts to the repo root.

## Scope

- In scope: After ZSYN45, frontend fails on docker compose up with 'Next.js inferred your workspace root, but it may not be correct... couldn't find next/package.json from /workspace/apps/frontend/app'. Cause: npm workspaces hoist next to /workspace/node_modules, but the anonymous volume at /workspace/apps/frontend/node_modules creates an empty directory that stops Turbopack from walking up to the hoisted package. Fix by setting turbopack.root in apps/frontend/next.config.ts to the repo root.
- Out of scope: unrelated refactors not required for "Fix Next.js Turbopack root inference under docker-compose anonymous volumes".

## Verification

- State: ok
- Note: Removed the anonymous volume mount /workspace/apps/frontend/node_modules from docker-compose frontend service. Verified by reproducing the user's host state (apps/frontend/node_modules with @types/) in a worktree, then docker compose up postgres backend frontend: frontend reaches Ready in 1058ms with no Turbopack inference warning, and GET / returns 200 in 682ms. Backend healthy and untouched. Hot reload via .:/workspace bind-mount remains intact (no other volume changes).
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-27T10:23:03.573Z
- Branch: task/202604270959-3HJEXZ/fix-turbopack-root
- Head: 415cb149dedc

```text
No changes detected.
```

</details>
