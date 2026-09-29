/**
 * World dialog: open state for "Thank you for visiting" (WorldStatsModal).
 *
 * The dialog has no route, and three surfaces open it: the home grid's
 * World app, the desktop compass and the mobile sheet. It is mounted once
 * in MinimalChrome, so the state lives here rather than in any one page.
 * A module store in the same shape as lib/unlocks.ts.
 */

import { useSyncExternalStore } from 'react'

let open = false
const listeners = new Set<() => void>()

function set(next: boolean) {
  if (next === open) return
  open = next
  for (const fn of listeners) fn()
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

export const openWorld = () => set(true)
export const closeWorld = () => set(false)

/** Whether the World dialog is open. */
export function useWorldOpen(): boolean {
  return useSyncExternalStore(subscribe, () => open, () => open)
}
