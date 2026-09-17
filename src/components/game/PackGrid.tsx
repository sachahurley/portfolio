/**
 * PackGrid, the character screen's inventory.
 *
 * A fixed 4-wide grid of at least 12 cells (empty cells shown), growing by
 * rows if the pack holds more; there is no pack limit, the 12 is only the
 * visual shelf. Each item cell can carry a ▲ (beats what's worn in its
 * slot, or the slot is empty) and an accent pip (not inspected yet). With a
 * paperdoll slot active, items for other slots dim but stay focusable.
 */

import {
  resolveItem,
  SLOT_LABELS,
  statTotal,
  type SavedItem,
  type Slot,
} from '../../game/loot'
import PixelItem from './PixelItem'

const SHELF = 12
const COLS = 4

export default function PackGrid({
  pack,
  items,
  equipment,
  hasChests,
  activeSlot,
  seenItems,
  onSelect,
}: {
  /** Owned, unequipped items. */
  pack: SavedItem[]
  items: SavedItem[]
  equipment: Partial<Record<Slot, number>>
  hasChests: boolean
  activeSlot: Slot | null
  seenItems: number[]
  onSelect: (id: number) => void
}) {
  const cells = Math.max(SHELF, Math.ceil(pack.length / COLS) * COLS)
  const worn = (slot: Slot) => {
    const saved = items.find((i) => i.id === equipment[slot])
    return saved ? resolveItem(saved) : null
  }
  const slotEmpty =
    activeSlot != null &&
    equipment[activeSlot] == null &&
    !pack.some((it) => it.slot === activeSlot)
  const helper = slotEmpty
    ? `No ${SLOT_LABELS[activeSlot]} yet; chests drop as you explore`
    : pack.length > 0
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
        {Array.from({ length: cells }, (_, i) => {
          const saved = pack[i]
          if (!saved) return <div key={`empty-${i}`} className="ch-packempty" aria-hidden="true" />
          const it = resolveItem(saved)
          const eq = worn(it.slot)
          const upgrade = !eq || statTotal(it) > statTotal(eq)
          const unseen = !seenItems.includes(it.id)
          const dim = activeSlot != null && it.slot !== activeSlot
          return (
            <div key={it.id} className={`ch-invwrap bg-rar-${it.rarity}${dim ? ' is-dim' : ''}`}>
              <button
                className="ch-invbtn"
                onClick={() => onSelect(it.id)}
                aria-label={`${it.name}${upgrade ? ', upgrade' : ''}${unseen ? ', new' : ''}`}
              >
                <PixelItem kind={it.slot} base={it.base} seed={it.id} rarity={it.rarity} cell={3} />
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
