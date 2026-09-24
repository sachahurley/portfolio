/**
 * Dev-only /api/tarot-chat, so `npm run dev` exercises the real streaming
 * chat without `vercel dev`. Serves the exact handler the deployed function
 * uses (api/_lib/chat.ts). Put ANTHROPIC_API_KEY in .env.local; without it
 * the templated Seer answers, exactly as in production.
 */

import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import { serveHandler } from './devApi'

export function tarotDevApi(): Plugin {
  return {
    name: 'tarot-dev-api',
    apply: 'serve',
    configureServer(server) {
      // Surface .env.local values (no VITE_ prefix needed) to the handlers.
      const env = loadEnv('development', process.cwd(), '')
      for (const key of ['ANTHROPIC_API_KEY', 'TAROT_MODEL']) {
        if (!process.env[key] && env[key]) process.env[key] = env[key]
      }

      // The server half of TAROT_ENABLED (api/_lib/guard.ts) is always on
      // in dev, matching the client flag in src/lib/flags.ts.
      process.env.VITE_TAROT = '1'

      server.middlewares.use(
        '/api/tarot-chat',
        serveHandler('/api/tarot-chat', async () => (await import('../api/_lib/chat')).handleTarotChat),
      )
    },
  }
}
