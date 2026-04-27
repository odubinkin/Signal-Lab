# Dockerfile and Build Optimization

Use this module when optimizing image build process, size, reproducibility, or build cache efficiency.

## Build Structure Baselines

- Use multi-stage builds to separate build toolchain from runtime image.
- Choose minimal trusted base images and pin versions deliberately.
- Keep build context small with `.dockerignore`.
- Order layers for cache efficiency (stable dependency layers first, volatile source layers later).

## BuildKit-Oriented Optimization

- Use cache-aware strategies for dependency managers.
- Consider external cache (`cache-from`/`cache-to`) in CI for faster rebuilds.
- Use bind/cache mounts where appropriate to reduce unnecessary layer churn.

## Determinism and Reproducibility

- Use locked dependencies and explicit build args.
- Avoid network side effects that vary by build host/time unless intentional.
- Rebuild periodically with fresh base pulls to incorporate security updates.

## Anti-Patterns

- Copying full source too early and invalidating caches frequently.
- Single-stage production images carrying compilers and test toolchains.
- Unpinned mutable tags without update governance.

## Verification

- Compare image size before/after and explain deltas.
- Validate cache-hit behavior on iterative rebuilds.
- Confirm runtime image does not contain build-only artifacts.
