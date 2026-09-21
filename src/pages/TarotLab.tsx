/**
 * Tarot reader (/lab/tarot)
 *
 * A chat with the Reader. Ask anything about your life or the cards; she
 * draws when a draw would help (server-side, from the real 78-card deck)
 * and the cards land in her message. One conversation, saved in this
 * browser; "New sitting" clears it.
 *
 * Layout (top to bottom): header bar (avatar, title, New sitting, close),
 * the thread (empty state with starters, or messages), and the composer
 * pinned above the dock with the footnote under it. Built from scorp-ds
 * parts: Avatar, Button, ListRow, Card (the draw), Badge, Alert, Divider,
 * Input.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, Avatar, Button, Divider, Input, ListRow } from '@scorp-ds/components'
import { useNavigate } from 'react-router-dom'
import DitherIcon from '../components/DitherIcon'
import { TileBox } from '../components/TileSprite'
import CardStrip from '../components/tarot/CardStrip'
import { TAROT_BACK, TAROT_TILE_H, TAROT_TILE_W } from '../game/tarotTiles'
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

const ERRORS: Record<Exclude<AskError, 'cap'>, { title: string; description: string; retry: boolean }> = {
  failed: { title: 'The candle gutters', description: 'The Reader lost the thread. Your message is safe.', retry: true },
  rate_limited: { title: 'The Reader needs a moment', description: 'Too many questions at once. Try again shortly.', retry: true },
  unavailable: { title: 'The Reader is away', description: 'The parlor is closed right now. Come back later.', retry: false },
}

const ReaderAvatar = ({ size }: { size: 'small' | 'medium' }) => (
  <Avatar size={size} icon={<DitherIcon name="moon" size={size === 'small' ? 12 : 16} />} alt="" />
)

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
  const empty = messages.length === 0
  const handheld = typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches

  useEffect(() => {
    award(XP_AWARDS.lab, 'entered the tarot parlor', 'lab:tarot')
  }, [award])

  useEffect(() => {
    if (!busy) saveConversation(messages)
  }, [messages, busy])

  useEffect(() => () => abortRef.current?.abort(), [])

  // Follow the conversation as it grows.
  useEffect(() => {
    if (empty) return
    endRef.current?.scrollIntoView({ block: 'end', behavior: busy ? 'auto' : 'smooth' })
  }, [messages, busy, error, empty])

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

  const errorInfo = error && error !== 'cap' ? ERRORS[error] : null

  return (
    <div className="tarot-page tarot-chat-page">
      {/* header bar: who you're talking to, and the two session controls */}
      <header className="tarot-bar">
        <div className="tarot-bar-id">
          <ReaderAvatar size="medium" />
          <div className="tarot-bar-text">
            <h1 className="tarot-title">The Reader</h1>
            <p className="tarot-sub">Tarot, one conversation at a time</p>
          </div>
        </div>
        <div className="tarot-bar-actions">
          {!empty && (
            <Button
              variant="secondary"
              size="small"
              type="button"
              className="tarot-new"
              onClick={newSitting}
              iconLeft={<DitherIcon name="plus" size={12} />}
            >
              {handheld ? 'New' : 'New sitting'}
            </Button>
          )}
          <Button variant="icon" size="icon" type="button" onClick={closePage} aria-label="Close tarot reader">
            <DitherIcon name="close" size={16} />
          </Button>
        </div>
      </header>

      <section className="tarot-thread" aria-label="Conversation with the Reader" aria-live="polite">
        {empty && (
          <div className="tarot-empty">
            <div className="tarot-fan" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <TileBox
                  key={i}
                  x={TAROT_BACK[0]}
                  y={TAROT_BACK[1]}
                  w={TAROT_TILE_W}
                  h={TAROT_TILE_H}
                  scale={2}
                  tint="var(--body)"
                  className={`tarot-fan-card f${i}`}
                />
              ))}
            </div>
            <div className="tarot-empty-copy">
              <h2 className="tarot-empty-title">What's on your mind?</h2>
              <p className="tarot-empty-sub">
                Ask the Reader anything. She'll draw from a real 78-card deck when the cards can help.
              </p>
            </div>
            <div className="tarot-starters">
              {STARTERS.map((s) => (
                <ListRow
                  key={s}
                  title={s}
                  onClick={() => send(s)}
                  thumb={<DitherIcon name="arrow-right" size={16} />}
                  thumbPosition="end"
                />
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) =>
          m.role === 'user' ? (
            <p key={i} className="tm tm-user">
              {m.text}
            </p>
          ) : (
            <div key={i} className="tm tm-reader">
              <ReaderAvatar size="small" />
              <div className="tm-body">
                {m.text && <p className="tm-text">{m.text}</p>}
                {m.draw && <CardStrip draw={m.draw} animate={i === liveIndex} />}
                {m.after && <p className="tm-text">{m.after}</p>}
                {busy && i === liveIndex && !m.text && !m.draw && <p className="tm-wait">The Reader considers…</p>}
                {busy && i === liveIndex && m.draw && !m.after && <p className="tm-wait">She studies the cards…</p>}
              </div>
            </div>
          ),
        )}

        {errorInfo && (
          <Alert
            variant="default"
            title={errorInfo.title}
            iconLeft={<DitherIcon name="warning" size={16} />}
            description={
              <span className="tarot-alert-body">
                <span>{errorInfo.description}</span>
                {errorInfo.retry && (
                  <Button variant="secondary" size="small" type="button" onClick={retry} disabled={busy}>
                    Ask again
                  </Button>
                )}
              </span>
            }
          />
        )}

        {closed && <Divider variant="withText" text="This sitting has run its course" spacing="small" />}
        <div ref={endRef} className="tarot-end" />
      </section>

      {/* composer: pinned above the dock; the footnote rides under it */}
      <div className="tarot-chatbar">
        <div className="tarot-chatbar-in">
          {closed ? (
            <Button variant="primary" type="button" className="tarot-restart" onClick={newSitting}>
              Begin a new sitting
            </Button>
          ) : (
            <form
              className="tarot-composer"
              onSubmit={(e) => {
                e.preventDefault()
                send(draft)
              }}
            >
              <Input
                ref={inputRef}
                aria-label="Message the Reader"
                type="text"
                value={draft}
                maxLength={USER_TEXT_MAX}
                placeholder={busy ? 'The Reader is speaking…' : 'Ask the Reader'}
                onChange={(e) => setDraft(e.target.value)}
              />
              <Button variant="primary" size="icon" type="submit" disabled={busy || !draft.trim()} aria-label="Send">
                <DitherIcon name="arrow-up" size={16} />
              </Button>
            </form>
          )}
          <p className="tarot-foot">
            {closed
              ? `Up to ${USER_TURNS_MAX} questions per sitting. Start fresh any time.`
              : 'For insight and entertainment. Sent to an AI provider for replies; saved only in this browser.'}
          </p>
        </div>
      </div>
    </div>
  )
}
