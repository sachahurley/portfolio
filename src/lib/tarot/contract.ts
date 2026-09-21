/**
 * Tarot chat contract, shared by the client (src/pages/TarotLab.tsx) and the
 * serverless function (api/_lib/chat.ts). Pure TypeScript only: the server
 * imports this file directly.
 *
 * The conversation lives in the browser; every request carries the recent
 * transcript. The server streams back newline-delimited JSON events.
 */

export type SpreadId = 'one' | 'three'

/** One drawn card, by deck id (rehydrate via CARD_BY_ID). */
export interface DrawnCardRef {
  id: string // e.g. 'major/the_tower'
  position: string // spread position id, e.g. 'past'
  reversed: boolean
}

export interface Draw {
  spread: SpreadId
  cards: DrawnCardRef[]
}

/**
 * A Reader turn has up to three parts, in display order: what she says
 * before drawing, the cards, and the reading that follows them.
 */
export type ChatMessage =
  | { role: 'user'; text: string }
  | { role: 'reader'; text: string; draw?: Draw; after?: string }

export interface ChatRequest {
  messages: ChatMessage[]
}

/** Streamed events, one JSON object per line. */
export type ChatEvent =
  | { t: 'text'; d: string } // text delta (before the draw, or after it)
  | { t: 'draw'; draw: Draw } // the Reader drew cards (server-side RNG)
  | { t: 'done' }
  | { t: 'error' }

export const USER_TEXT_MAX = 500
export const READER_TEXT_MAX = 4000
/** Messages sent per request (the client trims older ones). */
export const HISTORY_MAX = 24
/** Questions per conversation before the Reader closes the sitting. */
export const USER_TURNS_MAX = 20
