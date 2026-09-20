/**
 * Gem themes + runtime theming
 *
 * Each earned gem carries a palette; dropping it into the home fire re-themes
 * the site by writing CSS custom properties inline on <html> (inline style
 * beats the :root rules in index.css). The "default" theme is special: it
 * REMOVES the inline overrides so the stylesheet (scorp-ds token aliases)
 * stays the single source of truth for the site's stock look. The default
 * theme's colors (used for gem art and impact effects, which need concrete
 * hex strings for canvas) are READ from the scorp-ds CSS variables at
 * access time via cssVar(), so a DS token change flows through without a
 * manual mirror update; the literals remain only as last-resort fallbacks.
 *
 * Colors on ember/tide/dusk are the placeholder art-direction set from the
 * prototype spec; the contract is the variable structure (--accent, --hover,
 * --fire1/2/3, --fg, --body) and the Theme shape, not the hexes.
 */

export type GemId = 'ember' | 'tide' | 'dusk'
export type ThemeId = 'default' | GemId

export interface Theme {
  name: string
  accent: string // links / UI accent
  head: string // heading text
  text: string // body text
  fire: [string, string, string] // [bright, mid, dim] flame hues
}

// Gems awarded at levels 1/2/3 (index = level - 1).
export const LEVEL_GEMS: GemId[] = ['ember', 'tide', 'dusk']

/**
 * Read a scorp-ds CSS custom property, falling back to the given hex when
 * the variable is unavailable (tests, or a token rename upstream). Canvas
 * art needs concrete color strings, so this resolves the var to its value.
 */
function cssVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

export const THEMES: Record<ThemeId, Theme> = {
  // Default mirrors the site's REAL stock values (scorp-ds dark). Getters
  // resolve the DS tokens lazily (at gem-art/impact time, when tokens.css
  // is guaranteed loaded) instead of mirroring hexes that drift.
  default: {
    name: 'Sepia',
    get accent() { return cssVar('--color-amber-gold', '#e0a26a') },
    get head() { return cssVar('--color-sepia-50', '#fdfcfb') },
    get text() { return cssVar('--color-sepia-500', '#bfb4a3') },
    get fire(): [string, string, string] {
      return [
        cssVar('--color-sepia-400', '#E0DACE'),
        cssVar('--color-sepia-600', '#968A75'),
        cssVar('--color-sepia-800', '#474030'),
      ]
    },
  },
  ember: {
    name: 'Ember',
    accent: '#f0623d',
    head: '#f3e8e2',
    text: '#cbb9b2',
    fire: ['#ffd2b0', '#ff6a35', '#a82310'],
  },
  tide: {
    name: 'Tide',
    accent: '#34c7bd',
    head: '#e6f2f0',
    text: '#b4c6c3',
    fire: ['#d4fff8', '#34d2c5', '#0e7d75'],
  },
  dusk: {
    name: 'Dusk',
    accent: '#b07cf2',
    head: '#ece6f4',
    text: '#c0b9cb',
    fire: ['#ecdcff', '#a567f2', '#5a2da0'],
  },
}

/* ---- color helpers ---- */

function channels(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)]
}

function toHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.min(255, Math.max(0, Math.round(n))).toString(16).padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}

/** Clamp-add `amt` to each RGB channel (negative darkens). */
export function shade(hex: string, amt: number): string {
  const [r, g, b] = channels(hex)
  return toHex(r + amt, g + amt, b + amt)
}

/** Linear blend from `a` to `b` by t in [0,1]. */
export function mix(a: string, b: string, t: number): string {
  const ca = channels(a)
  const cb = channels(b)
  return toHex(ca[0] + (cb[0] - ca[0]) * t, ca[1] + (cb[1] - ca[1]) * t, ca[2] + (cb[2] - ca[2]) * t)
}

/* ---- doom-fire palettes ---- */

