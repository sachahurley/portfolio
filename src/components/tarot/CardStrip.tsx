/**
 * The cards of one draw, shown inside the Reader's message. They land face
 * down and turn over one by one (instantly under reduced motion).
 */

import { useEffect, useState } from 'react'
import TarotCardView from './TarotCardView'
import { CARD_BY_ID, SPREADS } from '../../data/tarot'
import type { Draw } from '../../lib/tarot/contract'
import type { DrawnCard } from '../../lib/tarot/draw'

const FLIP_GAP_MS = 350

export default function CardStrip({ draw, animate }: { draw: Draw; animate: boolean }) {
  const spread = SPREADS.find((s) => s.id === draw.spread)
  const drawn: DrawnCard[] = draw.cards.flatMap((c) => {
    const card = CARD_BY_ID.get(c.id)
    const position = spread?.positions.find((p) => p.id === c.position)
    return card && position ? [{ card, position, reversed: c.reversed }] : []
  })
  const [shown, setShown] = useState(animate ? 0 : drawn.length)

  useEffect(() => {
    if (shown >= drawn.length) return
    const t = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 250 : FLIP_GAP_MS)
    return () => window.clearTimeout(t)
  }, [shown, drawn.length])

  const handheld = typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches
  return (
    <div className={`tarot-cards tarot-strip n${drawn.length}`}>
      {drawn.map((d, i) => (
        <TarotCardView key={d.card.id} drawn={d} faceUp={i < shown} scale={handheld ? 2 : 3} />
      ))}
    </div>
  )
}
