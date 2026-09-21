/**
 * POST /api/tarot-chat: the Reader, streaming. All the work lives in
 * _lib/chat.ts (shared with the dev middleware); this is only the Vercel
 * entry. Env: ANTHROPIC_API_KEY, VITE_TAROT=1, optional TAROT_MODEL.
 */

import { handleTarotChat } from './_lib/chat'

export async function POST(request: Request): Promise<Response> {
  return handleTarotChat(request)
}
