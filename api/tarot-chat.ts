/**
 * POST /api/tarot-chat: follow-up questions about a finished reading. All
 * the work lives in _lib/chat.ts (shared with the dev middleware); this is
 * only the Vercel entry. Env: same as api/tarot.ts (ANTHROPIC_API_KEY,
 * optional TAROT_MODEL).
 */

import { handleTarotChat } from './_lib/chat'

export async function POST(request: Request): Promise<Response> {
  return handleTarotChat(request)
}
