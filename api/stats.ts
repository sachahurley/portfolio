/**
 * GET/POST /api/stats: lifetime site counters. All the work lives in
 * _lib/stats.ts (shared with the dev middleware); this is only the Vercel
 * entry. Env: UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or the
 * KV_ aliases). Without them the counters run in process memory and reset
 * on every cold start.
 */

import { handleSiteStats } from './_lib/stats.js'

export async function GET(request: Request): Promise<Response> {
  return handleSiteStats(request)
}

export async function POST(request: Request): Promise<Response> {
  return handleSiteStats(request)
}
