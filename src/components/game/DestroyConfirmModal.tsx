/**
 * DestroyConfirmModal, the "are you sure" gate for destroying an item.
 *
 * A small centered DS Modal stacked over the item card (its scrim covers
 * the docked card, so the choice is truly modal). Cancel (secondary) backs
 * out; Destroy (destructive) is the point of no return. State lives on the
 * character page, which also reroutes Esc/close to peel only this layer.
 */

import { useState } from 'react'
import { Button, Modal } from '@scorp-ds/components'
import { type Item } from '../../game/loot'

export default function DestroyConfirmModal({
  item: liveItem,
  onConfirm,
  onClose,
}: {
  /** Item up for destruction; null closes the modal. */
  item: Item | null
  onConfirm: () => void
  onClose: () => void
}) {
  // The Modal fades out on close, so keep the last item's name on screen
  // (adjust-state-during-render, as in ItemCard).
  const [last, setLast] = useState(liveItem)
  if (liveItem && liveItem !== last) setLast(liveItem)
  const item = liveItem ?? last
  if (!item) return null

  return (
    <Modal
      isOpen={liveItem != null}
      onClose={onClose}
      title="Are you sure?"
      width={360}
      footerContent={
        <>
          <Button variant="secondary" size="small" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" size="small" type="button" onClick={onConfirm}>
            Destroy
          </Button>
        </>
      }
    >
      {/* emphasis by rarity color, not weight (single-weight site rule) */}
      <div className="em-text">
        The <span className={`rar-${item.rarity}`}>{item.name}</span> will be destroyed forever.
      </div>
    </Modal>
  )
}
