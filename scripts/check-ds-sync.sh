#!/usr/bin/env bash
#
# ds:check — is vendor/scorp-ds in sync with the local ../scorp-ds checkout?
#
# Compares the vendored tokens (source of the runtime contract) and the
# components manifest against the sibling scorp-ds checkout. Exit 0 = in
# sync; exit 1 = vendor is stale (run `npm run vendor:ds`).
# Override the DS location with SCORP_DS_DIR=/path/to/scorp-ds
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

if [ "$fail" -eq 0 ]; then
  echo "✓ IN SYNC — vendor/scorp-ds matches $DS"
else
  echo "✗ OUT OF SYNC — run: npm run vendor:ds  (then npm run build, commit vendor/)" >&2
fi
exit "$fail"
