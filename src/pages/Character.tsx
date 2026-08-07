/**
 * Character, the character management screen (/character).
 *
 * Diablo-2-inspired: identity + paperdoll + stats on one side, chests and
 * inventory on the other; stacked in one column on small screens. Items are
 * equipped by tapping them (an item card shows details and the action);
 * chests open in place with an impact burst and a reveal modal. Not a
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
import { useXp } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'
import { runImpact } from '../lib/impactFx'
import CharacterPanel from '../components/game/CharacterPanel'
import ChestRevealModal from '../components/ChestRevealModal'
import PixelItem from '../components/game/PixelItem'
import PixelPortrait from '../components/game/PixelPortrait'
import {
  chestSourceLabel,
  rarityFx,
  resolveItem,
  SLOT_LABELS,
  STAT_IDS,
  STAT_NAMES,
  sumEquippedStats,
  type Item,
  type SavedChest,
  type Slot,
} from '../game/loot'

/** Paperdoll cells in grid order; null cells frame the portrait. */
const DOLL_GRID: Array<Slot | 'face' | null> = [
  null, 'helm', null,
  'weapon', 'face', 'shield',
  'ring', 'armor', 'boots',
]

export default function Character() {
  usePageTitle('Character')
  const {
    level,
    avatarSeed,
    chests,
    items,
    equipment,
    openChest,
    equipItem,
    unequipSlot,
    logLine,
  } = useXp()
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState<Item | null>(null)
  const navigate = useNavigate()

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
  const inventory = items.filter((i) => !equippedIds.has(i.id))
  const bonuses = sumEquippedStats(items, equipment)
  const statBase = 4 + 2 * displayLevel

  const selectedItem = (() => {
    const saved = selected != null ? items.find((i) => i.id === selected) : undefined
    return saved ? resolveItem(saved) : null
  })()
  const selectedEquipped =
    selectedItem != null && equipment[selectedItem.slot] === selectedItem.id

  // Esc closes the item card (the reveal modal handles its own Esc).
  useEffect(() => {
    if (selected == null || revealed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected, revealed])

  // With nothing open above it, Esc closes the screen itself.
  useEffect(() => {
    if (selected != null || revealed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePage()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [selected, revealed, closePage])

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

      <div className="ch-grid">
        <section className="ch-panel" aria-label="Character">
          <CharacterPanel />

          <div className="gf-label ch-sectlabel">equipment</div>
          <div className="ch-doll">
            {DOLL_GRID.map((cellKind, i) => {
              if (cellKind === null) return <div key={i} />
              if (cellKind === 'face') {
                return (
                  <div key={i} className="ch-dollface">
                    <PixelPortrait seed={avatarSeed} cell={5} />
                  </div>
                )
              }
              const slot = cellKind
              const saved = items.find((it) => it.id === equipment[slot])
              return (
                <div key={i} className={`ch-slotwrap${saved ? ` bg-rar-${saved.rarity}` : ''}`}>
                  <button
                    className="ch-slot"
                    onClick={() => saved && setSelected(saved.id)}
                    aria-label={saved ? `${slot}: ${resolveItem(saved).name}` : `${slot}: empty`}
                    style={saved ? undefined : { cursor: 'default' }}
                  >
                    {saved ? (
                      <PixelItem
                        kind={saved.slot}
                        base={saved.base}
                        seed={saved.id}
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

          <div className="gf-label ch-sectlabel">stats</div>
          <div className="ch-stats">
            {STAT_IDS.map((s) => (
              <div key={s} className="ch-stat">
                <span>{STAT_NAMES[s].toLowerCase()}</span>
                <span>
                  {statBase}
                  {bonuses[s] > 0 && <span className="ch-bonus"> (+{bonuses[s]})</span>}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="ch-panel" aria-label="Loot">
          {chests.length > 0 && (
            <>
              <div className="gf-label">chests</div>
              <div className="ch-chests">
                {chests.map((c) => (
                  <button key={c.id} className="ch-chestbtn" onClick={(e) => onOpenChest(c, e)}>
                    <PixelItem kind="chest" seed={c.id} rarity="common" cell={4} />
                    <span>from {chestSourceLabel(c.src)}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="gf-label ch-sectlabel">inventory</div>
          {inventory.length === 0 ? (
            <div className="gf-dim">
              {items.length === 0 && chests.length === 0
                ? 'your pack is empty; chests drop as you explore the site'
                : chests.length > 0
                  ? 'nothing unequipped, but a chest waits'
                  : 'everything you own is equipped'}
            </div>
          ) : (
            <div className="ch-inv">
              {inventory.map((it) => (
                <div key={it.id} className={`ch-invwrap bg-rar-${it.rarity}`}>
                  <button
                    className="ch-invbtn"
                    onClick={() => setSelected(it.id)}
                    aria-label={resolveItem(it).name}
                  >
                    <PixelItem kind={it.slot} base={it.base} seed={it.id} rarity={it.rarity} cell={3} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {selectedItem && (
          <aside className="ch-card" aria-label="Item details">
            <button className="ch-card-close" onClick={() => setSelected(null)} aria-label="Close">
              ×
            </button>
            <PixelItem
              kind={selectedItem.slot}
              base={selectedItem.base}
              seed={selectedItem.id}
              rarity={selectedItem.rarity}
              cell={6}
            />
            <div className="ch-card-body">
              <div className={`ch-card-name rar-${selectedItem.rarity}`}>{selectedItem.name}</div>
              <div className="ch-card-meta">
                {selectedItem.rarity} · {selectedItem.baseName.toLowerCase()} ·{' '}
                {SLOT_LABELS[selectedItem.slot]}
                {selectedEquipped ? ' · equipped' : ''}
              </div>
              <div className="ch-card-stats">
                {STAT_IDS.filter((s) => selectedItem.stats[s] != null).map((s) => (
                  <span key={s} className="ch-statline">
                    +{selectedItem.stats[s]} {STAT_NAMES[s]}
                  </span>
                ))}
              </div>
              <div className="ch-card-actions">
                <button
                  className="ch-btn"
                  onClick={() => {
                    if (selectedEquipped) unequipSlot(selectedItem.slot)
                    else equipItem(selectedItem.id)
                    setSelected(null)
                  }}
                >
                  {selectedEquipped ? 'Unequip' : 'Equip'}
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      <ChestRevealModal item={revealed} onClose={() => setRevealed(null)} />
    </div>
  )
}
