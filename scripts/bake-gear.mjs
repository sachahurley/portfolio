// Gear art baker: resolves the character screen's item art to sheet cells.
//
//   node scripts/bake-gear.mjs
//
// Reads   src/data/tileIndex.ts (tile id -> position)
//         public/tiles/urizen.png (ink bounds, for visual centering)
// Writes  src/game/gearTiles.ts
//
// GEAR below is the source of truth for what loot looks like: one entry per
// slot, listing its base types in order. The names must stay in step with
// BASES in src/game/loot.ts (the script checks and fails loudly if they
// drift), because a base index is what the save persists.
// Deterministic and safe to re-run.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { decodePng } from './lib/png.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const INDEX = path.join(root, 'src/data/tileIndex.ts')
const LOOT = path.join(root, 'src/game/loot.ts')
const SHEET = path.join(root, 'public/tiles/urizen.png')
const OUT = path.join(root, 'src/game/gearTiles.ts')

/** slot -> [display name, tile id][] , in base-index order. */
const GEAR = {
  helm: [
    ['Dome Helm', 'armor/helm/dome_helm'],
    ['Horned Helm', 'armor/helm/horned_helm'],
    ['Bucket Helm', 'armor/helm/bucket_helm'],
    ['Great Helm', 'armor/helm/great_helm'],
    ['Feathered Hat', 'armor/hat/feather_hat'],
    ['Crown', 'items/regalia/crown'],
  ],
  weapon: [
    ['Short Sword', 'weapons/sword/short_sword'],
    ['Broadsword', 'weapons/sword/broadsword'],
    ['Katana', 'weapons/sword/katana'],
    ['Dagger', 'weapons/dagger/dagger'],
    ['Battle Axe', 'weapons/axe/battle_axe'],
    ['Mace', 'weapons/blunt/mace'],
    ['Staff', 'weapons/staff/staff'],
    ['Spear', 'weapons/polearm/spear'],
    ['Bow', 'weapons/bow/bow'],
  ],
  armor: [
    ['Tunic', 'armor/chest/chest_01'],
    ['Scale Mail', 'armor/chest/chest_05'],
    ['Chainmail', 'armor/chest/chest_11'],
    ['Plate', 'armor/chest/chest_12'],
    ['Robe', 'armor/robe/robe_02'],
    ['Mantle', 'armor/robe/robe_09'],
  ],
  shield: [
    ['Heater Shield', 'armor/shield/heater_shield'],
    ['Round Shield', 'armor/shield/round_shield'],
    ['Tower Shield', 'armor/shield/tower_shield'],
  ],
  ring: [
    ['Band', 'items/jewelry/ring'],
    ['Signet', 'items/jewelry/ring_2'],
    ['Seal Ring', 'items/jewelry/ring_3'],
    ['Gemmed Ring', 'items/jewelry/ring_5'],
    ['Loop', 'items/jewelry/ring_7'],
  ],
  boots: [
    ['Boots', 'armor/accessory/boots'],
    ['Sturdy Boots', 'armor/accessory/boots_2'],
    ['Tall Boots', 'armor/accessory/tall_boot'],
    ['Greaves', 'armor/accessory/greaves'],
  ],
  amulet: [
    ['Amulet', 'items/jewelry/amulet'],
    ['Talisman', 'items/jewelry/amulet_3'],
    ['Pendant', 'items/jewelry/pendant'],
    ['Charm', 'items/jewelry/pendant_3'],
    ['Medallion', 'items/jewelry/medallion'],
    ['Necklace', 'items/regalia/necklace'],
  ],
}

/** The loot chest visitors open on the character screen. */
const CHEST = 'items/chest/chest'

const index = fs.readFileSync(INDEX, 'utf8')
const cellFor = (id) => {
  const m = index.match(new RegExp(`"${id}": \\[(\\d+), (\\d+), 1, 1\\]`))
  if (!m) throw new Error(`tile id not found (or not 1x1): ${id}`)
  return [Number(m[1]), Number(m[2])]
}

// A glyph's ink rarely fills its 12x12 cell symmetrically (a helm hugs
// the top, a ring hangs low), so a box-centered tile looks off-center.
// Bake the shift that centers the ink's bounding box in the cell; the
// renderer translates by it (in sheet px) at whatever scale it draws.
const TILE = 12
const PITCH = 13
const img = decodePng(fs.readFileSync(SHEET))
const centerShift = (col, row) => {
  let minX = TILE, minY = TILE, maxX = -1, maxY = -1
  for (let y = 0; y < TILE; y++) {
    for (let x = 0; x < TILE; x++) {
      const px = 1 + col * PITCH + x
      const py = 1 + row * PITCH + y
      if (img.data[(py * img.width + px) * 4 + 3] > 0) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
  if (maxX < 0) return [0, 0] // empty tile: nothing to center
  // Exact, so glyphs with asymmetric margins get a half-pixel shift (a 9px
  // glyph in a 12px tile); the renderer rounds to whole *screen* px.
  return [(TILE - 1 - minX - maxX) / 2, (TILE - 1 - minY - maxY) / 2]
}
const entryFor = (id) => {
  const [x, y] = cellFor(id)
  return [x, y, ...centerShift(x, y)]
}

// The save persists a base index, so BASES and GEAR must not drift apart.
const loot = fs.readFileSync(LOOT, 'utf8')
for (const [slot, entries] of Object.entries(GEAR)) {
  const m = loot.match(new RegExp(`^  ${slot}: \\[(.*)\\],$`, 'm'))
  if (!m) throw new Error(`BASES is missing the ${slot} slot`)
  const names = m[1].split(',').map((s) => s.trim().replace(/^'|'$/g, ''))
  const mine = entries.map(([name]) => name)
  if (names.join('|') !== mine.join('|')) {
    throw new Error(`BASES.${slot} does not match GEAR.${slot}:\n  loot.ts: ${names.join(', ')}\n  gear:    ${mine.join(', ')}`)
  }
}

const body = Object.entries(GEAR)
  .map(([slot, entries]) => {
    const cells = entries.map(([name, id]) => `[${entryFor(id).join(', ')}] /* ${name} */`)
    return `  ${slot}: [${cells.join(', ')}],`
  })
  .join('\n')

fs.writeFileSync(
  OUT,
  `// GENERATED by scripts/bake-gear.mjs. Do not edit; edit GEAR there and re-run.
import type { Slot } from './loot'

/** A piece of gear's art: sheet cell [col, row] plus the [dx, dy] shift
 *  (sheet px, half-pixel steps) that centers its ink in the tile box. */
export type GearTile = readonly [number, number, number, number]

/** Per slot, its base types' art in base-index order. */
export const GEAR_TILES: Record<Slot, ReadonlyArray<GearTile>> = {
${body}
}

/** The loot chest icon. */
export const CHEST_TILE: GearTile = [${entryFor(CHEST).join(', ')}]
`
)
const n = Object.values(GEAR).reduce((a, e) => a + e.length, 0)
console.log(`wrote ${path.relative(root, OUT)}: ${n} pieces of gear`)
