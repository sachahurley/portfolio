/**
 * Client side of the Reader chat: the streaming request and the one saved
 * conversation (localStorage). No accounts, no sync.
 */

import { CARD_BY_ID } from '../../data/tarot'
import { HISTORY_MAX, type ChatEvent, type ChatMessage } from './contract'

export type AskError = 'rate_limited' | 'cap' | 'unavailable' | 'failed'

/**
 * Send the transcript, call onEvent for each streamed event. Resolves when
 * the stream ends; throws an AskError string on failure.
 */
export async function askReader(
  messages: ChatMessage[],
  userTurns: number,
  onEvent: (e: ChatEvent) => void,
  signal?: AbortSignal,
): Promise<void> {
  let res: Response
  try {
    res = await fetch('/api/tarot-chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-tarot-turn': String(userTurns) },
      body: JSON.stringify({ messages: trimHistory(messages) }),
      signal,
    })
  } catch {
    throw 'failed' satisfies AskError
  }
  if (res.status === 429) throw 'rate_limited' satisfies AskError
  if (res.status === 403) throw 'cap' satisfies AskError
  if (res.status === 503 || res.status === 404) throw 'unavailable' satisfies AskError
  if (!res.ok || !res.body) throw 'failed' satisfies AskError

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  let finished = false
  for (;;) {
    const { value, done } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    let nl: number
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl).trim()
      buf = buf.slice(nl + 1)
      if (!line) continue
      let e: ChatEvent
      try {
        e = JSON.parse(line) as ChatEvent
      } catch {
        continue
      }
      if (e.t === 'error') throw 'failed' satisfies AskError
      if (e.t === 'done') finished = true
      onEvent(e)
    }
  }
  if (!finished) throw 'failed' satisfies AskError
}

/** Last HISTORY_MAX messages, opening on a user turn. */
function trimHistory(messages: ChatMessage[]): ChatMessage[] {
  const recent = messages.slice(-HISTORY_MAX)
  const start = recent.findIndex((m) => m.role === 'user')
  return start < 0 ? recent : recent.slice(start)
}

// -- the saved conversation --------------------------------------------------

const KEY = 'sh_tarot_chat'

export function loadConversation(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const data = JSON.parse(raw) as { messages?: ChatMessage[] }
    const msgs = Array.isArray(data.messages) ? data.messages : []
    // Drop anything whose cards no longer resolve against the deck.
    return msgs.filter(
      (m) => m && (m.role === 'user' || m.role === 'reader') && (m.role === 'user' || !m.draw || m.draw.cards.every((c) => CARD_BY_ID.has(c.id))),
    )
  } catch {
    return []
  }
}

export function saveConversation(messages: ChatMessage[]): void {
  try {
    if (messages.length) localStorage.setItem(KEY, JSON.stringify({ messages }))
    else localStorage.removeItem(KEY)
    localStorage.removeItem('sh_tarot_ledger') // v1 readings, retired
  } catch {
    /* private mode: the conversation just won't survive a reload */
  }
}
