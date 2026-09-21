/**
 * Durable rate limiting and cost breakers for POST /api/parlor (spec §9.2.2),
 * on Upstash Redis so limits survive cold starts and span instances:
 *
 *  - per-IP sliding windows (default 20/hour, 60/day; big spreads cost 2)
 *  - a global daily turn breaker (default 1,500/day)
 *  - a global daily output-token budget (default 400k), fed by the stream's
 *    final usage numbers
 *
 * When either global ceiling trips, the verdict is 'night': the parlor is
 * "closed for the night" for everyone rather than 429-spamming, and reopens
 * with the next UTC day. The owner bypasses per-IP limits but still counts
 * toward (and is stopped by) the globals; the Anthropic workspace spend cap
 * remains the ceiling behind all of this.
 *
 * Without UPSTASH_REDIS_REST_URL/TOKEN (dev, previews) an in-memory stand-in
 * with the same semantics takes over, so local dev needs no Redis. Only
 * hashed IPs and counters ever reach Redis, never message content (§9.6).
 */

import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export type LimitVerdict = 'ok' | 'rate_limited' | 'night'

export interface ParlorLimiter {
  /** Consume `cost` turns for this caller; verdict decides the response. */
  check(ipKey: string, cost: number, ownerBypass: boolean): Promise<LimitVerdict>
  /** Add the turn's output tokens to the daily budget. */
  recordOutputTokens(n: number): Promise<void>
  /** Burn per-IP budget without a turn (failed owner-code attempts, 5x). */
  penalize(ipKey: string, cost: number): Promise<void>
}

const num = (env: string | undefined, fallback: number) => {
  const n = Number(env)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

const LIMITS = () => ({
  ipHour: num(process.env.TAROT_IP_HOUR, 20),
  ipDay: num(process.env.TAROT_IP_DAY, 60),
  turnsDay: num(process.env.TAROT_TURNS_DAY, 1500),
  outputTokensDay: num(process.env.TAROT_OTOK_DAY, 400_000),
})

const utcDay = () => new Date().toISOString().slice(0, 10)

// -- Upstash-backed --------------------------------------------------------

function makeRedisLimiter(redis: Redis): ParlorLimiter {
  const { ipHour, ipDay, turnsDay, outputTokensDay } = LIMITS()
  const hourly = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(ipHour, '1 h'),
    prefix: 'tarot:ip1h',
  })
  const daily = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(ipDay, '24 h'),
    prefix: 'tarot:ip24h',
  })
  const DAY_TTL = 2 * 24 * 3600

  return {
    async check(ipKey, cost, ownerBypass) {
      // Globals first: a tripped breaker closes the parlor for everyone.
      const day = utcDay()
      const [turns, otok] = await Promise.all([
        redis.incrby(`tarot:turns:${day}`, cost),
        redis.get<number>(`tarot:otok:${day}`),
      ])
      if (turns === cost) await redis.expire(`tarot:turns:${day}`, DAY_TTL)
      if (turns > turnsDay || (otok ?? 0) >= outputTokensDay) return 'night'

      if (ownerBypass) return 'ok'
      const [h, d] = await Promise.all([
        hourly.limit(ipKey, { rate: cost }),
        daily.limit(ipKey, { rate: cost }),
      ])
      return h.success && d.success ? 'ok' : 'rate_limited'
    },
    async recordOutputTokens(n) {
      if (n <= 0) return
      const key = `tarot:otok:${utcDay()}`
      const total = await redis.incrby(key, n)
      if (total === n) await redis.expire(key, DAY_TTL)
    },
    async penalize(ipKey, cost) {
      await Promise.all([
        hourly.limit(ipKey, { rate: cost }),
        daily.limit(ipKey, { rate: cost }),
      ])
    },
  }
}

// -- in-memory fallback (dev/previews; same semantics, one instance) --------

function makeMemoryLimiter(): ParlorLimiter {
  const { ipHour, ipDay, turnsDay, outputTokensDay } = LIMITS()
  const HOUR = 3_600_000
  const DAY = 24 * HOUR
  const hits = new Map<string, { at: number; cost: number }[]>()
  let globalTurns: { at: number; cost: number }[] = []
  let tokens = { day: utcDay(), n: 0 }

  const spendIp = (ipKey: string, cost: number, now: number) => {
    const mine = (hits.get(ipKey) ?? []).filter((h) => now - h.at < DAY)
    mine.push({ at: now, cost })
    hits.set(ipKey, mine)
    if (hits.size > 5000) hits.clear()
    return mine
  }

  return {
    async check(ipKey, cost, ownerBypass) {
      const now = Date.now()
      globalTurns = globalTurns.filter((h) => now - h.at < DAY)
      globalTurns.push({ at: now, cost })
      const turns = globalTurns.reduce((sum, h) => sum + h.cost, 0)
      if (tokens.day !== utcDay()) tokens = { day: utcDay(), n: 0 }
      if (turns > turnsDay || tokens.n >= outputTokensDay) return 'night'

      if (ownerBypass) return 'ok'
      const mine = spendIp(ipKey, cost, now)
      const spent = (window: number) =>
        mine.filter((h) => now - h.at < window).reduce((sum, h) => sum + h.cost, 0)
      return spent(HOUR) <= ipHour && spent(DAY) <= ipDay ? 'ok' : 'rate_limited'
    },
    async recordOutputTokens(n) {
      if (tokens.day !== utcDay()) tokens = { day: utcDay(), n: 0 }
      tokens.n += Math.max(0, n)
    },
    async penalize(ipKey, cost) {
      spendIp(ipKey, cost, Date.now())
    },
  }
}

// -- entry ------------------------------------------------------------------

let limiter: ParlorLimiter | null = null

export function parlorLimiter(): ParlorLimiter {
  if (!limiter) {
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
    limiter =
      url && token
        ? makeRedisLimiter(new Redis({ url, token }))
        : makeMemoryLimiter()
  }
  return limiter
}

/** Test hook: drop the cached limiter so env changes take effect. */
export function resetParlorLimiter(): void {
  limiter = null
}
