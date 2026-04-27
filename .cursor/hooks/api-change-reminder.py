#!/usr/bin/env python3
import json
import sys
from datetime import datetime, timezone
from pathlib import Path


STATE_DIR = Path(".cursor/hooks/.state")
REMINDERS_LOG = STATE_DIR / "reminders.log"
DEDUP_KEY = "api-change-sync"


def should_track(file_path: str) -> bool:
    norm = file_path.replace("\\", "/").lower()
    api_suffixes = (
        ".controller.ts",
        ".controller.js",
        ".dto.ts",
        ".dto.js",
        ".contract.ts",
        ".contract.js",
    )
    return (
        norm.endswith(api_suffixes)
        or "openapi" in norm
        or "swagger" in norm
        or "/api/" in norm
    )


def main() -> None:
    payload = json.load(sys.stdin)
    file_path = payload.get("file_path", "")
    if not file_path or not should_track(file_path):
        return

    STATE_DIR.mkdir(parents=True, exist_ok=True)
    existing = REMINDERS_LOG.read_text(encoding="utf-8") if REMINDERS_LOG.exists() else ""
    if DEDUP_KEY in existing:
        return

    ts = datetime.now(timezone.utc).isoformat()
    message = (
        f"[{ts}] {DEDUP_KEY}: API surface likely changed in {file_path}. "
        "Update Swagger/OpenAPI and sync frontend API contracts."
    )
    with REMINDERS_LOG.open("a", encoding="utf-8") as f:
        f.write(message + "\n")


if __name__ == "__main__":
    main()
