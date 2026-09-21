/**
 * Client for POST /api/parlor (v2, streaming). One fetch, an SSE parse
 * over the response body, callbacks per event. The caller answers every
 * failure in-fiction (canned fallbacks, system lines); no error UI exists
 * on purpose, so failures here throw a typed ParlorError and nothing else.
 *
 * Timeouts: one overall ceiling (a reading should never take a minute)
 * plus an inactivity window between chunks, both via one AbortController.
 */

import type { ParlorErrorCode, ParlorRequest, SpreadId } from './contract'

const TOTAL_MS = 60_000
const IDLE_MS = 20_000

export class ParlorError extends Error {
  code: ParlorErrorCode
  constructor(code: ParlorErrorCode) {
    super(`parlor: ${code}`)
    this.code = code
  }
}

export interface ParlorDone {
  closed: boolean
  msgIndex: number
  userMsgCount: number
  sig: string
}

export interface ParlorStreamHandlers {
  onText?: (delta: string) => void
  onOffer?: (offer: { spreadId: SpreadId; question: string | null }) => void
  onTitle?: (title: string) => void
  signal?: AbortSignal
  ownerCode?: string | null
}

/** Map a pre-stream HTTP refusal to the in-fiction error code. */
function codeForStatus(status: number, body: string): ParlorErrorCode {
  if (status === 429) return 'rate_limited'
  if (status === 403 && body.includes('cap')) return 'cap'
  if (status === 503 && body.includes('parlor_closed')) return 'closed'
  if (status === 400) return 'invalid'
  return 'upstream'
}

export async function streamParlor(
  payload: ParlorRequest,
  handlers: ParlorStreamHandlers = {},
): Promise<ParlorDone> {
  const ctrl = new AbortController()
  const total = setTimeout(() => ctrl.abort(), TOTAL_MS)
  let idle = setTimeout(() => ctrl.abort(), IDLE_MS)
  const tickle = () => {
    clearTimeout(idle)
    idle = setTimeout(() => ctrl.abort(), IDLE_MS)
  }
  const onOuterAbort = () => ctrl.abort()
  handlers.signal?.addEventListener('abort', onOuterAbort)

  try {
    const res = await fetch('/api/parlor', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(handlers.ownerCode ? { 'x-tarot-owner': handlers.ownerCode } : {}),
      },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    })
    if (!res.ok || !res.body) {
      const text = await res.text().catch(() => '')
      throw new ParlorError(codeForStatus(res.status, text))
    }

    let done: ParlorDone | null = null
    let buffer = ''
    const handleEvent = (block: string) => {
      let event = ''
      let data = ''
      for (const line of block.split('\n')) {
        if (line.startsWith('event: ')) event = line.slice(7).trim()
        else if (line.startsWith('data: ')) data += line.slice(6)
      }
      if (!event || !data) return
      let parsed: unknown
      try {
        parsed = JSON.parse(data)
      } catch {
        return
      }
      const d = parsed as Record<string, unknown>
      switch (event) {
        case 'text':
          if (typeof d.delta === 'string') handlers.onText?.(d.delta)
          break
        case 'offer':
          if (typeof d.spreadId === 'string') {
            handlers.onOffer?.({
              spreadId: d.spreadId as SpreadId,
              question: typeof d.question === 'string' ? d.question : null,
            })
          }
          break
        case 'title':
          if (typeof d.title === 'string') handlers.onTitle?.(d.title)
          break
        case 'done':
          if (
            typeof d.closed === 'boolean' &&
            typeof d.msgIndex === 'number' &&
            typeof d.userMsgCount === 'number' &&
            typeof d.sig === 'string'
          ) {
            done = {
              closed: d.closed,
              msgIndex: d.msgIndex,
              userMsgCount: d.userMsgCount,
              sig: d.sig,
            }
          }
          break
        case 'error':
          throw new ParlorError(
            typeof d.code === 'string' ? (d.code as ParlorErrorCode) : 'upstream',
          )
      }
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    for (;;) {
      const { value, done: eof } = await reader.read()
      tickle()
      if (value) {
        buffer += decoder.decode(value, { stream: true })
        let sep
        while ((sep = buffer.indexOf('\n\n')) !== -1) {
          const block = buffer.slice(0, sep)
          buffer = buffer.slice(sep + 2)
          handleEvent(block)
        }
      }
      if (eof) break
    }
    if (buffer.trim()) handleEvent(buffer)

    if (!done) throw new ParlorError('upstream')
    return done
  } catch (err) {
    if (err instanceof ParlorError) throw err
    throw new ParlorError('upstream')
  } finally {
    clearTimeout(total)
    clearTimeout(idle)
    handlers.signal?.removeEventListener('abort', onOuterAbort)
  }
}
