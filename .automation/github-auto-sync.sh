#!/bin/bash
set -u

repo="/Users/katrina/Documents/ChatGPT/able"
lock_dir="$repo/.git/able-auto-sync.lock"
log_prefix="[able-auto-sync]"

cd "$repo" || exit 1
if ! mkdir "$lock_dir" 2>/dev/null; then
  exit 0
fi
trap 'rmdir "$lock_dir" 2>/dev/null || true' EXIT

# Skip while another Git operation is active.
for marker in MERGE_HEAD rebase-merge rebase-apply CHERRY_PICK_HEAD; do
  if [ -e "$repo/.git/$marker" ]; then
    echo "$log_prefix skipped: Git operation in progress"
    exit 0
  fi
done

/usr/bin/git add -A
if ! /usr/bin/git diff --cached --quiet; then
  stamp=$(/bin/date '+%Y-%m-%d %H:%M:%S %Z')
  /usr/bin/git commit -m "chore: auto-sync $stamp" || exit 1
fi

branch=$(/usr/bin/git branch --show-current)
if [ -z "$branch" ]; then
  echo "$log_prefix skipped: detached HEAD"
  exit 0
fi

/usr/bin/git push origin "HEAD:$branch" || exit 1
echo "$log_prefix synced $branch at $(/bin/date '+%Y-%m-%d %H:%M:%S %Z')"
