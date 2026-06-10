/**
 * XP / progression system
 *
 * Ports the prototype's leveling + egg system to React. State persists to
 * localStorage ('sh_min') and carries across visits. `award()` adds XP
 * (de-duped by key) and fires a toast; crossing a level threshold grants an
 * egg and queues the level-up modal (LevelUpModal in MinimalChrome). Earned
 * eggs live in the home "Your Progress" egg track; dropping one into the fire
 * sets `activeEgg`, which re-themes the site (applyTheme cascade) and
 * recolors all three canvas fires.
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
import { applyTheme, LEVEL_EGGS, type EggId, type ThemeId } from '../lib/themes'
import { levelInfo, type LevelInfo } from '../lib/levels'

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

interface ToastItem {
  id: number
  msg: string
  kind?: 'level'
}

interface XpValue {
  xp: number
  level: LevelInfo
  award: (amount: number, reason: string, key?: string) => void
  toast: (msg: string, kind?: 'level') => void
  toasts: ToastItem[]
  removeToast: (id: number) => void
  eggs: EggId[]
  activeEgg: ThemeId
  setActiveEgg: (id: ThemeId) => void
  resetLook: () => void
  resetProgress: () => void
  /** Pending level-up modals (threshold numbers 1..3), head is shown. */
  modalQueue: number[]
  dismissModal: () => void
}

const XpContext = createContext<XpValue | null>(null)
const STORAGE_KEY = 'sh_min'

const isEggId = (v: unknown): v is EggId => LEVEL_EGGS.includes(v as EggId)

interface PersistedState {
  xp: number
  earned: string[]
  eggs: EggId[]
  activeEgg: ThemeId
}

/**
 * Load + migrate. Tolerates: the pre-egg shape ({xp, earned} only), the
 * prototype's legacy eggsHeld/eggsDropped arrays (unioned into eggs), and
 * invalid activeEgg values (must be a valid theme and an owned egg).
 */
function load(): PersistedState {
  const out: PersistedState = { xp: 0, earned: [], eggs: [], activeEgg: 'default' }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return out
    const s = JSON.parse(raw) as Record<string, unknown>
    if (!s || typeof s !== 'object') return out
    if (typeof s.xp === 'number' && Number.isFinite(s.xp)) out.xp = Math.max(0, s.xp)
    if (Array.isArray(s.earned)) out.earned = s.earned.filter((k) => typeof k === 'string')
    const eggSources = [s.eggs, s.eggsHeld, s.eggsDropped]
    for (const src of eggSources) {
      if (!Array.isArray(src)) continue
      for (const e of src) if (isEggId(e) && !out.eggs.includes(e)) out.eggs.push(e)
    }
    if (s.activeEgg === 'default' || (isEggId(s.activeEgg) && out.eggs.includes(s.activeEgg))) {
      out.activeEgg = s.activeEgg
    }
  } catch {
    /* ignore malformed storage */
  }
  return out
}

export function XpProvider({ children }: { children: ReactNode }) {
  // Hydrate synchronously (lazy initializer): load + migrate, then reconcile,
  // which grants eggs for levels a returning visitor has already achieved,
  // silently (no modal) - this also covers the threshold migration from the
  // old 5-level system.
  const [initial] = useState<PersistedState>(() => {
    const s = load()
    for (let l = 1; l <= levelInfo(s.xp).level; l++) {
      const egg = LEVEL_EGGS[l - 1]
      if (egg && !s.eggs.includes(egg)) s.eggs.push(egg)
    }
    return s
  })

  const [xp, setXp] = useState(initial.xp)
  const [eggs, setEggs] = useState<EggId[]>(initial.eggs)
  const [activeEgg, setActiveEggState] = useState<ThemeId>(initial.activeEgg)
  const [modalQueue, setModalQueue] = useState<number[]>([])
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const xpRef = useRef(initial.xp)
  const earnedRef = useRef<Set<string>>(new Set(initial.earned))
  const eggsRef = useRef<EggId[]>(initial.eggs)
  const activeEggRef = useRef<ThemeId>(initial.activeEgg)
  const idRef = useRef(0)

  const persist = useCallback(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          xp: xpRef.current,
          earned: [...earnedRef.current],
          eggs: eggsRef.current,
          activeEgg: activeEggRef.current,
        })
      )
    } catch {
      /* ignore storage failures */
    }
  }, [])

  // Write the migrated/reconciled shape back once on mount (idempotent, so
  // StrictMode's double-invoke is harmless).
  useEffect(() => {
    persist()
  }, [persist])

  // The theme cascade follows the active egg - covers init (mount effect) and
  // every drop/reset.
  useEffect(() => {
    applyTheme(activeEgg)
  }, [activeEgg])

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
      const before = levelInfo(xpRef.current).level
      xpRef.current += amount
      const after = levelInfo(xpRef.current).level
      setXp(xpRef.current)
      toast(`+${amount} xp · ${reason}`)
      // Each threshold crossed grants its egg and queues a level-up modal.
      const queued: number[] = []
      for (let l = before + 1; l <= after; l++) {
        const egg = LEVEL_EGGS[l - 1]
        if (egg && !eggsRef.current.includes(egg)) {
          eggsRef.current = [...eggsRef.current, egg]
          queued.push(l)
        }
      }
      persist()
      if (queued.length) {
        setEggs([...eggsRef.current])
        setModalQueue((q) => [...q, ...queued])
      }
    },
    [persist, toast]
  )

  const dismissModal = useCallback(() => {
    setModalQueue((q) => q.slice(1))
  }, [])

  const setActiveEgg = useCallback(
    (id: ThemeId) => {
      if (id !== 'default' && !eggsRef.current.includes(id)) return
      activeEggRef.current = id
      setActiveEggState(id)
      persist()
    },
    [persist]
  )

  const resetLook = useCallback(() => {
    setActiveEgg('default')
    toast('look reset to default')
  }, [setActiveEgg, toast])

  const resetProgress = useCallback(() => {
    xpRef.current = 0
    earnedRef.current = new Set()
    eggsRef.current = []
    activeEggRef.current = 'default'
    persist()
    setXp(0)
    setEggs([])
    setActiveEggState('default')
    setModalQueue([])
    toast('progress reset')
  }, [persist, toast])

  const value: XpValue = {
    xp,
    level: levelInfo(xp),
    award,
    toast,
    toasts,
    removeToast,
    eggs,
    activeEgg,
    setActiveEgg,
    resetLook,
    resetProgress,
    modalQueue,
    dismissModal,
  }

  return <XpContext.Provider value={value}>{children}</XpContext.Provider>
}

export function useXp(): XpValue {
  const ctx = useContext(XpContext)
  if (!ctx) throw new Error('useXp must be used within XpProvider')
  return ctx
}
