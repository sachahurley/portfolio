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

echo "→ copying tokens (src + preset + manifest) …"
rm -rf "$DEST/tokens/src"
cp -R "$DS/packages/tokens/src" "$DEST/tokens/src"
cp "$DS/packages/tokens/tailwind.preset.js" "$DEST/tokens/tailwind.preset.js"
cp "$DS/packages/tokens/package.json" "$DEST/tokens/package.json"

echo "✓ vendored. Next: npm run build   then   git add vendor && git commit -m 'sync ds'"
