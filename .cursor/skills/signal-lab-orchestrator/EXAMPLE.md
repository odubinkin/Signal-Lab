# Examples

## Example 1: Full PRD execution

User prompt:
```
Use signal-lab-orchestrator to implement prds/004_prd-orchestrator.md end-to-end.
```

Expected orchestrator behavior:
1. Creates `.execution/<executionId>/` and `context.json`.
2. Runs phases in order and updates phase statuses.
3. Decomposes tasks with `fast/default` assignment.
4. Executes dependency-ready groups.
5. Runs review loop with up to 3 retries per domain.
6. Produces final report.

## Example 2: Scoped execution

User prompt:
```
Run only F4-F8 from prds/004_prd-orchestrator.md.
Exclude frontend UI changes.
```

Expected orchestrator behavior:
1. Restricts analysis and task list to requested sections.
2. Marks excluded items as out-of-scope in plan/report.
3. Continues normal phase flow for included scope only.

## Example 3: Resume interrupted run

User prompt:
```
Resume the latest interrupted orchestrator run for PRD 004.
```

Expected orchestrator behavior:
1. Loads existing `.execution/<executionId>/context.json`.
2. Starts from `currentPhase`.
3. Skips completed phases and continues pending/failed work.
