## Summary

Switch dev containers to Dockerfile.dev with anonymous node_modules volumes

Replace inline npm install in docker-compose backend/frontend services with dedicated Dockerfile.dev images that bake npm ci. Use anonymous volumes for node_modules to preserve hot reload via source bind-mount while eliminating ENOTEMPTY race in the shared root_node_modules named volume.

## Scope

- In scope: Replace inline npm install in docker-compose backend/frontend services with dedicated Dockerfile.dev images that bake npm ci. Use anonymous volumes for node_modules to preserve hot reload via source bind-mount while eliminating ENOTEMPTY race in the shared root_node_modules named volume.
- Out of scope: unrelated refactors not required for "Switch dev containers to Dockerfile.dev with anonymous node_modules volumes".

## Verification

- State: ok
- Note: Variant 2 implemented and verified: Dockerfile.dev for backend and frontend bake npm ci into the image; docker-compose backend/frontend now use build: + anonymous volumes /workspace/node_modules and per-service /workspace/apps/<svc>/node_modules. Removed shared named volumes root_node_modules/backend_node_modules/frontend_node_modules. Backend reaches healthy on first probe; Nest watcher detects source bind-mount changes and triggers incremental rebuild + restart (procps added to backend image because nest --watch shells out to ps). Frontend (Next.js 16 Turbopack) is Ready in 445ms and responds 200 on /. ENOTEMPTY race is structurally impossible because npm install no longer runs at container startup. Lockfile fix (fsevents marked as dev) bundled per user request.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-27T09:50:53.792Z
- Branch: task/202604270931-ZSYN45/docker-dev-hotreload
- Head: d99be4c73b98

```text
 apps/backend/Dockerfile.dev  | 20 ++++++++++++++++++++
 apps/frontend/Dockerfile.dev | 16 ++++++++++++++++
 docker-compose.yml           | 23 ++++++++++++-----------
 package-lock.json            |  1 +
 4 files changed, 49 insertions(+), 11 deletions(-)
```

</details>
