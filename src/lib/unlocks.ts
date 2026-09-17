/**
 * Unlocks — tiny store for code-gated lab experiments.
 *
 * Persists to localStorage ("sh_unlocked") alongside the XP state, and notifies
 * every mounted component so the Lab list and the detail page stay in sync.
 * The codes ship in the bundle, so treat this as a toy gate, not security.
 */

import { useSyncExternalStore } from 'react'

const KEY = 'sh_unlocked'

function read(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string') : []
  } catch {
    return []
  }
}

let slugs = typeof window === 'undefined' ? [] : read()
const listeners = new Set<() => void>()

function emit() {
  for (const fn of listeners) fn()
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  // another tab unlocking counts too
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      slugs = read()
      emit()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', onStorage)
  }
}

/** Reactive list of unlocked slugs. */
export function useUnlocked(): string[] {
  return useSyncExternalStore(subscribe, () => slugs, () => slugs)
}

export function isUnlocked(slug: string): boolean {
  return slugs.includes(slug)
}

/** Records an unlock. Returns false if the code is wrong (case and spacing are forgiven). */
export function tryUnlock(slug: string, code: string, attempt: string): boolean {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '')
  if (norm(attempt) !== norm(code)) return false
  if (!slugs.includes(slug)) {
    slugs = [...slugs, slug]
    try {
      localStorage.setItem(KEY, JSON.stringify(slugs))
    } catch {
      // private window: the unlock lasts for this session only
    }
    emit()
  }
  return true
}

/** Clears every unlock (used by the reset control in the progress panel). */
export function resetUnlocks() {
  slugs = []
  try {
    localStorage.removeItem(KEY)
  } catch {
    // nothing to clear
  }
  emit()
}
