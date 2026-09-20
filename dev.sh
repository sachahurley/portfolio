#!/bin/bash
# =============================================================
# PORTFOLIO DEV SCRIPT
# =============================================================
# Starts Scorp DS components in watch mode + a sync loop feeding the
# rebuilt dist into vendor/ + the portfolio Vite server.
#
# Vite resolves @scorp-ds/* through the file: deps into vendor/, NOT the
# sibling checkout — so the watch build alone is invisible to dev. The
# sync loop below copies each rebuild into vendor/, which is what makes
# DS edits show up. That also means vendor/ gets dirty with your local
# DS build during dev: run `git checkout -- vendor/` (or a proper
# `npm run vendor:ds` from DS main) before committing. CI's ds-check
# will fail the PR if a WIP DS build sneaks into a commit.
#
# TO USE: Run "npm run dev" in the portfolio folder
# TO STOP: Press Ctrl+C (stops all three processes)
# =============================================================

SCORP_DS_COMPONENTS="$HOME/Projects/scorp-ds/packages/components"
VENDOR_DIST="$(cd "$(dirname "$0")" && pwd)/vendor/scorp-ds/packages/components/dist"

echo ""
echo "========================================="
echo "  Starting Portfolio Development"
echo "========================================="
echo ""

echo "[SCORP DS] Starting components watch build..."
cd "$SCORP_DS_COMPONENTS" && npm run dev &
DESIGN_PID=$!

echo "[SCORP DS] Waiting for initial build..."
sleep 3

echo "[SCORP DS] Starting dist -> vendor sync loop..."
(
  while true; do
    rsync -a --delete --exclude '*.map' "$SCORP_DS_COMPONENTS/dist/" "$VENDOR_DIST/" 2>/dev/null
    sleep 1
  done
) &
SYNC_PID=$!

echo ""
echo "[PORTFOLIO] Starting dev server..."
cd "$(dirname "$0")" && npx vite &
PORTFOLIO_PID=$!

echo ""
echo "========================================="
echo "  All three processes are running!"
echo "  DS edits land in vendor/ within ~1s."
echo "  Press Ctrl+C to stop everything"
echo "========================================="
echo ""

cleanup() {
  echo ""
  echo "Stopping all processes..."
  kill $DESIGN_PID $SYNC_PID $PORTFOLIO_PID 2>/dev/null
  wait
  if ! git diff --quiet vendor/ 2>/dev/null; then
    echo ""
    echo "NOTE: vendor/ now holds your local DS dev build."
    echo "Before committing: git checkout -- vendor/   (or npm run vendor:ds from DS main)"
  fi
  echo "All stopped. Goodbye!"
}
trap cleanup SIGINT SIGTERM

wait
