#!/bin/bash
# =============================================================
# PORTFOLIO DEV SCRIPT
# =============================================================
# Starts Scorp DS components in watch mode + portfolio Vite server.
#
# TO USE: Run "npm run dev" in the portfolio folder
# TO STOP: Press Ctrl+C (stops both processes)
# =============================================================

SCORP_DS_COMPONENTS="$HOME/Projects/scorp-ds/packages/components"

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

echo ""
echo "[PORTFOLIO] Starting dev server..."
cd "$(dirname "$0")" && npx vite &
PORTFOLIO_PID=$!

echo ""
echo "========================================="
echo "  Both servers are running!"
echo "  Press Ctrl+C to stop everything"
echo "========================================="
echo ""

cleanup() {
  echo ""
  echo "Stopping both servers..."
  kill $DESIGN_PID 2>/dev/null
  kill $PORTFOLIO_PID 2>/dev/null
  wait
  echo "All stopped. Goodbye!"
}
trap cleanup SIGINT SIGTERM

wait
