/**
 * LoaderGallery — explorations beside the site's DotLoader on
 * /lab/dot-loader: dot-matrix loaders, strict 1-bit ones, text glyph
 * spinners, and a few in-context formats (inline, determinate, skeleton).
 *
 * The specs live in ./loaders; this file is the renderer. Every canvas
 * shares one requestAnimationFrame loop and leaves it while scrolled out
 * of view. Ink is the theme's --fg (and --accent for ACCENT cells), read
 * off the canvas and re-read when a banner re-themes <html>.
 * prefers-reduced-motion paints each loader once, as a still.
 */

import { useEffect, useRef, type ReactNode } from 'react'
import { bayerThreshold } from '../../lib/dither/oneBit'
import {
  ACCENT,
  DOTS,
  FORMATS,
  GLYPHS,
  INLINE_PULSE,
  makeFrame,
  ONE_BIT,
  type Frame,
  type GlyphSpec,
  type LoaderSpec,
} from './loaders'
import './LoaderGallery.css'

/* ---- one shared clock ---- */

const subs = new Set<(now: number) => void>()
let raf = 0
const loop = (now: number) => {
  subs.forEach((s) => s(now))
  raf = subs.size ? requestAnimationFrame(loop) : 0
}
function subscribe(s: (now: number) => void) {
  subs.add(s)
  if (!raf) raf = requestAnimationFrame(loop)
  return () => {
    subs.delete(s)
  }
}

/* ---- theme changes (banner gems write inline vars on <html>) ---- */

const themeSubs = new Set<() => void>()
let themeObserver: MutationObserver | null = null
function onTheme(s: () => void) {
  themeSubs.add(s)
  if (!themeObserver) {
    themeObserver = new MutationObserver(() => themeSubs.forEach((t) => t()))
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class'] })
  }
  return () => {
    themeSubs.delete(s)
  }
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Run `tick` on the shared clock while `el` is on screen; returns cleanup. */
function whileVisible(el: Element, tick: (now: number) => void) {
  let unsub: (() => void) | null = null
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !unsub) unsub = subscribe(tick)
    else if (!e.isIntersecting && unsub) {
      unsub()
      unsub = null
    }
  })
  io.observe(el)
  return () => {
    io.disconnect()
    unsub?.()
  }
}

/* ---- painting ---- */

interface Ink {
  fg: string
  accent: string
}

function readInk(el: Element): Ink {
  const s = getComputedStyle(el)
  return { fg: s.getPropertyValue('--fg').trim(), accent: s.getPropertyValue('--accent').trim() }
}

function paint(ctx: CanvasRenderingContext2D, spec: LoaderSpec, f: Frame, ink: Ink, dpr: number) {
  const P = spec.pitch * dpr
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  const round = spec.render === 'dot' || spec.render === 'bead'

  for (let i = 0; i < f.n; i++) {
    const v = f.v[i]
    const accent = v >= ACCENT
    if (round) {
      const cx = (f.x[i] + 0.5) * P
      const cy = (f.y[i] + 0.5) * P
      if (spec.ghost) {
        ctx.globalAlpha = spec.ghost
        ctx.fillStyle = ink.fg
        ctx.beginPath()
        ctx.arc(cx, cy, P * 0.32, 0, Math.PI * 2)
        ctx.fill()
      }
      if (v <= 0.01) continue
      const a = Math.min(v, 1)
      const r = spec.render === 'bead' ? P * 0.42 * (0.3 + 0.7 * a) : P * 0.32
      ctx.globalAlpha = spec.render === 'bead' ? 0.25 + 0.75 * a : a
      ctx.fillStyle = accent ? ink.accent : ink.fg
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()
    } else {
      const x = Math.round(f.x[i])
      const y = Math.round(f.y[i])
      const on = spec.render === 'pixel' ? v >= 0.5 : accent || v > bayerThreshold(x, y)
      if (!on) continue
      ctx.globalAlpha = 1
      ctx.fillStyle = accent ? ink.accent : ink.fg
      // Snap to device pixels so 1-bit cells never blur at fractional DPRs.
      const x0 = Math.round(x * P)
      const y0 = Math.round(y * P)
      ctx.fillRect(x0, y0, Math.round((x + 1) * P) - x0, Math.round((y + 1) * P) - y0)
    }
  }
  ctx.globalAlpha = 1
}

/* ---- pieces ---- */

