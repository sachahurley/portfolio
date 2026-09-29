/**
 * The village-home scene: the site's nav as a 1-bit pixel village.
 *
 * Authoring loop: compose in the Village Kit Builder (/lab/village),
 * "Copy recipe", and paste the recipe's `items` array here (the shapes
 * are identical; see VillageItem in components/village/villageKit.ts).
 * This scene started from the tool's own starter village, retargeted to
 * the site's real routes.
 *
 * Tap targets are the small icon props (clear affordances with labels);
 * the buildings and trees are scenery. Taps use the 'invert' style.
 */

import type { SceneLayout } from '../components/village/VillageScene'
import { BEAT_MS, type VillageItem } from '../components/village/villageKit'
import { TAROT_ENABLED } from '../lib/flags'
import { GLOBE_PERIOD_MS, globeMask } from '../lib/globe'

export const VILLAGE_HOME: VillageItem[] = [
  { tree: { canopy: 'canopy_oak', trunk: 'trunk_oak' } },
  { part: 'grass_1', gap: 2 },
  { part: 'fence_1' },
  { part: 'grass_4', gap: 2 },
  {
    house: { storeys: ['wall_3'], roof: 'roof_5' },
    lift: 3,
    tap: { label: 'Home', href: '/', style: 'invert' },
  },
  { part: 'grass_3', gap: 2 },
  { part: 'bush' },
  { part: 'grass_5', gap: 2 },
  { part: 'well' },
  { part: 'grass_5', gap: 2 },
  { part: 'wagon' },
  { part: 'grass_4', gap: 2 },
  {
    part: 'hammer_icon',
    lift: 3,
    tap: { label: 'Projects', href: '/projects', style: 'invert' },
  },
  { part: 'rock', gap: 2 },
  {
    house: { storeys: ['tower_base', 'tower_mid', 'tower_mid_plain'], roof: 'observatory_top' },
  },
  { part: 'grass_4', gap: 2 },
  { tree: { canopy: 'canopy_pine', trunk: 'trunk_stump', height: 2 } },
  { part: 'mushroom', gap: 2 },
  {
    // one size up from the catalog's potion (siteParts.ts): the 11x12
    // original read small beside the home grid's other icons
    part: 'potion_lg',
    lift: 3,
    tap: { label: 'Lab', href: '/lab', style: 'invert' },
  },
  { part: 'grass_5', gap: 2 },
  { part: 'tent' },
  { part: 'campfire', gap: 3 },
  { part: 'flowers', gap: 2 },
  {
    castle: {
      left: { storeys: ['tower_base', 'tower_mid', 'tower_mid'], roof: 'battlement' },
      wall: { storeys: ['castle_gate'], roof: 'castle_top' },
    },
  },
  { part: 'grass_5', gap: 2 },
  {
    part: 'quill',
    lift: 3,
    tap: { label: 'Notes', href: '/notes', style: 'invert' },
  },
  { part: 'shrub', gap: 2 },
  { part: 'hedge' },
  { part: 'grass_2', gap: 2 },
  {
    house: {
      storeys: ['tower_base', 'tower_mid_plain', 'tower_mid', 'tower_mid_plain'],
      roof: 'windmill_top',
    },
  },
  { part: 'barrel', gap: 2 },
  { part: 'lamp_post' },
  { part: 'grass_2', gap: 2 },
  {
    part: 'skull',
    lift: 3,
    tap: { label: 'About', href: '/about', style: 'invert' },
  },
  { part: 'grass_1', gap: 2 },
  { tree: { canopy: 'canopy_round', trunk: 'trunk_tall', height: 6 } },
  { part: 'grass_5', gap: 2 },
  { part: 'signpost' },
  {
    part: 'sword',
    gap: 4,
    lift: 3,
    tap: { label: 'Character', href: '/character', style: 'invert' },
  },
  { part: 'grass_3', gap: 2 },
  { house: { storeys: ['wall_5', 'upper_5_inv'], roof: 'roof_2' } },
  { part: 'grass_4', gap: 2 },
  // The tarot parlor's door; behind TAROT_ENABLED with its route and lab row.
  ...(TAROT_ENABLED
    ? [
        {
          part: 'crystal_ball',
          lift: 3,
          tap: { label: 'Tarot', href: '/lab/tarot', style: 'invert' },
        } satisfies VillageItem,
        { part: 'grass_2', gap: 2 } satisfies VillageItem,
      ]
    : []),
]

/**
 * The village's apps without the village: just the tap targets, for the
 * scenery-free home alternates (/lab/home-alts). Derived rather than
 * copied so the labels, routes and Tarot's flag stay in one place. Home
 * is dropped (you are already there, as on an iOS home screen), and so is
 * the village-only spacing (lift, gap).
 */
export const HOME_APPS: VillageItem[] = VILLAGE_HOME.filter(
  (it) => it.tap && it.tap.href !== '/',
).map((it) => ({ ...it, lift: undefined, gap: undefined }))

/** Globe diameter in art px: a filled disc reads heavier than the line-art
 *  icons, so it sits a little under their 16 to 22 px. */
const GLOBE_SIZE = 18

/**
 * The World app: the turning globe, redrawn on every live-cue beat (one
 * turn per GLOBE_PERIOD_MS, the same pace as the dialog's globe), that
 * opens "Thank you for visiting" instead of navigating. VillageHome only
 * adds it once the lifetime totals have loaded.
 */
export const WORLD_APP: VillageItem = {
  draw: (frame) => {
    const turn = ((frame * BEAT_MS) % GLOBE_PERIOD_MS) / GLOBE_PERIOD_MS
    return { w: GLOBE_SIZE, h: GLOBE_SIZE, px: globeMask(turn * 2 * Math.PI, GLOBE_SIZE, true) }
  },
  tap: { label: 'World', action: 'world', style: 'invert' },
}

/** The home grid with the World app on its own row, under Character. */
export const HOME_APPS_WITH_WORLD: VillageItem[] = [...HOME_APPS, WORLD_APP]

/**
 * The home page's arrangement: a 3 by 2 home-screen grid of equal cells,
 * no ground line (alternate B in /lab/home-alts). Phones keep the compact
 * cells; wide frames spread the grid across more of the column. A short
 * last row (the World app) centres under the middle column. A module
 * constant because VillageScene rebuilds whenever its layout changes identity.
 */
export const HOME_SCREEN_LAYOUT: SceneLayout = {
  mode: 'grid',
  cols: [3],
  cellPx: 96,
  ground: false,
  lastRow: 'center',
  wide: { cellPx: 150, rowGapPx: 54 },
}
