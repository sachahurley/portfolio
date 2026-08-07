/**
 * Loot domain, chests, the loot table, and procedural items.
 *
 * An item's identity is a seed: only {id, slot, base, rarity} is persisted
 * and everything display-facing (name, stats, icon variation) derives from
 * the id at render time, so the save file stays tiny. slot/base/rarity are
 * stored rather than derived so equipment references can never corrupt if
 * the derivation logic is ever tuned; names and stats are flavor and may
 * drift across versions without breaking anything.
 *
 * Chests store only {id, src}: the item inside is rolled from the chest id
 * when opened. The seed is fixed at drop time, so refreshing can never
 * re-roll a chest, but the save carries no dead item records.
 */

import { mix, shade } from '../lib/themes'

export type Slot = 'helm' | 'weapon' | 'armor' | 'shield' | 'ring' | 'boots'
export const SLOTS: Slot[] = ['helm', 'weapon', 'armor', 'shield', 'ring', 'boots']

export type Rarity = 'common' | 'magic' | 'rare' | 'unique'
export const RARITIES: Rarity[] = ['common', 'magic', 'rare', 'unique']

/** Persisted item: the minimal identity record. */
export interface SavedItem {
  id: number
  slot: Slot
  /** Base-type index within the slot (0..2). */
  base: number
  rarity: Rarity
}

/** Persisted unopened chest. `src` is the provenance dedup key
 *  ('note:slug', 'level:2'), used for microcopy and reconciliation. */
export interface SavedChest {
  id: number
  src: string
}

export type StatId = 'vigor' | 'wit' | 'craft' | 'lore' | 'luck' | 'moxie'
export const STAT_IDS: StatId[] = ['vigor', 'wit', 'craft', 'lore', 'luck', 'moxie']
export const STAT_NAMES: Record<StatId, string> = {
  vigor: 'Vigor',
  wit: 'Wit',
  craft: 'Craft',
  lore: 'Lore',
  luck: 'Luck',
  moxie: 'Moxie',
}

/** Runtime item: the saved record plus everything derived from the id. */
export interface Item extends SavedItem {
  name: string
  baseName: string
  stats: Partial<Record<StatId, number>>
}

/* ---- the loot table ---- */

export const BASES: Record<Slot, string[]> = {
  helm: ['Cap', 'Helm', 'Crown'],
  weapon: ['Dagger', 'Sword', 'Staff'],
  armor: ['Tunic', 'Mail', 'Plate'],
  shield: ['Buckler', 'Kite Shield', 'Tower Shield'],
  ring: ['Band', 'Signet', 'Loop'],
  boots: ['Sandals', 'Boots', 'Greaves'],
}

export const SLOT_LABELS: Record<Slot, string> = {
  helm: 'helm',
  weapon: 'weapon',
  armor: 'armor',
  shield: 'shield',
  ring: 'ring',
  boots: 'boots',
}

// Diablo-style tier colors. These are deliberately NOT tied to the egg/theme
// system (--accent belongs to the active banner); loot never re-themes.
export const RARITY_COLORS: Record<Rarity, string> = {
  common: '#dcd8cc',
  magic: '#7f8ff5',
  rare: '#e8d44d',
  unique: '#c7883d',
}

export const RARITY_LABELS: Record<Rarity, string> = {
  common: 'common',
  magic: 'magic',
  rare: 'rare',
  unique: 'unique',
}

// Cumulative weights out of 100: common 50, magic 30, rare 15, unique 5.
const RARITY_CUM: Array<[Rarity, number]> = [
  ['common', 50],
  ['magic', 80],
  ['rare', 95],
  ['unique', 100],
]

/** Stat count and per-stat roll range by tier. */
const RARITY_STATS: Record<Rarity, { count: number; min: number; max: number }> = {
  common: { count: 1, min: 1, max: 3 },
  magic: { count: 2, min: 2, max: 5 },
  rare: { count: 3, min: 3, max: 7 },
  unique: { count: 4, min: 5, max: 9 },
}

// Affix voice matches the character-name epithets in names.ts.
const PREFIXES = [
  'Keen', 'Sturdy', 'Gleaming', 'Weathered', 'Deft', 'Patient',
  'Curious', 'Gilded', 'Quiet', 'Stubborn', 'Fabled', 'Homespun',
]
const SUFFIXES = [
  'of the Fox', 'of Long Nights', 'of the Vale', 'of Shipping',
  'of the Unread', 'of Quiet Craft', 'of the Wanderer', 'of Second Drafts',
  'of Small Wins', 'of the Backlog', 'of Fresh Eyes', 'of the Deep Dive',
]
const UNIQUE_NAMES = [
  "Deadline's Bane", 'The Patient Hand', 'Scope Creep', 'Vale-Warden',
  'The Long Draft', 'First Light', 'The Unshipped', 'Kind Regards',
]

