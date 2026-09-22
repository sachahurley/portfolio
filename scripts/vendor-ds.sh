#!/usr/bin/env bash
#
# Re-vendor @scorp-ds into the portfolio from the sibling ../scorp-ds checkout.
#
# Rebuilds the components package (which bakes the current tokens into its CSS),
# then copies the publishable files into vendor/ so the repo stays self-contained
# for cloud builds. Tokens ships as source (no build step), so it's just copied.
#
# Usage:  npm run vendor:ds   (then review `git status vendor/` and commit)
# Override the DS location with SCORP_DS_DIR=/path/to/scorp-ds
#
# Prefer a scorp-ds worktree you own over the shared ~/Projects/scorp-ds
# checkout, so a concurrent session can't switch its branch mid-build:
#   git -C ~/Projects/scorp-ds worktree add ~/conductor/workspaces/scorp-ds/<name> -b <branch>
#   SCORP_DS_DIR=~/conductor/workspaces/scorp-ds/<name> npm run vendor:ds
set -euo pipefail

DS="${SCORP_DS_DIR:-../scorp-ds}"
DEST="vendor/scorp-ds/packages"

if [ ! -d "$DS/packages/components" ]; then
  echo "error: scorp-ds not found at '$DS' (set SCORP_DS_DIR to override)" >&2
  exit 1
fi

echo "→ building @scorp-ds/components in $DS …"
npm --prefix "$DS" run build:components

echo "→ copying components (dist + manifest) …"
rm -rf "$DEST/components/dist"
cp -R "$DS/packages/components/dist" "$DEST/components/dist"
cp "$DS/packages/components/package.json" "$DEST/components/package.json"

# Source maps are deliberately not vendored. They were 1.3 MB of a 2.2 MB
# dist, they point at scorp-ds source paths that don't exist in this repo,
# and as single-line several-hundred-KB files they are the one thing in
# vendor/ that git can never three-way merge: any two branches that both
# re-vendor conflict on them, every time. check-ds-sync.sh already excludes
# them from its dist diff, so dropping them changes nothing it verifies.
# The dangling sourceMappingURL comments stay, so the .js files still match
# the DS build byte for byte and that diff keeps its meaning.
find "$DEST/components/dist" -name '*.map' -delete

echo "→ copying tokens (src + preset + manifest) …"
rm -rf "$DEST/tokens/src"
cp -R "$DS/packages/tokens/src" "$DEST/tokens/src"
# Drop the DS's own test files: they resolve paths against the scorp-ds repo
# layout, so a consumer that globs vendor/ for tests would fail on them.
find "$DEST/tokens/src" -name '*.test.*' -delete
cp "$DS/packages/tokens/tailwind.preset.js" "$DEST/tokens/tailwind.preset.js"
cp "$DS/packages/tokens/package.json" "$DEST/tokens/package.json"

# Record what this build actually came from. The DS checkout is shared, so
# "which commit is this?" is not answerable after the fact without it.
if git -C "$DS" rev-parse --git-dir > /dev/null 2>&1; then
  echo "✓ vendored $(git -C "$DS" log -1 --format=%h) on $(git -C "$DS" branch --show-current) from $DS"
else
  echo "✓ vendored from $DS"
fi
echo "  Next: npm run build   then   git add vendor && git commit -m 'sync ds'"
