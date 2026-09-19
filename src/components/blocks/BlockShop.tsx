/**
 * BlockShop — the three-stage pipeline of the fresh blocks track:
 *
 *   block  -> design a unit block's three faces, save it to the block
 *             library.
 *   object -> stack saved blocks on a small grid into an object, save
 *             it to the object library.
 *   scene  -> place saved objects on the scene grid (the shape of the
 *             future home-page map: tap a thing on a slab).
 *
 * Everything persists locally under one key; hover ghosts preview every
 * placement; two tones only, themed through the active ink.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { THEMES, mix } from '../../lib/themes'
import { Button } from '@scorp-ds/components'
import {
  CLASSIC,
  forEachDiamondCell,
  paintField,
  renderStacks,
  tileAt,
  vertexOf,
  type BlockDef,
  type FaceTone,
  type Field,
  type Resolve,
} from './blocks'

const DARK = '#17120d'
const STORE_KEY = 'sh_blockshop'
const OBJ_G = 5 // object grid (tiles per side)
const OBJ_MAXH = 5 // blocks per stack in an object
const SCENE_G = 10 // scene grid (tiles per side)

const FACES: FaceTone[] = ['dark', 'dim', 'ink', 'checkDim', 'checkInk']
const FACE_LABEL: Record<FaceTone, string> = {
  dark: 'dark',
  dim: 'dim',
  ink: 'ink',
  checkDim: 'checker dim',
  checkInk: 'checker ink',
}

interface ObjectDef {
  id: string
  name: string
  gw: number
  gh: number
  stacks: string[][]
}

interface Placement {
  obj: string
  ix: number
  iy: number
}

type Tab = 'block' | 'object' | 'scene'

interface ShopState {
  tab: Tab
  draft: BlockDef
  blocks: BlockDef[]
  selBlock: string | null
  objDraft: string[][]
  objects: ObjectDef[]
  selObject: string | null
  erase: boolean
  placements: Placement[]
}

const emptyObjDraft = () => new Array(OBJ_G * OBJ_G).fill(null).map(() => [] as string[])

const DEFAULT_STATE: ShopState = {
  tab: 'block',
  draft: { ...CLASSIC, id: 'draft', name: 'draft' },
  blocks: [],
  selBlock: null,
  objDraft: emptyObjDraft(),
  objects: [],
  selObject: null,
  erase: false,
  placements: [],
}

const uid = () => `${Date.now().toString(36)}_${Math.floor(Math.random() * 1e4)}`
const isFace = (v: unknown): v is FaceTone => FACES.includes(v as FaceTone)

function sanitize(raw: unknown): ShopState {
  if (typeof raw !== 'object' || raw === null) return DEFAULT_STATE
  const s = raw as Record<string, unknown>
  const blocks: BlockDef[] = Array.isArray(s.blocks)
    ? s.blocks
        .slice(0, 32)
        .map((b) => b as Record<string, unknown>)
        .filter((b) => typeof b.id === 'string' && isFace(b.top) && isFace(b.right) && isFace(b.left))
        .map((b, i) => ({
          id: b.id as string,
          name: typeof b.name === 'string' ? (b.name as string) : `block ${i + 1}`,
          top: b.top as FaceTone,
          right: b.right as FaceTone,
          left: b.left as FaceTone,
        }))
    : []
  const blockIds = new Set(blocks.map((b) => b.id))
  const cleanStacks = (raw2: unknown, gw: number, gh: number, maxH: number): string[][] | null => {
    if (!Array.isArray(raw2) || raw2.length !== gw * gh) return null
    return raw2.map((st) =>
      Array.isArray(st) ? st.slice(0, maxH).filter((id): id is string => typeof id === 'string') : [],
    )
  }
  const d = (s.draft ?? {}) as Record<string, unknown>
  const objects: ObjectDef[] = Array.isArray(s.objects)
    ? s.objects
        .slice(0, 32)
        .map((o) => o as Record<string, unknown>)
        .flatMap((o) => {
          const gw = typeof o.gw === 'number' ? Math.min(OBJ_G, Math.max(1, Math.round(o.gw))) : 0
          const gh = typeof o.gh === 'number' ? Math.min(OBJ_G, Math.max(1, Math.round(o.gh))) : 0
          const stacks = gw && gh ? cleanStacks(o.stacks, gw, gh, OBJ_MAXH) : null
          if (typeof o.id !== 'string' || !stacks) return []
          return [{ id: o.id, name: typeof o.name === 'string' ? o.name : 'object', gw, gh, stacks }]
        })
    : []
  const objectIds = new Set(objects.map((o) => o.id))
  return {
    tab: s.tab === 'object' || s.tab === 'scene' ? s.tab : 'block',
    draft: {
      id: 'draft',
      name: 'draft',
      top: isFace(d.top) ? d.top : 'ink',
      right: isFace(d.right) ? d.right : 'dim',
      left: isFace(d.left) ? d.left : 'dark',
    },
    blocks,
    selBlock: typeof s.selBlock === 'string' && blockIds.has(s.selBlock) ? s.selBlock : null,
    objDraft: cleanStacks(s.objDraft, OBJ_G, OBJ_G, OBJ_MAXH) ?? emptyObjDraft(),
    objects,
    selObject: typeof s.selObject === 'string' && objectIds.has(s.selObject) ? s.selObject : null,
    erase: s.erase === true,
    placements: Array.isArray(s.placements)
      ? s.placements
          .slice(0, 64)
          .map((p) => p as Record<string, unknown>)
          .flatMap((p) =>
            typeof p.obj === 'string' && objectIds.has(p.obj) &&
            typeof p.ix === 'number' && typeof p.iy === 'number'
              ? [{ obj: p.obj, ix: Math.round(p.ix), iy: Math.round(p.iy) }]
              : [],
          )
      : [],
  }
}

/* ---- the shared canvas view ---- */

