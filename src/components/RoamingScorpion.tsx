/**
 * RoamingScorpion
 *
 * The home hero mark: a pixel-art scorpion that wanders left/right across the
 * content column and occasionally pauses. Built from the desert sprite sheets
 * (vertical 4-frame walk cycles + a single idle pose), recolored at load into
 * the site's sepia palette so it matches the warm-stone theme, then blitted with
 * nearest-neighbor scaling so the pixels stay crisp.
 *
 * Self-contained: owns sprite loading/recolor, a single rAF loop with
 * delta-time, ResizeObserver re-measure, and full teardown. Companion to
 * PixelFire / PixelStalactites (same canvas + RAF + pixelated approach).
 */

import { useEffect, useRef } from 'react'

// --- sprite sheet geometry (see ~/Desktop/desert-scorpion/README) ----------
const WALK_FW = 50
const WALK_FH = 54
const WALK_FRAMES = 4
const IDLE_FW = 46
const IDLE_FH = 64

const base = import.meta.env.BASE_URL
const SRC = {
  left: `${base}assets/images/scorpion/left_walk_sheet.png`,
  right: `${base}assets/images/scorpion/right_walk_sheet.png`,
  idle: `${base}assets/images/scorpion/straight_tan.png`,
}

// Sepia ramp reused from PixelScorpion's palette so the two scorpions match:
// dark shade -> mid stone -> warm-white highlight. Source pixel luminance is
// mapped onto this ramp; alpha is preserved so the silhouette stays intact.
const RAMP: Array<[number, number, number]> = [
  [0x4a, 0x3c, 0x2c], // shade
  [0x96, 0x8a, 0x75], // body (sepia-600)
  [0xfd, 0xfb, 0xf5], // bright warm-white highlight
]

const SPEED = 60 // px/s — one steady, consistent pace
const WALK_FPS = 8 // walk-cycle frames per second
const TURN_TIME_MIN = 0.22 // s — how long the south-facing turn pose is held
const TURN_TIME_MAX = 0.42

// Tap-to-stop: on click/tap the scorpion holds the south pose for this long
// (then auto-resumes), with its pincers easing open/closed the whole time.
const TAP_HOLD_MIN = 2.6 // s
const TAP_HOLD_MAX = 3.6
// The two claws sit at the BOTTOM CORNERS of the 46x64 top-down sprite (tail
// curls at the top; legs/body run down the center). Slice JUST those two corners
// so they can hinge open/closed about a pivot like a pair of scissors, leaving
// the center body static. Tune these rects/pivots if the claws look off.
const CLAW_TOP_Y = 42 // claw band starts this far down
const CLAW_BOT_H = 22 // ...and runs to the bottom (42..64)
const CLAW_L_W = 18 // left claw:  x 0..18  (bottom-left corner)
const CLAW_R_X = 28 // right claw starts at x 28
const CLAW_R_W = 18 // right claw: x 28..46 (bottom-right corner)
// Hinge points (sprite px) each claw rotates about, near where it meets the body.
const CLAW_PIVOT_Y = 46
const CLAW_L_PIVOT_X = 16
const CLAW_R_PIVOT_X = 30
const CLAW_MAX_ANGLE = 0.34 // radians (~19°) of swing per claw at full open
const CLAW_HZ = 1.1 // open/close cycles per second

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// Recolor a loaded sprite onto an offscreen canvas at native resolution.
// Each opaque pixel's luminance picks a colour along RAMP; alpha is kept.
function recolor(img: HTMLImageElement): HTMLCanvasElement {
  const off = document.createElement('canvas')
  off.width = img.naturalWidth
  off.height = img.naturalHeight
  const octx = off.getContext('2d')!
  octx.imageSmoothingEnabled = false
  octx.drawImage(img, 0, 0)
  const data = octx.getImageData(0, 0, off.width, off.height)
  const px = data.data
  for (let i = 0; i < px.length; i += 4) {
    const a = px[i + 3]
    if (a === 0) continue
    // Rec. 601 luma of the original tan pixel, normalised 0..1.
    const lum = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255
    const seg = lum * (RAMP.length - 1)
    const lo = Math.min(Math.floor(seg), RAMP.length - 2)
    const t = seg - lo
    px[i] = lerp(RAMP[lo][0], RAMP[lo + 1][0], t)
    px[i + 1] = lerp(RAMP[lo][1], RAMP[lo + 1][1], t)
    px[i + 2] = lerp(RAMP[lo][2], RAMP[lo + 1][2], t)
  }
  octx.putImageData(data, 0, 0)
  return off
}

