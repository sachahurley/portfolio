/**
 * Server-side request validation for POST /api/parlor (spec §9.2.4): zod
 * .strict() everywhere, so unknown fields are a 400, plus the relational
 * checks zod can't express declaratively (positions must be the spread's
 * own ids in draw order, no duplicate cards). The shared contract file
 * (src/lib/tarot/contract.ts) stays types-and-constants only because the
 * client imports it; the schemas live here where zod is already a server
 * dependency.
 */

import { z } from 'zod'
import {
  AWARDS_MAX,
  AWARD_KEY_MAX,
  GEMS_MAX,
  GEM_MAX,
  PARLOR_DRAWS_MAX,
  PARLOR_MESSAGE_MAX,
  PARLOR_MSG_INDEX_MAX,
  PARLOR_READER_TEXT_MAX,
  PARLOR_RECENT_MAX,
  PARLOR_USER_MESSAGES_HARD_MAX,
  QUESTION_MAX,
  VISITED_MAX,
  XP_MAX,
  type ParlorRequest,
  type SpreadId,
} from '../../src/lib/tarot/contract'
import { SPREADS, TAROT_DECK } from '../../src/data/tarot'

const DECK_IDS: ReadonlySet<string> = new Set(TAROT_DECK.map((c) => c.id))
export const SPREAD_POSITIONS = Object.fromEntries(
  SPREADS.map((s) => [s.id, s.positions.map((p) => p.id)]),
) as Record<SpreadId, string[]>

const SpreadIdSchema = z.enum(
  SPREADS.map((s) => s.id) as [SpreadId, ...SpreadId[]],
)

const CardSchema = z.strictObject({
  id: z.string().refine((id) => DECK_IDS.has(id), 'unknown card'),
  name: z.string().min(1).max(40),
  position: z.string().min(1).max(16),
  reversed: z.boolean(),
})

/** Cards must be the spread's positions in draw order, ids unique. */
function checkCards(
  spreadId: SpreadId,
  cards: { id: string; position: string }[],
  ctx: z.RefinementCtx,
) {
  const positions = SPREAD_POSITIONS[spreadId]
  if (cards.length !== positions.length) {
    ctx.addIssue({ code: 'custom', message: 'wrong card count' })
    return
  }
  const seen = new Set<string>()
  for (const [i, c] of cards.entries()) {
    if (c.position !== positions[i]) ctx.addIssue({ code: 'custom', message: 'bad position' })
    if (seen.has(c.id)) ctx.addIssue({ code: 'custom', message: 'duplicate card' })
    seen.add(c.id)
  }
}

const SignedReaderTextSchema = z.strictObject({
  text: z.string().min(1).max(PARLOR_READER_TEXT_MAX),
  msgIndex: z.number().int().min(0).max(PARLOR_MSG_INDEX_MAX),
  userMsgCount: z.number().int().min(0).max(PARLOR_USER_MESSAGES_HARD_MAX),
  sig: z.string().regex(/^[0-9a-f]{64}$/),
})

const TurnSchema = z.discriminatedUnion('kind', [
  z.strictObject({
    kind: z.literal('message'),
    text: z.string().trim().min(1).max(PARLOR_MESSAGE_MAX),
  }),
  z
    .strictObject({
      kind: z.literal('cut'),
      spreadId: SpreadIdSchema,
      question: z.string().max(QUESTION_MAX).optional(),
      cards: z.array(CardSchema),
    })
    .superRefine((cut, ctx) => checkCards(cut.spreadId, cut.cards, ctx)),
])

const DrawSchema = z
  .strictObject({
    spreadId: SpreadIdSchema,
    question: z.string().max(QUESTION_MAX).optional(),
    cards: z.array(CardSchema),
    reading: SignedReaderTextSchema,
  })
  .superRefine((draw, ctx) => checkCards(draw.spreadId, draw.cards, ctx))

const RecentSchema = z.discriminatedUnion('role', [
  z.strictObject({
    role: z.literal('user'),
    text: z.string().min(1).max(PARLOR_MESSAGE_MAX),
  }),
  SignedReaderTextSchema.extend({ role: z.literal('reader') }).strict(),
])

const VisitorSchema = z.strictObject({
  returning: z.boolean(),
  levelTitle: z.string().max(32),
  xp: z.number().int().min(0).max(XP_MAX),
  gems: z.array(z.string().max(GEM_MAX)).max(GEMS_MAX),
  awards: z.array(z.string().max(AWARD_KEY_MAX)).max(AWARDS_MAX),
  gear: z
    .array(
      z.strictObject({
        slot: z.string().max(16),
        name: z.string().max(60),
        topStat: z.string().max(16),
      }),
    )
    .max(8),
  timeOfDay: z.enum(['morning', 'afternoon', 'evening', 'night']),
  visited: z.array(z.string().max(AWARD_KEY_MAX)).max(VISITED_MAX),
  activeGem: z.string().max(GEM_MAX).nullable(),
})

export const ParlorRequestSchema = z.strictObject({
  threadId: z.string().regex(/^[A-Za-z0-9_-]{8,64}$/),
  turn: TurnSchema,
  draws: z.array(DrawSchema).max(PARLOR_DRAWS_MAX),
  recent: z.array(RecentSchema).max(PARLOR_RECENT_MAX),
  userMessageCount: z.number().int().min(0).max(PARLOR_USER_MESSAGES_HARD_MAX),
  unlockedSpreads: z.array(SpreadIdSchema).max(8),
  visitor: VisitorSchema,
  parlor: z.strictObject({
    voice: z.string().max(32).nullable(),
    perks: z.array(z.string().max(24)).max(8),
  }),
  needsTitle: z.boolean(),
})

export function parseParlorRequest(
  body: unknown,
): { ok: true; req: ParlorRequest } | { ok: false; error: string } {
  const parsed = ParlorRequestSchema.safeParse(body)
  if (!parsed.success) {
    const issue = parsed.error.issues[0]
    return { ok: false, error: issue ? `${issue.path.join('.')}: ${issue.message}` : 'invalid' }
  }
  return { ok: true, req: parsed.data as ParlorRequest }
}
