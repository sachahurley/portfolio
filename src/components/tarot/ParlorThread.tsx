/**
 * The thread transcript (spec §3.2): user lines, the Reader's prose (with
 * card-mention chips), quiet system lines, draw strips with tap-to-turn
 * cards, and the single open offer. Rendering only; every mutation goes
 * through the callbacks (TarotLab owns the state machine).
 *
 * Streaming: `stream` carries the in-flight Reader text and the id of the
 * message it will land in ('pending-reader' for a chat reply that has no
 * stored message yet; a draw message's id while its reading streams).
 */

import { Button } from '@scorp-ds/components'
import TarotCardView from './TarotCardView'
import CardMentionText from './CardMentionText'
import DrawOffer from './DrawOffer'
import { CARD_BY_ID, SPREADS } from '../../data/tarot'
import type { DrawnCard } from '../../lib/tarot/draw'
import type { Msg, Thread } from '../../lib/tarot/threads'

export const PENDING_READER = 'pending-reader'

export interface StreamState {
  targetId: string
  text: string
}

function drawnOf(msg: Extract<Msg, { kind: 'draw' }>): DrawnCard[] | null {
  const spread = SPREADS.find((s) => s.id === msg.spreadId)
  if (!spread) return null
  const drawn: DrawnCard[] = []
  for (const c of msg.cards) {
    const card = CARD_BY_ID.get(c.id)
    const position = spread.positions.find((p) => p.id === c.position)
    if (!card || !position) return null
    drawn.push({ card, position, reversed: c.reversed })
  }
  return drawn
}

export default function ParlorThread({
  thread,
  stream,
  pending,
  shuffling,
  busy,
  handheld,
  onReveal,
  onRetryCut,
  onCutOffer,
  onDeclineOffer,
}: {
  thread: Thread
  stream: StreamState | null
  /** The one draw whose cards are still being turned, with its flip state. */
  pending: { msgId: string; flipped: boolean[] } | null
  shuffling: boolean
  busy: boolean
  handheld: boolean
  onReveal: (index: number) => void
  onRetryCut: (msgId: string) => void
  onCutOffer: (offerId: string, question: string) => void
  onDeclineOffer: (offerId: string) => void
}) {
  return (
    <div className="parlor-thread" aria-live="polite">
      {thread.messages.map((m) => {
        switch (m.kind) {
          case 'user':
            return (
              <p key={m.id} className="pt-user">
                You: {m.text}
              </p>
            )
          case 'system':
            return (
              <p key={m.id} className="pt-system">
                {m.text}
              </p>
            )
          case 'reader':
            return (
              <div key={m.id} className="pt-reader">
                <CardMentionText text={m.text} />
              </div>
            )
          case 'offer': {
            if (m.status === 'cut') return null
            if (m.status === 'declined')
              return (
                <p key={m.id} className="pt-system">
                  An offer of the cards, set aside.
                </p>
              )
            return (
              <DrawOffer
                key={m.id}
                spreadId={m.spreadId}
                question={m.question}
                disabled={busy}
                onCut={(q) => onCutOffer(m.id, q)}
                onDecline={() => onDeclineOffer(m.id)}
              />
            )
          }
          case 'draw': {
            const drawn = drawnOf(m)
            if (!drawn) return null
            const isPending = pending?.msgId === m.id
            const flipped = isPending ? pending.flipped : drawn.map(() => true)
            const streamingHere = stream?.targetId === m.id
            const readingText = streamingHere ? stream.text : m.reading?.text
            return (
              <div key={m.id} className="pt-draw">
                {m.question && <p className="pt-user">You ask: {m.question}</p>}
                <div
                  className={`tarot-cards n${drawn.length}${isPending && shuffling ? ' shuffling' : ''}`}
                >
                  {drawn.map((d, i) => (
                    <TarotCardView
                      key={d.card.id}
                      drawn={d}
                      faceUp={flipped[i]}
                      scale={handheld ? 3 : 4}
                      onReveal={
                        isPending && !shuffling
                          ? () => {
                              if (!flipped[i]) onReveal(i)
                            }
                          : undefined
                      }
                    />
                  ))}
                </div>
                {isPending && !shuffling && !flipped.every(Boolean) && (
                  <p className="pt-system">Tap a card to turn it.</p>
                )}
                {readingText != null && (
                  <div className="pt-reader">
                    <CardMentionText text={readingText} />
                  </div>
                )}
                {m.reading?.failed && !busy && (
                  <div className="pt-retry">
                    <Button variant="ghost" type="button" onClick={() => onRetryCut(m.id)}>
                      Ask the cards again
                    </Button>
                  </div>
                )}
              </div>
            )
          }
        }
      })}
      {stream?.targetId === PENDING_READER && (
        <div className="pt-reader">
          <CardMentionText text={stream.text} />
        </div>
      )}
    </div>
  )
}
