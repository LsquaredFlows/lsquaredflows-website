#!/usr/bin/env bash
# Run from repo root (lsquaredflows-frontend). Fails if staged or tracked files look like secrets or wrong-project junk.
set -e
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

env_match() {
  [[ "$1" == .env ]] && return 0
  [[ "$1" == .env.* ]] && return 0
  [[ "$1" == *"/.env" ]] && return 0
  [[ "$1" == *"/.env."* ]] && return 0
  return 1
}

FORBIDDEN_PATTERNS=(
  '.pem'
  'personal-ai-brain'
  'backup'
  '.xlsx'
  '.docx'
  '.xls'
  '.doc'
  '_Recreated'
  'Ikkkkkkkk'
  'whapp'
  'Screenshot'
  '20.27'
  '20.28'
)

check_files() {
  local files="$1"
  local found=
  while IFS= read -r f; do
    [ -z "$f" ] && continue
    if env_match "$f"; then
      echo "FORBIDDEN: $f (env file)"
      found=1
      continue
    fi
    for p in "${FORBIDDEN_PATTERNS[@]}"; do
      if echo "$f" | grep -q "$p" 2>/dev/null; then
        echo "FORBIDDEN: $f (matches: $p)"
        found=1
      fi
    done
  done <<< "$files"
  [ -n "$found" ] && return 1
  return 0
}

STAGED="$(git diff --cached --name-only 2>/dev/null || true)"
TRACKED="$(git ls-files 2>/dev/null || true)"
ALL="$STAGED"$'\n'"$TRACKED"

if ! check_files "$ALL"; then
  echo ""
  echo "Blocked: staged or tracked files match forbidden patterns (secrets, personal, or wrong-project)."
  echo "Remove them from the repo or unstage and add to .gitignore. Do not push."
  exit 1
fi

echo "safe-push-check passed."
exit 0
