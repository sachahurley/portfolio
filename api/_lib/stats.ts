/**
 * GET/POST /api/stats: the lifetime site counters behind the home page's
 * stat row. Shared by the Vercel function (api/stats.ts) and the Vite dev
 * middleware (scripts/statsDevApi.ts), the same split the tarot endpoint
 * uses.
 *
 * GET is public and cheap. POST is how a visitor contributes: it carries
 * the deltas since their own last report (see src/lib/siteStats.ts), never
 * an absolute total, so the server is the only thing that knows a sum and
 * a replayed request can only ever add a capped amount.
 *
 * The honest limits of this: counts are client-reported, so they measure
 * browsers that ran the JS and pressed past the title screen, not people.
 * Someone determined can inflate them. That is the accepted trade for a
 * number on a personal site; the caps in _lib/counters.ts and the limiter
 * below keep it to a nuisance rather than a defacement.
 */

import { z } from 'zod'
import { bumpCounters, countersTrustworthy, readCounters } from './counters.js'
import { rejectCrossSite } from './guard.js'
import { makeLimiter } from './limits.js'

const MAX_BODY = 1024

// Generous next to real use: a session reports on arrival and then only
// when a figure actually moves, so single digits per visitor is normal.
const rateLimited = makeLimiter({ perIpHour: 60, perIpDay: 300, perInstanceDay: 20_000 })

const BumpSchema = z
  .object({
    travellers: z.number().int().min(0).max(1_000).optional(),
    xp: z.number().int().min(0).max(1_000_000).optional(),
    quests: z.number().int().min(0).max(1_000).optional(),
    gems: z.number().int().min(0).max(1_000).optional(),
  })
  .strict()

const json = (status: number, body: unknown, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', ...headers },
  })

export async function handleSiteStats(request: Request): Promise<Response> {
  // No store wired up on a real deploy: say so plainly instead of serving a
  // per-instance guess. The client treats this as "no counters" and the
  // footer does not render (see src/lib/siteStats.ts).
  if (!countersTrustworthy()) return json(503, { error: 'no counter store' })

  if (request.method === 'GET') {
    // Two caches, two rules. The CDN may hold the answer briefly, which
    // keeps a burst of traffic (or a crawler) from turning a footer into a
    // function invocation per page view; lifetime totals make half a minute
    // of staleness invisible. The BROWSER must not keep its own copy: a
    // visitor who caches the numbers sees the same figures on every visit,
    // and a counter that never appears to move is worse than no counter.
    // (Vercel reads the CDN directive; elsewhere the shared cache falls
    // back to revalidating, which is the safe direction.)
    return json(200, await readCounters(), {
      'cache-control': 'public, max-age=0, must-revalidate',
      'vercel-cdn-cache-control': 'max-age=30, stale-while-revalidate=300',
    })
  }
  if (request.method !== 'POST') return json(405, { error: 'method' })

  const crossSite = rejectCrossSite(request)
  if (crossSite) return crossSite

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) return json(429, { error: 'rate_limited' })

  let body: unknown
  try {
    const text = await request.text()
    if (text.length > MAX_BODY) return json(400, { error: 'too large' })
    body = JSON.parse(text)
  } catch {
    return json(400, { error: 'bad json' })
  }
  const parsed = BumpSchema.safeParse(body)
  if (!parsed.success) return json(400, { error: 'invalid' })

  return json(200, await bumpCounters(parsed.data))
}
