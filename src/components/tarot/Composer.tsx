/**
 * The parlor's composer (spec §3.1): fixed above the dock on the
 * established chat-bar plate. Ask sends a message, Draw opens the spread
 * picker (rendered by the parent above this bar). A closed thread swaps
 * the whole bar for "Begin a new sitting"; a rate-limit breather counts
 * down in the placeholder.
 */

import { useState } from 'react'
import { Button, Input } from '@scorp-ds/components'
import { PARLOR_MESSAGE_MAX } from '../../lib/tarot/contract'

export default function Composer({
  closed,
  busy,
  breatherLeft,
  quote,
  onSend,
  onToggleDraw,
  onNewSitting,
  onClearQuote,
}: {
  closed: boolean
  busy: boolean
  /** Seconds until a rate-limited parlor accepts the next ask. */
  breatherLeft: number
  /** Quote-to-ask (spec §3.6): selected reading text riding as context. */
  quote: string | null
  onSend: (text: string) => void
  onToggleDraw: () => void
  onNewSitting: () => void
  onClearQuote: () => void
}) {
  const [text, setText] = useState('')
  const waiting = busy || breatherLeft > 0

  if (closed) {
    return (
      <div className="tarot-chatbar">
        <div className="tarot-chatbar-in pt-composer-closed">
          <p className="pt-system">The Reader has said what she will say.</p>
          <Button variant="primary" type="button" onClick={onNewSitting}>
            Begin a new sitting
          </Button>
        </div>
      </div>
    )
  }

  const send = () => {
    const msg = text.trim()
    if (!msg || waiting) return
    setText('')
    onSend(msg)
  }

  return (
    <form
      className="tarot-chatbar"
      onSubmit={(e) => {
        e.preventDefault()
        send()
      }}
    >
      {quote && (
        <div className="pt-quote">
          <span className="pt-quote-text">About: “{quote}”</span>
          <button type="button" className="pt-act" onClick={onClearQuote} aria-label="Drop the quote">
            drop
          </button>
        </div>
      )}
      <div className="tarot-chatbar-in">
        <Button variant="secondary" type="button" onClick={onToggleDraw} disabled={waiting}>
          Draw
        </Button>
        <Input
          aria-label="Speak to the Reader"
          type="text"
          value={text}
          maxLength={PARLOR_MESSAGE_MAX}
          placeholder={
            breatherLeft > 0
              ? `The Reader needs a moment (${breatherLeft}s)`
              : busy
                ? 'The Reader considers…'
                : 'Speak to the Reader'
          }
          disabled={waiting}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="primary" type="submit" disabled={waiting || !text.trim()}>
          Ask
        </Button>
      </div>
    </form>
  )
}