// The stock palette - index is flame intensity, 0 = no fire. The whole
// ramp runs the sepia scale; the flame mass sits in the DARK sepias
// (800-600), cresting at 500/400, so the fire reads as embers in the
// welcome asset's register rather than a bright blaze.
// Resolved from the scorp-ds sepia tokens at module load (tokens.css is
// imported before the app tree in main.tsx); hexes are fallbacks only.
export const DEFAULT_FIRE_PALETTE = [
  'transparent', // 0: no fire
  cssVar('--color-sepia-1000', '#0A0704'), //  1: barely visible ember
  cssVar('--color-sepia-975', '#120D09'), //  2
  cssVar('--color-sepia-950', '#1A150F'), //  3
  cssVar('--color-sepia-925', '#221E13'), //  4: dark ember
  cssVar('--color-sepia-900', '#2B2718'), //  5
  cssVar('--color-sepia-900', '#2B2718'), //  6
  cssVar('--color-sepia-800', '#474030'), //  7
  cssVar('--color-sepia-800', '#474030'), //  8
  cssVar('--color-sepia-700', '#695F4D'), //  9: welcome dark drip - the flame body
  cssVar('--color-sepia-700', '#695F4D'), // 10
  cssVar('--color-sepia-600', '#968A75'), // 11: warm glow
  cssVar('--color-sepia-500', '#BFB4A3'), // 12: welcome mid drip, hot tip
  cssVar('--color-sepia-400', '#E0DACE'), // 13: rare white-hot sparkle
]

// Intensity -> color anchors for generated theme palettes, chosen so the
// default theme's hues would land close to DEFAULT_FIRE_PALETTE. Tunable.
const RAMP_ANCHORS: Array<[number, (f: [string, string, string]) => string]> = [
  [1, (f) => mix(f[2], '#000000', 0.85)],
  [5, (f) => mix(f[2], '#000000', 0.45)],
  [8, (f) => f[2]],
  [10, (f) => f[1]],
  [12, (f) => f[0]],
  [13, (f) => mix(f[0], '#ffffff', 0.45)],
]

/** 14-entry doom-fire palette interpolated from a theme's three flame hues. */
export function buildFirePalette(fire: [string, string, string]): string[] {
  const anchors = RAMP_ANCHORS.map(([i, fn]) => [i, fn(fire)] as [number, string])
  const out: string[] = ['transparent']
  for (let i = 1; i <= 13; i++) {
    let lo = anchors[0]
    let hi = anchors[anchors.length - 1]
    for (const a of anchors) {
      if (a[0] <= i) lo = a
      if (a[0] >= i) {
        hi = a
        break
      }
    }
    out.push(lo[0] === hi[0] ? lo[1] : mix(lo[1], hi[1], (i - lo[0]) / (hi[0] - lo[0])))
  }
  return out
}

/** Palette for the canvas fires: stock art for default, generated otherwise. */
export function firePaletteFor(id: ThemeId): string[] {
  return id === 'default' ? DEFAULT_FIRE_PALETTE : buildFirePalette(THEMES[id].fire)
}

/* ---- theme application (the cascade) ---- */

let pending: number[] = []

/**
 * Re-theme the site: fire vars snap immediately, --accent follows at +240ms,
 * heading/body text at +480ms (the .55s color transition in minimal.css makes
 * the staggered writes animate). Clears its own pending timers so rapid
 * consecutive drops can't interleave stale writes.
 */
export function applyTheme(id: ThemeId) {
  pending.forEach(clearTimeout)
  pending = []
  const t = THEMES[id]
  const st = document.documentElement.style
  st.setProperty('--fire1', t.fire[0])
  st.setProperty('--fire2', t.fire[1])
  st.setProperty('--fire3', t.fire[2])
  const set = (k: string, v: string) =>
    id === 'default' ? st.removeProperty(k) : st.setProperty(k, v)
  pending.push(
    window.setTimeout(() => {
      set('--accent', t.accent)
      // hover tint follows the accent (near-black); default falls back to the
      // stock sepia --surface-muted alias in index.css
      set('--hover', mix(t.accent, '#000000', 0.85))
    }, 240)
  )
  pending.push(
    window.setTimeout(() => {
      set('--fg', t.head)
      set('--body', t.text)
    }, 480)
  )
}
