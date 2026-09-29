/**
 * Character, the character management screen (/character).
 *
 * Diablo-2-inspired. Identity (avatar, name, level, XP) is the page's own
 * header, unframed above the grid. Below it, three equal-height columns on
 * wide screens: stats + theme, the paperdoll, and the pack (with any
 * unopened chests); two columns on tablets, one on phones. Stats and theme
 * are two cards sharing the left column, so it still fills to one height
 * beside the others. The theme card carries the earned gems and the hearth
 * they get dropped into, rather than a full-width band under everything.
 * Tapping a worn paperdoll item opens its card (the way to unequip);
 * empty slots are inert labels. Tapping a pack item opens a card that
 * compares it against what's worn, and the stats preview the swap. Chests open in place with an impact burst and a reveal modal. Not a
 * "location": it isn't in the world registry, awards no visit XP, and gets
 * a flavor log line instead of an arrival.
 *
 * Renders as a full-page modal: Layout drops the right column and locks
 * the viewport scroll (gf-full); the fixed close plate in the top-right
 * corner (or Esc) is the way back — history back when the visitor came
 * from within the site, home on a deep link.
 */

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@scorp-ds/components'
import DitherIcon from '../components/DitherIcon'
import GemShelf from '../components/progress/GemShelf'
import type { GemSinkHandle } from '../components/progress/useGemDrag'
import { useXp } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'
import { THEMES } from '../lib/themes'
import { runImpact } from '../lib/impactFx'
import CharacterHeader from '../components/game/CharacterHeader'
import PixelHearth from '../components/game/PixelHearth'
import ChestRevealModal from '../components/ChestRevealModal'
import DestroyConfirmModal from '../components/game/DestroyConfirmModal'
import ItemCard from '../components/game/ItemCard'
import PackGrid from '../components/game/PackGrid'
import PixelItem from '../components/game/PixelItem'
import StatsBlock from '../components/game/StatsBlock'
import {
  rarityFx,
  resolveItem,
  SLOT_LABELS,
  type Item,
  type SavedChest,
  type Slot,
} from '../game/loot'

/** Paperdoll cells in grid order: a body column (helm, armor, boots)
 *  flanked by hands, with the ring and amulet on the bottom row. */
const DOLL_GRID: Array<Slot | null> = [
  null, 'helm', null,
  'weapon', 'armor', 'shield',
  'ring', 'boots', 'amulet',
]

