/**
 * The Reader's parlor (/lab/tarot), v2: a chat with one persona. Visitors
 * talk to the Reader; she offers draws (tool-called server side) and the
 * visitor cuts and turns the cards in the thread. Threads live in
 * localStorage (lib/tarot/threads); replies stream token by token from
 * POST /api/parlor (lib/tarot/client).
 *
 * The no-error rule from v1 holds everywhere: every failure is an
 * in-fiction line (canned fallback reading, a guttering candle, the
 * parlor closed for the night), never an error state.
 *
 * This page is the state machine; rendering lives in components/tarot/*
 * (ParlorThread, Composer, DrawOffer, SpreadPicker, panels).
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from '@scorp-ds/components'
import { useNavigate } from 'react-router-dom'
import DitherIcon from '../components/DitherIcon'
import TarotScene from '../components/tarot/TarotScene'
import ParlorThread, { PENDING_READER, type StreamState } from '../components/tarot/ParlorThread'
import Composer from '../components/tarot/Composer'
import SpreadPicker from '../components/tarot/SpreadPicker'
import ThreadsPanel from '../components/tarot/ThreadsPanel'
import ParlorSettingsPanel from '../components/tarot/ParlorSettingsPanel'
import { CARD_BY_ID, SPREADS } from '../data/tarot'
import { drawSpread } from '../lib/tarot/draw'
import { ParlorError, streamParlor, type ParlorDone } from '../lib/tarot/client'
import { migrateLedger } from '../lib/tarot/migrate'
import {
  buildParlorRequest,
  loadParlorSettings,
  loadThreads,
  msgId,
  newThread,
  saveThread,
  type Msg,
  type Thread,
} from '../lib/tarot/threads'
import {
  BREATHER_LINE,
  CHAT_CLOSERS,
  CHAT_FALTERS,
  CLOSED_LINE,
  GREETING_LINES,
  STARTER_PROMPTS,
  fallbackProse,
  pickFrom,
} from '../lib/tarot/fallbackReading'
import { summarizeVisitor } from '../lib/tarot/summarizeVisitor'
import { PARLOR_TITLE_MAX, type SpreadId } from '../lib/tarot/contract'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { usePageTitle } from '../lib/usePageTitle'

/** Client half of the cut rate limiting: one draw per window (owner exempt). */
const COOLDOWN_MS = 30_000
const LAST_KEY = 'sh_tarot_last'
const SHUFFLE_MS = 1200
const BREATHER_MS = 60_000

/** Level gating arrives in phase 5; today the whole deck of spreads is open. */
const UNLOCKED: SpreadId[] = SPREADS.map((s) => s.id)

const readLast = () => {
  try {
    return Number(localStorage.getItem(LAST_KEY)) || 0
  } catch {
    return 0
  }
}

const sys = (text: string): Msg => ({ kind: 'system', id: msgId(), at: Date.now(), text })

const freshThread = (): Thread => {
  const t = newThread()
  t.messages.push({ kind: 'reader', id: msgId(), at: Date.now(), text: pickFrom(GREETING_LINES) })
  return t
}

const pickStarters = () =>
  [...STARTER_PROMPTS].sort(() => Math.random() - 0.5).slice(0, 3)

