/**
 * PackGrid, the character screen's inventory.
 *
 * A fixed 4-wide grid of at least 16 cells (empty cells shown), growing by
 * rows if the pack holds more; there is no pack limit, the 16 is only the
 * visual shelf. Unopened chests lead the grid as cells of their own (tap
 * to open) rather than a separate section, so all loot lives on one
 * shelf. Each item cell can carry a ▲ (beats what's worn in its slot, or
 * the slot is empty) and an accent pip (not inspected yet).
 */

import { type MouseEvent } from 'react'
import {
  chestSourceLabel,
  resolveItem,
  statTotal,
  type SavedChest,
  type SavedItem,
  type Slot,
} from '../../game/loot'
import PixelItem from './PixelItem'

const SHELF = 16
const COLS = 4

export default function PackGrid({
  pack,
  items,
  equipment,
  chests,
  onOpenChest,
  seenItems,
  onSelect,
}: {
  /** Owned, unequipped items. */
  pack: SavedItem[]
  items: SavedItem[]
  equipment: Partial<Record<Slot, number>>
  /** Unopened chests; they lead the grid as their own cells. */
  chests: SavedChest[]
  onOpenChest: (chest: SavedChest, e: MouseEvent<HTMLButtonElement>) => void
  seenItems: number[]
  onSelect: (id: number) => void
}) {
  const hasChests = chests.length > 0
  const cells = Math.max(SHELF, Math.ceil((chests.length + pack.length) / COLS) * COLS)
  const worn = (slot: Slot) => {
    const saved = items.find((i) => i.id === equipment[slot])
    return saved ? resolveItem(saved) : null
  }
  const helper =
    pack.length > 0
      ? null
      : items.length === 0 && !hasChests
        ? 'Your pack is empty; chests drop as you explore the site'
        : hasChests
          ? 'Nothing unequipped, but a chest waits'
          : 'Everything you own is equipped'

  return (
    <>
      <div className="gf-label ch-sectlabel">
        pack {pack.length}
        {pack.length <= SHELF ? `/${SHELF}` : ''}
      </div>
      {helper && <div className="gf-dim ch-helper">{helper}</div>}
      <div className="ch-inv ch-pack">
        {chests.map((c) => (
          <div key={`chest-${c.id}`} className="ch-invwrap bg-rar-common">
            <button
              className="ch-invbtn"
              onClick={(e) => onOpenChest(c, e)}
              aria-label={`Chest from ${chestSourceLabel(c.src)}, tap to open`}
            >
              <PixelItem kind="chest" rarity="common" cell={3} />
            </button>
          </div>
        ))}
        {Array.from({ length: cells - chests.length }, (_, i) => {
          const saved = pack[i]
          if (!saved) return <div key={`empty-${i}`} className="ch-packempty" aria-hidden="true" />
          const it = resolveItem(saved)
          const eq = worn(it.slot)
          const upgrade = !eq || statTotal(it) > statTotal(eq)
          const unseen = !seenItems.includes(it.id)
          return (
            <div key={it.id} className={`ch-invwrap bg-rar-${it.rarity}`}>
              <button
                className="ch-invbtn"
                onClick={() => onSelect(it.id)}
                aria-label={`${it.name}${upgrade ? ', upgrade' : ''}${unseen ? ', new' : ''}`}
              >
                <PixelItem kind={it.slot} base={it.base} rarity={it.rarity} cell={3} />
                {unseen && <span className="ch-newpip" aria-hidden="true" />}
                {upgrade && (
                  <span className="ch-upmark stat-up" aria-hidden="true">
                    ▲
                  </span>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}
