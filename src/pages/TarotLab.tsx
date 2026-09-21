/**
 * Tarot reader (/lab/tarot)
 *
 * A chat with the Reader. Ask anything about your life or the cards; she
 * draws when a draw would help (server-side, from the real 78-card deck)
 * and the cards land in her message. One conversation, saved in this
 * browser; "New sitting" clears it.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Input } from '@scorp-ds/components'
import { useNavigate } from 'react-router-dom'
import DitherIcon from '../components/DitherIcon'
import CardStrip from '../components/tarot/CardStrip'
import TarotScene from '../components/tarot/TarotScene'
import { askReader, loadConversation, saveConversation, type AskError } from '../lib/tarot/chat'
import { USER_TEXT_MAX, USER_TURNS_MAX, type ChatMessage } from '../lib/tarot/contract'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

type ReaderMsg = Extract<ChatMessage, { role: 'reader' }>

const STARTERS = [
  'Pull a card for my day',
  'Do a three-card reading on my career',
  'What does the Tower mean?',
]

const ERROR_LINES: Record<AskError, string> = {
  failed: 'The candle gutters and the Reader loses the thread.',
  rate_limited: 'The Reader needs a moment to rest. Try again shortly.',
  unavailable: 'The Reader is away from the parlor right now.',
  cap: 'This sitting has run its course. Begin a new one to keep going.',
}

export default function TarotLab() {
  usePageTitle('Tarot reader')
  const navigate = useNavigate()
  const { award } = useXp()
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadConversation())
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<AskError | null>(null)
  /** Index of the Reader message streaming right now (its cards animate). */
  const [liveIndex, setLiveIndex] = useState<number | null>(null)
  const abortRef = useRef<AbortController | null>(null)
  const endRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const userTurns = messages.filter((m) => m.role === 'user').length
  const closed = userTurns >= USER_TURNS_MAX || error === 'cap'

  useEffect(() => {
    award(XP_AWARDS.lab, 'entered the tarot parlor', 'lab:tarot')
  }, [award])

  useEffect(() => {
    if (!busy) saveConversation(messages)
  }, [messages, busy])

  useEffect(() => () => abortRef.current?.abort(), [])

  // Follow the conversation as it grows.
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end', behavior: busy ? 'auto' : 'smooth' })
  }, [messages, busy, error])

  const closePage = useCallback(() => {
    const s = window.history.state as { idx?: number } | null
    if (s?.idx && s.idx > 0) navigate(-1)
    else navigate('/lab')
  }, [navigate])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePage()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closePage])

  /** Stream a Reader reply to `history` (which ends on the user's turn). */
  const run = async (history: ChatMessage[]) => {
    const readerIndex = history.length
    const reply: ReaderMsg = { role: 'reader', text: '' }
    setMessages([...history, reply])
    setLiveIndex(readerIndex)
    setBusy(true)
    setError(null)
    const ctrl = new AbortController()
    abortRef.current = ctrl

    const update = (patch: Partial<ReaderMsg>) => {
      Object.assign(reply, patch)
      setMessages((prev) => prev.map((m, i) => (i === readerIndex ? { ...reply } : m)))
    }

    try {
      await askReader(
        history,
        history.filter((m) => m.role === 'user').length,
        (e) => {
          if (e.t === 'text') {
            if (reply.draw) update({ after: (reply.after ?? '') + e.d })
            else update({ text: reply.text + e.d })
          } else if (e.t === 'draw') {
            update({ draw: e.draw })
            award(XP_AWARDS.tarot, 'received a reading', 'lab:tarot-reading')
          }
        },
        ctrl.signal,
      )
    } catch (err) {
      if (ctrl.signal.aborted) return
      setError(typeof err === 'string' ? (err as AskError) : 'failed')
      // Drop an empty reply; keep partial text so nothing said is lost.
      if (!reply.text.trim() && !reply.draw) setMessages(history)
    } finally {
      if (abortRef.current === ctrl) {
        abortRef.current = null
        setBusy(false)
      }
    }
  }

  const send = (text: string) => {
    const msg = text.trim().slice(0, USER_TEXT_MAX)
    if (!msg || busy || closed) return
    setDraft('')
    void run([...messages, { role: 'user', text: msg }])
  }

  /** Re-ask after a failure: resend up to the last user message. */
  const retry = () => {
    if (busy) return
    let lastUser = messages.length - 1
    while (lastUser >= 0 && messages[lastUser].role !== 'user') lastUser--
    if (lastUser < 0) return
    void run(messages.slice(0, lastUser + 1))
  }

  const newSitting = () => {
    abortRef.current?.abort()
    abortRef.current = null
    setBusy(false)
    setError(null)
    setLiveIndex(null)
    setMessages([])
    setDraft('')
    inputRef.current?.focus()
  }

  const empty = messages.length === 0

  return (
    <div className="tarot-page tarot-chat-page">
      <Button variant="icon" size="icon" type="button" className="ch-close" onClick={closePage} aria-label="Close tarot reader">
        <DitherIcon name="close" size={16} />
      </Button>

      <TarotScene />

      <header className="tarot-head">
        <h1 className="tarot-title">The Reader</h1>
        <p className="tarot-sub">
          {empty ? 'Sit down, ask her anything. She reads a real 78-card deck.' : 'The candles are lit.'}
        </p>
        {!empty && (
          <Button variant="ghost" size="small" type="button" className="tarot-new" onClick={newSitting}>
            New sitting
          </Button>
        )}
      </header>

      <section className="tarot-thread" aria-label="Conversation with the Reader" aria-live="polite">
        {empty && (
          <div className="tarot-starters">
            {STARTERS.map((s) => (
              <button key={s} type="button" className="tarot-chip" onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((m, i) =>
          m.role === 'user' ? (
            <p key={i} className="tm tm-user">
              {m.text}
            </p>
          ) : (
            <div key={i} className="tm tm-reader">
              {m.text && <p className="tm-text">{m.text}</p>}
              {m.draw && <CardStrip draw={m.draw} animate={i === liveIndex} />}
              {m.after && <p className="tm-text">{m.after}</p>}
              {busy && i === liveIndex && !m.text && !m.draw && <p className="tm-wait">The Reader considers…</p>}
              {busy && i === liveIndex && m.draw && !m.after && <p className="tm-wait">She studies the cards…</p>}
            </div>
          ),
        )}

        {error && (
          <div className="tm tm-system">
            <p>{ERROR_LINES[error]}</p>
            {(error === 'failed' || error === 'rate_limited') && (
              <Button variant="secondary" size="small" type="button" onClick={retry} disabled={busy}>
                Ask again
              </Button>
            )}
          </div>
        )}
        {closed && error !== 'cap' && <p className="tm tm-system">{ERROR_LINES.cap}</p>}
        <p className="tarot-note">
          For insight and entertainment. Messages are sent to an AI provider to generate replies and saved only in this
          browser.
        </p>
        <div ref={endRef} className="tarot-end" />
      </section>

      <form
        className="tarot-chatbar"
        onSubmit={(e) => {
          e.preventDefault()
          if (closed) newSitting()
          else send(draft)
        }}
      >
        <div className="tarot-chatbar-in">
          <Input
            ref={inputRef}
            aria-label="Message the Reader"
            type="text"
            value={draft}
            maxLength={USER_TEXT_MAX}
            placeholder={closed ? 'This sitting is over.' : busy ? 'The Reader is speaking…' : 'Ask the Reader'}
            disabled={closed}
            onChange={(e) => setDraft(e.target.value)}
          />
          <Button variant="primary" type="submit" disabled={closed ? false : busy || !draft.trim()}>
            {closed ? 'New sitting' : 'Ask'}
          </Button>
        </div>
      </form>
    </div>
  )
}
