/**
 * The compendium (spec §6.2): all 78 cards, discovered ones face up,
 * the rest card backs with a quiet question mark. A discovered card
 * opens its entry: art, both senses, how often it has come up, when it
 * first and last appeared, the sittings it appears in, and "Ask the
 * Reader about this card". Suit progress and the draw streak sit at the
 * top; completing a suit is its own reward (no XP, per the spec).
 */

import { useMemo, useState } from 'react'
import { Button } from '@scorp-ds/components'
import { TileBox } from '../TileSprite'
import { TAROT_DECK, type TarotCard } from '../../data/tarot'
import { TAROT_TILES, TAROT_BACK, TAROT_TILE_W, TAROT_TILE_H } from '../../game/tarotTiles'
import { loadCodex, suitProgress, SUITS } from '../../lib/tarot/codex'
import type { Thread } from '../../lib/tarot/threads'

const dateOf = (at: number) =>
  new Date(at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })

function CardFace({ card, scale, dim }: { card: TarotCard | null; scale: number; dim?: boolean }) {
  const cell = card ? TAROT_TILES[card.id] : TAROT_BACK
  if (!cell) return null
  return (
    <TileBox
      x={cell[0]}
      y={cell[1]}
      w={TAROT_TILE_W}
      h={TAROT_TILE_H}
      scale={scale}
      tint={dim ? 'var(--mut)' : 'var(--fg)'}
    />
  )
}

export default function CompendiumPanel({
  threads,
  onOpenThread,
  onAskAbout,
  onBack,
}: {
  threads: Thread[]
  onOpenThread: (thread: Thread) => void
  onAskAbout: (cardId: string) => void
  onBack: () => void
}) {
  // A snapshot per open is enough; the codex only moves when a cut lands.
  const codex = useMemo(() => loadCodex(), [])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = selectedId ? TAROT_DECK.find((c) => c.id === selectedId) ?? null : null
  const entry = selectedId ? codex.cards[selectedId] : undefined
  const appearsIn = useMemo(
    () =>
      selectedId
        ? threads.filter((t) =>
            t.messages.some((m) => m.kind === 'draw' && m.cards.some((c) => c.id === selectedId)),
          )
        : [],
    [threads, selectedId],
  )

  if (selected && entry) {
    return (
      <section className="tarot-ledger pt-comp" aria-label={`Compendium: ${selected.name}`}>
        <div className="pt-comp-detail">
          <div className="pt-comp-art">
            <CardFace card={selected} scale={4} />
          </div>
          <h2 className="pt-comp-name">{selected.name}</h2>
          <p className="pt-comp-stats">
            Drawn {entry.n} {entry.n === 1 ? 'time' : 'times'}
            {entry.rev > 0 && `, ${entry.rev} reversed`} · first {dateOf(entry.first)} · last{' '}
            {dateOf(entry.last)}
          </p>
          <div className="pt-comp-sense">
            <p className="pt-comp-head">Upright</p>
            <p className="pt-reader">{selected.meaningUp}</p>
            <p className="pt-comp-kw">{selected.keywordsUp.join(' · ')}</p>
          </div>
          <div className="pt-comp-sense">
            <p className="pt-comp-head">Reversed</p>
            <p className="pt-reader">{selected.meaningRev}</p>
            <p className="pt-comp-kw">{selected.keywordsRev.join(' · ')}</p>
          </div>
          {appearsIn.length > 0 && (
            <div className="pt-comp-sense">
              <p className="pt-comp-head">Appears in</p>
              <div className="pt-comp-threads">
                {appearsIn.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className="pt-act"
                    onClick={() => onOpenThread(t)}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="pt-offer-actions">
            <Button variant="primary" type="button" onClick={() => onAskAbout(selected.id)}>
              Ask the Reader about this card
            </Button>
            <Button variant="ghost" type="button" onClick={() => setSelectedId(null)}>
              Back to the compendium
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const progress = suitProgress(codex)
  const total = progress.reduce((sum, s) => sum + s.found, 0)

  return (
    <section className="tarot-ledger pt-comp" aria-label="Compendium">
      <p className="pt-comp-stats">
        {total} of 78 cards known
        {codex.streak > 1 && ` · a ${codex.streak}-day streak with the cards`}
        {codex.bestStreak > codex.streak && codex.bestStreak > 1 && ` (best ${codex.bestStreak})`}
      </p>
      {SUITS.map((suit) => {
        const cards = TAROT_DECK.filter((c) => c.id.startsWith(suit.prefix))
        const p = progress.find((x) => x.label === suit.label)
        const complete = p && p.found === p.size
        return (
          <div key={suit.prefix} className="pt-comp-suit">
            <p className="pt-comp-head">
              {suit.label} · {p?.found ?? 0}/{suit.size}
              {complete && <span className="pt-pin-mark"> ✦ complete</span>}
            </p>
            <div className="pt-comp-grid">
              {cards.map((card) => {
                const known = !!codex.cards[card.id]
                return known ? (
                  <button
                    key={card.id}
                    type="button"
                    className="pt-comp-cell"
                    onClick={() => setSelectedId(card.id)}
                    aria-label={card.name}
                    title={card.name}
                  >
                    <CardFace card={card} scale={2} />
                  </button>
                ) : (
                  <span key={card.id} className="pt-comp-cell unknown" aria-label="Unknown card">
                    <CardFace card={null} scale={2} dim />
                    <span className="pt-comp-q" aria-hidden="true">
                      ?
                    </span>
                  </span>
                )
              })}
            </div>
          </div>
        )
      })}
      <div className="tl-back">
        <Button variant="secondary" type="button" onClick={onBack}>
          Return to the table
        </Button>
      </div>
    </section>
  )
}
