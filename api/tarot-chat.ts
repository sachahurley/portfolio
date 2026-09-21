/**
 * POST /api/tarot-chat: the Seer, streaming. All the work lives in
 * _lib/chat.ts (shared with the dev middleware); this is only the Vercel
 * entry. Env: optional ANTHROPIC_API_KEY (templated replies without it),
 * VITE_TAROT=0 to switch off, optional TAROT_MODEL.
 */

import { handleTarotChat } from './_lib/chat.js'

export async function POST(request: Request): Promise<Response> {
  return handleTarotChat(request)
}
