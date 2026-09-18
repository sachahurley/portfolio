/**
 * Client for POST /api/tarot. One rule: anything but a valid 200 within the
 * timeout throws, and the caller answers every throw the same way, by
 * swapping in the canned fallback reading. No error UI exists on purpose.
 */

import { isReading, type Reading, type TarotRequest, type TarotResponse } from './contract'

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