export default function TarotLab() {
  usePageTitle('Tarot reader')
  const navigate = useNavigate()
  const { award, logLine, xp, gems, items, equipment, isReturning, getEarned, activeGem } = useXp()

  // Run the v1 ledger migration before the first threads read.
  const [threads, setThreads] = useState<Thread[]>(() => {
    migrateLedger()
    return loadThreads()
  })
  const [thread, setThreadState] = useState<Thread>(freshThread)
  const threadRef = useRef(thread)
  const [starters, setStarters] = useState(pickStarters)
  const [view, setView] = useState<'table' | 'threads' | 'parlor'>('table')
  const [settings, setSettings] = useState(() => loadParlorSettings())

  const [busy, setBusy] = useState(false)
  const [stream, setStream] = useState<StreamState | null>(null)
  const streamTextRef = useRef('')
  const [pending, setPending] = useState<{ msgId: string; flipped: boolean[] } | null>(null)
  const [shuffling, setShuffling] = useState(false)
  const [picker, setPicker] = useState(false)
  const [breatherLeft, setBreatherLeft] = useState(0)
  const breatherUntilRef = useRef(0)
  const [cooldownLeft, setCooldownLeft] = useState(0)
  const timersRef = useRef<number[]>([])

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const handheld =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches
  const isOwner = !!settings.ownerCode

  /** Single write path: state, ref, and (once it has substance) storage. */
  const updateThread = useCallback((fn: (t: Thread) => Thread) => {
    const next = fn(threadRef.current)
    threadRef.current = next
    setThreadState(next)
    if (next.messages.some((m) => m.kind === 'user' || m.kind === 'draw')) {
      setThreads(saveThread(next))
    }
    return next
  }, [])

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
      if (e.key !== 'Escape') return
      if (view !== 'table') setView('table')
      else closePage()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [closePage, view])

  useEffect(
    () => () => {
      timersRef.current.forEach((t) => window.clearTimeout(t))
    },
    [],
  )
  const later = (fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms))
  }

  // Tickers: cut cooldown and the 429 breather.
  useEffect(() => {
    const update = () => {
      setCooldownLeft(Math.max(0, readLast() + COOLDOWN_MS - Date.now()))
      setBreatherLeft(Math.max(0, Math.ceil((breatherUntilRef.current - Date.now()) / 1000)))
    }
    update()
    const iv = window.setInterval(update, 1000)
    return () => window.clearInterval(iv)
  }, [busy])

  // Keep the newest line in view as replies stream and messages land.
  const endRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (view !== 'table') return
    endRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'end' })
  }, [thread.messages.length, stream?.text.length, pending, view, reduced])

  const visitorNow = () => ({
    ...summarizeVisitor({ xp, earned: getEarned(), gems, items, equipment, isReturning }),
    activeGem: activeGem === 'default' ? null : activeGem,
  })

  const beginBreather = () => {
    breatherUntilRef.current = Date.now() + BREATHER_MS
    setBreatherLeft(Math.ceil(BREATHER_MS / 1000))
  }

  /** Shared failure text for a chat turn (the audience continues). */
  const failureLine = (err: unknown): { line: string; closes: boolean } => {
    const code = err instanceof ParlorError ? err.code : 'upstream'
    if (code === 'rate_limited') {
      beginBreather()
      return { line: BREATHER_LINE, closes: false }
    }
    if (code === 'closed') return { line: CLOSED_LINE, closes: false }
    if (code === 'cap') return { line: pickFrom(CHAT_CLOSERS), closes: true }
    return { line: pickFrom(CHAT_FALTERS), closes: false }
  }

  // -- chat turns -----------------------------------------------------------

  const sendMessage = (text: string) => {
    if (busy || threadRef.current.closed || breatherLeft > 0) return
    setPicker(false)
    const base = updateThread((t) => {
      const messages: Msg[] = t.messages.map((m) =>
        m.kind === 'offer' && m.status === 'open' ? { ...m, status: 'declined' as const } : m,
      )
      messages.push({ kind: 'user', id: msgId(), at: Date.now(), text })
      const provisional =
        !t.titled && t.title === 'A new sitting' ? text.slice(0, PARLOR_TITLE_MAX) : t.title
      return { ...t, messages, title: provisional }
    })

    setBusy(true)
    streamTextRef.current = ''
    setStream({ targetId: PENDING_READER, text: '' })
    let offer: { spreadId: SpreadId; question: string | null } | null = null
    let title: string | null = null

    streamParlor(
      buildParlorRequest(base, { kind: 'message', text }, visitorNow(), settings, UNLOCKED),
      {
        onText: (delta) => {
          streamTextRef.current += delta
          setStream({ targetId: PENDING_READER, text: streamTextRef.current })
        },
        onOffer: (o) => {
          offer = o
        },
        onTitle: (t) => {
          title = t
        },
        ownerCode: settings.ownerCode,
      },
    )
      .then((done: ParlorDone) => {
        updateThread((t) => {
          const messages: Msg[] = [
            ...t.messages,
            {
              kind: 'reader',
              id: msgId(),
              at: Date.now(),
              text: streamTextRef.current,
              msgIndex: done.msgIndex,
              userMsgCount: done.userMsgCount,
              sig: done.sig,
            },
          ]
          if (offer && !done.closed) {
            messages.push({
              kind: 'offer',
              id: msgId(),
              at: Date.now(),
              spreadId: offer.spreadId,
              ...(offer.question ? { question: offer.question } : {}),
              status: 'open',
            })
          }
          if (done.closed) messages.push(sys(pickFrom(CHAT_CLOSERS)))
          return {
            ...t,
            messages,
            closed: t.closed || done.closed,
            userMsgCount: done.userMsgCount,
            ...(title ? { title: title.trim(), titled: true } : {}),
          }
        })
      })
      .catch((err) => {
        const { line, closes } = failureLine(err)
        updateThread((t) => {
          const messages = [...t.messages]
          if (streamTextRef.current) {
            // Keep what was said; unsigned, so it stays presentation-only.
            messages.push({ kind: 'reader', id: msgId(), at: Date.now(), text: streamTextRef.current })
          }
          messages.push(sys(line))
          return { ...t, messages, closed: t.closed || closes }
        })
      })
      .finally(() => {
        setBusy(false)
        setStream(null)
        streamTextRef.current = ''
      })
  }

  // -- the draw flow --------------------------------------------------------

  const cut = (spreadId: SpreadId, question: string, offerId?: string) => {
    if (busy || pending) return
    if (!isOwner && cooldownLeft > 0) return
    const spread = SPREADS.find((s) => s.id === spreadId)
    if (!spread) return
    const drawn = drawSpread(spread)
    if (!isOwner) {
      try {
        localStorage.setItem(LAST_KEY, String(Date.now()))
      } catch {
        /* private mode: the server still enforces its own limits */
      }
    }
    setPicker(false)
    logLine('The Reader lays out the cards.', 'arrive')
    const drawMsg: Extract<Msg, { kind: 'draw' }> = {
      kind: 'draw',
      id: msgId(),
      at: Date.now(),
      spreadId,
      ...(question ? { question } : {}),
      cards: drawn.map((d) => ({ id: d.card.id, position: d.position.id, reversed: d.reversed })),
      reading: null,
    }
    updateThread((t) => ({
      ...t,
      messages: [
        ...t.messages.map((m) =>
          m.kind === 'offer' && (m.id === offerId || m.status === 'open')
            ? { ...m, status: (m.id === offerId ? 'cut' : 'declined') as 'cut' | 'declined' }
            : m,
        ),
        drawMsg,
      ],
    }))
    if (reduced) {
      setShuffling(false)
      setPending({ msgId: drawMsg.id, flipped: drawn.map(() => true) })
    } else {
      setShuffling(true)
      setPending({ msgId: drawMsg.id, flipped: drawn.map(() => false) })
      later(() => setShuffling(false), SHUFFLE_MS)
    }
  }

  const reveal = (index: number) => {
    setPending((p) => (p ? { ...p, flipped: p.flipped.map((f, i) => (i === index ? true : f)) } : p))
  }

  /** Send the cut turn for a draw message already in the thread. */
  const sendCut = useCallback(
    (drawId: string) => {
      const t = threadRef.current
      const msg = t.messages.find((m): m is Extract<Msg, { kind: 'draw' }> => m.kind === 'draw' && m.id === drawId)
      if (!msg) return
      setBusy(true)
      streamTextRef.current = ''
      setStream({ targetId: drawId, text: '' })
      let title: string | null = null

      const turn = {
        kind: 'cut' as const,
        spreadId: msg.spreadId,
        ...(msg.question ? { question: msg.question } : {}),
        cards: msg.cards.map((c) => ({
          id: c.id,
          name: c.id,
          position: c.position,
          reversed: c.reversed,
        })),
      }
      streamParlor(buildParlorRequest(t, turn, visitorNow(), settings, UNLOCKED), {
        onText: (delta) => {
          streamTextRef.current += delta
          setStream({ targetId: drawId, text: streamTextRef.current })
        },
        onTitle: (name) => {
          title = name
        },
        ownerCode: settings.ownerCode,
      })
        .then((done: ParlorDone) => {
          updateThread((prev) => ({
            ...prev,
            userMsgCount: done.userMsgCount,
            ...(title ? { title: title.trim(), titled: true } : {}),
            messages: prev.messages.map((m) =>
              m.kind === 'draw' && m.id === drawId
                ? {
                    ...m,
                    reading: {
                      text: streamTextRef.current,
                      msgIndex: done.msgIndex,
                      userMsgCount: done.userMsgCount,
                      sig: done.sig,
                    },
                  }
                : m,
            ),
          }))
          award(XP_AWARDS.tarot, 'received a reading', 'lab:tarot-reading')
        })
        .catch((err) => {
          // A failed cut still reads: partial text if any arrived, else the
          // canned prose; marked failed so a retry can replace it (§5).
          const code = err instanceof ParlorError ? err.code : 'upstream'
          if (code === 'rate_limited') beginBreather()
          updateThread((prev) => ({
            ...prev,
            messages: prev.messages.map((m) =>
              m.kind === 'draw' && m.id === drawId
                ? {
                    ...m,
                    reading: {
                      text: streamTextRef.current || fallbackForDraw(m),
                      failed: true,
                    },
                  }
                : m,
            ),
          }))
          award(XP_AWARDS.tarot, 'received a reading', 'lab:tarot-reading')
        })
        .finally(() => {
          setBusy(false)
          setStream(null)
          setPending(null)
          streamTextRef.current = ''
        })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [settings, xp, gems, items, equipment, isReturning, activeGem],
  )

  // Hand off to the reading once every card is turned.
  const sentRef = useRef<string | null>(null)
  useEffect(() => {
    if (!pending || shuffling || busy) return
    if (!pending.flipped.every(Boolean)) return
    if (sentRef.current === pending.msgId) return
    sentRef.current = pending.msgId
    sendCut(pending.msgId)
  }, [pending, shuffling, busy, sendCut])

  const retryCut = (drawId: string) => {
    if (busy || breatherLeft > 0) return
    sentRef.current = null
    updateThread((t) => ({
      ...t,
      messages: t.messages.map((m) =>
        m.kind === 'draw' && m.id === drawId ? { ...m, reading: null } : m,
      ),
    }))
    sendCut(drawId)
  }

  // -- thread switching -----------------------------------------------------

  const startNewSitting = () => {
    if (busy) return
    const t = freshThread()
    threadRef.current = t
    setThreadState(t)
    setStarters(pickStarters())
    setPending(null)
    setPicker(false)
    sentRef.current = null
    setView('table')
    scrollTop()
  }

  const openThread = (t: Thread) => {
    if (busy) return
    threadRef.current = t
    setThreadState(t)
    setPending(null)
    setPicker(false)
    sentRef.current = null
    setView('table')
    scrollTop()
  }

  const scrollTop = () => {
    document.querySelector('.gf-viewport')?.scrollTo(0, 0)
    window.scrollTo(0, 0)
  }

  // -- render ---------------------------------------------------------------

  const untouched = !thread.messages.some((m) => m.kind === 'user' || m.kind === 'draw')
  const subline =
    view === 'threads'
      ? 'The sittings the Reader remembers.'
      : view === 'parlor'
        ? 'The parlor, behind the curtain.'
        : busy
          ? 'The cards are speaking.'
          : pending && !pending.flipped.every(Boolean)
            ? 'Tap a card to turn it.'
            : thread.closed
              ? 'The audience has ended.'
              : untouched
                ? 'The Reader keeps her table for whoever sits down.'
                : 'The table is yours.'

  return (
    <div className="tarot-page has-chat">
      <Button variant="icon" size="icon" type="button" className="ch-close" onClick={closePage} aria-label="Close tarot reader">
        <DitherIcon name="close" size={16} />
      </Button>

      <TarotScene />

      <header className="tarot-head">
        <h1 className="tarot-title">The Reader</h1>
        <p className="tarot-sub">{subline}</p>
        {view === 'table' && (
          <nav className="pt-nav" aria-label="Parlor">
            <button type="button" className="pt-nav-link" onClick={() => setView('threads')}>
              Sittings{threads.length ? ` (${threads.length})` : ''}
            </button>
            <button type="button" className="pt-nav-link" onClick={() => setView('parlor')}>
              Parlor
            </button>
          </nav>
        )}
      </header>

      {view === 'threads' && (
        <ThreadsPanel
          threads={threads}
          activeId={thread.id}
          onOpen={openThread}
          onNew={startNewSitting}
          onBack={() => setView('table')}
        />
      )}

      {view === 'parlor' && (
        <ParlorSettingsPanel
          onChanged={() => setSettings(loadParlorSettings())}
          onBack={() => setView('table')}
        />
      )}

      {view === 'table' && (
        <section className="tarot-table" aria-label="The sitting">
          <ParlorThread
            thread={thread}
            stream={stream}
            pending={pending}
            shuffling={shuffling}
            busy={busy}
            handheld={handheld}
            onReveal={reveal}
            onRetryCut={retryCut}
            onCutOffer={(offerId, q) => {
              const offer = thread.messages.find(
                (m): m is Extract<Msg, { kind: 'offer' }> => m.kind === 'offer' && m.id === offerId,
              )
              if (offer) cut(offer.spreadId, q, offerId)
            }}
            onDeclineOffer={(offerId) =>
              updateThread((t) => ({
                ...t,
                messages: t.messages.map((m) =>
                  m.kind === 'offer' && m.id === offerId ? { ...m, status: 'declined' as const } : m,
                ),
              }))
            }
          />

          {untouched && !busy && (
            <div className="pt-starters" aria-label="Ways to begin">
              {starters.map((s) => (
                <button key={s} type="button" className="pt-starter" onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {picker && !thread.closed && (
            <SpreadPicker
              disabled={busy || (!isOwner && cooldownLeft > 0)}
              onCut={(spreadId, q) => cut(spreadId, q)}
              onClose={() => setPicker(false)}
            />
          )}
          {picker && !isOwner && cooldownLeft > 0 && (
            <p className="pt-system">The deck rests ({Math.ceil(cooldownLeft / 1000)}s).</p>
          )}

          <div ref={endRef} />
        </section>
      )}

      {view === 'table' && (
        <Composer
          closed={thread.closed}
          busy={busy || !!pending}
          breatherLeft={breatherLeft}
          onSend={sendMessage}
          onToggleDraw={() => setPicker((p) => !p)}
          onNewSitting={startNewSitting}
        />
      )}
    </div>
  )
}

/** Canned prose for a draw message whose cut failed before any text. */
function fallbackForDraw(msg: Extract<Msg, { kind: 'draw' }>): string {
  const spread = SPREADS.find((s) => s.id === msg.spreadId)
  if (!spread) return pickFrom(CHAT_FALTERS)
  const drawn = msg.cards.flatMap((c) => {
    const card = CARD_BY_ID.get(c.id)
    const position = spread.positions.find((p) => p.id === c.position)
    return card && position ? [{ card, position, reversed: c.reversed }] : []
  })
  return drawn.length ? fallbackProse(drawn) : pickFrom(CHAT_FALTERS)
}
