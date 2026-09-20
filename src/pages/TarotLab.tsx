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
import { fallbackReading } from '../lib/tarot/fallbackReading'
import { requestReading } from '../lib/tarot/client'
import { summarizeVisitor } from '../lib/tarot/summarizeVisitor'
import { QUESTION_MAX, type Reading } from '../lib/tarot/contract'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

/** Client half of the rate limiting: one draw per cooldown window. */
const COOLDOWN_MS = 30_000
const LAST_KEY = 'sh_tarot_last'

const SHUFFLE_MS = 1200
const FLIP_STAGGER_MS = 450
const AFTER_FLIPS_MS = 500

type Status = 'idle' | 'shuffling' | 'revealing' | 'reading' | 'done'

interface State {
  status: Status
  spread: SpreadDef | null
  drawn: DrawnCard[]
  revealed: number
  reading: Reading | null
  /** Which reading section is currently typing (greeting=0, cards=1..n,
   *  synthesis=n+1, farewell=n+2). */
  section: number
}

type Action =
  | { type: 'begin'; spread: SpreadDef; drawn: DrawnCard[] }
  | { type: 'shuffled' }
  | { type: 'reveal' }
  | { type: 'reading'; reading: Reading }
  | { type: 'section-done' }
  | { type: 'reset' }

const initial: State = { status: 'idle', spread: null, drawn: [], revealed: 0, reading: null, section: 0 }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'begin':
      return { ...initial, status: 'shuffling', spread: action.spread, drawn: action.drawn }
    case 'shuffled':
      return { ...state, status: 'revealing' }
    case 'reveal':
      return { ...state, revealed: Math.min(state.revealed + 1, state.drawn.length) }
    case 'reading':
      return { ...state, status: 'reading', revealed: state.drawn.length, reading: action.reading }
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

  // Keep the newest typed section in view as the reading unrolls.
  const readingEndRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (state.status !== 'reading' && state.status !== 'done') return
    readingEndRef.current?.scrollIntoView({
      behavior: reduced ? 'auto' : 'smooth',
      block: 'end',
    })
  }, [state.status, state.section, reduced])

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

    // Theater: shuffle, then flips, then hold for the reading.
    const flipsDone = () => {
      if (readingRef.current) dispatch({ type: 'reading', reading: readingRef.current })
      else waitingRef.current = true
    }
    if (reduced) {
      // No animation: cards appear face up at once; text arrives whole.
      dispatch({ type: 'shuffled' })
      drawn.forEach(() => dispatch({ type: 'reveal' }))
      flipsDone()
      return
    }
    later(() => dispatch({ type: 'shuffled' }), SHUFFLE_MS)
    drawn.forEach((_, i) => {
      later(() => dispatch({ type: 'reveal' }), SHUFFLE_MS + FLIP_STAGGER_MS * (i + 1))
    })
    later(flipsDone, SHUFFLE_MS + FLIP_STAGGER_MS * drawn.length + AFTER_FLIPS_MS)
  }

  const { status, drawn, revealed, reading, section } = state
  const inSession = status !== 'idle'
  const cardName = (cardId: string, reversed: boolean) => {
    const card = CARD_BY_ID.get(cardId)
    return card ? `${card.name}${reversed ? ', reversed' : ''}` : cardId
  }

  return (
    <div className="tarot-page">
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
              variant="quiet"
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
                faceUp={status !== 'shuffling' && i < revealed}
                scale={handheld ? 3 : 4}
              />
            ))}
          </div>

          {(status === 'reading' || status === 'done') && reading && (
            <div
              className="tarot-reading"
              onClick={() => setSkipAll(true)}
              title={status === 'reading' ? 'Tap to reveal the whole reading' : undefined}
            >
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
    </div>
  )
}
