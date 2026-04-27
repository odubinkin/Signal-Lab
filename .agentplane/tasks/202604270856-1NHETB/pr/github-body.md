## Summary

Implement observability stack services

Add Prometheus, Loki, Promtail, and Grafana to docker-compose with provisioned datasources and a dashboard that satisfies PRD-002 sections F8-F9 and the verification walkthrough. Backend, frontend, and Sentry/metrics/logging code already exist; this task only adds observability service config and stack wiring.

## Scope

- In scope: Add Prometheus, Loki, Promtail, and Grafana to docker-compose with provisioned datasources and a dashboard that satisfies PRD-002 sections F8-F9 and the verification walkthrough. Backend, frontend, and Sentry/metrics/logging code already exist; this task only adds observability service config and stack wiring.
- Out of scope: unrelated refactors not required for "Implement observability stack services".

## Verification

- State: ok
- Note: Provisioned Prometheus, Loki, Promtail, and Grafana with a Signal Lab dashboard; Prometheus scrapes the backend, Promtail ships JSON logs to Loki with parsed labels, and Grafana surfaces all three datasources and the four-panel dashboard end-to-end.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-27T09:05:54.262Z
- Branch: task/202604270856-1NHETB/observability-stack
- Head: 16e1142cbbc5

```text
 .env.example                                       |  15 ++
 README.md                                          |  38 +++++
 docker-compose.yml                                 |  85 +++++++++++
 observability/grafana/dashboards/signal-lab.json   | 157 +++++++++++++++++++++
 .../grafana/provisioning/dashboards/dashboards.yml |  13 ++
 .../provisioning/datasources/datasources.yml       |  21 +++
 observability/loki/loki-config.yml                 |  42 ++++++
 observability/prometheus/prometheus.yml            |  20 +++
 observability/promtail/promtail-config.yml         |  49 +++++++
 9 files changed, 440 insertions(+)
```

</details>
