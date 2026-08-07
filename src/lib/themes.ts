/**
 * Egg themes + runtime theming
 *
 * Each earned egg carries a palette; dropping it into the home fire re-themes
 * the site by writing CSS custom properties inline on <html> (inline style
 * beats the :root rules in index.css). The "default" theme is special: it
 * REMOVES the inline overrides so the stylesheet (scorp-ds token aliases)
 * stays the single source of truth for the site's stock look. That means
 * THEMES.default's accent/head/text literals are only used for egg art and
 * impact effects - if the scorp-ds tokens ever change, update them here too.
 *
 * Colors on ember/tide/dusk are the placeholder art-direction set from the
 * prototype spec; the contract is the variable structure (--accent, --hover,
 * --fire1/2/3, --fg, --body) and the Theme shape, not the hexes.
 */

export type EggId = 'ember' | 'tide' | 'dusk'
export type ThemeId = 'default' | EggId

export interface Theme {
  name: string
  base: string // egg fill
  mark: string // egg pattern color
  pattern: 'speckle' | 'stripe' | 'dot'
  accent: string // links / UI accent
  head: string // heading text
  text: string // body text
  fire: [string, string, string] // [bright, mid, dim] flame hues
}

// Eggs awarded at levels 1/2/3 (index = level - 1).
export const LEVEL_EGGS: EggId[] = ['ember', 'tide', 'dusk']

export const THEMES: Record<ThemeId, Theme> = {
  // Default mirrors the site's REAL stock values (index.css / scorp-ds dark),
  // not the prototype's grays. fire = representative hues pulled from
  // DEFAULT_FIRE_PALETTE below, used by the impact effects.
  default: {
    name: 'Sepia',
    base: '#f7f5f2',
    mark: '#bfb4a3',
    pattern: 'speckle',
    accent: '#f7f5f2',
    head: '#fdfcfb',
    text: '#bfb4a3',
    fire: ['#E0DACE', '#968A75', '#474030'],
  },
  ember: {
    name: 'Ember',
    base: '#e0563d',
    mark: '#8f2c1c',
    pattern: 'speckle',
    accent: '#f0623d',
    head: '#f3e8e2',
    text: '#cbb9b2',
    fire: ['#ffd2b0', '#ff6a35', '#a82310'],
  },
  tide: {
    name: 'Tide',
    base: '#22a89d',
    mark: '#bff7ef',
    pattern: 'stripe',
    accent: '#34c7bd',
    head: '#e6f2f0',
    text: '#b4c6c3',
    fire: ['#d4fff8', '#34d2c5', '#0e7d75'],
  },
  dusk: {
    name: 'Dusk',
    base: '#8a4ee6',
    mark: '#e9dcff',
    pattern: 'dot',
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
export const DEFAULT_FIRE_PALETTE = [
  'transparent', // 0: no fire
  '#0A0704', //  1: sepia-1000 (barely visible ember)
  '#120D09', //  2: sepia-975
  '#1A150F', //  3: sepia-950
  '#221E13', //  4: sepia-925 (dark ember)
  '#2B2718', //  5: sepia-900
  '#2B2718', //  6: sepia-900
  '#474030', //  7: sepia-800
  '#474030', //  8: sepia-800
  '#695F4D', //  9: sepia-700 (welcome dark drip - the flame body)
  '#695F4D', // 10: sepia-700
  '#968A75', // 11: sepia-600 (warm glow)
  '#BFB4A3', // 12: sepia-500 (welcome mid drip, hot tip)
  '#E0DACE', // 13: sepia-400 (rare white-hot sparkle)
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