interface Ghost {
  ix: number
  iy: number
  z: number
  dim?: boolean
}

interface IsoViewProps {
  field: Field
  gw: number
  gh: number
  zoom: number | 'fit'
  ink: string
  aria: string
  frameClass?: string
  onTile?: (t: number) => void
  ghostFor?: (t: number) => Ghost[] | null
}

function IsoView({ field, gw, gh, zoom, ink, aria, frameClass, onTile, ghostFor }: IsoViewProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const zoomRef = useRef(typeof zoom === 'number' ? zoom : 2)
  const hoverRef = useRef(-1)

  const paint = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let z = typeof zoom === 'number' ? zoom : 2
    if (zoom === 'fit') {
      const wrap = wrapRef.current
      if (!wrap) return
      z = Math.max(2, Math.min(8, Math.floor(Math.min(wrap.clientWidth / field.w, wrap.clientHeight / field.h))))
      canvas.style.left = `${Math.floor((wrap.clientWidth - field.w * z) / 2)}px`
      canvas.style.top = `${Math.floor((wrap.clientHeight - field.h * z) / 2)}px`
    }
    zoomRef.current = z
    canvas.width = field.w * z
    canvas.height = field.h * z
    canvas.style.width = `${field.w * z}px`
    canvas.style.height = `${field.h * z}px`
    canvas.dataset.zoom = String(z)
    canvas.dataset.cx = String(field.ox)
    canvas.dataset.cy = String(field.oy)

    const dim = mix(DARK, ink, 0.5)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    paintField(ctx, field, z, ink, dim)

    const hover = hoverRef.current
    if (hover >= 0 && ghostFor) {
      const ghosts = ghostFor(hover)
      if (ghosts) {
        for (const g of ghosts) {
          const v = vertexOf(field, g.ix, g.iy, g.z)
          ctx.fillStyle = g.dim ? dim : ink
          forEachDiamondCell(v.c, v.r, (x, y) => {
            if ((x + y) % 2 === 0) ctx.fillRect(x * z, y * z, z, z)
          })
        }
      }
    }
  }
  const paintRef = useRef(paint)
  useEffect(() => {
    paintRef.current = paint
  })

  useEffect(() => {
    paintRef.current()
  }, [field, ink])

  useEffect(() => {
    if (zoom !== 'fit') return
    const wrap = wrapRef.current
    if (!wrap) return
    const ro = new ResizeObserver(() => paintRef.current())
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [zoom])

  const cellFromEvent = (e: React.PointerEvent | React.MouseEvent) => {
    const z = zoomRef.current
    const ev = e.nativeEvent as MouseEvent
    return tileAt(field, Math.floor(ev.offsetX / z), Math.floor(ev.offsetY / z), gw, gh)
  }

  const canvas = (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={aria}
      style={{
        imageRendering: 'pixelated',
        cursor: onTile ? 'pointer' : undefined,
        ...(zoom === 'fit' ? { position: 'absolute' as const } : { display: 'block' }),
      }}
      onClick={onTile ? (e) => {
        const t = cellFromEvent(e)
        if (t >= 0) {
          // Suppress the ghost until the pointer moves again, so the
          // just-placed (or just-removed) result is seen plainly.
          hoverRef.current = -1
          onTile(t)
        }
      } : undefined}
      onPointerMove={ghostFor ? (e) => {
        const t = cellFromEvent(e)
        if (t !== hoverRef.current) {
          hoverRef.current = t
          paintRef.current()
        }
      } : undefined}
      onPointerLeave={ghostFor ? () => {
        if (hoverRef.current !== -1) {
          hoverRef.current = -1
          paintRef.current()
        }
      } : undefined}
    />
  )

  if (zoom === 'fit') {
    return (
      <div ref={wrapRef} className={frameClass ?? 'bld-frame'}>
        {canvas}
      </div>
    )
  }
  return canvas
}

