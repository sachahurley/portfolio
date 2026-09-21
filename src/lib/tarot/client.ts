/**
 * Client for POST /api/tarot. One rule: anything but a valid 200 within the
 * timeout throws, and the caller answers every throw the same way, by
 * swapping in the canned fallback reading. No error UI exists on purpose.
 */

import {
  CHAT_REPLY_MAX,
  isReading,
  type Reading,
  type TarotChatRequest,
  type TarotChatResponse,
  type TarotRequest,
  type TarotResponse,
} from './contract'

const TIMEOUT_MS = 15_000

export async function requestReading(payload: TarotRequest): Promise<Reading> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch('/api/tarot', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    })
    if (!res.ok) throw new Error(`tarot api ${res.status}`)
    const data = (await res.json()) as TarotResponse
    const positions = payload.cards.map((c) => c.position)
    if (!isReading(data?.reading, positions)) throw new Error('tarot api bad shape')
    return data.reading
  } finally {
    clearTimeout(timer)
  }
}

/** Ask the Reader a follow-up. Same rule as the reading: any throw means
 *  the caller closes the chat with the canned in-fiction line. */
export async function requestChat(payload: TarotChatRequest): Promise<string> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch('/api/tarot-chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    })
    if (!res.ok) throw new Error(`tarot chat api ${res.status}`)
    const data = (await res.json()) as TarotChatResponse
    if (typeof data?.reply !== 'string' || !data.reply.trim() || data.reply.length > CHAT_REPLY_MAX)
      throw new Error('tarot chat api bad shape')
    return data.reply
  } finally {
    clearTimeout(timer)
  }
}
