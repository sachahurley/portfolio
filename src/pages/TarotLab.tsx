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
import CompendiumPanel from '../components/tarot/CompendiumPanel'
import { CARD_BY_ID, SPREADS } from '../data/tarot'
import { drawSpread } from '../lib/tarot/draw'
import { ParlorError, streamParlor, type ParlorDone } from '../lib/tarot/client'
import { migrateLedger } from '../lib/tarot/migrate'
import {
  buildParlorRequest,
  deleteThread,
  loadParlorSettings,
  loadThreads,
  msgId,
  newThread,
  renameThread,
  saveThread,
  setPinned,
  type Msg,
  type Thread,
} from '../lib/tarot/threads'
import { suggestionChips, type SuggestionChip } from '../lib/tarot/suggest'
import { absorbDraws, recordDraw, RARE_LABELS } from '../lib/tarot/codex'
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
import {
  PARLOR_MESSAGE_MAX,
  PARLOR_TITLE_MAX,
  PARLOR_USER_MESSAGES_MAX,
  type SpreadId,
} from '../lib/tarot/contract'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { levelInfo } from '../lib/levels'
import { usePageTitle } from '../lib/usePageTitle'

/** Client half of the cut rate limiting: one draw per window (owner exempt). */
const COOLDOWN_MS = 30_000
const LAST_KEY = 'sh_tarot_last'
const SHUFFLE_MS = 1200
const BREATHER_MS = 60_000

/** Spreads open at a display level (spec §6.3); the server enforces the
 *  same gate from the visitor's XP, so this is presentation, not trust. */
const unlockedFor = (xp: number, owner: boolean): SpreadId[] =>
  owner
    ? SPREADS.map((s) => s.id)
    : SPREADS.filter((s) => s.level <= levelInfo(xp).level + 1).map((s) => s.id)

/** The tarot XP table (spec §6.2). Milestones carry award keys (de-duped,
 *  chest-eligible); daily and discovery ride the codex, keyless. */
