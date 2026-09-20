/**
 * ChestRevealModal, the loot reveal, shown after opening a chest on the
 * character screen. Chrome (scrim, plate panel, Esc, focus management,
 * footer CTA) is the DS Modal; the item pops in with the gem-award keyframe.
 * State lives on the character page (opening is always user-initiated
 * there), so this stays a dumb presentational dialog.
 */

import { useState } from 'react'
import { Button, Modal } from '@scorp-ds/components'
import ItemPlate from './game/ItemPlate'
import { RARITY_COLORS, RARITY_LABELS, STAT_NAMES, STAT_IDS, type Item } from '../game/loot'

export default function ChestRevealModal({
  item: liveItem,
  canEquip: liveCanEquip = false,
  onEquip,
  onClose,
}: {
  item: Item | null
  /** The revealed item's slot is empty, so it can be worn straight away. */
  canEquip?: boolean
  onEquip?: () => void
  onClose: () => void
}) {
  // The Modal fades out on close, so keep showing the last revealed item
  // after it clears (adjust-state-during-render, as in ItemCard). canEquip
  // freezes with it so the footer doesn't reshuffle mid-fade.
  const [last, setLast] = useState({ item: liveItem, canEquip: liveCanEquip })
  if (liveItem && (liveItem !== last.item || liveCanEquip !== last.canEquip)) {
    setLast({ item: liveItem, canEquip: liveCanEquip })
  }
  const { item, canEquip } = liveItem ? { item: liveItem, canEquip: liveCanEquip } : last
  if (!item) return null

  return (
    <Modal
      isOpen={liveItem != null}
      onClose={onClose}
      title="Chest opened"
      width={320}
      footerContent={
        <>
          <Button variant="secondary" size="small" type="button" onClick={onClose}>
            Take it
          </Button>
          {/* straight into the empty slot; taken items equip via the pack card */}
          {canEquip && onEquip && (
            <Button variant="primary" size="small" type="button" onClick={onEquip}>
              Equip
            </Button>
          )}
        </>
      }
    >
      <div className="text-center">
        <div className="em-item">
          <ItemPlate item={item} />
        </div>
        <div className="em-title" style={{ color: RARITY_COLORS[item.rarity] }}>
          {item.name}
        </div>
        <div className="em-text">
          <span className={`rar-${item.rarity}`}>{RARITY_LABELS[item.rarity]}</span>
          {item.name !== item.baseName ? ` ${item.baseName.toLowerCase()}` : ` ${item.slot}`}
          <span className="ch-card-stats">
            {STAT_IDS.filter((s) => item.stats[s] != null).map((s) => (
              <span key={s} className="ch-statline">
                +{item.stats[s]} {STAT_NAMES[s].toLowerCase()}
              </span>
            ))}
          </span>
        </div>
      </div>
    </Modal>
  )
}
