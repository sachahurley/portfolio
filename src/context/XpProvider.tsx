/**
 * XP / progression system — the visitor's SAVE FILE.
 *
 * State persists to localStorage ('sh_min') and carries across visits: a
 * returning visitor CONTINUEs where they left off. `award()` adds XP
 * (de-duped by key), fires a toast (mobile), and writes to the message log
 * (the game frame's bottom panel); crossing a level threshold grants an
 * egg and queues the level-up modal. Earned eggs live in the character
 * panel and the home "Your Progress" egg track; dropping one into the fire
 * sets `activeEgg`, which re-themes the site (applyTheme cascade) and
 * recolors all three canvas fires — that ritual IS the "choose your
 * banner" unlock from the RPG structure doc.
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
import { levelInfo, LEVEL_TITLES, type LevelInfo } from '../lib/levels'
import { generateName, randomSeed } from '../game/names'

// XP awarded per action (each de-duped by key), tuned to the RPG doc's
// economy. `subscribe` is unused since the newsletter was removed, but kept
// so the rule survives a reintroduction.
export const XP_AWARDS = {
  visit: 25, // discover a location for the first time
  project: 15, // open a quest (case study)
  questComplete: 35, // read a quest to the end (scroll bottom)
  note: 10,
  lab: 20,
  secret: 50, // find a hidden interaction
  follow: 50,
  subscribe: 25,
} as const

interface ToastItem {
  id: number
  msg: string
  kind?: 'level'
}

export type LogKind = 'xp' | 'arrive' | 'level' | 'hint' | 'system'

export interface LogEntry {
  id: number
  msg: string
  kind: LogKind
}

const LOG_LIMIT = 80

interface XpValue {
  xp: number
  level: LevelInfo
  award: (amount: number, reason: string, key?: string) => void
  toast: (msg: string, kind?: 'level') => void
  toasts: ToastItem[]
  removeToast: (id: number) => void
  /** Message log history (session-scoped), newest last. */
  log: LogEntry[]
  logLine: (msg: string, kind?: LogKind) => void
  eggs: EggId[]
  activeEgg: ThemeId
  setActiveEgg: (id: ThemeId) => void
  resetLook: () => void
  resetProgress: () => void
  /** Character identity (persisted in the save). */
  name: string
  setName: (name: string) => void
  avatarSeed: number
  setAvatarSeed: (seed: number) => void
  /** True when this browser has an existing save (CONTINUE vs NEW GAME). */
  isReturning: boolean
  /** Levels reached but not yet celebrated (threshold numbers 1..3),
   *  persisted. A badge on the character strip/sheet invites the visitor to
   *  open the celebration; nothing auto-pops. */
  pendingLevels: number[]
  celebrating: boolean
  celebrateLevel: () => void
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
  name: string
  avatarSeed: number
  pendingLevels: number[]
}

/**
 * Load + migrate. Tolerates: the pre-egg shape ({xp, earned} only), the
 * prototype's legacy eggsHeld/eggsDropped arrays (unioned into eggs),
 * invalid activeEgg values (must be a valid theme and an owned egg), and
 * pre-character saves (no name/avatarSeed — a character is rolled for them).
 * `existed` reports whether any save was present (CONTINUE vs NEW GAME).
 */
function load(): { state: PersistedState; existed: boolean } {
  const seed = randomSeed()
  const state: PersistedState = {
    xp: 0,
    earned: [],
    eggs: [],
    activeEgg: 'default',
    name: generateName(seed),
    avatarSeed: seed,
    pendingLevels: [],
  }
  let existed = false
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { state, existed }
    const s = JSON.parse(raw) as Record<string, unknown>
    if (!s || typeof s !== 'object') return { state, existed }
    existed = true
    if (typeof s.xp === 'number' && Number.isFinite(s.xp)) state.xp = Math.max(0, s.xp)
    if (Array.isArray(s.earned)) state.earned = s.earned.filter((k) => typeof k === 'string')
    const eggSources = [s.eggs, s.eggsHeld, s.eggsDropped]
    for (const src of eggSources) {
      if (!Array.isArray(src)) continue
      for (const e of src) if (isEggId(e) && !state.eggs.includes(e)) state.eggs.push(e)
    }
    if (s.activeEgg === 'default' || (isEggId(s.activeEgg) && state.eggs.includes(s.activeEgg))) {
      state.activeEgg = s.activeEgg
    }
    if (typeof s.name === 'string' && s.name.trim()) state.name = s.name.trim().slice(0, 40)
    if (typeof s.avatarSeed === 'number' && Number.isFinite(s.avatarSeed)) {
      state.avatarSeed = Math.floor(s.avatarSeed)
      // Pre-character saves get a name rolled from their (fresh) seed above;
      // saves with a stored seed but no name keep name/seed consistent.
      if (!(typeof s.name === 'string' && s.name.trim())) state.name = generateName(state.avatarSeed)
    }
    if (Array.isArray(s.pendingLevels)) {
      state.pendingLevels = s.pendingLevels.filter(
        (n): n is number => typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= LEVEL_EGGS.length
      )
    }
  } catch {
    /* ignore malformed storage */
  }
  return { state, existed }
}

