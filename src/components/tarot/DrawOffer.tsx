/**
 * The Reader's open offer (spec §3.2/§3.3): a plate naming the spread and
 * its positions, an editable question, and the choice: cut the deck or
 * not now. Only ever rendered for the thread's single open offer; past
 * offers collapse to a quiet line in the transcript.
 */

import { useState } from 'react'
import { Button, Input } from '@scorp-ds/components'
import { SPREADS } from '../../data/tarot'
import { QUESTION_MAX, type SpreadId } from '../../lib/tarot/contract'

export default function DrawOffer({
  spreadId,
  question,
  disabled,
  onCut,
  onDecline,
}: {
  spreadId: SpreadId
  question?: string
  disabled?: boolean
  onCut: (question: string) => void
  onDecline: () => void
}) {
  const [asked, setAsked] = useState(question ?? '')
  const spread = SPREADS.find((s) => s.id === spreadId)
  if (!spread) return null
  return (
    <div className="pt-offer" role="group" aria-label="The Reader offers a draw">
      <p className="pt-offer-name">{spread.name}</p>
      <p className="pt-offer-pos">{spread.positions.map((p) => p.label).join(' · ')}</p>
      <div className="pt-offer-ask">
        <Input
          aria-label="A question for the cards (optional)"
          type="text"
          value={asked}
          maxLength={QUESTION_MAX}
          placeholder="Ask, or let the cards decide."
          onChange={(e) => setAsked(e.target.value)}
          disabled={disabled}
        />
      </div>
      <div className="pt-offer-actions">
        <Button variant="primary" type="button" disabled={disabled} onClick={() => onCut(asked.trim())}>
          Cut the deck
        </Button>
        <Button variant="ghost" type="button" disabled={disabled} onClick={onDecline}>
          Not now
        </Button>
      </div>
    </div>
  )
}