/* ---- seeded rolls (the site's universal PRNG, same as names.ts) ---- */

function rand(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

/** djb2 over chars, kept positive and 31-bit. */
export function hashString(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0
  return Math.abs(h) % 2147483647
}

/** Which dedup keys are chest-eligible: first-time content interactions.
 *  Deliberately excludes visit: (arrivals stay clean narrative beats) and
 *  follow (rewarding an external link with loot feels transactional). */
export function isChestKey(key: string): boolean {
  return /^(project|questdone|note|lab):/.test(key)
}

/** Chance a chest drops alongside a first-time interaction. */
export const DROP_RATE = 0.35

/** Deterministic per save + key: the same visitor always gets the same
 *  drops, but different visitors get chests from different content. */
export function chestChance(key: string, lootSeed: number): boolean {
  return rand((hashString(key) ^ lootSeed) >>> 0) < DROP_RATE
}

/** The chest's item-roll seed, fixed at drop time. */
export function chestSeedFor(key: string, lootSeed: number): number {
  return hashString(`chest:${key}:${lootSeed}`)
}

/* ---- rolling and resolving items ---- */

export function rollItem(seed: number): SavedItem {
  const slot = SLOTS[Math.floor(rand(seed + 11) * SLOTS.length)]
  const base = Math.floor(rand(seed + 23) * BASES[slot].length)
  const r = rand(seed + 37) * 100
  const rarity = (RARITY_CUM.find(([, cum]) => r < cum) ?? RARITY_CUM[3])[0]
  return { id: hashString(`item:${seed}`), slot, base, rarity }
}

/** Derive name and stats from the persisted record. Pure and deterministic. */
export function resolveItem(saved: SavedItem): Item {
  const { id, slot, base, rarity } = saved
  const baseName = BASES[slot][base] ?? BASES[slot][0]

  let name = baseName
  if (rarity === 'magic') {
    name = rand(id + 5) < 0.5
      ? `${PREFIXES[Math.floor(rand(id + 6) * PREFIXES.length)]} ${baseName}`
      : `${baseName} ${SUFFIXES[Math.floor(rand(id + 7) * SUFFIXES.length)]}`
  } else if (rarity === 'rare') {
    name = `${PREFIXES[Math.floor(rand(id + 6) * PREFIXES.length)]} ${baseName} ${SUFFIXES[Math.floor(rand(id + 7) * SUFFIXES.length)]}`
  } else if (rarity === 'unique') {
    name = UNIQUE_NAMES[Math.floor(rand(id + 8) * UNIQUE_NAMES.length)]
  }

  // Stats drawn without replacement from the six-stat pool.
  const { count, min, max } = RARITY_STATS[rarity]
  const pool = [...STAT_IDS]
  const stats: Partial<Record<StatId, number>> = {}
  for (let k = 0; k < count; k++) {
    const pick = Math.floor(rand(id + 50 + k * 13) * pool.length)
    const stat = pool.splice(pick, 1)[0]
    stats[stat] = min + Math.floor(rand(id + 90 + k * 17) * (max - min + 1))
  }

  return { ...saved, name, baseName, stats }
}

/** Sum equipped items' bonuses for the character screen's stats block. */
export function sumEquippedStats(
  items: SavedItem[],
  equip: Partial<Record<Slot, number>>,
): Record<StatId, number> {
  const total = { vigor: 0, wit: 0, craft: 0, lore: 0, luck: 0, moxie: 0 }
  for (const slot of SLOTS) {
    const id = equip[slot]
    if (id == null) continue
    const saved = items.find((i) => i.id === id)
    if (!saved) continue
    const { stats } = resolveItem(saved)
    for (const s of STAT_IDS) total[s] += stats[s] ?? 0
  }
  return total
}

/** A theme-shaped palette for runImpact: bright/mid/dim tints of the tier. */
export function rarityFx(r: Rarity): { accent: string; fire: [string, string, string] } {
  const c = RARITY_COLORS[r]
  return { accent: c, fire: [mix(c, '#ffffff', 0.45), c, shade(c, -70)] }
}

/** Human label for a chest's provenance key. */
export function chestSourceLabel(src: string): string {
  if (src.startsWith('level:')) return `level ${src.slice(6)}`
  if (src.startsWith('project:')) return 'a project'
  if (src.startsWith('questdone:')) return 'a completed quest'
  if (src.startsWith('note:')) return 'a note'
  if (src.startsWith('lab:')) return 'the lab'
  return 'the road'
}
