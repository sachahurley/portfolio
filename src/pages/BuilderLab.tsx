/**
 * Builder lab (/lab/builder)
 *
 * A workshop for the composable isometric object kit, one workflow in
 * two views:
 * - object: tune the BRUSH (15 types, size/height sliders, texture
 *   reroll) on its own preview plate.
 * - scene: compose on a shared plate. Click ground to stamp the tuned
 *   brush; click a placed piece to select it, and the same sliders then
 *   retune THAT piece live; click empty ground to move it, click it
 *   again to deselect. Delete / make-brush / deselect while selected.
 *   Spacing rules (clearance gaps, band setbacks) gate placement and
 *   the "surprise me" town generator; a toggle turns them off for
 *   deliberate overlaps. Copy exports recipe or scene JSON; everything
 *   but the selection persists locally.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import DitherIcon from '../components/DitherIcon'
import KitCanvas from '../components/town/KitCanvas'
import BlockShop from '../components/blocks/BlockShop'
import {
  isBand,
  KIT_DEFAULTS,
  KIT_LIMITS,
  objectToScene,
  randomScene,
  SCENE_LIMITS,
  sceneFits,
  type KitRecipe,
  type KitScene,
  type KitType,
  type SceneItem,
} from '../components/town/kit'
import { THEMES } from '../lib/themes'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'
import { Button } from '@scorp-ds/components'

// The builder's state is a UI pref: its own key beside - not inside -
// the sh_min save blob (the sh_side convention).
const STORE_KEY = 'sh_builder'

const TYPES: KitType[] = [
  'plate', 'road', 'river', 'rail', 'tree', 'cactus', 'house', 'shop',
  'church', 'warehouse', 'terrace', 'spire', 'block', 'pyramid', 'bridge',
]
/** Placeable in scenes (the scene already is a plate). */
const SCENE_TYPES: KitType[] = TYPES.filter((t) => t !== 'plate')

interface BuilderState {
  mode: 'object' | 'scene'
  colours: 1 | 2
  /** The brush: the tuned piece that scene clicks stamp. */
  object: KitRecipe
  /** Placements copy the brush exactly; 'vary' reshuffles texture per copy. */
  varySeed: boolean
  /** Spacing rules gate placement (clearance + band setbacks). */
  rules: boolean
  scene: KitScene
}

const DEFAULT_STATE: BuilderState = {
  mode: 'object',
  colours: 2,
  object: KIT_DEFAULTS.house,
  varySeed: false,
  rules: true,
  scene: { w: 8, d: 6, seed: 7, items: [] },
}

const clampN = (v: unknown, lo: number, hi: number, fallback: number): number => {
  const n = typeof v === 'number' && Number.isFinite(v) ? Math.round(v) : fallback
  return Math.min(hi, Math.max(lo, n))
}

function sanitizeRecipe(raw: unknown): KitRecipe {
  if (typeof raw !== 'object' || raw === null) return DEFAULT_STATE.object
  const r = raw as Record<string, unknown>
  const type = TYPES.includes(r.type as KitType) ? (r.type as KitType) : 'house'
  const lim = KIT_LIMITS[type]
  const def = KIT_DEFAULTS[type]
  return {
    type,
    w: clampN(r.w, lim.w[0], lim.w[1], def.w),
    d: clampN(r.d, lim.d[0], lim.d[1], def.d),
    h: clampN(r.h, lim.h[0], lim.h[1], def.h),
    seed: clampN(r.seed, 0, 9999, def.seed),
  }
}

function sanitizeScene(raw: unknown): KitScene {
  if (typeof raw !== 'object' || raw === null) return DEFAULT_STATE.scene
  const s = raw as Record<string, unknown>
  const w = clampN(s.w, SCENE_LIMITS.w[0], SCENE_LIMITS.w[1], 8)
  const d = clampN(s.d, SCENE_LIMITS.d[0], SCENE_LIMITS.d[1], 6)
  const scene: KitScene = { w, d, seed: clampN(s.seed, 0, 9999, 7), items: [] }
  if (Array.isArray(s.items)) {
    for (const raw2 of s.items.slice(0, 64)) {
      const rec = sanitizeRecipe(raw2)
      if (rec.type === 'plate') continue
      const it = raw2 as Record<string, unknown>
      const item: SceneItem = {
        ...rec,
        ix: clampN(it.ix, 0, w - 1, 0),
        iy: clampN(it.iy, 0, d - 1, 0),
      }
      // Rules off: stored scenes must never be pruned by newer rules.
      if (sceneFits(scene, item, { rules: false })) scene.items.push(item)
    }
  }
  return scene
}

