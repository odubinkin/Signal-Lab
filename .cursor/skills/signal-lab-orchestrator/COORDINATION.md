# Signal Lab Orchestrator Coordination Prompts

Use these templates when delegating each phase.

## Universal Delegate Output Contract

Every delegate must return this envelope:
```json
{
  "status": "ok | rework | blocked",
  "summary": "short result summary",
  "artifacts": [
    { "path": ".execution/<executionId>/<file>", "note": "what was written" }
  ],
  "checks": [
    { "name": "check name", "result": "pass | fail", "details": "short details" }
  ],
  "nextAction": "recommended next step"
}
```

If response is missing fields, orchestrator must request a corrected response before proceeding.

## Phase 1: PRD Analysis (fast)

Goal: extract requirements and constraints.

Template:
```
Analyze the PRD at <PRD_PATH_OR_TEXT>.
Return:
1) Requirements list.
2) Constraints and non-goals.
3) Acceptance criteria.
4) Risks/ambiguities requiring clarification.
Keep it implementation-oriented and concise.
Output must follow Universal Delegate Output Contract.
```

## Phase 2: Codebase Scan (fast)

Goal: map implementation surfaces and dependencies.

Template:
```
Scan the repository for files/modules needed to implement this PRD scope: <SCOPE>.
Return:
1) Relevant files with why each matters.
2) Data flow and API touchpoints.
3) Existing patterns to reuse.
4) Potential integration risks.
Output must follow Universal Delegate Output Contract.
```

## Phase 3: Planning (default)

Goal: design execution strategy.

Template:
```
Create an implementation plan for scope: <SCOPE>.
Include:
1) Major milestones.
2) Risk mitigation.
3) Verification strategy.
4) Dependencies/order of work.
Prefer smallest viable increments.
Output must follow Universal Delegate Output Contract.
```

## Phase 4: Decomposition (default)

Goal: atomic tasks and model routing.

Template:
```
Decompose the approved plan into atomic tasks (5-10 min each).
Each task must include:
- id, title, domain, description (1-3 sentences)
- dependencies
- complexity: low|medium|high
- recommended model: fast|default
- recommended skill
- done condition
Keep at least 80% of tasks on fast where feasible.
Output must follow Universal Delegate Output Contract.
```

## Phase 5: Implementation (fast/default)

Goal: execute dependency-ready task batches.

Template:
```
Implement only these ready tasks: <TASK_IDS>.
Constraints:
- Follow existing project patterns.
- Keep changes scoped to listed tasks.
- Report file edits, commands run, and verification results.
- If blocked, return blocker + minimal unblock proposal.
Output must follow Universal Delegate Output Contract.
```

Escalation template (to default model):
```
This task requires escalation due to complexity/risk:
<TASK_ID + BLOCKER_REASON>
Implement safely and include trade-offs.
```

## Phase 6: Review (fast, readonly)

Goal: validate quality by domain.

Template:
```
Review changes for domain: <database|backend|frontend> in read-only mode.
Return:
1) Pass/Fail.
2) Critical issues first.
3) Exact remediation items.
4) Residual risks.
Do not propose unrelated refactors.
Output must follow Universal Delegate Output Contract.
```

Remediation template:
```
Address reviewer findings exactly as listed:
<FEEDBACK>
Limit changes to required fixes.
Return verification evidence.
```

## Phase 7: Report (fast)

Goal: concise final summary.

Template:
```
Produce final report:
- Status
- Tasks: completed/failed/retries
- Model usage counts
- Completed highlights
- Failed items and reasons
- Recommended next actions
Keep the report compact and actionable.
Output must follow Universal Delegate Output Contract.
```
