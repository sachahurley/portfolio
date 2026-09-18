/**
 * TownScene — the gothic isometric town on one canvas.
 *
 * The scene is authored in ART PIXELS (one grid cell = one pixel of art)
 * and displayed at an exact integer zoom (2x on phones, 4x on desktop), so
 * it stays crisp at every size. Statics (ground, buildings, the selective
 * 1px outline pass) bake to an offscreen layer colored through a limited
 * ink ramp: mix(dark, theme ink, tone luma), so gem themes retint the
 * whole town. The frame loop only draws the plaza bonfire, window glints,
 * the hover rim-light, and the enter transition. A parallel ID buffer
 * written during the bake gives per-pixel hit-testing.
 *
 * DOM handles all text: a hover label plate, and visually-hidden focusable
 * hotspot buttons per routed building for keyboard and screen readers
 * (the canvas itself is aria-hidden).
 *
 * Reduced motion: no animation loop; a single still composite (static
 * ember glow, steady window light), hover and click still work, and
 * entering navigates instantly with no transition.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { THEMES, firePaletteFor } from '../../lib/themes'
import { bayerThreshold } from '../../lib/dither/oneBit'
import { hashNoise } from '../../lib/dither/render'
import { cellToIso, depthOf, isoToCell } from '../../lib/iso'
import {
  FIRE_COLS,
  FIRE_ID,
  FIRE_LABEL,
  FIRE_ROWS,
  FIRE_TILE,
  GRID,
  NATIVE_COLS,
  NATIVE_ROWS,
  ORIGIN,
  TOWN,
  doorTileOf,
} from './layout'
import {
  drawBuilding,
  makeGrid,
  outlinePass,
  TONES,
  type BakedBuilding,
  type Grid,
} from './buildings'
import { paintGrid, TOWN_STYLES } from './styles'

const FIRE_STEP_MS = 140 // bonfire sim beat, matching PixelFire's crackle
const GLINT_MS = 280 // window-glint clock
const DOOR_BEAT_MS = 150 // door glow before the dissolve
const DISSOLVE_MS = 300 // Bayer dissolve-out before navigation

interface TownSceneProps {
  onEnter: (path: string) => void
  onSecret: () => void
}

interface Spot {
  id: number
  path: string
  aria: string
  left: number
  top: number
  width: number
  height: number
}

interface Plate {
  text: string
  sub: string
  left: number
  top: number
}

export default function TownScene({ onEnter, onSecret }: TownSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [spots, setSpots] = useState<Spot[]>([])
  const [plate, setPlate] = useState<Plate | null>(null)

  const { activeGem } = useXp()
  const palette = useMemo(
    () => ({ ink: THEMES[activeGem].accent, fire: firePaletteFor(activeGem) }),
    [activeGem],
  )

  // Callbacks live in refs so the bake effect never re-runs for them.
  const onEnterRef = useRef(onEnter)
  const onSecretRef = useRef(onSecret)
  useEffect(() => {
    onEnterRef.current = onEnter
    onSecretRef.current = onSecret
  })

  // The effect exposes its internals to the pointer/hotspot handlers here.
  const apiRef = useRef<{
    hover(id: number | null): void
    activate(id: number): void
    idAt(offX: number, offY: number): number
  } | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf: number | null = null
    let disposed = false
    let onScreen = true
    let staticLayer: HTMLCanvasElement | null = null
    let grid: Grid | null = null
    let baked: BakedBuilding[] = []
    let zoom = 4
    let canvasLeft = 0
    let canvasTop = 0
    let hoverId: number | null = null
    let entering: { path: string; t0: number; doorCells: Array<{ c: number; r: number }> } | null =
      null

    // Enter-transition dissolve: cell indices sorted by Bayer threshold,
    // filled incrementally into an offscreen mask (one drawImage per frame
    // instead of thousands of fillRects at the art-px cell count).
    let bayerOrder: Uint32Array | null = null
    let dissolveMask: HTMLCanvasElement | null = null
    let dissolveDrawn = 0

    // Bonfire sim (doom-fire, PixelFire's recipe on a small patch).
    const fire = new Uint8Array(FIRE_COLS * FIRE_ROWS)
    let lastFireStep = 0
    const fireCenter = isoToCell(FIRE_TILE.ix, FIRE_TILE.iy, ORIGIN)
    const fireC0 = fireCenter.c - (FIRE_COLS >> 1)
    const fireR0 = fireCenter.r - FIRE_ROWS + 2

    function stepFire() {
      const maxI = palette.fire.length - 1
      const bottom = (FIRE_ROWS - 1) * FIRE_COLS
      for (let x = 0; x < FIRE_COLS; x++) {
        fire[bottom + x] = maxI - Math.floor(Math.random() * 3)
      }
      for (let x = 0; x < FIRE_COLS; x++) {
        for (let y = 1; y < FIRE_ROWS; y++) {
          const src = y * FIRE_COLS + x
          const v = fire[src]
          if (v === 0) {
            fire[(y - 1) * FIRE_COLS + x] = 0
          } else {
            const decay = Math.floor(Math.random() * 4)
            const wind = Math.floor(Math.random() * 3) - 1
            const dx = Math.min(Math.max(x + wind, 0), FIRE_COLS - 1)
            fire[(y - 1) * FIRE_COLS + dx] = Math.max(0, v - decay)
          }
        }
      }
    }

    function drawFire() {
      const maxI = palette.fire.length - 1
      const tip = palette.fire[Math.round(maxI * 0.92)]
      const body = palette.fire[Math.round(maxI * 0.69)]
      const ember = palette.fire[Math.round(maxI * 0.38)]
      for (let y = 0; y < FIRE_ROWS - 2; y++) {
        for (let x = 0; x < FIRE_COLS; x++) {
          const v = fire[y * FIRE_COLS + x]
          if (v === 0) continue
          const t = v / maxI
          if (t >= 0.6) ctx!.fillStyle = tip
          else if (t >= 0.33) ctx!.fillStyle = body
          else if (t * 1.6 > bayerThreshold(fireC0 + x, fireR0 + y)) ctx!.fillStyle = ember
          else continue
          ctx!.fillRect((fireC0 + x) * zoom, (fireR0 + y) * zoom, zoom, zoom)
        }
      }
    }

    /** Still ember glow for the reduced-motion composite. */
    function drawFireStill() {
      const maxI = palette.fire.length - 1
      const body = palette.fire[Math.round(maxI * 0.69)]
      const tip = palette.fire[Math.round(maxI * 0.92)]
      const mx = fireC0 + (FIRE_COLS >> 1)
      for (let y = 5; y < FIRE_ROWS - 2; y++) {
        for (let x = 0; x < FIRE_COLS; x++) {
          const c = fireC0 + x
          const r = fireR0 + y
          const dist = Math.abs(c - mx) / (FIRE_COLS / 2) + (FIRE_ROWS - y) / FIRE_ROWS
          if (dist < 0.7) ctx!.fillStyle = tip
          else if (dist < 1.1 && bayerThreshold(c, r) < 0.6) ctx!.fillStyle = body
          else continue
          ctx!.fillRect(c * zoom, r * zoom, zoom, zoom)
        }
      }
    }

    function drawGlints(now: number) {
      ctx!.fillStyle = palette.ink
      const clock = reduced ? 0 : Math.floor(now / GLINT_MS)
      for (const bb of baked) {
        for (const cell of bb.glintCells) {
          const on = reduced || hashNoise(cell.c, cell.r, clock) > 0.3
          if (on) ctx!.fillRect(cell.c * zoom, cell.r * zoom, zoom, zoom)
        }
      }
    }

    /** Hover: light the 1px silhouette outline solid, sparse fill inside. */
    function drawGlow(id: number) {
      if (!grid) return
      ctx!.fillStyle = palette.ink
      let minC = 0
      let minR = 0
      let maxC = 0
      let maxR = 0
      if (id === FIRE_ID) {
        minC = fireC0 - 1
        maxC = fireC0 + FIRE_COLS
        minR = fireR0
        maxR = fireR0 + FIRE_ROWS + 3
      } else {
        const bb = baked.find((x) => x.b.id === id)
        if (!bb) return
        minC = bb.minC
        maxC = bb.maxC
        minR = bb.minR
        maxR = bb.maxR
      }
      for (let r = Math.max(0, minR); r <= Math.min(grid.rows - 1, maxR); r++) {
        for (let c = Math.max(0, minC); c <= Math.min(grid.cols - 1, maxC); c++) {
          const i = r * grid.cols + c
          if (grid.ids[i] !== id) continue
          if (grid.tone[i] === TONES.OUTLINE || bayerThreshold(c, r) < 0.2) {
            ctx!.fillRect(c * zoom, r * zoom, zoom, zoom)
          }
        }
      }
    }

    function render(now: number) {
      if (!staticLayer) return
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.drawImage(staticLayer, 0, 0)
      if (reduced) drawFireStill()
      else drawFire()
      drawGlints(now)
      if (hoverId != null) drawGlow(hoverId)

      if (entering) {
        const t = now - entering.t0
        if (t < DOOR_BEAT_MS) {
          // The door lights up before the world dissolves.
          ctx!.fillStyle = palette.ink
          for (const cell of entering.doorCells) {
            ctx!.fillRect(cell.c * zoom, cell.r * zoom, zoom, zoom)
          }
        } else {
          const p = (t - DOOR_BEAT_MS) / DISSOLVE_MS
          if (p >= 1) {
            const path = entering.path
            entering = null
            onEnterRef.current(path)
            return
          }
          if (bayerOrder && dissolveMask) {
            const total = bayerOrder.length
            const target = Math.min(total, Math.floor(p * total))
            const mctx = dissolveMask.getContext('2d')!
            mctx.fillStyle = '#000'
            for (let k = dissolveDrawn; k < target; k++) {
              const idx = bayerOrder[k]
              const c = idx % NATIVE_COLS
              const r = (idx - c) / NATIVE_COLS
              mctx.fillRect(c * zoom, r * zoom, zoom, zoom)
            }
            dissolveDrawn = target
            ctx!.save()
            ctx!.globalCompositeOperation = 'destination-out'
            ctx!.drawImage(dissolveMask, 0, 0)
            ctx!.restore()
          }
        }
      }
    }

    function frame(now: number) {
      if (disposed) return
      if (now - lastFireStep >= FIRE_STEP_MS) {
        stepFire()
        lastFireStep = now
      }
      render(now)
      raf = requestAnimationFrame(frame)
    }

    function build() {
      const wrapW = wrap!.clientWidth
      const wrapH = wrap!.clientHeight
      // Art at native resolution, displayed at an exact integer zoom and
      // centered (fractional scaling would break the pixel grid; on a
      // 390px phone the 2x canvas overhangs a few px into the scene's
      // empty sky margins, which is invisible).
      zoom = Math.max(2, Math.min(4, Math.floor(wrapW / NATIVE_COLS)))
      const cw = NATIVE_COLS * zoom
      const ch = NATIVE_ROWS * zoom
      canvas!.width = cw
      canvas!.height = ch
      canvas!.style.width = `${cw}px`
      canvas!.style.height = `${ch}px`
      canvasLeft = Math.floor((wrapW - cw) / 2)
      canvasTop = Math.floor((wrapH - ch) / 2)
      canvas!.style.left = `${canvasLeft}px`
      canvas!.style.top = `${canvasTop}px`

      const g = makeGrid(NATIVE_COLS, NATIVE_ROWS)
      grid = g

      // Ground diamond: flat dark floor with 1px speckle and cracks.
      for (let r = 0; r < NATIVE_ROWS; r++) {
        for (let c = 0; c < NATIVE_COLS; c++) {
          const t = cellToIso(c + 0.5, r + 0.5, ORIGIN)
          if (t.ix < 0 || t.ix >= GRID || t.iy < 0 || t.iy >= GRID) continue
          const i = r * g.cols + c
          const n = hashNoise(c, r, 7)
          g.tone[i] = n > 0.94 ? TONES.SHADE : n < 0.05 ? TONES.OUTLINE : TONES.GROUND
        }
      }

      // Dithered footpaths from each door to the plaza fire.
      for (const b of TOWN) {
        if (!b.path) continue
        const from = doorTileOf(b)
        const steps = Math.ceil(
          (Math.abs(FIRE_TILE.ix - from.ix) + Math.abs(FIRE_TILE.iy - from.iy)) * 4,
        )
        for (let s = 0; s <= steps; s++) {
          const t = s / steps
          const pt = isoToCell(
            from.ix + 0.5 + (FIRE_TILE.ix - from.ix) * t,
            from.iy + 0.5 + (FIRE_TILE.iy - from.iy) * t,
            ORIGIN,
          )
          for (const c of [pt.c, pt.c + 1]) {
            const i = pt.r * g.cols + c
            if (g.tone[i] === TONES.GROUND && bayerThreshold(c, pt.r) < 0.4) {
              g.tone[i] = TONES.SHADE
            }
          }
        }
      }

      // Buildings back to front, then the selective 1px outline pass
      // (rank = draw order, so abutting silhouettes get a single seam).
      const sorted = [...TOWN].sort((a, b) => depthOf(a) - depthOf(b))
      const rank = new Uint8Array(256)
      sorted.forEach((b, i) => {
        rank[b.id] = i + 1
      })
      baked = sorted.map((b) => drawBuilding(g, b, ORIGIN))
      outlinePass(g, rank)

      // The bonfire's tappable ground patch routes home (never claims
      // cells a building already owns).
      for (let y = 3; y < FIRE_ROWS + 3; y++) {
        for (let x = -1; x <= FIRE_COLS; x++) {
          const c = fireC0 + x
          const r = fireR0 + y
          if (c < 0 || c >= g.cols || r < 0 || r >= g.rows) continue
          const i = r * g.cols + c
          if (g.ids[i] === 0) g.ids[i] = FIRE_ID
        }
      }

      // Bake tones -> offscreen layer through the town's sepia style.
      const layer = document.createElement('canvas')
      layer.width = cw
      layer.height = ch
      const lctx = layer.getContext('2d')!
      paintGrid(lctx, g, zoom, TOWN_STYLES.sepia, palette.ink)
      staticLayer = layer

      // Dissolve machinery for the enter transition.
      const total = NATIVE_COLS * NATIVE_ROWS
      const order: number[] = new Array(total)
      for (let i = 0; i < total; i++) order[i] = i
      const th = new Float32Array(total)
      for (let r = 0; r < NATIVE_ROWS; r++) {
        for (let c = 0; c < NATIVE_COLS; c++) th[r * NATIVE_COLS + c] = bayerThreshold(c, r)
      }
      order.sort((a, b) => th[a] - th[b])
      bayerOrder = Uint32Array.from(order)
      dissolveMask = document.createElement('canvas')
      dissolveMask.width = cw
      dissolveMask.height = ch
      dissolveDrawn = 0

      // Keyboard/screen-reader hotspots for every routed target.
      const nextSpots: Spot[] = baked
        .filter((bb) => bb.b.path)
        .map((bb) => ({
          id: bb.b.id,
          path: bb.b.path!,
          aria: `Enter ${bb.b.label} (${bb.b.real})`,
          left: canvasLeft + bb.minC * zoom,
          top: canvasTop + bb.minR * zoom,
          width: (bb.maxC - bb.minC + 1) * zoom,
          height: (bb.maxR - bb.minR + 1) * zoom,
        }))
      nextSpots.push({
        id: FIRE_ID,
        path: '/',
        aria: `Warm up at ${FIRE_LABEL.label} (${FIRE_LABEL.real})`,
        left: canvasLeft + fireC0 * zoom,
        top: canvasTop + fireR0 * zoom,
        width: FIRE_COLS * zoom,
        height: (FIRE_ROWS + 3) * zoom,
      })
      setSpots(nextSpots)
      if (reduced) render(0)
    }

    function plateFor(id: number): Plate | null {
      if (id === FIRE_ID) {
        return {
          text: FIRE_LABEL.label,
          sub: FIRE_LABEL.real,
          left: canvasLeft + (fireC0 + FIRE_COLS / 2) * zoom,
          top: canvasTop + (fireR0 - 2) * zoom,
        }
      }
      const bb = baked.find((x) => x.b.id === id)
      if (!bb) return null
      return {
        text: bb.b.label,
        sub: bb.b.real,
        left: canvasLeft + bb.anchorC * zoom,
        // Clamped so the plate (translated -100%) never clips the frame top
        // when a spire's anchor sits near row 0.
        top: Math.max(30, canvasTop + (bb.minR - 2) * zoom),
      }
    }

    apiRef.current = {
      idAt(offX, offY) {
        if (!grid) return 0
        const c = Math.floor(offX / zoom)
        const r = Math.floor(offY / zoom)
        if (c < 0 || c >= grid.cols || r < 0 || r >= grid.rows) return 0
        return grid.ids[r * grid.cols + c]
      },
      hover(id) {
        if (id === hoverId) return
        hoverId = id
        setPlate(id != null ? plateFor(id) : null)
        if (reduced) render(0)
      },
      activate(id) {
        if (entering) return
        const begin = (path: string, doorCells: Array<{ c: number; r: number }>) => {
          if (reduced) {
            onEnterRef.current(path)
          } else {
            if (dissolveMask) {
              dissolveMask
                .getContext('2d')!
                .clearRect(0, 0, dissolveMask.width, dissolveMask.height)
            }
            dissolveDrawn = 0
            entering = { path, t0: performance.now(), doorCells }
          }
        }
        if (id === FIRE_ID) {
          begin('/', [])
          return
        }
        const bb = baked.find((x) => x.b.id === id)
        if (!bb) return
        if (!bb.b.path) {
          onSecretRef.current()
          return
        }
        begin(bb.b.path, bb.doorCells)
      },
    }

    function start() {
      if (raf != null || disposed || reduced) return
      raf = requestAnimationFrame(frame)
    }
    function stop() {
      if (raf != null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    build()
    start()

    let lastW = wrap.clientWidth
    const ro = new ResizeObserver(() => {
      if (wrap.clientWidth === lastW) return
      lastW = wrap.clientWidth
      build()
    })
    ro.observe(wrap)

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )
    io.observe(wrap)

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (onScreen) start()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      disposed = true
      stop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      apiRef.current = null
    }
  }, [palette])

  return (
    <div ref={wrapRef} className="town-frame">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', imageRendering: 'pixelated' }}
        onPointerMove={(e) => {
          const api = apiRef.current
          if (!api) return
          const id = api.idAt(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
          e.currentTarget.style.cursor = id ? 'pointer' : ''
          api.hover(id || null)
        }}
        onPointerLeave={() => apiRef.current?.hover(null)}
        onClick={(e) => {
          const api = apiRef.current
          if (!api) return
          const id = api.idAt(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
          if (id) api.activate(id)
        }}
      />
      {spots.map((s) => (
        <button
          key={s.id}
          type="button"
          className="town-hotspot"
          aria-label={s.aria}
          style={{ left: s.left, top: s.top, width: s.width, height: s.height }}
          onFocus={() => apiRef.current?.hover(s.id)}
          onBlur={() => apiRef.current?.hover(null)}
          onClick={() => apiRef.current?.activate(s.id)}
        />
      ))}
      {plate && (
        <div className="town-plate" style={{ left: plate.left, top: plate.top }}>
          {plate.text}
          {plate.sub && <span className="town-plate-sub"> · {plate.sub}</span>}
        </div>
      )}
    </div>
  )
}
