/**
 * XP / progression system
 *
 * Ports the prototype's leveling system to React. State persists to
 * localStorage ('sh_min') and carries across visits. `award()` adds XP
 * (de-duped by key), fires a toast, and fires a level-up toast when a
 * threshold is crossed. The XP bar lives in the bottom-sheet footer and
 * toasts render above the menu button (see Toaster).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

// Levels: name + XP threshold to reach it
const LEVELS: [string, number][] = [
  ['novice', 0],
  ['apprentice', 50],
  ['adventurer', 120],
  ['hero', 220],
  ['legend', 350],
]

// XP awarded per action (each de-duped by key). `subscribe` is unused since
// the newsletter was removed, but kept so the rule survives a reintroduction.
export const XP_AWARDS = {
  visit: 10,
  project: 15,
  note: 10,
  lab: 20,
  follow: 50,
  subscribe: 25,
} as const

export function levelInfo(xp: number) {
  let i = 0
  for (let k = 0; k < LEVELS.length; k++) if (xp >= LEVELS[k][1]) i = k
  const cur = LEVELS[i]
  const next = LEVELS[i + 1]
  const pct = next ? Math.round(((xp - cur[1]) / (next[1] - cur[1])) * 100) : 100
  return {
    idx: i,
    name: cur[0],
    pct,
    next: next ? next[0] : null,
    curAt: cur[1],
    nextAt: next ? next[1] : null,
  }
}

interface ToastItem {
  id: number
  msg: string
  kind?: 'level'
}

interface XpValue {
  xp: number
  level: ReturnType<typeof levelInfo>
  award: (amount: number, reason: string, key?: string) => void
  toast: (msg: string, kind?: 'level') => void
  toasts: ToastItem[]
  removeToast: (id: number) => void
}

const XpContext = createContext<XpValue | null>(null)
const STORAGE_KEY = 'sh_min'

function load(): { xp: number; earned: string[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const s = JSON.parse(raw)
      if (s && typeof s.xp === 'number') {
        return { xp: s.xp, earned: Array.isArray(s.earned) ? s.earned : [] }
      }
    }
  } catch {
    /* ignore malformed storage */
  }
  return { xp: 0, earned: [] }
}

export function XpProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(0)
  const xpRef = useRef(0)
  const earnedRef = useRef<Set<string>>(new Set())
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const idRef = useRef(0)

  // Hydrate from localStorage once on mount
  useEffect(() => {
    const s = load()
    xpRef.current = s.xp
    earnedRef.current = new Set(s.earned)
    setXp(s.xp)
  }, [])

  const persist = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ xp: xpRef.current, earned: [...earnedRef.current] })
      )
    } catch {
      /* ignore storage failures */
    }
  }, [])

  const toast = useCallback((msg: string, kind?: 'level') => {
    const id = ++idRef.current
    setToasts((t) => [...t, { id, msg, kind }])
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const award = useCallback(
    (amount: number, reason: string, key?: string) => {
      if (key) {
        if (earnedRef.current.has(key)) return
        earnedRef.current.add(key)
      }
      const before = levelInfo(xpRef.current).idx
      xpRef.current += amount
      setXp(xpRef.current)
      persist()
      toast(`+${amount} xp · ${reason}`)
      const after = levelInfo(xpRef.current)
      if (after.idx > before) {
        setTimeout(() => toast(`level up · ${after.name} ✦`, 'level'), 700)
      }
    },
    [persist, toast]
  )

  const value: XpValue = {
    xp,
    level: levelInfo(xp),
    award,
    toast,
    toasts,
    removeToast,
  }

  return <XpContext.Provider value={value}>{children}</XpContext.Provider>
}

export function useXp(): XpValue {
  const ctx = useContext(XpContext)
  if (!ctx) throw new Error('useXp must be used within XpProvider')
  return ctx
}