const DAILY_XP = 10
const CARD_XP = 3
const RARE_XP = 20
const STREAK_XP: Record<number, number> = { 3: 15, 7: 30, 30: 75 }

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
  const [view, setView] = useState<'table' | 'threads' | 'parlor' | 'compendium'>('table')
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
  // Quote-to-ask (§3.6): a selection in the transcript can ride along.
  const [quote, setQuote] = useState<string | null>(null)
  const [quoteCandidate, setQuoteCandidate] = useState<string | null>(null)

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

  // Codex backfill: draws that predate the codex (migrated v1 sittings)
  // are absorbed as discoveries, one batched award, no per-card toasts
  // (spec §7 / open question 3). Idempotent, so StrictMode is harmless.
  useEffect(() => {
    const draws = loadThreads().flatMap((t) =>
      t.messages
        .filter((m): m is Extract<Msg, { kind: 'draw' }> => m.kind === 'draw')
        .map((m) => ({ cards: m.cards, at: m.at })),
    )
    const added = absorbDraws(draws)
    if (added > 0) {
      award(CARD_XP * added, `the compendium takes stock: ${added} cards known`)
    }
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

  // Selection in the Reader's prose becomes a quote-to-ask candidate.
  useEffect(() => {
    const onSelection = () => {
      const sel = document.getSelection()
      if (!sel || sel.isCollapsed) {
        setQuoteCandidate(null)
        return
      }
      const node = sel.anchorNode
      const host = node instanceof Element ? node : node?.parentElement
      if (!host?.closest('.parlor-thread')) {
        setQuoteCandidate(null)
        return
      }
      const text = sel.toString().replace(/\s+/g, ' ').trim().slice(0, 200)
      setQuoteCandidate(text.length >= 8 ? text : null)
    }
    document.addEventListener('selectionchange', onSelection)
    return () => document.removeEventListener('selectionchange', onSelection)
  }, [])

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

  const sendMessage = (raw: string) => {
    if (busy || threadRef.current.closed || breatherLeft > 0) return
    // A pinned quote rides inside the message (the server wraps the whole
    // thing in <question>); the combined length honors the message cap.
    const text = (quote ? `Regarding "${quote}": ${raw}` : raw).slice(0, PARLOR_MESSAGE_MAX)
    setQuote(null)
    setQuoteCandidate(null)
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
      buildParlorRequest(base, { kind: 'message', text }, visitorNow(), settings, unlockedFor(xp, isOwner)),
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
    // The codex counts the cut itself (retries re-send the same cards and
    // never come back through here). Discovery toasts stay nameless so the
    // unturned cards keep their surprise; milestones and rares carry keys.
    const record = recordDraw(drawMsg.cards, drawMsg.at)
    if (record.daily) award(DAILY_XP, "the day's first draw")
    if (record.newCards.length > 0) {
      award(
        CARD_XP * record.newCards.length,
        record.newCards.length === 1
          ? 'a new card for the compendium'
          : `${record.newCards.length} new cards for the compendium`,
      )
    }
    if (record.streakMilestone && STREAK_XP[record.streakMilestone]) {
      award(
        STREAK_XP[record.streakMilestone],
        `a ${record.streakMilestone}-day streak with the cards`,
        `tarot:streak:${record.streakMilestone}`,
      )
    }
    for (const rare of record.rares) {
      award(RARE_XP, `a rare pull: ${RARE_LABELS[rare]}`, `tarot:rare:${rare}`)
    }
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
      streamParlor(buildParlorRequest(t, turn, visitorNow(), settings, unlockedFor(xp, isOwner)), {
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
    setQuote(null)
    setQuoteCandidate(null)
    sentRef.current = null
    setView('table')
    scrollTop()
  }

  /** Compendium: open a fresh sitting already asking about one card. */
  const askAboutCard = (cardId: string) => {
    if (busy) return
    const name = CARD_BY_ID.get(cardId)?.name
    if (!name) return
    startNewSitting()
    sendMessage(`Tell me about ${name}. What does it carry when it visits me?`)
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

  // -- thread management (panel callbacks) ----------------------------------

  const handleRename = (id: string, title: string) => {
    setThreads(renameThread(id, title))
    if (id === thread.id) {
      const t = { ...threadRef.current, title: title.trim().slice(0, 60), titled: true }
      threadRef.current = t
      setThreadState(t)
    }
  }
  const handlePin = (id: string, pinned: boolean) => setThreads(setPinned(id, pinned))
  const handleDelete = (id: string) => {
    setThreads(deleteThread(id))
    if (id === thread.id) {
      // The active sitting was forgotten; a fresh table waits behind it.
      const t = freshThread()
      threadRef.current = t
      setThreadState(t)
      setStarters(pickStarters())
      setPending(null)
      sentRef.current = null
    }
  }

  const onChip = (chip: SuggestionChip) => {
    if (chip.kind === 'draw') setPicker(true)
    else sendMessage(chip.label)
  }

  // -- render ---------------------------------------------------------------

  const untouched = !thread.messages.some((m) => m.kind === 'user' || m.kind === 'draw')
  const hasOpenOffer = thread.messages.some((m) => m.kind === 'offer' && m.status === 'open')
  const remaining = Math.max(0, PARLOR_USER_MESSAGES_MAX - thread.userMsgCount)
  const chips =
    !untouched && !busy && !thread.closed && !pending && !picker && !hasOpenOffer
      ? suggestionChips(thread)
      : []
  const subline =
    view === 'threads'
      ? 'The sittings the Reader remembers.'
      : view === 'compendium'
        ? 'Every card the deck has shown you.'
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
            <button type="button" className="pt-nav-link" onClick={() => setView('compendium')}>
              Compendium
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
          onRename={handleRename}
          onPin={handlePin}
          onDelete={handleDelete}
        />
      )}

      {view === 'parlor' && (
        <ParlorSettingsPanel
          onChanged={() => setSettings(loadParlorSettings())}
          onBack={() => setView('table')}
        />
      )}

      {view === 'compendium' && (
        <CompendiumPanel
          threads={threads}
          onOpenThread={openThread}
          onAskAbout={askAboutCard}
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
            chips={chips}
            onChip={onChip}
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
              unlocked={unlockedFor(xp, isOwner)}
              disabled={busy || (!isOwner && cooldownLeft > 0)}
              onCut={(spreadId, q) => cut(spreadId, q)}
              onClose={() => setPicker(false)}
            />
          )}
          {picker && !isOwner && cooldownLeft > 0 && (
            <p className="pt-system">The deck rests ({Math.ceil(cooldownLeft / 1000)}s).</p>
          )}

          {!thread.closed && !untouched && remaining === 1 && (
            <p className="pt-system">One question left in this sitting.</p>
          )}

          {quoteCandidate && !quote && !thread.closed && (
            <div className="pt-quote-offer">
              <button
                type="button"
                className="pt-act"
                onClick={() => {
                  setQuote(quoteCandidate)
                  setQuoteCandidate(null)
                  document.getSelection()?.removeAllRanges()
                }}
              >
                Ask the Reader about “{quoteCandidate.slice(0, 48)}{quoteCandidate.length > 48 ? '…' : ''}”
              </button>
            </div>
          )}

          <div ref={endRef} className="pt-end" />
        </section>
      )}

      {view === 'table' && (
        <Composer
          closed={thread.closed}
          busy={busy || !!pending}
          breatherLeft={breatherLeft}
          quote={quote}
          onSend={sendMessage}
          onToggleDraw={() => setPicker((p) => !p)}
          onNewSitting={startNewSitting}
          onClearQuote={() => setQuote(null)}
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
