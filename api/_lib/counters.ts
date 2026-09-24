/**
 * Lifetime site counters: the numbers behind the home page's stat row.
 *
 * Four totals that only ever go up, summed across every visitor the site
 * has ever had. They are the one piece of genuinely shared state on an
 * otherwise entirely client-side site, so they need somewhere to live.
 *
 * Storage is Upstash Redis over its REST API, driven with plain fetch
 * rather than the SDK: INCRBY is the whole requirement, and a dependency
 * for four integers is not worth it. Env vars are read under both the
 * Upstash names and the KV_ aliases that Vercel's marketplace integration
 * sets, so either wiring works.
 *
 * With neither configured (a fresh clone, `npm run dev`, a preview deploy
 * without the integration) the counters fall back to an in-process map, so
 * everything still runs; the numbers simply reset when the process does.
 * That mirrors how the tarot endpoint degrades to templated replies
 * without an API key: the feature stays exercisable, it just is not real.
 */

export const COUNTER_KEYS = ['travellers', 'xp', 'quests', 'gems'] as const
export type CounterKey = (typeof COUNTER_KEYS)[number]
export type Counters = Record<CounterKey, number>

/**
 * Largest bump one request may make to each counter. A visitor reports
 * deltas since their last report, so these are generous next to normal
 * play and still stop a single forged request from inventing a number:
 * `xp` sits above the 500 XP that maxes out a save, and the rest above
 * everything a save can hold.
 */
const BUMP_CAP: Counters = { travellers: 1, xp: 600, quests: 20, gems: 3 }

const ZERO: Counters = { travellers: 0, xp: 0, quests: 0, gems: 0 }

const redisUrl = () => process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || ''
const redisToken = () => process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || ''

/** True when a real store is wired up; false means the in-process fallback. */
export const countersPersisted = () => Boolean(redisUrl() && redisToken())

/**
 * True when the numbers are safe to show. The in-process fallback is fine
 * for local dev, where one server owns the whole store, but on Vercel every
 * serverless instance would keep its own copy: a visitor would see the
 * total jump around as they were routed between cold starts. So a deploy
 * without a store configured reports nothing at all and the footer hides
 * itself, rather than publishing a lifetime total that is quietly fiction.
 */
export const countersTrustworthy = () => countersPersisted() || !process.env.VERCEL

/** Namespaced so the store can be shared with anything else later. */
const redisKey = (k: CounterKey) => `site:v1:${k}`

const memory: Counters = { ...ZERO }

const toCount = (v: unknown): number => {
  const n = typeof v === 'string' ? Number(v) : typeof v === 'number' ? v : 0
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
}

/** One Upstash REST call. `commands` is a single command, or many to pipeline. */
async function redis(commands: (string | number)[][]): Promise<unknown[]> {
  const single = commands.length === 1
  const res = await fetch(single ? redisUrl() : `${redisUrl()}/pipeline`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${redisToken()}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(single ? commands[0] : commands),
  })
  if (!res.ok) throw new Error(`upstash ${res.status}`)
  const body = (await res.json()) as unknown
  const rows = (single ? [body] : body) as { result?: unknown; error?: string }[]
  if (!Array.isArray(rows)) throw new Error('upstash: unexpected response')
  return rows.map((row) => {
    if (row?.error) throw new Error(`upstash: ${row.error}`)
    return row?.result
  })
}

/**
 * Current totals. Never throws: a store that is down or unconfigured
 * reports zeroes, and the row hides itself rather than showing a wrong
 * number (see src/lib/siteStats.ts).
 */
export async function readCounters(): Promise<Counters> {
  if (!countersPersisted()) return { ...memory }
  try {
    const [values] = await redis([['MGET', ...COUNTER_KEYS.map(redisKey)]])
    const list = Array.isArray(values) ? values : []
    const out = { ...ZERO }
    COUNTER_KEYS.forEach((key, i) => {
      out[key] = toCount(list[i])
    })
    return out
  } catch {
    return { ...ZERO }
  }
}

/**
 * Add to the counters and report the new totals. Deltas are clamped to
 * [0, BUMP_CAP] per key, so nothing here can subtract and no single
 * request can move a number by more than a plausible session's worth.
 */
export async function bumpCounters(deltas: Partial<Counters>): Promise<Counters> {
  const clean: Partial<Counters> = {}
  for (const key of COUNTER_KEYS) {
    const raw = deltas[key]
    if (typeof raw !== 'number' || !Number.isFinite(raw) || raw <= 0) continue
    clean[key] = Math.min(Math.floor(raw), BUMP_CAP[key])
  }
  const keys = Object.keys(clean) as CounterKey[]

  if (!countersPersisted()) {
    for (const key of keys) memory[key] += clean[key] as number
    return { ...memory }
  }
  if (!keys.length) return readCounters()

  try {
    await redis(keys.map((key) => ['INCRBY', redisKey(key), clean[key] as number]))
  } catch {
    // A failed write is not worth failing the request over: the visitor
    // gets the last known totals and the delta is simply lost.
  }
  return readCounters()
}
