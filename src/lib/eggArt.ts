/**
 * Egg SVG generation
 *
 * Pure string builders so one code path serves the egg track, the level-up
 * modal, and the imperative drag clone. Every call mints fresh gradient/clip
 * IDs via a module counter - the prototype rendered the same egg in two
 * places with identical IDs and the second copy lost its fill, so unique IDs
 * are mandatory, not cosmetic.
 */

import { shade, type Theme } from './themes'

// Shared egg outline (viewBox 0 0 64 82): a circle centered in the box so the
// track, ring, placeholder, and drag clone all stay in sync.
export const EGGPATH = 'M6 41 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0 Z'

let eggUid = 0

function patternMarks(t: Theme): string {
  if (t.pattern === 'speckle') {
    const pts: Array<[number, number, number]> = [
      [22, 28, 3],
      [40, 22, 2.4],
      [44, 40, 3.2],
      [24, 46, 2.6],
      [36, 54, 3],
      [20, 62, 2.2],
      [46, 58, 2.6],
    ]
    return pts.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" fill="${t.mark}"/>`).join('')
  }
  if (t.pattern === 'stripe') {
    return [24, 38, 52, 64]
      .map(
        (y) =>
          `<path d="M8 ${y} Q32 ${y - 6} 56 ${y}" stroke="${t.mark}" stroke-width="3" fill="none" opacity=".85"/>`
      )
      .join('')
  }
  const rows: Array<[number, number]> = [
    [18, 26],
    [30, 22],
    [42, 26],
    [22, 40],
    [34, 38],
    [46, 40],
    [26, 54],
    [38, 54],
    [30, 66],
  ]
  return rows.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="2.4" fill="${t.mark}"/>`).join('')
}

/** A colored, patterned egg. `cls` lands on the <svg> for sizing. */
export function eggSVG(t: Theme, cls?: string): string {
  const u = `${t.name.toLowerCase()}-${++eggUid}`
  return `<svg class="${cls || ''}" viewBox="0 0 64 82" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <clipPath id="cl-${u}"><path d="${EGGPATH}"/></clipPath>
      <linearGradient id="g-${u}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${shade(t.base, 18)}"/><stop offset="1" stop-color="${shade(t.base, -12)}"/>
      </linearGradient>
    </defs>
    <path d="${EGGPATH}" fill="url(#g-${u})"/>
    <g clip-path="url(#cl-${u})">${patternMarks(t)}</g>
    <ellipse cx="24" cy="32" rx="8" ry="10" fill="#fff" opacity=".14"/>
    <path d="${EGGPATH}" fill="none" stroke="${shade(t.base, -22)}" stroke-width="1.5"/>
  </svg>`
}

/** Outline-only placeholder for an unearned level (colored via currentColor). */
export function eggPlaceholderSVG(cls?: string): string {
  return `<svg class="${cls || ''}" viewBox="0 0 64 82" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${EGGPATH}" fill="none" stroke="currentColor" stroke-width="2"/></svg>`
}
