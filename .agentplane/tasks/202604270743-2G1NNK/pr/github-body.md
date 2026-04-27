## Summary

Build frontend observability demo

Implement the Signal Lab frontend from PRD 001 and PRD 002 using Next.js scaffold utilities, Tailwind, shadcn-style UI, TanStack Query, and React Hook Form. Add only minimal backend/API support required for frontend run history.

## Scope

- In scope: Implement the Signal Lab frontend from PRD 001 and PRD 002 using Next.js scaffold utilities, Tailwind, shadcn-style UI, TanStack Query, and React Hook Form. Add only minimal backend/API support required for frontend run history.
- Out of scope: unrelated refactors not required for "Build frontend observability demo".

## Verification

- State: ok
- Note: Updated .env.example with backend/frontend sections and variable purpose comments.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-27T08:24:30.531Z
- Branch: task/202604270743-2G1NNK/frontend-observability-demo
- Head: 12454739d5ec

```text
 .agentplane/WORKFLOW.md                            |     4 +-
 .agentplane/config.json                            |     2 +-
 .agentplane/tasks/202604270736-7VG1HV/README.md    |   168 +
 .agentplane/workflows/last-known-good.md           |     4 +-
 .env.example                                       |    29 +-
 README.md                                          |    10 +-
 .../src/scenario-runs/scenario-runs.controller.ts  |    23 +-
 .../src/scenario-runs/scenario-runs.int-spec.ts    |    39 +-
 .../scenario-runs/scenario-runs.service.spec.ts    |    35 +
 .../src/scenario-runs/scenario-runs.service.ts     |    25 +
 apps/backend/tsconfig.json                         |     2 +-
 apps/frontend/.gitignore                           |    41 +
 apps/frontend/AGENTS.md                            |     5 +
 apps/frontend/CLAUDE.md                            |     1 +
 apps/frontend/README.md                            |    36 +
 apps/frontend/app/favicon.ico                      |   Bin 0 -> 25931 bytes
 apps/frontend/app/globals.css                      |   130 +
 apps/frontend/app/layout.tsx                       |    24 +
 apps/frontend/app/page.tsx                         |   261 +
 apps/frontend/components.json                      |    25 +
 apps/frontend/components/query-provider.tsx        |    20 +
 apps/frontend/components/ui/badge.tsx              |    52 +
 apps/frontend/components/ui/button.tsx             |    58 +
 apps/frontend/components/ui/card.tsx               |   103 +
 apps/frontend/components/ui/input.tsx              |    20 +
 apps/frontend/components/ui/select.tsx             |   201 +
 apps/frontend/components/ui/sonner.tsx             |    49 +
 apps/frontend/eslint.config.mjs                    |    18 +
 apps/frontend/lib/api.ts                           |    88 +
 apps/frontend/lib/utils.ts                         |     6 +
 apps/frontend/next.config.ts                       |    10 +
 apps/frontend/package.json                         |    37 +
 apps/frontend/postcss.config.mjs                   |     7 +
 apps/frontend/public/file.svg                      |     1 +
 apps/frontend/public/globe.svg                     |     1 +
 apps/frontend/public/next.svg                      |     1 +
 apps/frontend/public/vercel.svg                    |     1 +
 apps/frontend/public/window.svg                    |     1 +
 apps/frontend/tsconfig.json                        |    34 +
 docker-compose.yml                                 |    25 +-
 package-lock.json                                  | 19785 ++++++++++++-------
 package.json                                       |     3 +
 42 files changed, 14390 insertions(+), 6995 deletions(-)
```

</details>
