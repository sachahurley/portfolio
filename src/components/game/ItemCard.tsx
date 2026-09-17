/**
 * ItemCard, the item details card on the character screen.
 *
 * Shows the selected item and, when its slot is worn by a different item,
 * the equipped one beside it (stacked on narrow screens). The selected
 * item's stats carry a ▲/▼ delta against the equipped item, so a swap
 * reads at a glance. The action is Equip (empty slot), Swap (slot worn by
 * something else) or Unequip (viewing the worn item).
 */

import {
  SLOT_LABELS,
  STAT_IDS,
  STAT_NAMES,
  statDeltas,
  type Item,
  type StatId,
} from '../../game/loot'
import PixelItem from './PixelItem'

function ItemSide({
  item,
  tag,
  stats,
  deltas,
}: {
  item: Item
  tag?: string
  stats: StatId[]
  deltas?: Partial<Record<StatId, number>>
}) {
  return (
    <div className="ch-cardside">
      <PixelItem kind={item.slot} base={item.base} rarity={item.rarity} cell={6} />
      <div className="ch-card-body">
        {tag && <div className="ch-cardtag">{tag}</div>}
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
    <aside className={`ch-card ch-card-v${equipped ? ' is-compare' : ''}`} aria-label="Item details">
      <button className="ch-card-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <div className="ch-compare">
        <ItemSide
          item={item}
          tag={isEquipped ? 'equipped' : equipped ? 'in your pack' : undefined}
          stats={isEquipped ? STAT_IDS.filter(has(item)) : selectedStats}
          deltas={equipped ? statDeltas(item, equipped) : undefined}
        />
        {equipped && (
          <ItemSide item={equipped} tag="equipped" stats={STAT_IDS.filter(has(equipped))} />
        )}
      </div>
      <div className="ch-card-actions">
        <button className="ch-btn" onClick={onAction}>
          {label}
        </button>
      </div>
    </aside>
  )
}
