/**
 * Tarot reader (/lab/tarot)
 *
 * A full-screen parlor where a pixel mystic deals a real 78-card draw and
 * reads the visitor: their level title, the places they have walked, the
 * gear they carry, the hour. The reading itself comes from the serverless
 * /api/tarot (a cheap LLM in a sincere-mystic register); every failure,
 * rate limit, or timeout silently swaps in the canned fallback reading, so
 * the parlor never breaks and never shows an error.
 *
 * Choreography hides latency: cards are drawn client-side the moment the
 * visitor commits, the API call departs in parallel, and the shuffle/flip
 * theater plays while it travels. Text then types out per section.
 */

import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { Button, Input } from '@scorp-ds/components'
import { useNavigate } from 'react-router-dom'
import DitherIcon from '../components/DitherIcon'
import TarotCardView from '../components/tarot/TarotCardView'
import TarotScene from '../components/tarot/TarotScene'
import Typewriter from '../components/tarot/Typewriter'
import { SPREADS, CARD_BY_ID, type SpreadDef } from '../data/tarot'
import { drawSpread, type DrawnCard } from '../lib/tarot/draw'
import { chatFallback, fallbackReading } from '../lib/tarot/fallbackReading'
import { requestChat, requestReading } from '../lib/tarot/client'
import { summarizeVisitor } from '../lib/tarot/summarizeVisitor'
import {
  CHAT_MESSAGE_MAX,
  CHAT_TURNS_MAX,
  QUESTION_MAX,
  type ChatExchange,
  type Reading,
  type TarotChatRequest,
} from '../lib/tarot/contract'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

/** Client half of the rate limiting: one draw per cooldown window. */
const COOLDOWN_MS = 30_000
const LAST_KEY = 'sh_tarot_last'

const SHUFFLE_MS = 1200
const AFTER_FLIPS_MS = 500

type Status = 'idle' | 'shuffling' | 'revealing' | 'reading' | 'done'

interface State {
  status: Status
  spread: SpreadDef | null
  drawn: DrawnCard[]
  /** Per-card face-up flags: the visitor taps each card to turn it. */
  flipped: boolean[]
  reading: Reading | null
  /** Which reading section is currently typing (greeting=0, cards=1..n,
   *  synthesis=n+1, farewell=n+2). */
  section: number
}

type Action =
  | { type: 'begin'; spread: SpreadDef; drawn: DrawnCard[] }
  | { type: 'shuffled' }
  | { type: 'reveal'; index: number }
  | { type: 'reading'; reading: Reading }
  | { type: 'section-done' }
  | { type: 'reset' }

const initial: State = { status: 'idle', spread: null, drawn: [], flipped: [], reading: null, section: 0 }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'begin':
      return {
        ...initial,
        status: 'shuffling',
        spread: action.spread,
        drawn: action.drawn,
        flipped: action.drawn.map(() => false),
      }
    case 'shuffled':
      return { ...state, status: 'revealing' }
    case 'reveal':
      return { ...state, flipped: state.flipped.map((f, i) => (i === action.index ? true : f)) }
    case 'reading':
      return { ...state, status: 'reading', flipped: state.flipped.map(() => true), reading: action.reading }
    case 'section-done': {
      const total = state.drawn.length + 3
      const section = state.section + 1
      return section >= total
        ? { ...state, section, status: 'done' }
        : { ...state, section }
    }
    case 'reset':
      return initial
  }
}

function readLast(): number {
  try {
    return Number(localStorage.getItem(LAST_KEY)) || 0
  } catch {
    return 0
  }
}

