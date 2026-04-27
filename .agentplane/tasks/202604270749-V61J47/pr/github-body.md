## Summary

Add Cursor command prompts

Add Cursor command markdown prompts for /add-endpoint and /health-check according to PRD 003.

## Scope

In scope: add two Cursor command markdown prompts under .cursor/commands for /add-endpoint and /health-check. Out of scope: implementation code changes, additional commands, hooks, skills, marketplace skill setup, and PRD-wide completion.

## Verification

- State: ok
- Note: Added .cursor/commands/add-endpoint.md and .cursor/commands/health-check.md; verified command prompts by inspection, node .agentplane/policy/check-routing.mjs, and agentplane doctor.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-27T07:51:45.940Z
- Branch: task/202604270749-V61J47/cursor-commands
- Head: a63b81c06c4c

```text
 .agentplane/WORKFLOW.md                         |   4 +-
 .agentplane/config.json                         |   2 +-
 .agentplane/tasks/202604270736-7VG1HV/README.md | 168 ++++++++++++++++++++++++
 .agentplane/workflows/last-known-good.md        |   4 +-
 .cursor/commands/add-endpoint.md                |  68 ++++++++++
 .cursor/commands/health-check.md                |  90 +++++++++++++
 6 files changed, 331 insertions(+), 5 deletions(-)
```

</details>
