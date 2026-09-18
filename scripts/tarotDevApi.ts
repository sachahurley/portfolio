/**
 * Dev-only /api/tarot, so `npm run dev` exercises the real reading path
 * without `vercel dev`. Serves the exact handler the deployed function
 * uses (api/_lib/reading.ts). With no ANTHROPIC_API_KEY in .env.local the
 * handler answers 503 and the client's canned fallback takes over, which
 * is also the honest default for development.
 */

import type { Plugin } from 'vite'
import { loadEnv } from 'vite'

export function tarotDevApi(): Plugin {
  return {
    name: 'tarot-dev-api',
    apply: 'serve',
    configureServer(server) {
      // Surface .env.local values (no VITE_ prefix needed) to the handler.
      const env = loadEnv('development', process.cwd(), '')
      for (const key of ['ANTHROPIC_API_KEY', 'TAROT_MODEL']) {
        if (!process.env[key] && env[key]) process.env[key] = env[key]
      }

      server.middlewares.use('/api/tarot', (req, res) => {
        const chunks: Buffer[] = []
        req.on('data', (c: Buffer) => chunks.push(c))
        req.on('end', async () => {
          const { handleTarot } = await import('../api/_lib/reading')
          const headers = new Headers()
          for (const [k, v] of Object.entries(req.headers)) {
            if (typeof v === 'string') headers.set(k, v)
          }
          const method = req.method ?? 'GET'
          const body = chunks.length ? Buffer.concat(chunks) : undefined
          const request = new Request(`http://${req.headers.host}/api/tarot`, {
            method,
            headers,
            body: method === 'POST' ? body : undefined,
          })
          const response = await handleTarot(request)
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(await response.text())
        })
      })
    },
  }
}
