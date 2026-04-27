#!/usr/bin/env python3
import json
import sys
from datetime import datetime, timezone
from pathlib import Path


STATE_DIR = Path(".cursor/hooks/.state")
REMINDERS_LOG = STATE_DIR / "reminders.log"
DEDUP_KEY = "schema-change"


def should_track(file_path: str) -> bool:
    norm = file_path.replace("\\", "/").lower()
    return norm.endswith("/prisma/schema.prisma") or norm.endswith(".prisma")


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
        f"[{ts}] {DEDUP_KEY}: Prisma schema changed at {file_path}. "
        "Remember to create/apply a migration and regenerate Prisma client/types."
    )
    with REMINDERS_LOG.open("a", encoding="utf-8") as f:
        f.write(message + "\n")


if __name__ == "__main__":
    main()
