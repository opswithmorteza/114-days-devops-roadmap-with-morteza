#!/usr/bin/env bash
set -Eeuo pipefail

# Validate every generated day without running infrastructure-changing commands.
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
count=0

while IFS= read -r -d '' helper; do
  bash "$helper" verify
  bash "$helper" plan >/dev/null
  count=$((count + 1))
done < <(find "$repo_root" -mindepth 3 -maxdepth 3 -type f -path '*/project/lab.sh' -print0 | sort -z)

if [[ "$count" -ne 114 ]]; then
  printf 'ERROR: expected 114 lab helpers, found %s\n' "$count" >&2
  exit 1
fi

printf 'PASS: validated %s lab helpers without changing infrastructure.\n' "$count"
