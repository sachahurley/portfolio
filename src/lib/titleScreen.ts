/**
 * Title-screen gate: has the visitor pressed past the welcome screen yet?
 *
 * The loader is a full-screen overlay that unmounts on dismissal, so
 * anything underneath it mounts and runs while nobody can see it. Two
 * things wait on this: the home stat row's count-up (an entrance that is
 * meant to be watched) and the site-counter reporter (which should count
 * browsers that looked at the site, not every load a crawler makes).
 *
 * A module store rather than context, in the same shape as lib/unlocks.ts:
 * the loader publishes once, readers subscribe, and nothing has to thread a
 * prop through the chrome.
 */

let dismissed = false
const listeners = new Set<() => void>()

/** Called by the loader the moment it starts fading out. */
export function dismissTitleScreen() {
  if (dismissed) return
  dismissed = true
  for (const fn of listeners) fn()
}

/** True once the welcome screen is out of the way. */
export function titleScreenGone(): boolean {
  return dismissed
}

/**
 * Subscribe to the dismissal. Returns an unsubscribe, and is stable enough
 * to hand straight to useSyncExternalStore.
 *
 * Subscribing is also where a missing title screen gets noticed. Readers
 * subscribe from an effect, which is the first moment the DOM is real: if
 * there is no overlay by then (it was already dismissed and unmounted, or
 * the loader was removed from the app entirely) there is nothing to wait
 * for, and a reader should not stall forever on a signal that is never
 * coming. Checking this any earlier would be wrong in the other direction,
 * because during the first render the overlay has not been committed yet.
 */
export function onTitleScreenGone(fn: () => void): () => void {
  listeners.add(fn)
  if (!dismissed && !document.getElementById('loader')) dismissTitleScreen()
  return () => {
    listeners.delete(fn)
  }
}
