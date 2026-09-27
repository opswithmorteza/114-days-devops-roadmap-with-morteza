#!/usr/bin/env bash
set -Eeuo pipefail

# Safe helper for Day 037: Docker Compose Basics
# It checks prerequisites and prints the lesson plan. It intentionally does not
# execute infrastructure-changing commands. Run those manually after review.

readonly DAY="037"
readonly TOPIC="Docker Compose Basics"
readonly REQUIRED_TOOLS="git docker"

usage() {
  cat <<'USAGE'
Usage: bash lab.sh <check|plan|verify>

  check   report installed and missing command-line tools
  plan    print the reviewed command sequence without executing it
  verify  validate the project documentation and required directories
USAGE
}

check_tools() {
  local missing=0 tool
  for tool in $REQUIRED_TOOLS; do
    if command -v "$tool" >/dev/null 2>&1; then
      printf 'OK      %s\n' "$tool"
    else
      printf 'MISSING %s\n' "$tool"
      missing=1
    fi
  done
  return "$missing"
}

show_plan() {
  cat <<'PLAN'
Day 037 — Docker Compose Basics

Read and adapt these commands; do not paste them into production:

#   docker compose config
#   docker compose up -d
#   docker compose ps

Workflow: discover -> plan -> validate -> apply -> observe -> recover -> clean up
PLAN
}

verify_project() {
  local base
  base="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  local failed=0 file
  for file in README.md PROJECT-1.md PROJECT-2.md; do
    if [[ -s "$base/$file" ]]; then
      printf 'OK      %s\n' "$file"
    else
      printf 'MISSING %s\n' "$file"
      failed=1
    fi
  done
  return "$failed"
}

case "${1:-}" in
  check) check_tools ;;
  plan) show_plan ;;
  verify) verify_project ;;
  *) usage; exit 2 ;;
esac
