/**
 * The composer's Draw flow (spec §3.3.5): the visitor forces a draw
 * without waiting for an offer. Spread chips (the established
 * .tarot-spread recipe), an optional question, cut or never mind.
 * Locked spreads will appear dimmed here in Phase 5; today every spread
 * ships unlocked.
 */

import { useState } from 'react'
import { Button, Input } from '@scorp-ds/components'
import { SPREADS } from '../../data/tarot'
import { QUESTION_MAX, type SpreadId } from '../../lib/tarot/contract'

export default function SpreadPicker({
  disabled,
  onCut,
  onClose,
}: {
  disabled?: boolean
  onCut: (spreadId: SpreadId, question: string) => void
  onClose: () => void
}) {
  const [spreadId, setSpreadId] = useState<SpreadId>('one')
  const [asked, setAsked] = useState('')
  return (
    <div className="pt-offer" role="group" aria-label="Choose a spread">
      <div className="tarot-spreads" role="radiogroup" aria-label="Spread">
        {SPREADS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={spreadId === s.id}
            className={`tarot-spread${spreadId === s.id ? ' sel' : ''}`}
            onClick={() => setSpreadId(s.id)}
          >
            <span className="ts-name">{s.name}</span>
            <span className="ts-desc">{s.desc}</span>
          </button>
        ))}
      </div>
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
        <Button variant="primary" type="button" disabled={disabled} onClick={() => onCut(spreadId, asked.trim())}>
          Cut the deck
        </Button>
        <Button variant="ghost" type="button" disabled={disabled} onClick={onClose}>
          Never mind
        </Button>
      </div>
    </div>
  )
}
