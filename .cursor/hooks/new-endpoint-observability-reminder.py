#!/usr/bin/env python3
import json
import sys
from datetime import datetime, timezone
from pathlib import Path


STATE_DIR = Path(".cursor/hooks/.state")
REMINDERS_LOG = STATE_DIR / "reminders.log"
DEDUP_KEY = "new-endpoint-observability"


def should_track(file_path: str) -> bool:
    norm = file_path.replace("\\", "/").lower()
    endpoint_suffixes = (
        ".controller.ts",
        ".controller.js",
        ".route.ts",
        ".route.js",
        ".resolver.ts",
        ".resolver.js",
    )
    return norm.endswith(endpoint_suffixes)


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
        f"[{ts}] {DEDUP_KEY}: Endpoint-related file changed at {file_path}. "
        "Confirm request metrics, structured logs, and Sentry capture are wired."
    )
    with REMINDERS_LOG.open("a", encoding="utf-8") as f:
        f.write(message + "\n")


if __name__ == "__main__":
    main()
