/**
 * Seeded RPG name generator — the visitor's random default character name.
 *
 * Deterministic for a given seed (same hash pattern as PixelStoneBorder's
 * terrain: frac(sin(seed) * big)). Names are two joined syllables plus an
 * occasional epithet, e.g. "Fenwick", "Morrow the Bold". Kept short enough
 * for the character strip; always editable by the visitor.
 */

const FIRST = ['Fen', 'Bram', 'Wick', 'Tor', 'Ash', 'Mor', 'Rook', 'Hazel', 'Ors', 'Ged', 'Tam', 'Isol']
const SECOND = ['wick', 'row', 'dan', 'ric', 'wyn', 'fell', 'ley', 'mund', 'a', 'is', 'grim', 'net']
const EPITHET = ['the Bold', 'the Quiet', 'the Curious', 'of the Vale', 'the Wanderer', 'the Unread', 'Halfboot', 'the Patient']

function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export function generateName(seed: number): string {
  const first = FIRST[Math.floor(rand(seed + 1) * FIRST.length)]
  const second = SECOND[Math.floor(rand(seed + 2) * SECOND.length)]
  const base = first + second
  // Roughly half the names carry an epithet.
  if (rand(seed + 3) < 0.5) {
    return `${base} ${EPITHET[Math.floor(rand(seed + 4) * EPITHET.length)]}`
  }
  return base
}

/** A fresh random seed (only place randomness enters; everything downstream
 *  of the stored seed is deterministic). */
export function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31)
}
