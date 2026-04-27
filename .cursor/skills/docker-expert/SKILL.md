---
name: docker-expert
description: Use when building or hardening container workflows. Keeps main context small by loading focused modules for Dockerfile/build performance, runtime security, and compose/CI operations.
---

Use this skill for non-trivial Docker and containerization tasks.

## Module Loading Rules

1. If the task changes Dockerfile structure, image size, build speed, or cache behavior:
- Load `references/dockerfile-and-build-optimization.md`

2. If the task changes runtime hardening, user permissions, secrets handling, or supply-chain posture:
- Load `references/runtime-hardening-and-secrets.md`

3. If the task changes Docker Compose topology, environment overlays, or CI build/push pipelines:
- Load `references/compose-and-ci-delivery.md`

4. If multiple concerns apply:
- Load modules in the order above and stop when enough context is gathered.

## Execution Contract

- Build minimal images with explicit stage boundaries.
- Keep secrets out of layers and image history.
- Enforce runtime least-privilege defaults.
- Verify reproducibility and startup behavior after changes.

## Output Requirements

- Summarize build/runtime tradeoffs made.
- Highlight security-sensitive decisions.
- Provide concrete verification steps and outcomes.
