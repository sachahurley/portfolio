/**
 * Impact effects for the egg-into-fire drop.
 *
 * Imperative, transient DOM appended to <body> and removed on timers - these
 * are fire-and-forget particles that React never needs to reconcile. The
 * fourth spec effect (fireSurge) is the canvas surge in ProgressFire. All of
 * it no-ops under prefers-reduced-motion.
 */

import type { Theme } from './themes'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** 34 glowing squares scattering up and out of the impact point. */
function emberBurst(cx: number, cy: number, colors: [string, string, string]) {
  for (let i = 0; i < 34; i++) {
    const d = document.createElement('div')
    d.className = 'ember'
    const size = 4 + Math.random() * 7
    d.style.width = `${size}px`
    d.style.height = `${size}px`
    d.style.left = `${cx + (Math.random() - 0.5) * 200}px`
    d.style.top = `${cy + (Math.random() - 0.5) * 30}px`
    d.style.background = colors[Math.floor(Math.random() * 3)]
    document.body.appendChild(d)
    // double rAF so the start position paints before the transition kicks in
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const ang = ((-90 + (Math.random() - 0.5) * 102) * Math.PI) / 180
        const dist = 80 + Math.random() * 170
        d.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`
        d.style.opacity = '0'
      })
    )
    setTimeout(() => d.remove(), 950)
  }
}

/** A radial flash at the impact point, scaling .3 -> 3.4 while fading. */
function impactFlash(cx: number, cy: number, color: string) {
  const d = document.createElement('div')
  d.className = 'flash'
  d.style.left = `${cx - 35}px`
  d.style.top = `${cy - 35}px`
  d.style.background = `radial-gradient(circle, ${color}, transparent 70%)`
  d.style.transform = 'scale(.3)'
  document.body.appendChild(d)
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      d.style.transform = 'scale(3.4)'
      d.style.opacity = '0'
    })
  )
  setTimeout(() => d.remove(), 640)
}

/** A full-screen accent wash: 0 -> .16 fast, then a slow fade out. */
function pagePulse(color: string) {
  const d = document.createElement('div')
  d.className = 'pulse'
  d.style.background = color
  document.body.appendChild(d)
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      d.style.transition = 'opacity .09s ease'
      d.style.opacity = '.16'
    })
  )
  setTimeout(() => {
    d.style.transition = 'opacity .5s ease'
    d.style.opacity = '0'
  }, 90)
  setTimeout(() => d.remove(), 640)
}

/** The whole impact moment, anchored to the fire band. */
export function runImpact(fireWrap: HTMLElement, theme: Theme) {
  if (reduced()) return
  const r = fireWrap.getBoundingClientRect()
  const cx = r.left + r.width / 2
  emberBurst(cx, r.bottom - 40, theme.fire)
  impactFlash(cx, r.bottom - 46, theme.fire[1])
  pagePulse(theme.accent)
}
