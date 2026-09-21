/**
 * Streaming filter for Reader card mentions (spec §3.6). The Reader writes
 * `[[card:major/the_tower]]` when she names a card; the client renders it
 * as a tappable chip. Two server-side jobs, both here:
 *
 *  - drop any mention whose id is not in the deck, so she can't invent
 *    cards (or be prompted into emitting arbitrary chip payloads);
 *  - hold back a partial `[[...` across delta boundaries, so no broken
 *    token ever flashes on screen mid-stream.
 *
 * Anything bracket-shaped that is not a card mention passes through as
 * plain text. A `[[` left unclosed for more than HOLD_MAX characters is
 * flushed as text (the model is rambling, not writing a mention).
 */

const MENTION = /^\[\[card:([A-Za-z0-9_/-]{1,48})\]\]/
/** Longest legal mention: [[card: + id + ]] with headroom. */
const HOLD_MAX = 64

export interface MentionFilter {
  /** Feed a delta; returns the text safe to emit now. */
  push(delta: string): string
  /** End of stream; returns whatever was held back. */
  flush(): string
}

export function makeMentionFilter(validIds: ReadonlySet<string>): MentionFilter {
  let buf = ''

  const drain = (atEnd: boolean): string => {
    let out = ''
    for (;;) {
      const start = buf.indexOf('[[')
      if (start === -1) {
        // No mention opener. Keep a lone trailing '[' (it may become '[[').
        const keep = !atEnd && buf.endsWith('[') ? 1 : 0
        out += buf.slice(0, buf.length - keep)
        buf = buf.slice(buf.length - keep)
        return out
      }
      out += buf.slice(0, start)
      buf = buf.slice(start)
      const close = buf.indexOf(']]')
      if (close === -1) {
        // Unclosed. Hold unless it has grown implausibly long or the
        // stream is over, then let it through as plain text.
        if (!atEnd && buf.length <= HOLD_MAX) return out
        out += buf
        buf = ''
        return out
      }
      const token = buf.slice(0, close + 2)
      const match = MENTION.exec(token)
      if (match && token.length === match[0].length) {
        // A well-formed card mention: keep if the deck knows it, drop if not.
        if (validIds.has(match[1])) out += token
      } else {
        // Bracket noise, not a mention: pass through untouched.
        out += token
      }
      buf = buf.slice(close + 2)
    }
  }

  return {
    push(delta: string): string {
      buf += delta
      return drain(false)
    },
    flush(): string {
      return drain(true)
    },
  }
}
