/**
 * ItemCard, the item details card on the character screen.
 *
 * Shows the selected item and, when its slot is worn by a different item,
 * the equipped one beside it, split by a rule on wide screens and stacked
 * on narrow ones. It wears the reward modals' chrome (stepped corners, a
 * border ring, the close plate from the character screen's own corner, the
 * controls banded into a header and footer) and on phones it rises over
 * the page behind a scrim, so equipping, swapping
 * and unequipping all read as the same deliberate act. The selected
 * item's stats carry a ▲/▼ delta against the equipped item, so a swap
 * reads at a glance. The action is Equip (empty slot), Swap (slot worn by
 * something else) or Unequip (viewing the worn item).
 */

import type { ReactNode } from 'react'
import {
  SLOT_LABELS,
  STAT_IDS,
  STAT_NAMES,
  statDeltas,
  type Item,
  type StatId,
} from '../../game/loot'
import DitherIcon from '../DitherIcon'
import ItemPlate from './ItemPlate'
import Tag from './Tag'

function ItemSide({
  item,
  tag,
  stats,
  deltas,
}: {
  item: Item
  /** State eyebrow above the name (a <Tag>). */
  tag?: ReactNode
  stats: StatId[]
  deltas?: Partial<Record<StatId, number>>
}) {
  return (
    <div className="ch-cardside">
      <ItemPlate item={item} />
      <div className="ch-card-body">
        {tag && <div className="ch-cardtag-row">{tag}</div>}
        <div className={`ch-card-name rar-${item.rarity}`}>{item.name}</div>
        <div className="ch-card-meta">
          {item.rarity} · {item.baseName.toLowerCase()} · {SLOT_LABELS[item.slot]}
        </div>
        <div className="ch-card-stats">
          {stats.map((s) => {
            const d = deltas?.[s] ?? 0
            return (
              <span key={s} className="ch-statline">
                +{item.stats[s] ?? 0} {STAT_NAMES[s]}
                {d > 0 && <span className="stat-up"> ▲{d}</span>}
                {d < 0 && <span className="stat-down"> ▼{-d}</span>}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function ItemCard({
  item,
  equipped,
  isEquipped,
  onAction,
  onClose,
}: {
  item: Item
  /** The item currently worn in this slot, when it isn't `item`. */
  equipped: Item | null
  isEquipped: boolean
  onAction: () => void
  onClose: () => void
}) {
  const has = (it: Item) => (s: StatId) => it.stats[s] != null
  // The selected side lists every stat on either item so losses show too.
  const selectedStats = STAT_IDS.filter((s) => has(item)(s) || (equipped != null && has(equipped)(s)))
  const label = isEquipped ? 'Unequip' : equipped ? 'Swap' : 'Equip'

  return (
    <>
      {/* phones only (CSS): the page dims behind the card */}
      <div className="ch-cardscrim" onClick={onClose} aria-hidden="true" />
      <aside className={`ch-card${equipped ? ' is-compare' : ''}`} aria-label="Item details">
        <div className="em-head">
          {/* comparing two items is its own act; a single item keeps its slot */}
          <span className="em-kicker">{equipped ? 'Compare' : SLOT_LABELS[item.slot]}</span>
          <button className="ch-card-close" onClick={onClose} aria-label="Close">
            <DitherIcon name="close" size={16} />
          </button>
        </div>
        <div className="em-body">
          <div className="ch-compare">
            <ItemSide
              item={item}
              tag={
                isEquipped ? (
                  <Tag filled>equipped</Tag>
                ) : equipped ? (
                  <Tag>in your pack</Tag>
                ) : undefined
              }
              stats={isEquipped ? STAT_IDS.filter(has(item)) : selectedStats}
              deltas={equipped ? statDeltas(item, equipped) : undefined}
            />
            {equipped && (
              <ItemSide
                item={equipped}
                tag={<Tag filled>equipped</Tag>}
                stats={STAT_IDS.filter(has(equipped))}
              />
            )}
          </div>
        </div>
        <div className="em-foot">
          <button className="ch-btn" onClick={onAction}>
            {label}
          </button>
        </div>
      </aside>
    </>
  )
}
