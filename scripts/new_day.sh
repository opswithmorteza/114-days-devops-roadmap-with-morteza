#!/usr/bin/env bash
set -euo pipefail
if [[ $# -lt 2 ]]; then
  echo "Usage: scripts/new_day.sh <day-number> "<topic>"" >&2
  exit 1
fi
day=$(printf "%03d" "$1")
topic="$2"
folder="Day-${day}_$(echo "$topic" | tr -cd '[:alnum:] _-' | tr ' ' '_' | cut -c1-40)"
mkdir -p "$folder/project"
cat > "$folder/notes.md" <<EOF
# Day ${day} – ${topic}

## 🎯 Goals
- ${topic}

## 🔧 Lab / Project
Describe the lab steps here.

## 📝 Notes
- Commands tried:
- Gotchas:

## 🔎 References
- Add links you used.
EOF
cat > "$folder/project/README.md" <<EOF
# Project – Day ${day}

Describe the project and how to run it.
EOF
echo "Created $folder"
