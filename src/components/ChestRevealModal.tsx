/**
 * ChestRevealModal, the loot reveal, shown after opening a chest on the
 * character screen. Chrome (scrim, plate panel, Esc, focus management,
 * footer CTA) is the DS Modal; the item pops in with the gem-award keyframe.
 * State lives on the character page (opening is always user-initiated
 * there), so this stays a dumb presentational dialog.
 */

import { Button, Modal } from '@scorp-ds/components'
import ItemPlate from './game/ItemPlate'
import { RARITY_COLORS, RARITY_LABELS, STAT_NAMES, STAT_IDS, type Item } from '../game/loot'

export default function ChestRevealModal({
  item,
  onClose,
}: {
  item: Item | null
  onClose: () => void
}) {
  if (!item) return null

  return (
    <Modal
      isOpen
      onClose={onClose}
      title="Chest opened"
      width={320}
      footerContent={
        <Button variant="secondary" size="small" type="button" onClick={onClose}>
          Take it
        </Button>
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
