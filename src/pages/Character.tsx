/**
 * Character, the character management screen (/character).
 *
 * Diablo-2-inspired, three columns on wide screens: identity + stats, the
 * paperdoll, and the pack (with any unopened chests); two columns on
 * tablets, one on phones, with the camp (progress + gem fire) below.
 * Tapping a paperdoll slot filters the pack to that slot; tapping an item
 * opens a card that compares it against what's worn, and the stats preview
 * the swap. Chests open in place with an impact burst and a reveal modal. Not a
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
import DitherIcon from '../components/DitherIcon'
import PixelFire, { type PixelFireHandle } from '../components/PixelFire'
import GemShelf from '../components/progress/GemShelf'
import { useXp } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'
import { THEMES } from '../lib/themes'
import { runImpact } from '../lib/impactFx'
import CharacterPanel from '../components/game/CharacterPanel'
import ChestRevealModal from '../components/ChestRevealModal'
import ItemCard from '../components/game/ItemCard'
import PackGrid from '../components/game/PackGrid'
import PixelItem from '../components/game/PixelItem'
import StatsBlock from '../components/game/StatsBlock'
import {
  chestSourceLabel,
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
    logLine,
    seenItems,
    markItemSeen,
    activeGem,
  } = useXp()
  const [selected, setSelected] = useState<number | null>(null)
  const [activeSlot, setActiveSlot] = useState<Slot | null>(null)
  const [revealed, setRevealed] = useState<Item | null>(null)
  const navigate = useNavigate()
  // The camp fire below the sheet doubles as the gem drop target (same
  // pairing as the classic home page).
  const fireApiRef = useRef<PixelFireHandle>(null)
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
  // then the screen itself (the reveal modal handles its own Esc).
  useEffect(() => {
    if (revealed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (selected != null) setSelected(null)
      else if (activeSlot != null) setActiveSlot(null)
      else closePage()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected, activeSlot, revealed, closePage])

  const onSlotClick = (slot: Slot) => {
    if (activeSlot === slot) {
      setActiveSlot(null)
      setSelected(null)
      return
    }
    setActiveSlot(slot)
    const worn = equipment[slot]
    if (worn != null) selectItem(worn)
    // an open card for another slot's item no longer matches the filter
    else if (selectedItem && selectedItem.slot !== slot) setSelected(null)
  }

  const onItemAction = () => {
    if (!selectedItem) return
    if (selectedEquipped) {
      unequipSlot(selectedItem.slot)
    } else {
      equipItem(selectedItem.id)
      const el = slotRefs.current[selectedItem.slot]
      if (el) runImpact(el, rarityFx(selectedItem.rarity))
      logLine(`You equip the ${selectedItem.name}.`, 'hint')
    }
    setSelected(null)
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
      <button
        type="button"
        className="ch-close"
        onClick={closePage}
        aria-label="Close character screen"
      >
        <DitherIcon name="close" size={16} />
      </button>

      <div className="ch-grid ch-grid3">
        <section className="ch-panel ch-col-id" aria-label="Character">
          <CharacterPanel />
          <StatsBlock
            items={items}
            equipment={equipment}
            displayLevel={displayLevel}
            previewItem={selectedEquipped ? null : selectedItem}
          />
        </section>

        <section className="ch-panel ch-col-doll" aria-label="Equipment">
          <div className="gf-label">equipment</div>
          <div className="gf-dim ch-helper">
            {activeSlot
              ? `Showing ${SLOT_LABELS[activeSlot]}; tap again to show all`
              : 'Tap a slot to filter your pack'}
          </div>
          <div className={`ch-doll${activeSlot ? ' has-active' : ''}`}>
            {DOLL_GRID.map((cellKind, i) => {
              if (cellKind === null) return <div key={i} />
              const slot = cellKind
              const saved = items.find((it) => it.id === equipment[slot])
              const active = activeSlot === slot
              const cls = [
                'ch-slotwrap',
                saved ? `bg-rar-${saved.rarity}` : '',
                active ? 'is-active' : '',
                activeSlot && !active ? 'is-dim' : '',
              ]
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
                  <button
                    className="ch-slot"
                    onClick={() => onSlotClick(slot)}
                    aria-pressed={active}
                    aria-label={saved ? `${slot}: ${resolveItem(saved).name}` : `${slot}: empty`}
                  >
                    {saved ? (
                      <PixelItem
                        kind={saved.slot}
                        base={saved.base}
                        rarity={saved.rarity}
                        cell={4}
                      />
                    ) : (
                      <span className="ch-slotname">{SLOT_LABELS[slot]}</span>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        <section className="ch-panel ch-col-loot" aria-label="Pack">
          {chests.length > 0 && (
            <>
              <div className="gf-label">chests</div>
              <div className="ch-chests">
                {chests.map((c) => (
                  <button key={c.id} className="ch-chestbtn" onClick={(e) => onOpenChest(c, e)}>
                    <PixelItem kind="chest" rarity="common" cell={4} />
                    <span>From {chestSourceLabel(c.src)}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <PackGrid
            pack={pack}
            items={items}
            equipment={equipment}
            hasChests={chests.length > 0}
            activeSlot={activeSlot}
            seenItems={seenItems}
            onSelect={selectItem}
          />
        </section>

        {selectedItem && (
          <ItemCard
            item={selectedItem}
            equipped={wornInSlot}
            isEquipped={selectedEquipped}
            onAction={onItemAction}
            onClose={() => setSelected(null)}
          />
        )}
      </div>

      {/* Theme: the gems earned by levelling, and the fire that applies
          them. Full width under the three cards; level and XP stay in the
          character panel, so nothing here repeats them. */}
      <section className="ch-panel ch-camp" aria-label="Site theme">
        <div className="gf-label">theme</div>
        <div className="gf-dim ch-helper">
          Wearing <span className="ch-wearing">{THEMES[activeGem].name}</span>. Each gem you earn
          recolors the site; drag one into the fire to change.
        </div>
        <GemShelf fireApiRef={fireApiRef} />
        <PixelFire ref={fireApiRef} inline />
      </section>

      <ChestRevealModal item={revealed} onClose={() => setRevealed(null)} />
    </div>
  )
}