// Copy a sub-rect of a sprite into a same-size canvas (rest transparent), so the
// piece can be drawn shifted while staying aligned to the full sprite's box.
function sliceLayer(src: HTMLCanvasElement, rx: number, ry: number, rw: number, rh: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = src.width
  c.height = src.height
  const cx = c.getContext('2d')!
  cx.imageSmoothingEnabled = false
  cx.drawImage(src, rx, ry, rw, rh, rx, ry, rw, rh)
  return c
}

// The full sprite with the two pincer rects erased (the static "body" layer).
function bodyLayer(src: HTMLCanvasElement): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = src.width
  c.height = src.height
  const cx = c.getContext('2d')!
  cx.imageSmoothingEnabled = false
  cx.drawImage(src, 0, 0)
  cx.clearRect(0, CLAW_TOP_Y, CLAW_L_W, CLAW_BOT_H)
  cx.clearRect(CLAW_R_X, CLAW_TOP_Y, CLAW_R_W, CLAW_BOT_H)
  return c
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

const rnd = (min: number, max: number) => min + Math.random() * (max - min)

export default function RoamingScorpion({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf: number | null = null
    let disposed = false
    let sheets:
      | {
          left: HTMLCanvasElement
          right: HTMLCanvasElement
          idle: HTMLCanvasElement
          idleBody: HTMLCanvasElement // south sprite with pincers removed
          clawL: HTMLCanvasElement // left pincer only (full-size layer)
          clawR: HTMLCanvasElement // right pincer only (full-size layer)
        }
      | null = null

    // Layout state, refreshed on resize.
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let bandW = 0
    let bandH = 0 // measured from CSS so it tracks the responsive band height
    let zoom = 3 // integer upscale, recomputed from width
    let walkW = WALK_FW * zoom
    let walkH = WALK_FH * zoom

    // Roam state.
    let x = 0
    let dir: 1 | -1 = 1 // 1 = east/right, -1 = west/left
    let pendingDir: 1 | -1 = 1 // direction to adopt after a turn transition
    let frame = 0
    let animTimer = 0
    // walk: moving; pause: standing in its current facing; turn: brief
    // south-facing transition when reversing; tapped: held south pose with the
    // pincers animating open/closed after a click/tap (auto-resumes).
    let mode: 'walk' | 'pause' | 'turn' | 'tapped' = 'walk'
    let stateTimer = 0 // counts down within the current mode
    let clawPhase = 0 // drives the pincer open/close while tapped
    let last = 0

    function measure() {
      bandW = wrap!.clientWidth
      bandH = wrap!.clientHeight
      // 1x integer scale: smallest fully-crisp pixel size, ~a third of the
      // previous 3x mark so the scorpion reads as a small critter in a thin lane.
      zoom = 1
      walkW = WALK_FW * zoom
      walkH = WALK_FH * zoom
      // Backing store sized to the measured band; canvas fills it via CSS.
      canvas!.width = Math.round(bandW * dpr)
      canvas!.height = Math.round(bandH * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.imageSmoothingEnabled = false
      x = Math.max(0, Math.min(x, Math.max(0, bandW - walkW)))
    }

    function clear() {
      ctx!.clearRect(0, 0, bandW, bandH)
    }

    // South-facing (top-down) pose, used only as a turn transition. Centred on
    // the same footprint as the walk sprite and vertically centred in the band.
    function drawSouth() {
      if (!sheets) return
      const h = walkH
      const w = Math.round((IDLE_FW / IDLE_FH) * h)
      const dx = Math.round(x + (walkW - w) / 2)
      const dy = Math.round((bandH - h) / 2)
      ctx!.drawImage(sheets.idle, 0, 0, IDLE_FW, IDLE_FH, dx, dy, w, h)
    }

    // Walking / standing pose in the current facing. `frame` 0 reads as a stand.
    function drawWalk() {
      if (!sheets) return
      const sheet = dir === -1 ? sheets.left : sheets.right
      const sy = frame * WALK_FH
      const dy = Math.round((bandH - walkH) / 2)
      ctx!.drawImage(sheet, 0, sy, WALK_FW, WALK_FH, Math.round(x), dy, walkW, walkH)
    }

    // Draw a claw layer rotated by `ang` about a pivot (canvas px) — only the
    // claw pixels exist in the layer, so just the claw hinges.
    function drawHinged(layer: HTMLCanvasElement, dx: number, dy: number, w: number, h: number, px: number, py: number, ang: number) {
      ctx!.save()
      ctx!.translate(px, py)
      ctx!.rotate(ang)
      ctx!.translate(-px, -py)
      ctx!.drawImage(layer, dx, dy, w, h)
      ctx!.restore()
    }

    // Held south pose after a tap: body stays put while the two corner claws
    // hinge open/closed like scissors.
    function drawTapped() {
      if (!sheets) return
      const h = walkH
      const w = Math.round((IDLE_FW / IDLE_FH) * h)
      const dx = Math.round(x + (walkW - w) / 2)
      const dy = Math.round((bandH - h) / 2)
      const sx = w / IDLE_FW // sprite px -> canvas px
      const sy = h / IDLE_FH
      const open = Math.sin(clawPhase) * 0.5 + 0.5 // 0..1
      const ang = open * CLAW_MAX_ANGLE
      ctx!.drawImage(sheets.idleBody, dx, dy, w, h)
      // left claw swings out (CCW), right claw mirrors (CW)
      drawHinged(sheets.clawL, dx, dy, w, h, dx + CLAW_L_PIVOT_X * sx, dy + CLAW_PIVOT_Y * sy, -ang)
      drawHinged(sheets.clawR, dx, dy, w, h, dx + CLAW_R_PIVOT_X * sx, dy + CLAW_PIVOT_Y * sy, ang)
    }

    // --- mode transitions -------------------------------------------------
    function beginWalk() {
      mode = 'walk'
      stateTimer = rnd(3, 7) // walk this long before a voluntary pause
    }
    function beginPause() {
      mode = 'pause'
      stateTimer = rnd(1, 2)
      frame = 0 // stand in current facing (NOT south)
    }
    // Reverse via a brief south-facing pose, then walk off in `to`.
    function beginTurn(to: 1 | -1) {
      mode = 'turn'
      pendingDir = to
      stateTimer = rnd(TURN_TIME_MIN, TURN_TIME_MAX)
      frame = 0
    }
    function beginTapped() {
      mode = 'tapped'
      stateTimer = rnd(TAP_HOLD_MIN, TAP_HOLD_MAX)
      clawPhase = 0
    }

    function tick(now: number) {
      if (disposed) return
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0
      last = now
      stateTimer -= dt

      if (mode === 'walk') {
        x += dir * SPEED * dt
        const maxX = Math.max(0, bandW - walkW)
        if (x <= 0) {
          x = 0
          beginTurn(1) // hit west edge -> turn to face east
        } else if (x >= maxX) {
          x = maxX
          beginTurn(-1) // hit east edge -> turn to face west
        } else {
          animTimer += dt
          if (animTimer >= 1 / WALK_FPS) {
            frame = (frame + 1) % WALK_FRAMES
            animTimer = 0
          }
          if (stateTimer <= 0) beginPause()
        }
      } else if (mode === 'pause') {
        if (stateTimer <= 0) {
          // Half the time keep going; otherwise reverse (with a south turn).
          if (Math.random() < 0.5) beginTurn(dir === 1 ? -1 : 1)
          else beginWalk()
        }
      } else if (mode === 'tapped') {
        // Held south pose: animate pincers, then auto-resume walking.
        clawPhase += dt * CLAW_HZ * Math.PI * 2
        if (stateTimer <= 0) beginWalk()
      } else {
        // turn: hold the south-facing pose, then commit the new direction.
        if (stateTimer <= 0) {
          dir = pendingDir
          beginWalk()
        }
      }

      clear()
      if (mode === 'tapped') drawTapped()
      else if (mode === 'turn') drawSouth()
      else drawWalk()

      raf = requestAnimationFrame(tick)
    }

    function start() {
      if (raf != null || disposed || !sheets) return
      last = 0
      raf = requestAnimationFrame(tick)
    }
    function stop() {
      if (raf != null) {
        cancelAnimationFrame(raf)
        raf = null
      }
    }

    // Pause the loop when the tab is hidden or the hero scrolls offscreen.
    let onScreen = true
    const onVisibility = () => {
      if (document.hidden) stop()
      else if (onScreen) start()
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )
    const ro = new ResizeObserver(() => {
      measure()
      if (reduce && sheets) {
        clear()
        drawSouth()
      }
    })

    // Hit-test a pointer against the scorpion's current sprite box (not the
    // whole strip), in CSS pixels relative to the canvas.
    function spriteHit(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect()
      const cssX = clientX - rect.left
      const cssY = clientY - rect.top
      const top = (bandH - walkH) / 2
      return cssX >= x && cssX <= x + walkW && cssY >= top && cssY <= top + walkH
    }
    const onPointerDown = (e: PointerEvent) => {
      if (!sheets || reduce || mode === 'tapped') return
      if (spriteHit(e.clientX, e.clientY)) beginTapped()
    }
    // Show a pointer cursor only while hovering the scorpion itself.
    const onPointerMove = (e: PointerEvent) => {
      canvas!.style.cursor = !reduce && sheets && spriteHit(e.clientX, e.clientY) ? 'pointer' : 'default'
    }
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)

    measure()

    // Load + recolor all three sheets, then begin.
    Promise.all([loadImage(SRC.left), loadImage(SRC.right), loadImage(SRC.idle)])
      .then(([l, r, i]) => {
        if (disposed) return
        const idle = recolor(i)
        sheets = {
          left: recolor(l),
          right: recolor(r),
          idle,
          idleBody: bodyLayer(idle),
          clawL: sliceLayer(idle, 0, CLAW_TOP_Y, CLAW_L_W, CLAW_BOT_H),
          clawR: sliceLayer(idle, CLAW_R_X, CLAW_TOP_Y, CLAW_R_W, CLAW_BOT_H),
        }
        x = Math.max(0, (bandW - walkW) / 2) // start centred
        if (reduce) {
          // Static single frame, no movement.
          clear()
          drawSouth()
          return
        }
        beginWalk()
        ro.observe(wrap!)
        io.observe(wrap!)
        document.addEventListener('visibilitychange', onVisibility)
        start()
      })
      .catch(() => {
        /* asset load failed; leave the band empty rather than throw */
      })

    if (reduce) ro.observe(wrap!) // still re-center the static pose on resize

    return () => {
      disposed = true
      stop()
      ro.disconnect()
      io.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div ref={wrapRef} className={`heromark heromark--roam${className ? ' ' + className : ''}`} aria-hidden="true">
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          pointerEvents: 'auto', // interactive: tap the scorpion to stop it
          touchAction: 'manipulation',
        }}
      />
    </div>
  )
}
