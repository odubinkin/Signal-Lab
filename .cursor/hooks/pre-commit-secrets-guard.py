#!/usr/bin/env python3
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import List, Optional


SECRET_PATTERNS = [
    re.compile(r"AKIA[0-9A-Z]{16}"),
    re.compile(r"ghp_[A-Za-z0-9]{36}"),
    re.compile(r"github_pat_[A-Za-z0-9_]{20,}"),
    re.compile(r"sk-[A-Za-z0-9]{20,}"),
    re.compile(r"xox[baprs]-[A-Za-z0-9-]{10,}"),
    re.compile(
        r"(?i)\b(api[_-]?key|secret|token|password)\b\s*[:=]\s*['\"][^'\"]{8,}['\"]"
    ),
]

EXCLUDE_PATHS = (
    ".env.example",
    ".md",
    ".mdx",
    ".txt",
)


def run_git(command: List[str]) -> str:
    return subprocess.check_output(command, text=True, cwd=Path.cwd())


def extract_staged_paths() -> List[str]:
    out = run_git(["git", "diff", "--cached", "--name-only"])
    paths = [line.strip() for line in out.splitlines() if line.strip()]
    return [p for p in paths if not p.endswith(EXCLUDE_PATHS)]


def extract_staged_diff(paths: List[str]) -> str:
    if not paths:
        return ""
    return run_git(["git", "diff", "--cached", "--"] + paths)


def find_secret_snippet(diff_text: str) -> Optional[str]:
    for line in diff_text.splitlines():
        if not line.startswith("+") or line.startswith("+++"):
            continue
        for pattern in SECRET_PATTERNS:
            if pattern.search(line):
                return line[:200]
    return None


def allow() -> None:
    print(json.dumps({"continue": True, "permission": "allow"}))


def deny(snippet: str) -> None:
    print(
        json.dumps(
            {
                "continue": True,
                "permission": "deny",
                "user_message": "Commit blocked: staged diff looks like it contains a hardcoded secret.",
                "agent_message": (
                    "Detected a potential secret in staged changes. "
                    "Move secret values to environment variables or secret manager before committing. "
                    f"Example matched line: {snippet}"
                ),
            }
        )
    )


def main() -> None:
    payload = json.load(sys.stdin)
    command = payload.get("command", "")

    if not re.search(r"^git\s+commit\b", command):
        allow()
        return

    try:
        paths = extract_staged_paths()
        staged_diff = extract_staged_diff(paths)
    except Exception:
        # failClosed=true in hooks.json handles unexpected runtime failures safely.
        raise

    snippet = find_secret_snippet(staged_diff)
    if snippet:
        deny(snippet)
        return

    allow()


if __name__ == "__main__":
    main()
