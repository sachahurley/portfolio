/**
 * Which home page renders at "/": the village map (default) or the
 * classic list home, kept behind this flag.
 *
 * Its own localStorage key beside - not inside - the sh_min save blob
 * (the sh_side convention). URL overrides persist: /?home=classic or
 * /?home=village, so either variant is one shareable link away.
 */

export type HomeVariant = 'village' | 'classic'

const KEY = 'sh_home'

/** Read-only: the active variant, without persisting a URL override
 *  (safe to call during render — the menu surfaces use it). */
export function peekHomeVariant(search: string): HomeVariant {
  const q = new URLSearchParams(search).get('home')
  if (q === 'classic' || q === 'village') return q
  try {
    if (localStorage.getItem(KEY) === 'classic') return 'classic'
  } catch {
    /* private mode: default */
  }
  return 'village'
}

/** The menu's home-variant toggle link: always offers the other home. */
export function homeToggleRow(search: string) {
  return peekHomeVariant(search) === 'village'
    ? { label: 'Classic home', to: '/?home=classic' }
    : { label: 'Village home', to: '/?home=village' }
}

export function writeHomeVariant(v: HomeVariant) {
  try {
    localStorage.setItem(KEY, v)
  } catch {
    /* private mode: the in-memory state still switches this visit */
  }
}
