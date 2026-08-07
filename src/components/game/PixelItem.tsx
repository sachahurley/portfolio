/**
 * PixelItem, procedural pixel-art icons for loot and chests.
 *
 * Same architecture as PixelPortrait: a 12x12 cell grid on a canvas,
 * deterministic for a given seed. Each base type is a hand-authored
 * silhouette mask; the seed erodes edges and dithers shading so two items
 * of the same base still differ. Symmetric kinds are authored as 6-column
 * half-masks and mirrored on X; weapons use full-width masks (a mirrored
 * dagger reads as a blob). Rarity tints the body/shade tones and paints
 * the mask's accent cells (gems, blade edges, locks) in the pure tier
 * color. Deliberately independent of the active egg: loot never re-themes.
 */

import { useEffect, useRef } from 'react'
import { mix } from '../../lib/themes'
import { oneBitCanvas } from '../../lib/dither/oneBit'
import { RARITY_COLORS, type Rarity, type Slot } from '../../game/loot'

const N = 12

const OUTLINE = '#140F0A'
const BODY = '#C7B896'
const SHADE = '#8A784F'

function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

/* Masks: ' ' empty, '#' fill, '*' accent. 6-char rows are half-masks
   (mirrored); 12-char rows are full-width. Always 12 rows. */

const HELM_MASKS: string[][] = [
  // Cap
  ['      ', '     *', '   ###', '  ####', '  ####', ' #####', ' #####', '######', '      ', '      ', '      ', '      '],
  // Helm (eye slit)
  ['     *', '   ###', '  ####', ' #####', ' #####', ' ##  #', ' #####', ' #####', ' #####', '      ', '      ', '      '],
  // Crown
  ['      ', '     *', ' #  ##', ' #  ##', '######', '######', '##*###', '######', '      ', '      ', '      ', '      '],
]

const WEAPON_MASKS: string[][] = [
  // Dagger
  ['            ', '     **     ', '     *#     ', '     *#     ', '     *#     ', '     *#     ', '   ######   ', '     ##     ', '     ##     ', '    ####    ', '            ', '            '],
  // Sword
  ['     **     ', '     *#     ', '     *#     ', '     *#     ', '     *#     ', '     *#     ', '     *#     ', '  ########  ', '     ##     ', '     ##     ', '    ####    ', '            '],
  // Staff
  ['    ****    ', '   *####*   ', '   *####*   ', '    ****    ', '     ##     ', '     ##     ', '     ##     ', '     ##     ', '     ##     ', '     ##     ', '     ##     ', '            '],
]

const ARMOR_MASKS: string[][] = [
  // Tunic
  ['      ', '  ####', ' #####', ' #####', '   ###', '   ###', '   ###', '   ###', '      ', '      ', '      ', '      '],
  // Mail
  ['      ', '  ####', ' #####', ' #####', '   ###', '   ###', '   ###', '   ##*', '   ###', '   ###', '      ', '      '],
  // Plate
  ['      ', ' #####', '######', '######', ' #####', '  ####', '  ###*', '  ####', '  ####', '  ####', '      ', '      '],
]

const SHIELD_MASKS: string[][] = [
  // Buckler
  ['      ', '      ', '   ###', '  ####', '  ###*', '  ###*', '  ####', '   ###', '      ', '      ', '      ', '      '],
  // Kite Shield
  ['      ', ' #####', ' ####*', ' ####*', '  ####', '  ####', '   ###', '    ##', '     #', '      ', '      ', '      '],
  // Tower Shield
  ['      ', ' #####', ' #####', ' ####*', ' ####*', ' ####*', ' #####', ' #####', ' #####', '      ', '      ', '      '],
]

const RING_MASKS: string[][] = [
  // Band
  ['      ', '      ', '      ', '   ###', '  ##  ', '  #   ', '  #   ', '  ##  ', '   ###', '      ', '      ', '      '],
  // Signet
  ['      ', '      ', '     *', '    **', '   ###', '  ##  ', '  #   ', '  ##  ', '   ###', '      ', '      ', '      '],
  // Loop
  ['      ', '      ', '      ', '   ###', '  ####', '  ##  ', '  ##  ', '  ####', '   ###', '      ', '      ', '      '],
]

