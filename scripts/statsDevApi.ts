/**
 * Dev-only /api/stats, so `npm run dev` exercises the real counter endpoint
 * without `vercel dev`. Serves the exact handler the deployed function uses
 * (api/_lib/stats.ts).
 *
 * With no Upstash credentials in .env.local the counters live in the dev
 * server's memory: they survive page reloads and reset when you restart
 * Vite. That is enough to see the row behave; put the real credentials in
 * .env.local to read and write the production totals.
 */

import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import { serveHandler } from './devApi'

export function statsDevApi(): Plugin {
  return {
    name: 'stats-dev-api',
    apply: 'serve',
    configureServer(server) {
      // Surface .env.local values (no VITE_ prefix needed) to the handler.
      const env = loadEnv('development', process.cwd(), '')
      for (const key of [
        'UPSTASH_REDIS_REST_URL',
        'UPSTASH_REDIS_REST_TOKEN',
        'KV_REST_API_URL',
        'KV_REST_API_TOKEN',
      ]) {
        if (!process.env[key] && env[key]) process.env[key] = env[key]
      }

      server.middlewares.use(
        '/api/stats',
        serveHandler('/api/stats', async () => (await import('../api/_lib/stats')).handleSiteStats),
      )
    },
  }
}
