/**
 * Parlor contract: types and constants shared by the client and the
 * serverless endpoint (api/_lib/parlor.ts imports this file directly, so
 * it must stay pure TypeScript: no vite-isms, no DOM, no imports beyond
 * the language). Validation lives server-side in api/_lib/schema.ts.
 *
 * The client draws the cards and summarizes the visitor; the server
 * validates, prompts the model, and streams the Reader back. Every
 * failure the client sees becomes an in-fiction line, so error paths
 * here can afford to be strict.
 */

export const QUESTION_MAX = 280
export const AWARDS_MAX = 40
export const AWARD_KEY_MAX = 64
export const GEMS_MAX = 16
export const GEM_MAX = 32
export const VISITED_MAX = 40
/** Generous ceiling on a real save's XP; anything above is a forged body. */
export const XP_MAX = 1_000_000

export type SpreadId = 'one' | 'three'

export interface DrawnCardPayload {
  id: string // deck id, e.g. 'major/the_tower'
  name: string
  position: string // spread position id, e.g. 'past'
  reversed: boolean
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

/** Site-generated activity only; never user-entered text (the question is
 *  the one deliberate exception, carried separately and delimited). */
export interface VisitorSummary {
  returning: boolean
  levelTitle: string
  xp: number
  gems: string[]
  awards: string[] // earned award keys, e.g. 'visit:/projects', 'secret:town-well'
  gear: { slot: string; name: string; topStat: string }[]
  timeOfDay: TimeOfDay
  visited: string[] // paths derived from visit: keys
}

// -- the parlor (POST /api/parlor, streaming) -------------------------------
// Stateless: every turn carries the thread's
// draws (cards are the memory), the last few messages, and the new turn.
// Reader-authored text is HMAC-signed by the server (api/_lib/sign.ts), so
// carried history cannot be forged and the per-thread message cap holds
// with zero server storage.

export const PARLOR_MESSAGE_MAX = 280
/** User messages per thread before the Reader closes the audience. */
export const PARLOR_USER_MESSAGES_MAX = 8
/** Absolute ceiling, perks included (the Patience charm adds +2). */
export const PARLOR_USER_MESSAGES_HARD_MAX = 10
/** Transcript window sent per turn ("cards are the memory" carries the rest). */
export const PARLOR_RECENT_MAX = 6
/** Upper bound on one signed reader text carried back (reading or reply). */
export const PARLOR_READER_TEXT_MAX = 6000
/** Draws carried per thread. */
export const PARLOR_DRAWS_MAX = 12
export const PARLOR_TITLE_MAX = 40
/** Reader msgIndex ceiling; far above anything a capped thread can reach. */
export const PARLOR_MSG_INDEX_MAX = 1000

/** A Reader-authored text plus the server's signature binding it to its
 *  thread, position, and the user-message count when it was written. */
export interface SignedReaderText {
  text: string
  msgIndex: number // 0-based index among the thread's reader messages
  userMsgCount: number // user messages in the thread when this was signed
  sig: string // hex HMAC-SHA256 over {threadId, msgIndex, userMsgCount, sha256(text)}
}

export type ParlorTurn =
  | { kind: 'message'; text: string }
  | { kind: 'cut'; spreadId: SpreadId; question?: string; cards: DrawnCardPayload[] }

/** A completed draw carried back for context; the reading is signed. */
export interface ParlorDraw {
  spreadId: SpreadId
  question?: string
  cards: DrawnCardPayload[]
  reading: SignedReaderText
}

export type ParlorRecent =
  | { role: 'user'; text: string }
  | ({ role: 'reader' } & SignedReaderText)

export interface ParlorVisitor extends VisitorSummary {
  activeGem: string | null
}

export interface ParlorRequest {
  threadId: string
  turn: ParlorTurn
  draws: ParlorDraw[]
  recent: ParlorRecent[]
  userMessageCount: number
  unlockedSpreads: SpreadId[]
  visitor: ParlorVisitor
  parlor: { voice: string | null; perks: string[] }
  needsTitle: boolean
}

/** SSE events streamed back by /api/parlor. */
export type ParlorErrorCode = 'rate_limited' | 'upstream' | 'invalid' | 'cap' | 'closed'
export type ParlorEvent =
  | { event: 'text'; data: { delta: string } }
  | { event: 'offer'; data: { spreadId: SpreadId; question: string | null } }
  | { event: 'title'; data: { title: string } }
  | {
      event: 'done'
      data: { closed: boolean; msgIndex: number; userMsgCount: number; sig: string }
    }
  | { event: 'error'; data: { code: ParlorErrorCode } }