export function MatrixLoader({ spec }: { spec: LoaderSpec }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const readoutRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const c = canvasRef.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return

    const dpr = window.devicePixelRatio || 1
    c.width = Math.round(spec.w * spec.pitch * dpr)
    c.height = Math.round(spec.h * spec.pitch * dpr)

    const f = makeFrame(spec)
    const write = spec.setup(f)
    let ink = readInk(c)
    const draw = (t: number) => {
      write(t)
      paint(ctx, spec, f, ink, dpr)
      if (spec.readout && readoutRef.current) readoutRef.current.textContent = spec.readout(t)
    }
    const offTheme = onTheme(() => {
      ink = readInk(c)
      paint(ctx, spec, f, ink, dpr)
    })

    if (reducedMotion()) {
      draw(spec.still ?? 1.3)
      return offTheme
    }

    draw(0)
    const start = performance.now()
    let lastStep = 0
    const tick = (now: number) => {
      const t = (now - start) / 1000
      if (!spec.fps) return draw(t)
      const step = Math.floor(t * spec.fps)
      if (step === lastStep) return
      lastStep = step
      draw(step / spec.fps)
    }

    const offTicks = whileVisible(c, tick)
    return () => {
      offTicks()
      offTheme()
    }
  }, [spec])

  return (
    <>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`${spec.name} loader`}
        style={{ width: spec.w * spec.pitch, height: spec.h * spec.pitch }}
      />
      {spec.readout && <span ref={readoutRef} className="ldr-readout" aria-hidden="true" />}
    </>
  )
}

function Glyph({ spec }: { spec: GlyphSpec }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return
    const start = performance.now()
    let last = -1
    const tick = (now: number) => {
      const k = Math.floor((now - start) / spec.ms) % spec.frames.length
      if (k === last) return
      last = k
      el.textContent = spec.frames[k]
    }
    return whileVisible(el, tick)
  }, [spec])

  return (
    <figure className="ldr-tile">
      <div className="ldr-stage short">
        <span ref={ref} className="ldr-glyph" aria-hidden="true">
          {spec.frames[0]}
        </span>
      </div>
      <figcaption className="ldr-cap">
        <span className="ldr-name">{spec.name}</span>
      </figcaption>
    </figure>
  )
}

function Tile({ name, note, children }: { name: string; note: string; children: ReactNode }) {
  return (
    <figure className="ldr-tile">
      <div className="ldr-stage">{children}</div>
      <figcaption className="ldr-cap">
        <span className="ldr-name">{name}</span>
        <span className="ldr-note">{note}</span>
      </figcaption>
    </figure>
  )
}

function Section({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <section className="ldr-sec">
      <div className="label">{title}</div>
      <p className="ldr-intro">{intro}</p>
      {children}
    </section>
  )
}

export default function LoaderGallery() {
  return (
    <div className="ldr">
      <Section title="Dots" intro="Round ink, opacity and size doing the work. Grids, rings, waves and a couple of 3D point clouds.">
        <div className="ldr-grid">
          {DOTS.map((s) => (
            <Tile key={s.id} name={s.name} note={s.note}>
              <MatrixLoader spec={s} />
            </Tile>
          ))}
        </div>
      </Section>

      <Section title="1-bit" intro="Square pixels, one ink, no alpha. Mid tones only exist as Bayer dither density, same as the rest of the site.">
        <div className="ldr-grid">
          {ONE_BIT.map((s) => (
            <Tile key={s.id} name={s.name} note={s.note}>
              <MatrixLoader spec={s} />
            </Tile>
          ))}
        </div>
      </Section>

      <Section title="Glyphs" intro="No canvas at all: frames of text in the mono face, for terminals and anywhere a character fits.">
        <div className="ldr-grid">
          {GLYPHS.map((g) => (
            <Glyph key={g.name} spec={g} />
          ))}
        </div>
      </Section>

      <Section title="Formats" intro="The same ideas in context: on a line of text, measuring real progress, and holding a layout's place.">
        <div className="ldr-grid wide">
          <Tile name={INLINE_PULSE.name} note={INLINE_PULSE.note}>
            <span className="ldr-inline">
              <MatrixLoader spec={INLINE_PULSE} />
              fetching quests
            </span>
          </Tile>
          {FORMATS.map((s) => (
            <Tile key={s.id} name={s.name} note={s.note}>
              <MatrixLoader spec={s} />
            </Tile>
          ))}
        </div>
      </Section>
    </div>
  )
}
