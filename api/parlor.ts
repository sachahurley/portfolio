/**
 * POST /api/parlor: the v2 streaming Reader (chat + readings over SSE).
 * All the work lives in _lib/parlor.ts (shared with the Vite dev
 * middleware); this is only the Vercel entry. Env: ANTHROPIC_API_KEY and
 * TAROT_SIGNING_KEY (required), TAROT_OWNER_KEY / TAROT_MODEL /
 * TAROT_CHAT_ENABLED / UPSTASH_REDIS_REST_URL+TOKEN (optional; see
 * _lib/parlorLimits.ts for the limit env knobs).
 */

import { handleParlor } from './_lib/parlor'

export async function POST(request: Request): Promise<Response> {
  return handleParlor(request)
}
