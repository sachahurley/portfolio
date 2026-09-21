/**
 * In-memory, best-effort rate limiting for the tarot endpoints: per-IP
 * sliding windows plus a per-instance daily breaker. Deliberately not
 * shared across instances and reset on cold start; the real cost ceiling
 * is the Anthropic workspace spend limit (see api/_lib/reading.ts), and
 * Upstash is the upgrade path if logs ever show abuse.
 *
 * Each endpoint makes its own limiter so reading and chat spend separate
 * budgets (a chatty visitor can't starve draws, and vice versa).
 */

export interface LimiterOpts {
  perIpHour: number
  perIpDay: number
  perInstanceDay: number
}

export function makeLimiter({ perIpHour, perIpDay, perInstanceDay }: LimiterOpts) {
  const HOUR = 3_600_000
  const DAY = 24 * HOUR
  const hits = new Map<string, number[]>()
  let instanceHits: number[] = []
  return function rateLimited(ip: string, now = Date.now()): boolean {
    instanceHits = instanceHits.filter((t) => now - t < DAY)
    if (instanceHits.length >= perInstanceDay) return true
    const mine = (hits.get(ip) ?? []).filter((t) => now - t < DAY)
    if (mine.length >= perIpDay) return true
    if (mine.filter((t) => now - t < HOUR).length >= perIpHour) return true
    mine.push(now)
    hits.set(ip, mine)
    instanceHits.push(now)
    // keep the map from growing unbounded on a long-lived instance
    if (hits.size > 5000) hits.clear()
    return false
  }
}
