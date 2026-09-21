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
// Each pincer ends in a pac-man-like claw at a bottom corner of the 46x64
// top-down sprite: a static outer palm and a movable inner jaw, separated by
// the dark diagonal "mouth" crease drawn in the art. The movable jaw is split
// from the sprite ALONG that crease (the cut leans like a clock hand — 11
// o'clock on the left claw, 1 o'clock on the right), so the seam coincides
// with the mouth line and never shows. Only the jaw rotates, hinging at the
// top of the crease where the claw meets the arm; palm/arm/body stay static.
interface JawDef {
  x0: number // cut line top endpoint (sprite px, pixel-center space)
  y0: number
  dx: number // cut line direction: runs (x0,y0) -> (x0+dx, y0+dy)
  dy: number
  sign: 1 | -1 // which side of the line is the movable jaw
  xMin: number // claw's column range, so the test can't leak elsewhere
  xMax: number
  pivotX: number // hinge point at the top of the crease
  pivotY: number
}
const JAW_TOP_Y = 50 // jaws live below this row
const JAW_L: JawDef = { x0: 3.5, y0: 50, dx: 5, dy: 13, sign: 1, xMin: 0, xMax: 12, pivotX: 4, pivotY: 51 }
const JAW_R: JawDef = { x0: 42.5, y0: 50, dx: -5, dy: 13, sign: -1, xMin: 33, xMax: 45, pivotX: 42, pivotY: 51 }
const CLAW_MAX_ANGLE = 0.34 // radians (~19°) of swing per jaw at full open
const CLAW_HZ = 1.1 // open/close cycles per second
// The whole pedipalp (arm + claw) also swings outward from a shoulder pivot in
// time with the jaws, so the scorpion spreads its arms wider as it threatens.
// The arm/body cut is a short vertical line where the limb merges into the
// torso (rows 40-43); the pivot sits ON that cut so rotation barely disturbs
// the junction. The jaw layers are drawn inside the arm's rotated frame, so
// the claws ride along with the spread while still chomping.
interface ArmDef {
  bandXEnd: number // shoulder band (y 39-43): arm pixels up to/from this column
  lowXEnd: number // below the band (y 44+): claw region column bound
  sign: 1 | -1 // 1 = left arm (x <= bounds), -1 = right arm (x >= bounds)
  pivotX: number // shoulder hinge, centered on the vertical cut
  pivotY: number
}
const ARM_BAND_TOP = 39
const ARM_BAND_BOT = 43
const ARM_L: ArmDef = { bandXEnd: 16, lowXEnd: 12, sign: 1, pivotX: 17, pivotY: 41.5 }
const ARM_R: ArmDef = { bandXEnd: 29, lowXEnd: 33, sign: -1, pivotX: 29, pivotY: 41.5 }
const ARM_MAX_ANGLE = 0.18 // radians (~10°) of outward spread per arm

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

// True when sprite pixel (x,y) belongs to a claw's movable jaw: inside the
// claw's column band, below the claw top, and on the mouth side of the cut.
function inJaw(x: number, y: number, j: JawDef): boolean {
  if (y < JAW_TOP_Y || x < j.xMin || x > j.xMax) return false
  const cross = j.dy * (x + 0.5 - j.x0) - j.dx * (y + 0.5 - j.y0)
  return j.sign * cross > 0
}

// True when sprite pixel (x,y) belongs to an arm assembly (arm + claw palm),
// excluding the jaw, which is its own layer nested inside the arm's transform.
function inArm(x: number, y: number, arm: ArmDef): boolean {
  if (y < ARM_BAND_TOP) return false
  if (inJaw(x, y, arm.sign === 1 ? JAW_L : JAW_R)) return false
  const bound = y <= ARM_BAND_BOT ? arm.bandXEnd : arm.lowXEnd
  return arm.sign === 1 ? x <= bound : x >= bound
}

// Copy only the pixels passing `test` into a same-size transparent canvas, so
// the piece can be rotated while staying aligned to the full sprite's box.
function maskLayer(src: HTMLCanvasElement, test: (x: number, y: number) => boolean): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = src.width
  c.height = src.height
  const cx = c.getContext('2d')!
  cx.imageSmoothingEnabled = false
  cx.drawImage(src, 0, 0)
  const data = cx.getImageData(0, 0, c.width, c.height)
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      if (!test(x, y)) data.data[(y * c.width + x) * 4 + 3] = 0
    }
  }
  cx.putImageData(data, 0, 0)
  return c
}

const inAnyMoving = (x: number, y: number) =>
  inJaw(x, y, JAW_L) || inJaw(x, y, JAW_R) || inArm(x, y, ARM_L) || inArm(x, y, ARM_R)

// The full sprite with all moving pieces (arms + jaws) erased.
function bodyLayer(src: HTMLCanvasElement): HTMLCanvasElement {
  return maskLayer(src, (x, y) => !inAnyMoving(x, y))
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
          idleBody: HTMLCanvasElement // south sprite with arms + jaws removed
          armL: HTMLCanvasElement // left arm + claw palm (full-size layer)
          armR: HTMLCanvasElement // right arm + claw palm (full-size layer)
          clawL: HTMLCanvasElement // left claw's movable jaw only (full-size layer)
          clawR: HTMLCanvasElement // right claw's movable jaw only (full-size layer)
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

    // Draw one pedipalp: the arm layer rotated by `armAng` about the shoulder,
    // then the jaw layer rotated by `jawAng` about its own pivot INSIDE the
    // arm's already-rotated frame, so the claw rides along with the spread.
    function drawPedipalp(
      arm: HTMLCanvasElement,
      jaw: HTMLCanvasElement,
      dx: number,
      dy: number,
      w: number,
      h: number,
      apx: number,
      apy: number,
      armAng: number,
      jpx: number,
      jpy: number,
      jawAng: number,
    ) {
      ctx!.save()
      ctx!.translate(apx, apy)
      ctx!.rotate(armAng)
      ctx!.translate(-apx, -apy)
      ctx!.drawImage(arm, dx, dy, w, h)
      ctx!.translate(jpx, jpy)
      ctx!.rotate(jawAng)
      ctx!.translate(-jpx, -jpy)
      ctx!.drawImage(jaw, dx, dy, w, h)
      ctx!.restore()
    }

    // Held south pose after a tap: the body stays put while both pedipalps
    // spread outward from the shoulders and each claw's movable inner jaw
    // hinges open/closed along the mouth crease.
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
      const spread = open * ARM_MAX_ANGLE
      ctx!.drawImage(sheets.idleBody, dx, dy, w, h)
      // left arm spreads CW (outward-left), its jaw swings CCW; right mirrors
      drawPedipalp(
        sheets.armL, sheets.clawL, dx, dy, w, h,
        dx + ARM_L.pivotX * sx, dy + ARM_L.pivotY * sy, spread,
        dx + JAW_L.pivotX * sx, dy + JAW_L.pivotY * sy, -ang,
      )
      drawPedipalp(
        sheets.armR, sheets.clawR, dx, dy, w, h,
        dx + ARM_R.pivotX * sx, dy + ARM_R.pivotY * sy, -spread,
        dx + JAW_R.pivotX * sx, dy + JAW_R.pivotY * sy, ang,
      )
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
          armL: maskLayer(idle, (px, py) => inArm(px, py, ARM_L)),
          armR: maskLayer(idle, (px, py) => inArm(px, py, ARM_R)),
          clawL: maskLayer(idle, (px, py) => inJaw(px, py, JAW_L)),
          clawR: maskLayer(idle, (px, py) => inJaw(px, py, JAW_R)),
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
