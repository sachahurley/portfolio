#!/usr/bin/env bash
#
# ds:check — is vendor/scorp-ds in sync with the local ../scorp-ds checkout?
#
# Compares the vendored tokens (source of the runtime contract), the
# components manifest, AND the built components dist against the sibling
# scorp-ds checkout. The dist diff rebuilds the DS first (same step
# vendor-ds.sh runs), because the component package version is never
# bumped — comparing manifests alone reported IN SYNC on stale bundles.
# Exit 0 = in sync; exit 1 = vendor is stale (run `npm run vendor:ds`).
# Override the DS location with SCORP_DS_DIR=/path/to/scorp-ds.
# Set SKIP_DS_BUILD=1 to skip the rebuild (dist diff then trusts the
# checkout's existing dist — only safe right after a build).
set -euo pipefail

DS="${SCORP_DS_DIR:-../scorp-ds}"
DEST="vendor/scorp-ds/packages"

if [ ! -d "$DS/packages/tokens" ]; then
  echo "ds:check error: scorp-ds not found at '$DS' (set SCORP_DS_DIR)" >&2
  exit 2
fi

fail=0
for f in \
  tokens/src/tokens.json \
  tokens/src/styles/tokens.css \
  tokens/tailwind.preset.js \
  tokens/package.json \
  components/package.json
do
  if ! diff -q "$DEST/$f" "$DS/packages/$f" > /dev/null 2>&1; then
    echo "STALE   $f"
    fail=1
  else
    echo "match   $f"
  fi
done

# Honest component check: rebuild the DS dist and diff it against the
# vendored copy. Sourcemaps are excluded (path noise, no runtime effect).
if [ "${SKIP_DS_BUILD:-0}" != "1" ]; then
  echo "→ rebuilding @scorp-ds/components in $DS for the dist diff …"
  npm --prefix "$DS" run build:components > /dev/null 2>&1
fi
if ! diff -rq -x '*.map' "$DEST/components/dist" "$DS/packages/components/dist" > /dev/null 2>&1; then
  echo "STALE   components/dist"
  fail=1
else
  echo "match   components/dist"
fi

# Known deliberate forks — NOT synced, listed so every check run surfaces
# them as decisions rather than silent drift. Review when the DS side moves.
echo "fork    src/components/Toaster.tsx — summarizing toaster; plate CSS mirrors the DS Toast recipe by hand (minimal.css .toast)"

if [ "$fail" -eq 0 ]; then
  echo "✓ IN SYNC — vendor/scorp-ds matches $DS"
else
  echo "✗ OUT OF SYNC — run: npm run vendor:ds  (then npm run build, commit vendor/)" >&2
fi
exit "$fail"
