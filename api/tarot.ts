/**
 * POST /api/tarot: the Reader's serverless voice. All the work lives in
 * _lib/reading.ts (shared with the dev middleware); this is only the
 * Vercel entry. Env: ANTHROPIC_API_KEY (required; a dedicated workspace
 * key with a monthly spend limit) and TAROT_MODEL (optional override).
 */

import { handleTarot } from './_lib/reading'

export async function POST(request: Request): Promise<Response> {
  return handleTarot(request)
}