/* ---- the shop ---- */

export default function BlockShop() {
  const { activeGem } = useXp()
  const ink = THEMES[activeGem].accent

  const [state, setState] = useState<ShopState>(() => {
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
      /* private mode: the shop still works for this visit */
    }
  }, [state])

  const { tab, draft, blocks, selBlock, objDraft, objects, selObject, erase, placements } = state

  const resolve: Resolve = useMemo(() => {
    const map = new Map(blocks.map((b) => [b.id, b]))
    return (id) => (id === 'draft' ? draft : map.get(id) ?? CLASSIC)
  }, [blocks, draft])

  /* ---- block tab ---- */

  const previewField = useMemo(
    () => renderStacks([['draft']], 1, 1, resolve, { lattice: false, maxH: 1 }),
    [resolve],
  )
  const blockThumbField = useMemo(
    () => new Map(blocks.map((b) => [b.id, renderStacks([[b.id]], 1, 1, resolve, { lattice: false, maxH: 1 })])),
    [blocks, resolve],
  )

  const saveBlock = () =>
    setState((s) => {
      const def: BlockDef = { ...s.draft, id: uid(), name: `block ${s.blocks.length + 1}` }
      return { ...s, blocks: [...s.blocks, def], selBlock: def.id }
    })

  const deleteBlock = () =>
    setState((s) => ({
      ...s,
      blocks: s.blocks.filter((b) => b.id !== s.selBlock),
      selBlock: null,
    }))

  /* ---- object tab ---- */

  const objField = useMemo(
    () => renderStacks(objDraft, OBJ_G, OBJ_G, resolve, { maxH: OBJ_MAXH }),
    [objDraft, resolve],
  )
  const objThumbField = useMemo(
    () =>
      new Map(
        objects.map((o) => [o.id, renderStacks(o.stacks, o.gw, o.gh, resolve, { lattice: false, maxH: OBJ_MAXH })]),
      ),
    [objects, resolve],
  )

  const tapObjectTile = (t: number) =>
    setState((s) => {
      const stacks = s.objDraft.map((st) => [...st])
      if (s.erase) {
        if (stacks[t].length === 0) return s
        stacks[t] = stacks[t].slice(0, -1)
      } else {
        if (!s.selBlock || stacks[t].length >= OBJ_MAXH) return s
        stacks[t] = [...stacks[t], s.selBlock]
      }
      return { ...s, objDraft: stacks }
    })

  const saveObject = () =>
    setState((s) => {
      // Trim to the bounding box of occupied tiles.
      let x0 = OBJ_G, y0 = OBJ_G, x1 = -1, y1 = -1
      for (let iy = 0; iy < OBJ_G; iy++) {
        for (let ix = 0; ix < OBJ_G; ix++) {
          if (s.objDraft[iy * OBJ_G + ix].length > 0) {
            x0 = Math.min(x0, ix)
            y0 = Math.min(y0, iy)
            x1 = Math.max(x1, ix)
            y1 = Math.max(y1, iy)
          }
        }
      }
      if (x1 < 0) return s // nothing built
      const gw = x1 - x0 + 1
      const gh = y1 - y0 + 1
      const stacks: string[][] = []
      for (let iy = y0; iy <= y1; iy++) {
        for (let ix = x0; ix <= x1; ix++) stacks.push([...s.objDraft[iy * OBJ_G + ix]])
      }
      const def: ObjectDef = { id: uid(), name: `object ${s.objects.length + 1}`, gw, gh, stacks }
      return { ...s, objects: [...s.objects, def], selObject: def.id }
    })

  const deleteObject = () =>
    setState((s) => ({
      ...s,
      objects: s.objects.filter((o) => o.id !== s.selObject),
      placements: s.placements.filter((p) => p.obj !== s.selObject),
      selObject: null,
    }))

  /* ---- scene tab ---- */

  const sceneData = useMemo(() => {
    const stacks: string[][] = new Array(SCENE_G * SCENE_G).fill(null).map(() => [])
    const owner = new Int16Array(SCENE_G * SCENE_G).fill(-1)
    const byId = new Map(objects.map((o) => [o.id, o]))
    placements.forEach((p, i) => {
      const o = byId.get(p.obj)
      if (!o) return
      for (let oy = 0; oy < o.gh; oy++) {
        for (let ox = 0; ox < o.gw; ox++) {
          const st = o.stacks[oy * o.gw + ox]
          if (st.length === 0) continue
          const tx = p.ix + ox
          const ty = p.iy + oy
          if (tx < 0 || tx >= SCENE_G || ty < 0 || ty >= SCENE_G) continue
          stacks[ty * SCENE_G + tx] = st
          owner[ty * SCENE_G + tx] = i
        }
      }
    })
    return { stacks, owner, field: renderStacks(stacks, SCENE_G, SCENE_G, resolve, { maxH: OBJ_MAXH }) }
  }, [placements, objects, resolve])

  /** Anchor so the tapped tile sits at the object's center (a tap means
   *  "put it HERE", especially on touch where there is no hover). */
  const anchorFor = (objId: string, t: number): { ix: number; iy: number } => {
    const o = objects.find((x) => x.id === objId)
    const ix = t % SCENE_G
    const iy = Math.floor(t / SCENE_G)
    if (!o) return { ix, iy }
    return { ix: ix - Math.floor((o.gw - 1) / 2), iy: iy - Math.floor((o.gh - 1) / 2) }
  }

  /** Occupied scene tiles an object would claim at (ix, iy), or null if
   *  out of bounds / colliding. */
  const placementTiles = (objId: string, ix: number, iy: number): number[] | null => {
    const o = objects.find((x) => x.id === objId)
    if (!o) return null
    const tiles: number[] = []
    for (let oy = 0; oy < o.gh; oy++) {
      for (let ox = 0; ox < o.gw; ox++) {
        if (o.stacks[oy * o.gw + ox].length === 0) continue
        const tx = ix + ox
        const ty = iy + oy
        if (tx < 0 || tx >= SCENE_G || ty < 0 || ty >= SCENE_G) return null
        if (sceneData.owner[ty * SCENE_G + tx] >= 0) return null
        tiles.push(ty * SCENE_G + tx)
      }
    }
    return tiles
  }

  const tapSceneTile = (t: number) => {
    const own = sceneData.owner[t]
    if (own >= 0) {
      setState((s) => ({ ...s, placements: s.placements.filter((_, i) => i !== own) }))
      return
    }
    if (!selObject) return
    const { ix, iy } = anchorFor(selObject, t)
    if (!placementTiles(selObject, ix, iy)) return
    setState((s) => ({ ...s, placements: [...s.placements, { obj: selObject, ix, iy }] }))
  }

  const sceneGhost = (t: number): Ghost[] | null => {
    const own = sceneData.owner[t]
    if (own >= 0) {
      // Removal hint: dim checkers above the owning object's stacks.
      const ghosts: Ghost[] = []
      for (let i = 0; i < sceneData.owner.length; i++) {
        if (sceneData.owner[i] === own) {
          // On the top faces (not floating above them): reads as
          // "this object is targeted", never as a stray placement.
          ghosts.push({
            ix: i % SCENE_G,
            iy: Math.floor(i / SCENE_G),
            z: Math.max(0, sceneData.stacks[i].length - 1),
            dim: true,
          })
        }
      }
      return ghosts
    }
    if (!selObject) return null
    const { ix, iy } = anchorFor(selObject, t)
    const tiles = placementTiles(selObject, ix, iy)
    if (!tiles) return [{ ix: t % SCENE_G, iy: Math.floor(t / SCENE_G), z: 0, dim: true }] // no fit
    return tiles.map((i) => ({ ix: i % SCENE_G, iy: Math.floor(i / SCENE_G), z: 0 }))
  }

  /* ---- shared UI bits ---- */

  const optRow = (label: string, values: readonly string[], labels: string[], current: string, pick: (v: string) => void) => (
    <div className="bld-row">
      <span className="bld-row-label">{label}</span>
      {values.map((v, i) => (
        <button key={v} type="button" className="bld-opt" aria-pressed={current === v} onClick={() => pick(v)}>
          {labels[i]}
        </button>
      ))}
    </div>
  )

  const blockPalette = (label: string) => (
    <div className="bld-row">
      <span className="bld-row-label">{label}</span>
      {blocks.length === 0 && <span className="blk-cap">save a block first</span>}
      {blocks.map((b) => (
        <button
          key={b.id}
          type="button"
          className="blk-thumb"
          aria-pressed={selBlock === b.id}
          aria-label={`${b.name}: top ${FACE_LABEL[b.top]}, right ${FACE_LABEL[b.right]}, left ${FACE_LABEL[b.left]}`}
          onClick={() =>
            setState((s) => ({
              ...s,
              selBlock: b.id,
              draft: { ...b, id: 'draft', name: 'draft' },
            }))
          }
        >
          <IsoView field={blockThumbField.get(b.id)!} gw={1} gh={1} zoom={2} ink={ink} aria={b.name} />
        </button>
      ))}
    </div>
  )

  const objectPalette = (
    <div className="bld-row">
      <span className="bld-row-label">objects</span>
      {objects.length === 0 && <span className="blk-cap">save an object first</span>}
      {objects.map((o) => (
        <button
          key={o.id}
          type="button"
          className="blk-thumb"
          aria-pressed={selObject === o.id}
          aria-label={`${o.name}, ${o.gw} by ${o.gh} tiles`}
          onClick={() => setState((s) => ({ ...s, selObject: o.id }))}
        >
          <IsoView field={objThumbField.get(o.id)!} gw={o.gw} gh={o.gh} zoom={2} ink={ink} aria={o.name} />
        </button>
      ))}
    </div>
  )

  return (
    <div className="blk-shop">
      {optRow('stage', ['block', 'object', 'scene'], ['block', 'object', 'scene'], tab, (v) =>
        setState((s) => ({ ...s, tab: v as Tab })),
      )}

      {tab === 'block' && (
        <>
          <div className="blk-row">
            <div className="blk-fig">
              <IsoView field={previewField} gw={1} gh={1} zoom={8} ink={ink} aria="Block preview" />
              <span className="blk-cap">the block</span>
            </div>
          </div>
          {optRow('top', FACES, FACES.map((f) => FACE_LABEL[f]), draft.top, (v) =>
            setState((s) => ({ ...s, draft: { ...s.draft, top: v as FaceTone } })),
          )}
          {optRow('right', FACES, FACES.map((f) => FACE_LABEL[f]), draft.right, (v) =>
            setState((s) => ({ ...s, draft: { ...s.draft, right: v as FaceTone } })),
          )}
          {optRow('left', FACES, FACES.map((f) => FACE_LABEL[f]), draft.left, (v) =>
            setState((s) => ({ ...s, draft: { ...s.draft, left: v as FaceTone } })),
          )}
          <div className="bld-row">
            <span className="bld-row-label">&nbsp;</span>
            <Button variant="secondary" size="small" type="button" onClick={saveBlock}>
              save block
            </Button>
            {selBlock && (
              <button type="button" className="cs-reroll" onClick={deleteBlock}>
                delete selected
              </button>
            )}
          </div>
          {blockPalette('library')}
          <p className="town-hint">Design the three faces, save it, and it joins the block library.</p>
        </>
      )}

      {tab === 'object' && (
        <>
          {blockPalette('blocks')}
          <IsoView
            field={objField}
            gw={OBJ_G}
            gh={OBJ_G}
            zoom="fit"
            ink={ink}
            aria={`Object grid: ${OBJ_G} by ${OBJ_G} tiles, tap to stack the selected block`}
            frameClass="blk-stage"
            onTile={tapObjectTile}
            ghostFor={(t) => {
              const len = objDraft[t].length
              if (erase) return len > 0 ? [{ ix: t % OBJ_G, iy: Math.floor(t / OBJ_G), z: len - 1, dim: true }] : null
              if (!selBlock || len >= OBJ_MAXH) return null
              return [{ ix: t % OBJ_G, iy: Math.floor(t / OBJ_G), z: len }]
            }}
          />
          {optRow('mode', ['add', 'erase'], ['add', 'erase'], erase ? 'erase' : 'add', (v) =>
            setState((s) => ({ ...s, erase: v === 'erase' })),
          )}
          <div className="bld-row">
            <span className="bld-row-label">&nbsp;</span>
            <Button variant="secondary" size="small" type="button" onClick={saveObject}>
              save object
            </Button>
            <button
              type="button"
              className="cs-reroll"
              onClick={() => setState((s) => ({ ...s, objDraft: emptyObjDraft() }))}
            >
              clear
            </button>
            {selObject && (
              <button type="button" className="cs-reroll" onClick={deleteObject}>
                delete selected object
              </button>
            )}
          </div>
          {objectPalette}
          <p className="town-hint">
            Pick a block, tap the grid to stack it; erase mode removes the top block. Saving trims
            the object to its footprint.
          </p>
        </>
      )}

      {tab === 'scene' && (
        <>
          {objectPalette}
          <IsoView
            field={sceneData.field}
            gw={SCENE_G}
            gh={SCENE_G}
            zoom="fit"
            ink={ink}
            aria={`Scene: ${SCENE_G} by ${SCENE_G} tiles with ${placements.length} objects, tap to place the selected object`}
            frameClass="bld-frame"
            onTile={tapSceneTile}
            ghostFor={sceneGhost}
          />
          <div className="bld-row">
            <span className="bld-row-label">&nbsp;</span>
            <button
              type="button"
              className="cs-reroll"
              onClick={() => setState((s) => ({ ...s, placements: [] }))}
            >
              clear scene
            </button>
          </div>
          <p className="town-hint">
            Pick an object, hover to preview its footprint, tap to place it; tap a placed object to
            remove it.
          </p>
        </>
      )}
    </div>
  )
}
