/**
 * Parlor loot (spec §6.4): a new item family, not equipment slots.
 * Chests earned from tarot: award keys (streaks, rare pulls) open here
 * in the parlor and roll this table instead of gear. Same architecture
 * as game/loot.ts: only {id, kind, base, rarity} persists (inside
 * sh_tarot_parlor) and everything display-facing derives from the id at
 * render time.
 *
 * Kinds and what equipping does:
 *  - back  (1 slot): cosmetic; re-tints the deck's card backs.
 *  - prop  (3 slots): visible on the Reader's table (TarotScene).
 *  - voice (1 slot): an alternate Reader register, layered over the gem
 *    mood server-side (api/_lib/parlor.ts knows the keys).
 *  - charm (1 slot): one mechanical perk at a time: clarifier (pull one
 *    clarifying card after a reading), patience (+2 questions, enforced
 *    inside the signed counter, server-capped), balance (choose the
 *    deck's reversal temper).
 */

import { hashString, type Rarity } from '../../game/loot'

export type ParlorKind = 'back' | 'prop' | 'voice' | 'charm'
export const PARLOR_KINDS: ParlorKind[] = ['back', 'prop', 'voice', 'charm']

export interface ParlorSavedItem {
  id: number
  kind: ParlorKind
  /** Base-type index within the kind. */
  base: number
  rarity: Rarity
}

export interface ParlorItem extends ParlorSavedItem {
  /** Stable base key ('crone', 'patience', ...) the effects key off. */
  key: string
  name: string
  baseName: string
  desc: string
}

export const PARLOR_SLOTS: Record<ParlorKind, number> = { back: 1, prop: 3, voice: 1, charm: 1 }

export const PARLOR_KIND_LABELS: Record<ParlorKind, string> = {
  back: 'Card back',
  prop: 'Table prop',
  voice: 'Voice',
  charm: 'Charm',
}

interface BaseDef {
  key: string
  name: string
  desc: string
  /** Cosmetic payload: card-back tint for backs, Urizen [col,row] for props. */
  tint?: string
  cell?: readonly [number, number]
}

/** Cells are hardcoded (like game/tarotTiles.ts) so the 5k tile index
 *  stays out of the bundle; ids noted for re-derivation via /dev/tiles. */
export const PARLOR_BASES: Record<ParlorKind, BaseDef[]> = {
  back: [
    { key: 'moonlit', name: 'Moonlit back', desc: 'The deck wears a cold silver.', tint: '#9fb7e8' },
    { key: 'embered', name: 'Embered back', desc: 'The deck warms to coal-glow.', tint: '#e8956f' },
    { key: 'verdant', name: 'Verdant back', desc: 'The deck goes moss and fern.', tint: '#8fc27a' },
    { key: 'rosewater', name: 'Rosewater back', desc: 'The deck blushes faintly.', tint: '#e89fc0' },
  ],
  prop: [
    { key: 'candle', name: 'Second candle', desc: 'One more small light for the table.', cell: [30, 22] }, // props/light/candle_stub
    { key: 'cat', name: 'Parlor cat', desc: 'It was here before you. It will remain.', cell: [0, 14] }, // creatures/animal/cat
    { key: 'skull', name: 'Companion skull', desc: 'A previous querent, she says. A joke, she says.', cell: [1, 38] }, // items/bone/skull
    { key: 'bell', name: 'Little bell', desc: 'Rung only when something true is said.', cell: [36, 25] }, // props/misc/bell
    { key: 'scroll', name: 'Curled scroll', desc: 'Notes from sittings long concluded.', cell: [0, 37] }, // items/paper/scroll
    { key: 'vial', name: 'Dusk vial', desc: 'Never opened. Never explained.', cell: [26, 4] }, // items/potion/vial_purple
  ],
  voice: [
    { key: 'crone', name: 'Voice of the crone', desc: 'Blunt and spare; kind underneath.' },
    { key: 'sibyl', name: 'Voice of the sibyl', desc: 'Lyrical; all omens and weather.' },
    { key: 'archivist', name: 'Voice of the archivist', desc: 'Precise; the deck cited like a text.' },
    { key: 'wanderer', name: 'Voice of the wanderer', desc: 'Warm and road-worn; plain-spoken.' },
  ],
  charm: [
    { key: 'clarifier', name: 'The clarifier', desc: 'Pull one clarifying card after any reading.' },
    { key: 'patience', name: 'The patience charm', desc: 'The audience runs two questions longer.' },
    { key: 'balance', name: 'The balance charm', desc: "Set the deck's reversal temper." },
  ],
}

/* ---- seeded rolls (same universal PRNG as game/loot.ts) ---- */

function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

// Kind weights out of 100: props are common table dressing, charms rare.
const KIND_CUM: Array<[ParlorKind, number]> = [
  ['prop', 40],
  ['back', 65],
  ['voice', 85],
  ['charm', 100],
]

// Same tier odds as gear: common 50, magic 30, rare 15, unique 5.
const RARITY_CUM: Array<[Rarity, number]> = [
  ['common', 50],
  ['magic', 80],
  ['rare', 95],
  ['unique', 100],
]

export function rollParlorItem(seed: number): ParlorSavedItem {
  const k = rand(seed + 13) * 100
  const kind = (KIND_CUM.find(([, cum]) => k < cum) ?? KIND_CUM[0])[0]
  const base = Math.floor(rand(seed + 29) * PARLOR_BASES[kind].length)
  const r = rand(seed + 41) * 100
  const rarity = (RARITY_CUM.find(([, cum]) => r < cum) ?? RARITY_CUM[3])[0]
  return { id: hashString(`parlor:${seed}`), kind, base, rarity }
}

// Affix voice tuned to the parlor's register.
const PREFIXES = ['Waxen', 'Moonlit', 'Whispering', 'Velvet', 'Smoke-sweet', 'Patient']
const SUFFIXES = [
  'of the parlor',
  'of low candles',
  'of the hush',
  'of second sight',
  'of the small hours',
  'of good omen',
]
const UNIQUE_NAMES = ["The Reader's Own", 'Last Candle', 'The Quiet Bell', 'Moth and Flame']

/** Derive display fields from the persisted record. Pure, deterministic. */
export function resolveParlorItem(saved: ParlorSavedItem): ParlorItem {
  const { id, kind, base, rarity } = saved
  const def = PARLOR_BASES[kind][base] ?? PARLOR_BASES[kind][0]
  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
  const lower = def.name.toLowerCase()

  let name = def.name
  if (rarity === 'magic') {
    name = cap(
      rand(id + 5) < 0.5
        ? `${PREFIXES[Math.floor(rand(id + 6) * PREFIXES.length)]} ${lower}`
        : `${lower} ${SUFFIXES[Math.floor(rand(id + 7) * SUFFIXES.length)]}`,
    )
  } else if (rarity === 'rare') {
    name = cap(
      `${PREFIXES[Math.floor(rand(id + 6) * PREFIXES.length)]} ${lower} ${
        SUFFIXES[Math.floor(rand(id + 7) * SUFFIXES.length)]
      }`,
    )
  } else if (rarity === 'unique') {
    name = `${UNIQUE_NAMES[Math.floor(rand(id + 8) * UNIQUE_NAMES.length)]} (${def.name.toLowerCase()})`
  }

  return { ...saved, key: def.key, name, baseName: def.name, desc: def.desc }
}

/** The base definition behind an item (tint, prop cell). */
export function parlorBaseDef(saved: ParlorSavedItem): BaseDef {
  return PARLOR_BASES[saved.kind][saved.base] ?? PARLOR_BASES[saved.kind][0]
}