const BOOTS_MASKS: string[][] = [
  // Sandals
  ['      ', '      ', '      ', '      ', '      ', '      ', '   ## ', '   ## ', '  ### ', ' #####', '      ', '      '],
  // Boots
  ['      ', '      ', '      ', '   ## ', '   ## ', '   ## ', '   ## ', '   ## ', '  ### ', ' #### ', '      ', '      '],
  // Greaves
  ['      ', '   ###', '   ###', '   ##*', '   ###', '   ###', '   ###', '  ####', ' #####', '      ', '      ', '      '],
]

const CHEST_MASK: string[] = [
  '      ', '      ', '  ####', ' #####', ' #####', ' ####*', ' #####', ' #####', ' #####', '      ', '      ', '      ',
]

const MASKS: Record<Slot, string[][]> = {
  helm: HELM_MASKS,
  weapon: WEAPON_MASKS,
  armor: ARMOR_MASKS,
  shield: SHIELD_MASKS,
  ring: RING_MASKS,
  boots: BOOTS_MASKS,
}

function maskFor(kind: Slot | 'chest', base: number): string[] {
  if (kind === 'chest') return CHEST_MASK
  const set = MASKS[kind]
  return set[Math.min(Math.max(base, 0), set.length - 1)]
}

// 0 empty, 1 outline, 2 body, 3 shade, 5 accent
function itemCells(kind: Slot | 'chest', base: number, seed: number): Uint8Array {
  const g = new Uint8Array(N * N)
  const mask = maskFor(kind, base)
  const half = mask[0].length === 6
  for (let r = 0; r < N; r++) {
    const row = mask[r] ?? ''
    for (let c = 0; c < row.length; c++) {
      const ch = row[c]
      if (ch === ' ') continue
      const v = ch === '*' ? 5 : 2
      g[r * N + c] = v
      if (half) g[r * N + (N - 1 - c)] = v
    }
  }
  const filled = (rr: number, cc: number) =>
    rr >= 0 && rr < N && cc >= 0 && cc < N && g[rr * N + cc] !== 0
  // Seeded edge erosion: only cells backed by 3 filled orthogonal neighbours
  // may notch out, so thin lines (ring bands, blades) never disconnect.
  // Applied to the left half and mirrored to keep symmetric kinds symmetric.
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < (half ? N / 2 : N); c++) {
      const i = r * N + c
      if (g[i] !== 2) continue
      const n = [filled(r - 1, c), filled(r + 1, c), filled(r, c - 1), filled(r, c + 1)]
      const count = n.filter(Boolean).length
      if (count === 3 && rand(seed * 7.13 + i) < 0.18) {
        g[i] = 0
        if (half) g[r * N + (N - 1 - c)] = 0
      }
    }
  }
  // Shade dither on the lower interior (PixelPortrait's texture pass).
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const i = r * N + c
      if (g[i] !== 2) continue
      if (r > N / 2 && rand(seed * 3.7 + i) > 0.6) g[i] = 3
    }
  }
  // Outline where fill meets empty; accent cells stay accent.
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const i = r * N + c
      if (g[i] === 0 || g[i] === 5) continue
      if (!filled(r - 1, c) || !filled(r + 1, c) || !filled(r, c - 1) || !filled(r, c + 1)) {
        g[i] = 1
      }
    }
  }
  return g
}

export default function PixelItem({
  kind,
  base = 0,
  seed,
  rarity,
  cell = 4,
  className,
}: {
  kind: Slot | 'chest'
  /** Base-type index within the slot (0..2); ignored for 'chest'. */
  base?: number
  seed: number
  rarity: Rarity
  /** Screen pixels per grid cell (3 inventory, 4 slots, 8 reveal). */
  cell?: number
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const px = cell * Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = N * px
    canvas.height = N * px
    const tier = RARITY_COLORS[rarity]
    const colors: Record<number, string> = {
      1: OUTLINE,
      2: rarity === 'common' ? BODY : mix(BODY, tier, 0.3),
      3: rarity === 'common' ? SHADE : mix(SHADE, tier, 0.3),
      5: tier,
    }
    const g = itemCells(kind, base, seed)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const v = g[r * N + c]
        if (v === 0) continue
        ctx.fillStyle = colors[v]
        ctx.fillRect(c * px, r * px, px, px)
      }
    }
    // Strict 1-bit: shading survives as ink density; rarity lives in the
    // slot-ring chrome and the item card's text, not the icon itself.
    oneBitCanvas(ctx, canvas.width, canvas.height, px)
  }, [kind, base, seed, rarity, cell])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ width: N * cell, height: N * cell, imageRendering: 'pixelated', display: 'block' }}
    />
  )
}
