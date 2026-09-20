/**
 * ItemCard, the item details card on the character screen.
 *
 * Shows the selected item and, when its slot is worn by a different item,
 * the equipped one beside it, split by a rule on wide screens and stacked
 * on narrow ones. Chrome is the DS Modal's docked variant: on desktop the
 * panel pins low with no scrim so the paperdoll stays visible while you
 * compare; below 960px the same component renders the standard centered
 * modal, with scrim, focus handling, and Esc all owned by the DS. The
 * selected item's stats carry a ▲/▼ delta against the equipped item, so a
 * swap reads at a glance. The action is Equip (empty slot), Swap (slot
 * worn by something else) or Unequip (viewing the worn item).
 */

import { useState, type ReactNode } from 'react'
import {
  RARITY_LABELS,
  SLOT_LABELS,
  STAT_IDS,
  STAT_NAMES,
  statDeltas,
  type Item,
  type StatId,
} from '../../game/loot'
import { Button, Modal } from '@scorp-ds/components'
import ItemPlate from './ItemPlate'
import Tag from './Tag'

/** Sentence-case a lowercase label (SLOT_LABELS stay lowercase for
 *  mid-sentence use elsewhere). */
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function ItemSide({
  item,
  tag,
  stats,
  deltas,
  action,
}: {
  item: Item
  /** State eyebrow above the name (a <Tag>). */
  tag?: ReactNode
  stats: StatId[]
  deltas?: Partial<Record<StatId, number>>
  /** Per-item control under the stats (the destroy button), so an action
   *  that targets one side of a compare sits with its item, not in the
   *  shared footer. */
  action?: ReactNode
}) {
  return (
    <div className="ch-cardside">
      <ItemPlate item={item} />
      <div className="ch-card-body">
        {tag && <div className="ch-cardtag-row">{tag}</div>}
        <div className={`ch-card-name rar-${item.rarity}`}>{item.name}</div>
        {/* sentence case per segment: Common · Heater shield · Shield */}
        <div className="ch-card-meta">
          {RARITY_LABELS[item.rarity]} · {item.baseName} · {cap(SLOT_LABELS[item.slot])}
        </div>
        <div className="ch-card-stats">
          {stats.map((s) => {
            const d = deltas?.[s] ?? 0
            return (
              <span key={s} className="ch-statline">
                +{item.stats[s] ?? 0} {STAT_NAMES[s].toLowerCase()}
                {d > 0 && <span className="stat-up"> ▲{d}</span>}
                {d < 0 && <span className="stat-down"> ▼{-d}</span>}
              </span>
            )
          })}
        </div>
        {action && <div className="ch-card-action">{action}</div>}
      </div>
    </div>
  )
}

export default function ItemCard({
  item: liveItem,
  equipped: liveEquipped,
  isEquipped: liveIsEquipped,
  onAction,
  onDestroy,
  onClose,
}: {
  /** Null closes the card; the last item stays on while the fade-out plays. */
  item: Item | null
  /** The item currently worn in this slot, when it isn't `item`. */
  equipped: Item | null
  isEquipped: boolean
  onAction: () => void
  /** Ask to destroy the item (the host shows the confirmation modal);
   *  offered only while it isn't worn. */
  onDestroy?: () => void
  onClose: () => void
}) {
  // The Modal fades out on close, so the card must keep rendering its last
  // contents after the selection clears: freeze the whole item snapshot
  // (item + compare side + state tag) so nothing reshuffles mid-fade.
  // Adjust-state-during-render (the React-docs pattern), not a ref: refs
  // must not be read or written while rendering.
  const [last, setLast] = useState({ item: liveItem, equipped: liveEquipped, isEquipped: liveIsEquipped })
  if (
    liveItem &&
    (last.item !== liveItem || last.equipped !== liveEquipped || last.isEquipped !== liveIsEquipped)
  ) {
    setLast({ item: liveItem, equipped: liveEquipped, isEquipped: liveIsEquipped })
  }
  const { item, equipped, isEquipped } = liveItem
    ? { item: liveItem, equipped: liveEquipped, isEquipped: liveIsEquipped }
    : last
  if (!item) return null

  const has = (it: Item) => (s: StatId) => it.stats[s] != null
  // The selected side lists every stat on either item so losses show too.
  const selectedStats = STAT_IDS.filter((s) => has(item)(s) || (equipped != null && has(equipped)(s)))
  const label = isEquipped ? 'Unequip' : equipped ? 'Swap' : 'Equip'

  return (
    // comparing two items is its own act; a single item keeps its slot
    <Modal
      isOpen={liveItem != null}
      onClose={onClose}
      title={equipped ? 'Compare' : cap(SLOT_LABELS[item.slot])}
      docked
      width={640}
      footerContent={
        <Button variant="primary" size="small" onClick={onAction}>
          {label}
        </Button>
      }
    >
      <div className={`ch-compare${equipped ? ' is-compare' : ''}`}>
            <ItemSide
              item={item}
              tag={
                isEquipped ? (
                  <Tag filled>Equipped</Tag>
                ) : equipped ? (
                  <Tag>In your pack</Tag>
                ) : undefined
              }
              stats={isEquipped ? STAT_IDS.filter(has(item)) : selectedStats}
              deltas={equipped ? statDeltas(item, equipped) : undefined}
              action={
                !isEquipped && onDestroy ? (
                  <Button
                    variant="destructive"
                    size="small"
                    type="button"
                    aria-label={`Destroy the ${item.name}`}
                    onClick={onDestroy}
                  >
                    Destroy
                  </Button>
                ) : undefined
              }
            />
        {equipped && (
          <ItemSide
            item={equipped}
            tag={<Tag filled>Equipped</Tag>}
            stats={STAT_IDS.filter(has(equipped))}
          />
        )}
      </div>
    </Modal>
  )
}