function sanitize(raw: unknown): BuilderState {
  if (typeof raw !== 'object' || raw === null) return DEFAULT_STATE
  const s = raw as Record<string, unknown>
  return {
    mode: s.mode === 'scene' ? 'scene' : 'object',
    colours: s.colours === 1 ? 1 : 2,
    object: sanitizeRecipe(s.object ?? s), // oldest stored shape was a bare recipe
    varySeed: s.varySeed === true,
    rules: s.rules !== false,
    scene: sanitizeScene(s.scene),
  }
}

export default function BuilderLab() {
  usePageTitle('Builder lab')
  const { award, logLine, activeGem } = useXp()
  const ink = THEMES[activeGem].accent

  // Dedicated lab pages award their own visit XP (the LabItem template
  // only covers template-rendered experiments).
  useEffect(() => {
    award(XP_AWARDS.lab, 'joined the builders guild', 'lab:builder')
  }, [award])

  const [state, setState] = useState<BuilderState>(() => {
    try {
      const raw = localStorage.getItem(STORE_KEY)
      return raw ? sanitize(JSON.parse(raw)) : DEFAULT_STATE
    } catch {
      return DEFAULT_STATE
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state))
    } catch {
      /* private mode: the state still works for this visit */
    }
  }, [state])

  // Selection is runtime-only: never persisted, never in the copy JSON.
  const [selected, setSelected] = useState<number | null>(null)

  const { mode, colours, object, varySeed, rules, scene } = state
  const selectedItem = selected != null ? scene.items[selected] : null
  /** What the knobs edit: the selected piece, else the brush. */
  const target: KitRecipe = selectedItem ?? object
  const lim = KIT_LIMITS[target.type]

  const setObject = (patch: Partial<KitRecipe>) =>
    setState((s) => ({ ...s, object: sanitizeRecipe({ ...s.object, ...patch }) }))

  /** Live-edit the selected item. h/seed apply directly; w/d clamp-search
   *  down to the largest fitting value; type swaps to that type's default
   *  shape (kept in place), rejected if it collides. */
  const editSelected = (patch: Partial<KitRecipe>) => {
    if (selected == null) return
    setState((s) => {
      const cur = s.scene.items[selected]
      if (!cur) return s
      let next: SceneItem = { ...cur, ...sanitizeRecipe({ ...cur, ...patch }), ix: cur.ix, iy: cur.iy }
      if (patch.type && patch.type !== cur.type) {
        next = { ...KIT_DEFAULTS[patch.type], seed: cur.seed, ix: cur.ix, iy: cur.iy }
      }
      const fitOpts = { rules: s.rules, ignore: selected }
      // Footprint changes walk back toward the current size until they fit.
      while (!sceneFits(s.scene, next, fitOpts)) {
        if (next.w > cur.w) next = { ...next, w: next.w - 1 }
        else if (next.d > cur.d) next = { ...next, d: next.d - 1 }
        else if (patch.type && patch.type !== cur.type) return s // type swap doesn't fit
        else break // non-footprint edit can't collide; safety valve
      }
      const items = s.scene.items.map((it, i) => (i === selected ? next : it))
      return { ...s, scene: { ...s.scene, items } }
    })
  }

  const editTarget = (patch: Partial<KitRecipe>) =>
    selected != null ? editSelected(patch) : setObject(patch)

  const clearSelectionAnd = (fn: (s: BuilderState) => BuilderState) => {
    setSelected(null)
    setState(fn)
  }

  const shownScene = useMemo(
    () => (mode === 'object' ? objectToScene(object) : scene),
    [mode, object, scene],
  )

  const payload = useMemo(
    () => JSON.stringify(mode === 'object' ? { ...object, colours } : { ...scene, colours }, null, 2),
    [mode, object, scene, colours],
  )
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const copyTimer = useRef<number | null>(null)
  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current)
    },
    [],
  )
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(payload)
      setCopyState('copied')
    } catch {
      setCopyState('failed') // non-secure context etc: show the JSON below
    }
    if (copyTimer.current) clearTimeout(copyTimer.current)
    copyTimer.current = window.setTimeout(() => setCopyState('idle'), 1500)
  }

  // The scene click state machine: place brush / select / switch /
  // deselect / move.
  const onTile = (info: { ix: number; iy: number; item: number }) => {
    const hitItem = info.item >= 0 && info.item < scene.items.length ? info.item : null
    if (hitItem != null) {
      setSelected((cur) => (cur === hitItem ? null : hitItem))
      return
    }
    if (selected != null) {
      // Move the selected piece to the clicked tile.
      setState((s) => {
        const cur = s.scene.items[selected]
        if (!cur) return s
        const f = { w: cur.w, d: cur.type === 'pyramid' ? cur.w : cur.d }
        const cand: SceneItem = isBand(cur.type)
          ? { ...cur, ix: 0, iy: clampN(info.iy, 0, s.scene.d - 1, cur.iy) }
          : {
              ...cur,
              ix: clampN(info.ix, 0, s.scene.w - f.w, cur.ix),
              iy: clampN(info.iy, 0, s.scene.d - f.d, cur.iy),
            }
        if (!sceneFits(s.scene, cand, { rules: s.rules, ignore: selected })) return s
        const items = s.scene.items.map((it, i) => (i === selected ? cand : it))
        return { ...s, scene: { ...s.scene, items } }
      })
      return
    }
    // Place the brush.
    if (object.type === 'plate') return
    setState((s) => {
      const f = { w: s.object.w, d: s.object.type === 'pyramid' ? s.object.w : s.object.d }
      const item: SceneItem = isBand(s.object.type)
        ? { ...s.object, seed: s.varySeed ? Math.floor(Math.random() * 10000) : s.object.seed, ix: 0, iy: clampN(info.iy, 0, s.scene.d - 1, 0) }
        : {
            ...s.object,
            seed: s.varySeed ? Math.floor(Math.random() * 10000) : s.object.seed,
            ix: clampN(info.ix, 0, s.scene.w - f.w, 0),
            iy: clampN(info.iy, 0, s.scene.d - f.d, 0),
          }
      if (!sceneFits(s.scene, item, { rules: s.rules })) return s
      return { ...s, scene: { ...s.scene, items: [...s.scene.items, item] } }
    })
  }

  const optRow = (
    label: string,
    values: readonly string[],
    current: string,
    pick: (v: string) => void,
  ) => (
    <div className="bld-row">
      <span className="bld-row-label">{label}</span>
      {values.map((v) => (
        <button
          key={v}
          type="button"
          className="bld-opt"
          aria-pressed={current === v}
          onClick={() => pick(v)}
        >
          {v}
        </button>
      ))}
    </div>
  )

  const slider = (
    label: string,
    value: number,
    range: [number, number],
    onChange: (v: number) => void,
    aria: string,
  ) => (
    <label className="dtoy-slider">
      {label}
      <input
        type="range"
        min={range[0]}
        max={range[1]}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={range[0] === range[1]}
        aria-label={aria}
      />
    </label>
  )

  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">Builder lab</h1>
      <p className="lead">
        A kit of isometric pieces that snap to one grid, and a slab to compose them on. One or
        two colours, nothing more.
      </p>

      <KitCanvas
        scene={shownScene}
        colours={colours}
        ink={ink}
        onTile={mode === 'scene' ? onTile : undefined}
        selected={mode === 'scene' ? selected : null}
        ariaLabel={
          mode === 'object'
            ? `Isometric ${object.type} preview`
            : `Scene editor: ${scene.w} by ${scene.d} plate with ${scene.items.length} pieces${selectedItem ? `, ${selectedItem.type} selected` : ''}`
        }
      />

      <div className="bld-controls">
        {optRow('mode', ['object', 'scene'], mode, (v) =>
          clearSelectionAnd((s) => ({ ...s, mode: v as BuilderState['mode'] })),
        )}
        {optRow('colours', ['1 colour', '2 colours'], colours === 1 ? '1 colour' : '2 colours', (v) =>
          setState((s) => ({ ...s, colours: v === '1 colour' ? 1 : 2 })),
        )}

        {optRow(
          selected != null ? 'piece' : mode === 'scene' ? 'brush' : 'object',
          mode === 'scene' ? SCENE_TYPES : TYPES,
          target.type,
          (v) => editTarget({ type: v as KitType }),
        )}

        <div className="bld-row">
          <span className="bld-row-label">size</span>
          {slider('w', target.w, lim.w, (v) => editTarget({ w: v }), 'Width or span in tiles')}
          {slider('d', target.d, lim.d, (v) => editTarget({ d: v }), 'Depth in tiles')}
          {slider('h', target.h, lim.h, (v) => editTarget({ h: v }), 'Height')}
          <Button variant="ghost" size="small"
            
            onClick={() => editTarget({ seed: Math.floor(Math.random() * 10000) })}
          >
            reroll texture
          </Button>
        </div>

        {mode === 'scene' && selected != null && (
          <div className="bld-row">
            <span className="bld-row-label">selected</span>
            <Button variant="ghost" size="small"
              
              onClick={() =>
                clearSelectionAnd((s) => ({
                  ...s,
                  scene: { ...s.scene, items: s.scene.items.filter((_, i) => i !== selected) },
                }))
              }
            >
              delete
            </Button>
            <Button variant="ghost" size="small"
              
              onClick={() => {
                const it = scene.items[selected]
                if (it) {
                  clearSelectionAnd((s) => ({
                    ...s,
                    object: { type: it.type, w: it.w, d: it.d, h: it.h, seed: it.seed },
                  }))
                }
              }}
            >
              make brush
            </Button>
            <Button variant="ghost" size="small"  onClick={() => setSelected(null)}>
              deselect
            </Button>
          </div>
        )}

        {mode === 'scene' && (
          <>
            {optRow('copies', ['exact', 'vary'], varySeed ? 'vary' : 'exact', (v) =>
              setState((s) => ({ ...s, varySeed: v === 'vary' })),
            )}
            {optRow('rules', ['on', 'off'], rules ? 'on' : 'off', (v) =>
              setState((s) => ({ ...s, rules: v === 'on' })),
            )}
            <div className="bld-row">
              <span className="bld-row-label">plate</span>
              {slider('w', scene.w, SCENE_LIMITS.w, (v) =>
                clearSelectionAnd((s) => ({ ...s, scene: sanitizeScene({ ...s.scene, w: v }) })),
                'Plate width in tiles',
              )}
              {slider('d', scene.d, SCENE_LIMITS.d, (v) =>
                clearSelectionAnd((s) => ({ ...s, scene: sanitizeScene({ ...s.scene, d: v }) })),
                'Plate depth in tiles',
              )}
            </div>
            <div className="bld-row">
              <span className="bld-row-label">&nbsp;</span>
              <Button variant="ghost" size="small"
                
                onClick={() => {
                  clearSelectionAnd((s) => ({
                    ...s,
                    scene: randomScene(Math.floor(Math.random() * 10000)),
                  }))
                  logLine('A town assembles itself.', 'hint')
                }}
              >
                surprise me
              </Button>
              <Button variant="ghost" size="small"
                
                onClick={() =>
                  clearSelectionAnd((s) => ({ ...s, scene: { ...s.scene, items: [] } }))
                }
              >
                clear
              </Button>
            </div>
          </>
        )}

        <div className="bld-row">
          <span className="bld-row-label">&nbsp;</span>
          <Button variant="secondary" size="small" type="button" onClick={copy}>
            <DitherIcon name="copy" size={16} />
            {copyState === 'copied' ? 'copied' : copyState === 'failed' ? 'copy failed' : mode === 'object' ? 'copy recipe' : 'copy scene'}
          </Button>
        </div>
      </div>

      {copyState === 'failed' && <pre className="bld-json">{payload}</pre>}

      <p className="town-hint">
        {mode === 'object'
          ? 'Shape the brush here; scene mode stamps exactly this piece.'
          : selected != null
            ? `Editing the selected ${target.type}: sliders retune it live, click an empty tile to move it, click it again to deselect.`
            : 'Click the slab to place the tuned piece. Click a placed piece to select and edit it. Rules keep pieces from crowding; switch them off to overlap freely.'}
      </p>

      {/* ---- fresh start: the blocks track (seed of the home-page map).
          Independent of the kit above; the pipeline is block -> object
          -> scene, each stage saving into a library the next one uses. ---- */}
      <div className="mn-block">
        <div className="wm-kicker">fresh start · blocks</div>
        <p className="lead" style={{ marginTop: 8 }}>
          The home-page map, built up from the smallest unit: design blocks, save them; compose
          blocks into objects; place objects on the scene.
        </p>
        <BlockShop />
      </div>
    </MinimalPage>
  )
}
