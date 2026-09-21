/**
 * The composer's Draw flow (spec §3.3.5): the visitor forces a draw
 * without waiting for an offer. Spread chips (the established
 * .tarot-spread recipe), an optional question, cut or never mind.
 * Locked spreads show dimmed with the level that opens them (§6.3);
 * the server enforces the same gate from the visitor's XP.
 */

import { useState } from 'react'
import { Button, Input } from '@scorp-ds/components'
import { SPREADS } from '../../data/tarot'
import { QUESTION_MAX, type SpreadId } from '../../lib/tarot/contract'

export default function SpreadPicker({
  unlocked,
  disabled,
  onCut,
  onClose,
}: {
  unlocked: SpreadId[]
  disabled?: boolean
  onCut: (spreadId: SpreadId, question: string) => void
  onClose: () => void
}) {
  const [spreadId, setSpreadId] = useState<SpreadId>(unlocked[0] ?? 'one')
  const [asked, setAsked] = useState('')
  const canCut = unlocked.includes(spreadId)
  return (
    <div className="pt-offer" role="group" aria-label="Choose a spread">
      <div className="tarot-spreads pt-spreads-grid" role="radiogroup" aria-label="Spread">
        {SPREADS.map((s) => {
          const open = unlocked.includes(s.id)
          if (!open) {
            return (
              <span key={s.id} className="tarot-spread pt-spread-locked" aria-disabled="true">
                <span className="ts-name">{s.name}</span>
                <span className="ts-desc">Unlocks at Level {s.level}.</span>
              </span>
            )
          }
          return (
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
          )
        })}
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
        <Button
          variant="primary"
          type="button"
          disabled={disabled || !canCut}
          onClick={() => onCut(spreadId, asked.trim())}
        >
          Cut the deck
        </Button>
        <Button variant="ghost" type="button" disabled={disabled} onClick={onClose}>
          Never mind
        </Button>
      </div>
    </div>
  )
}