export default function TarotLab() {
  usePageTitle('Tarot reader')
  const navigate = useNavigate()
  const { award, logLine, xp, gems, items, equipment, isReturning, getEarned } = useXp()
  const [state, dispatch] = useReducer(reducer, initial)
  const [spreadId, setSpreadId] = useState<SpreadDef['id']>('one')
  const [question, setQuestion] = useState('')
  const [skipAll, setSkipAll] = useState(false)
  const [cooldownLeft, setCooldownLeft] = useState(0)
  // Chatting with the Reader about the finished reading (capped audience;
  // any failure closes the chat with an in-fiction final line).
  const [exchanges, setExchanges] = useState<ChatExchange[]>([])
  const [chatMsg, setChatMsg] = useState('')
  const [chatState, setChatState] = useState<'open' | 'waiting' | 'closed'>('open')
  const readingRef = useRef<Reading | null>(null)
  const waitingRef = useRef(false)
  const timersRef = useRef<number[]>([])

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  // Matches the stylesheet's 600px card-size step so JS and CSS agree.
  const handheld =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches

  // Dedicated lab pages award their own visit XP (the LabItem template only
  // covers template-rendered experiments).
  useEffect(() => {
    award(XP_AWARDS.lab, 'entered the tarot parlor', 'lab:tarot')
  }, [award])

  // Close: back into history when the visitor came from the site, else /lab.
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

  // Clear pending theater timers on unmount.
  useEffect(
    () => () => {
      timersRef.current.forEach((t) => window.clearTimeout(t))
    },
    [],
  )

  // Cooldown ticker (only runs while one is active).
  useEffect(() => {
    const update = () => setCooldownLeft(Math.max(0, readLast() + COOLDOWN_MS - Date.now()))
    update()
    const iv = window.setInterval(update, 1000)
    return () => window.clearInterval(iv)
  }, [state.status])

  // Keep the newest typed section in view as the reading unrolls (chat
  // replies included).
  const readingEndRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (state.status !== 'reading' && state.status !== 'done') return
    readingEndRef.current?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'end',
    })
  }, [state.status, state.section, exchanges.length, reduced])

  // Hand-off to the reading once every card has been turned: a short beat,
  // then either the reading that already arrived or a waiting flag its
  // .then() checks. (The request departed when the visitor committed.)
  const allFlipped = state.drawn.length > 0 && state.flipped.every(Boolean)
  useEffect(() => {
    if (state.status !== 'revealing' || !allFlipped) return
    const t = window.setTimeout(
      () => {
        if (readingRef.current) dispatch({ type: 'reading', reading: readingRef.current })
        else waitingRef.current = true
      },
      reduced ? 0 : AFTER_FLIPS_MS,
    )
    timersRef.current.push(t)
  }, [state.status, allFlipped, reduced])

  // First finished reading pays out (and, being a lab: key, may roll a chest).
  const paidRef = useRef(false)
  useEffect(() => {
    if (state.status !== 'done' || paidRef.current) return
    paidRef.current = true
    award(XP_AWARDS.tarot, 'received a reading', 'lab:tarot-reading')
  }, [state.status, award])

  const later = (fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms))
  }

  const begin = () => {
    if (state.status !== 'idle' && state.status !== 'done') return
    if (cooldownLeft > 0 && state.status === 'done') return
    const spread = SPREADS.find((s) => s.id === spreadId) ?? SPREADS[0]
    const drawn = drawSpread(spread)
    const q = question.trim().slice(0, QUESTION_MAX)
    setSkipAll(false)
    setExchanges([])
    setChatMsg('')
    setChatState('open')
    readingRef.current = null
    waitingRef.current = false
    try {
      localStorage.setItem(LAST_KEY, String(Date.now()))
    } catch {
      /* private mode: the server still enforces its own limits */
    }
    dispatch({ type: 'begin', spread, drawn })
    logLine('The Reader lays out the cards.', 'arrive')

    // The request departs while the theater plays. Every failure becomes
    // the canned reading; the visitor never sees the difference announced.
    const payload = {
      spread: spread.id,
      question: q || undefined,
      cards: drawn.map((d) => ({
        id: d.card.id,
        name: d.card.name,
        position: d.position.id,
        reversed: d.reversed,
      })),
      visitor: summarizeVisitor({ xp, earned: getEarned(), gems, items, equipment, isReturning }),
    }
    requestReading(payload)
      .catch(() => {
        if (import.meta.env.DEV) console.info('[tarot] using fallback reading')
        return fallbackReading(drawn)
      })
      .then((reading) => {
        readingRef.current = reading
        if (waitingRef.current) dispatch({ type: 'reading', reading })
      })

    // Theater: shuffle, then the cards wait for the visitor's taps; the
    // all-flipped effect hands off to the reading.
    if (reduced) {
      // No animation: cards appear face up at once; text arrives whole.
      dispatch({ type: 'shuffled' })
      drawn.forEach((_, i) => dispatch({ type: 'reveal', index: i }))
      return
    }
    later(() => dispatch({ type: 'shuffled' }), SHUFFLE_MS)
  }

  const { status, drawn, flipped, reading, section } = state
  const inSession = status !== 'idle'
  const asked = question.trim().slice(0, QUESTION_MAX)
  const cardName = (cardId: string, reversed: boolean) => {
    const card = CARD_BY_ID.get(cardId)
    return card ? `${card.name}${reversed ? ', reversed' : ''}` : cardId
  }

  // Ask the Reader a follow-up about the finished reading. One in flight at
  // a time (the bar disables while waiting); any failure closes the chat
  // with an in-fiction final line, the parlor's no-error rule.
  const ask = () => {
    const msg = chatMsg.trim().slice(0, CHAT_MESSAGE_MAX)
    if (!msg || chatState !== 'open' || status !== 'done' || !reading || !state.spread) return
    const turn = exchanges.length + 1
    setChatState('waiting')
    setChatMsg('')
    const payload: TarotChatRequest = {
      spread: state.spread.id,
      question: asked || undefined,
      cards: drawn.map((d) => ({
        id: d.card.id,
        name: d.card.name,
        position: d.position.id,
        reversed: d.reversed,
      })),
      visitor: summarizeVisitor({ xp, earned: getEarned(), gems, items, equipment, isReturning }),
      reading,
      exchanges,
      message: msg,
    }
    requestChat(payload)
      .then((reply) => {
        setExchanges((prev) => [...prev, { question: msg, reply }])
        setChatState(turn >= CHAT_TURNS_MAX ? 'closed' : 'open')
      })
      .catch(() => {
        setExchanges((prev) => [...prev, { question: msg, reply: chatFallback() }])
        setChatState('closed')
      })
  }

  return (
    <div className={`tarot-page${status === 'done' && reading ? ' has-chat' : ''}`}>
      {/* .ch-close is a layout hook only; the control is the DS icon Button */}
      <Button variant="icon" size="icon" type="button" className="ch-close" onClick={closePage} aria-label="Close tarot reader">
        <DitherIcon name="close" size={16} />
      </Button>

      <TarotScene />

      <header className="tarot-head">
        <h1 className="tarot-title">The Reader</h1>
        <p className="tarot-sub">
          {inSession
            ? status === 'done'
              ? 'The cards rest.'
              : status === 'revealing' && !allFlipped
                ? 'Tap a card to turn it.'
                : 'The cards are speaking.'
            : 'A real draw from a full 78-card deck, read for whoever sits down.'}
        </p>
      </header>

      {!inSession && (
        <section className="tarot-setup" aria-label="Choose your reading">
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
          <div className="tarot-ask">
            <Input
              label="A question for the cards (optional)"
              type="text"
              value={question}
              maxLength={QUESTION_MAX}
              placeholder="Ask, or let the cards decide."
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={begin} disabled={cooldownLeft > 0}>
            {cooldownLeft > 0 ? `The deck rests (${Math.ceil(cooldownLeft / 1000)}s)` : 'Draw the cards'}
          </Button>
          <p className="tarot-note">For insight and entertainment; the walking is still yours.</p>
        </section>
      )}

      {inSession && (
        <section className="tarot-table" aria-label="The spread">
          <div className={`tarot-cards n${drawn.length}${status === 'shuffling' ? ' shuffling' : ''}`}>
            {drawn.map((d, i) => (
              <TarotCardView
                key={d.card.id}
                drawn={d}
                faceUp={flipped[i]}
                scale={handheld ? 3 : 4}
                onReveal={() => {
                  if (status === 'revealing' && !flipped[i]) dispatch({ type: 'reveal', index: i })
                }}
              />
            ))}
          </div>

          {(status === 'reading' || status === 'done') && reading && (
            <div
              className="tarot-reading"
              onClick={() => setSkipAll(true)}
              title={status === 'reading' ? 'Tap to reveal the whole reading' : undefined}
            >
              {asked && <p className="tr-asked">You asked: {asked}</p>}
              <p className="tr-text">
                <Typewriter
                  text={reading.greeting}
                  active
                  skip={skipAll}
                  onDone={() => dispatch({ type: 'section-done' })}
                />
              </p>
              {reading.cards.map((c, i) => (
                <div key={c.position} className="tr-section">
                  {section >= i + 1 && (
                    <h2 className="tr-head">
                      {drawn[i]?.position.label} · {cardName(c.cardId, drawn[i]?.reversed ?? false)}
                    </h2>
                  )}
                  <p className="tr-text">
                    <Typewriter
                      text={c.text}
                      active={section >= i + 1}
                      skip={skipAll}
                      onDone={() => dispatch({ type: 'section-done' })}
                    />
                  </p>
                </div>
              ))}
              <p className="tr-text tr-synth">
                <Typewriter
                  text={reading.synthesis}
                  active={section >= drawn.length + 1}
                  skip={skipAll}
                  onDone={() => dispatch({ type: 'section-done' })}
                />
              </p>
              <p className="tr-text tr-farewell">
                <Typewriter
                  text={reading.farewell}
                  active={section >= drawn.length + 2}
                  skip={skipAll}
                  onDone={() => dispatch({ type: 'section-done' })}
                />
              </p>
              {/* Follow-up audience with the Reader, typed like the reading */}
              {exchanges.map((e, i) => (
                <div key={i} className="tr-section tr-chat">
                  <p className="tr-asked">You ask: {e.question}</p>
                  <p className="tr-text">
                    <Typewriter text={e.reply} active skip={skipAll} />
                  </p>
                </div>
              ))}
              {status === 'reading' && !skipAll && (
                <p className="tr-skiphint">tap the reading to reveal it all</p>
              )}
              <div ref={readingEndRef} />
            </div>
          )}

          {status === 'done' && (
            <div className="tarot-again">
              <Button
                variant="primary"
                onClick={() => dispatch({ type: 'reset' })}
                disabled={cooldownLeft > 0}
              >
                {cooldownLeft > 0 ? `The deck rests (${Math.ceil(cooldownLeft / 1000)}s)` : 'Ask again'}
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Footer chat bar: ask the Reader about the finished reading (the
          replies land in the reading column above). DS Input + Button on
          the ring-recipe plate. */}
      {status === 'done' && reading && (
        <form
          className="tarot-chatbar"
          onSubmit={(e) => {
            e.preventDefault()
            ask()
          }}
        >
          <div className="tarot-chatbar-in">
            <Input
              aria-label="Ask the Reader about your reading"
              type="text"
              value={chatMsg}
              maxLength={CHAT_MESSAGE_MAX}
              placeholder={
                chatState === 'closed'
                  ? 'The Reader has said what she will say.'
                  : chatState === 'waiting'
                    ? 'The Reader considers…'
                    : 'Ask the Reader about your reading'
              }
              disabled={chatState !== 'open'}
              onChange={(e) => setChatMsg(e.target.value)}
            />
            <Button variant="primary" type="submit" disabled={chatState !== 'open' || !chatMsg.trim()}>
              Ask
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
