/**
 * Egg SVG generation — strict 1-bit.
 *
 * Pure string builders so one code path serves the egg track, the level-up
 * modal, and the imperative drag clone. Each egg is a flat silhouette in
 * its theme's base colour; the pattern marks are "holes" filled with the
 * page ground (var(--bg)), so every egg is exactly ink + ground — no
 * gradients, highlights, or shaded strokes. Every call mints fresh clip
 * IDs via a module counter - the prototype rendered the same egg in two
 * places with identical IDs and the second copy lost its fill, so unique
 * IDs are mandatory, not cosmetic.
 */

import { type Theme } from './themes'

// Shared egg outline (viewBox 0 0 64 82): a circle centered in the box so the
// track, ring, placeholder, and drag clone all stay in sync.
export const EGGPATH = 'M6 41 a26 26 0 1 0 52 0 a26 26 0 1 0 -52 0 Z'

// The pattern "ink" is the page ground: marks read as punched holes.
const HOLE = 'var(--bg, #0a0704)'

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
    return pts.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="${p[2]}" fill="${HOLE}"/>`).join('')
  }
  if (t.pattern === 'stripe') {
    return [24, 38, 52, 64]
      .map(
        (y) =>
          `<path d="M8 ${y} Q32 ${y - 6} 56 ${y}" stroke="${HOLE}" stroke-width="3" fill="none"/>`
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
  return rows.map((p) => `<circle cx="${p[0]}" cy="${p[1]}" r="2.4" fill="${HOLE}"/>`).join('')
}

/** A flat 1-bit egg: theme-base silhouette with ground-holes pattern. */
export function eggSVG(t: Theme, cls?: string): string {
  const u = `${t.name.toLowerCase()}-${++eggUid}`
  return `<svg class="${cls || ''}" viewBox="0 0 64 82" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <clipPath id="cl-${u}"><path d="${EGGPATH}"/></clipPath>
    </defs>
    <path d="${EGGPATH}" fill="${t.base}"/>
    <g clip-path="url(#cl-${u})">${patternMarks(t)}</g>
  </svg>`
}

/** Outline-only placeholder for an unearned level (colored via currentColor). */
export function eggPlaceholderSVG(cls?: string): string {
  return `<svg class="${cls || ''}" viewBox="0 0 64 82" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${EGGPATH}" fill="none" stroke="currentColor" stroke-width="2"/></svg>`
}