export default function Character() {
  usePageTitle('Character')
  const {
    level,
    chests,
    items,
    equipment,
    openChest,
    equipItem,
    unequipSlot,
    destroyItem,
    logLine,
    toast,
    celebrating,
    pendingLevels,
    celebrateLevel,
    seenItems,
    markItemSeen,
    seenChests,
    activeGem,
  } = useXp()
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState<Item | null>(null)
  // Destroy is gated by a confirm modal stacked over the item card.
  const [confirmingDestroy, setConfirmingDestroy] = useState(false)
  const navigate = useNavigate()
  // The hearth at the foot of the theme card is the gem drop target.
  const hearthRef = useRef<GemSinkHandle>(null)
  // Paperdoll slot elements, the anchor for the equip impact.
  const slotRefs = useRef<Partial<Record<Slot, HTMLElement | null>>>({})

  // Close the screen: back in history when the visitor navigated here from
  // within the site; deep links have no in-app history, so go home.
  const closePage = useCallback(() => {
    const state = window.history.state as { idx?: number } | null
    if (state?.idx && state.idx > 0) navigate(-1)
    else navigate('/')
  }, [navigate])

  // Flavor line once per visit (ref-guarded against StrictMode's double run).
  const greetedRef = useRef(false)
  useEffect(() => {
    if (greetedRef.current) return
    greetedRef.current = true
    logLine('You take stock of your gear.', 'arrive')
  }, [logLine])

  const displayLevel = level.level + 1
  const equippedIds = new Set(Object.values(equipment))
  const pack = items.filter((i) => !equippedIds.has(i.id))

  const selectedItem = (() => {
    const saved = selected != null ? items.find((i) => i.id === selected) : undefined
    return saved ? resolveItem(saved) : null
  })()
  const selectedEquipped =
    selectedItem != null && equipment[selectedItem.slot] === selectedItem.id
  const wornInSlot = (() => {
    if (!selectedItem || selectedEquipped) return null
    const saved = items.find((i) => i.id === equipment[selectedItem.slot])
    return saved ? resolveItem(saved) : null
  })()

  const selectItem = (id: number) => {
    setSelected(id)
    markItemSeen(id)
  }

  // Esc peels one layer at a time: the item card, then the slot filter,
  // then the screen itself (the reveal modal handles its own Esc). The
  // level-up modal and the bottom sheet own Esc while open, so this
  // handler stands down rather than also peeling a page layer.
  useEffect(() => {
    if (revealed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (celebrating) return
      if (document.querySelector('.sheet.open')) return
      // the destroy confirm is the top layer; peel it alone (idempotent
      // with the DS modal's own Esc handling)
      if (confirmingDestroy) setConfirmingDestroy(false)
      else if (selected != null) setSelected(null)
      else closePage()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected, revealed, celebrating, confirmingDestroy, closePage])

  // Worn slots open their item's card (the way to unequip); empty slots
  // are inert labels, not a filter (slot filtering was retired).
  const onSlotClick = (slot: Slot) => {
    const worn = equipment[slot]
    if (worn != null) selectItem(worn)
  }

  const onItemAction = () => {
    if (!selectedItem) return
    if (selectedEquipped) {
      unequipSlot(selectedItem.slot)
      toast(`unequipped the ${selectedItem.name}`)
    } else {
      equipItem(selectedItem.id)
      const el = slotRefs.current[selectedItem.slot]
      if (el) runImpact(el, rarityFx(selectedItem.rarity))
      logLine(`You equip the ${selectedItem.name}.`, 'hint')
      toast(`equipped the ${selectedItem.name}`)
    }
    setSelected(null)
  }

  // Destroy from the item card, pack items only (a worn item unequips
  // first). The button only asks; the confirm modal is the real gate.
  const onItemDestroy = () => {
    if (!selectedItem || selectedEquipped) return
    setConfirmingDestroy(true)
  }
  const onDestroyConfirmed = () => {
    if (!selectedItem) return
    destroyItem(selectedItem.id)
    logLine(`You destroy the ${selectedItem.name}.`, 'hint')
    toast(`destroyed the ${selectedItem.name}`)
    setConfirmingDestroy(false)
    setSelected(null)
  }

  // Equip straight from the reveal, offered only while the slot is empty
  // (an occupied slot deserves the compare card, not a blind swap).
  const onRevealEquip = () => {
    if (!revealed) return
    equipItem(revealed.id)
    const el = slotRefs.current[revealed.slot]
    if (el) runImpact(el, rarityFx(revealed.rarity))
    logLine(`You equip the ${revealed.name}.`, 'hint')
    toast(`equipped the ${revealed.name}`)
    setRevealed(null)
  }

  const onOpenChest = (chest: SavedChest, e: MouseEvent<HTMLButtonElement>) => {
    const el = e.currentTarget
    const item = openChest(chest.id)
    if (!item) return
    runImpact(el, rarityFx(item.rarity))
    setRevealed(item)
  }

  return (
    <div className="ch-main">
      {/* .ch-close is a layout hook only; the control is the DS icon Button */}
      <Button
        variant="icon"
        size="icon"
        type="button"
        className="ch-close"
        onClick={closePage}
        aria-label="Close character screen"
      >
        <DitherIcon name="close" size={16} />
      </Button>

      <CharacterHeader />

      <div className="ch-grid ch-grid3">
        {/* stats and theme are two cards in one column, so the column still
            fills alongside the paperdoll and the pack */}
        <div className="ch-col-left">
          <section className="ch-panel ch-col-id" aria-label="Stats">
            <StatsBlock
              items={items}
              equipment={equipment}
              displayLevel={displayLevel}
              previewItem={selectedEquipped ? null : selectedItem}
            />
          </section>

          {/* Theme: the gems earned by levelling, and the fire that applies
              them. Level and XP live in the page header, so nothing here
              repeats them. */}
          <section className="ch-panel ch-theme" aria-label="Site theme">
            <div className="gf-label">theme</div>
            <div className="gf-dim ch-helper">
              Wearing <span className="ch-wearing">{THEMES[activeGem].name}</span>. Each gem you
              earn recolors the site; drop one in the fire to change.
            </div>
            <GemShelf sinkRef={hearthRef} />
            <PixelHearth ref={hearthRef} />
          </section>
        </div>

        <section className="ch-panel ch-col-doll" aria-label="Equipment">
          <div className="gf-label">equipment</div>
          <div className="gf-dim ch-helper">Tap a worn item to inspect it</div>
          <div className="ch-doll">
            {DOLL_GRID.map((cellKind, i) => {
              if (cellKind === null) return <div key={i} />
              const slot = cellKind
              const saved = items.find((it) => it.id === equipment[slot])
              const cls = ['ch-slotwrap', saved ? `bg-rar-${saved.rarity}` : '']
                .filter(Boolean)
                .join(' ')
              return (
                <div
                  key={i}
                  className={cls}
                  ref={(el) => {
                    slotRefs.current[slot] = el
                  }}
                >
                  {saved ? (
                    <button
                      className="ch-slot"
                      onClick={() => onSlotClick(slot)}
                      aria-label={`${slot}: ${resolveItem(saved).name}`}
                    >
                      <PixelItem
                        kind={saved.slot}
                        base={saved.base}
                        rarity={saved.rarity}
                        cell={4}
                      />
                    </button>
                  ) : (
                    // empty slots are labels, not controls
                    <div className="ch-slot ch-slot-empty">
                      <span className="ch-slotname">{SLOT_LABELS[slot]}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section className="ch-panel ch-col-loot" aria-label="Pack">
          {/* chests live in the grid itself (PackGrid leads with them) */}
          <PackGrid
            pack={pack}
            items={items}
            equipment={equipment}
            chests={chests}
            onOpenChest={onOpenChest}
            levelChests={pendingLevels}
            onOpenLevelChest={celebrateLevel}
            seenItems={seenItems}
            seenChests={seenChests}
            onSelect={selectItem}
          />
        </section>

        {/* Always mounted: the card holds its last item through the fade-out */}
        <ItemCard
          item={selectedItem}
          equipped={wornInSlot}
          isEquipped={selectedEquipped}
          onAction={onItemAction}
          onDestroy={onItemDestroy}
          // while the confirm is stacked on top, the card's own close paths
          // (its Esc listener) peel the confirm instead of the card
          onClose={() => (confirmingDestroy ? setConfirmingDestroy(false) : setSelected(null))}
        />
        <DestroyConfirmModal
          item={confirmingDestroy ? selectedItem : null}
          onConfirm={onDestroyConfirmed}
          onClose={() => setConfirmingDestroy(false)}
        />
      </div>

      <ChestRevealModal
        item={revealed}
        canEquip={revealed != null && equipment[revealed.slot] == null}
        onEquip={onRevealEquip}
        onClose={() => setRevealed(null)}
      />
    </div>
  )
}
