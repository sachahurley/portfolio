#!/usr/bin/env bash
#
# vendor-catalog.sh < scorp-ds/docs/component-references/catalog.md
#
# Prints the scorp-ds component catalog as this repo vendors it, to
# vendor/scorp-ds/catalog.md. vendor-ds.sh writes this output and
# check-ds-sync.sh diffs against it, so both apply the same two changes:
#   - spec links, relative to the scorp-ds tree, become GitHub URLs
#   - a header under the title says this is a vendored copy
# Everything else is the catalog byte for byte.
set -euo pipefail

sed -e 's|](\.\./\.\./docs/specs/|](https://github.com/sachahurley/scorp-ds/blob/main/docs/specs/|g' |
  awk 'NR == 1 {
    print
    print ""
    print "> **Vendored copy.** Written by `npm run vendor:ds` from scorp-ds `docs/component-references/catalog.md`; `npm run ds:check` fails when it is stale. Do not edit it here. Where it says `CLAUDE.md` or `docs/decisions/` it means the scorp-ds ones: https://github.com/sachahurley/scorp-ds"
    next
  }
  { print }'