export function XpProvider({ children }: { children: ReactNode }) {
  // Hydrate synchronously (lazy initializer): load + migrate, then reconcile,
  // which grants eggs for levels a returning visitor has already achieved,
  // silently (no modal) - this also covers the threshold migration from the
  // old 5-level system.
  const [initial] = useState<PersistedState & { existed: boolean }>(() => {
    const { state: s, existed } = load()
    for (let l = 1; l <= levelInfo(s.xp).level; l++) {
      const egg = LEVEL_EGGS[l - 1]
      if (egg && !s.eggs.includes(egg)) s.eggs.push(egg)
    }
    return { ...s, existed }
  })

  const [xp, setXp] = useState(initial.xp)
  const [eggs, setEggs] = useState<EggId[]>(initial.eggs)
  const [activeEgg, setActiveEggState] = useState<ThemeId>(initial.activeEgg)
  const [name, setNameState] = useState(initial.name)
  const [avatarSeed, setAvatarSeedState] = useState(initial.avatarSeed)
  const [pendingLevels, setPendingLevels] = useState<number[]>(initial.pendingLevels)
  const [celebrating, setCelebrating] = useState(false)
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const [log, setLog] = useState<LogEntry[]>([])

  const xpRef = useRef(initial.xp)
  const earnedRef = useRef<Set<string>>(new Set(initial.earned))
  const eggsRef = useRef<EggId[]>(initial.eggs)
  const activeEggRef = useRef<ThemeId>(initial.activeEgg)
  const nameRef = useRef(initial.name)
  const avatarSeedRef = useRef(initial.avatarSeed)
  const pendingRef = useRef<number[]>(initial.pendingLevels)
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
          name: nameRef.current,
          avatarSeed: avatarSeedRef.current,
          pendingLevels: pendingRef.current,
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

  const logLine = useCallback((msg: string, kind: LogKind = 'system') => {
    const id = ++idRef.current
    setLog((l) => [...l.slice(-(LOG_LIMIT - 1)), { id, msg, kind }])
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
      logLine(`+${amount} XP — ${reason}`, 'xp')
      // Each threshold crossed grants its egg immediately (the ritual never
      // waits) and queues a PENDING level-up: the celebration modal opens
      // only when the visitor taps the badge, never auto-pops.
      const queued: number[] = []
      for (let l = before + 1; l <= after; l++) {
        const egg = LEVEL_EGGS[l - 1]
        if (egg && !eggsRef.current.includes(egg)) {
          eggsRef.current = [...eggsRef.current, egg]
          queued.push(l)
        }
        logLine(`You have reached Level ${l + 1} — ${LEVEL_TITLES[l] ?? ''}`.trim(), 'level')
      }
      if (queued.length) {
        pendingRef.current = [...pendingRef.current, ...queued]
        setEggs([...eggsRef.current])
        setPendingLevels(pendingRef.current)
      }
      persist()
    },
    [persist, toast, logLine]
  )

  /** Open the celebration for the oldest un-celebrated level-up. */
  const celebrateLevel = useCallback(() => {
    if (pendingRef.current.length) setCelebrating(true)
  }, [])

  const dismissModal = useCallback(() => {
    pendingRef.current = pendingRef.current.slice(1)
    setPendingLevels(pendingRef.current)
    if (pendingRef.current.length === 0) setCelebrating(false)
    persist()
  }, [persist])

  const setName = useCallback(
    (n: string) => {
      const clean = n.trim().slice(0, 40)
      if (!clean) return
      nameRef.current = clean
      setNameState(clean)
      persist()
    },
    [persist]
  )

  const setAvatarSeed = useCallback(
    (seed: number) => {
      avatarSeedRef.current = Math.floor(seed)
      setAvatarSeedState(avatarSeedRef.current)
      persist()
    },
    [persist]
  )

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
    const seed = randomSeed()
    xpRef.current = 0
    earnedRef.current = new Set()
    eggsRef.current = []
    activeEggRef.current = 'default'
    nameRef.current = generateName(seed)
    avatarSeedRef.current = seed
    pendingRef.current = []
    persist()
    setXp(0)
    setEggs([])
    setActiveEggState('default')
    setNameState(nameRef.current)
    setAvatarSeedState(seed)
    setPendingLevels([])
    setCelebrating(false)
    toast('progress reset')
  }, [persist, toast])

  const value: XpValue = {
    xp,
    level: levelInfo(xp),
    award,
    toast,
    toasts,
    removeToast,
    log,
    logLine,
    eggs,
    activeEgg,
    setActiveEgg,
    resetLook,
    resetProgress,
    name,
    setName,
    avatarSeed,
    setAvatarSeed,
    isReturning: initial.existed,
    pendingLevels,
    celebrating,
    celebrateLevel,
    dismissModal,
  }

  return <XpContext.Provider value={value}>{children}</XpContext.Provider>
}

export function useXp(): XpValue {
  const ctx = useContext(XpContext)
  if (!ctx) throw new Error('useXp must be used within XpProvider')
  return ctx
}
