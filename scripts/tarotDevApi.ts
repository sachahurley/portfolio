/**
 * Dev-only /api/tarot and /api/tarot-chat, so `npm run dev` exercises the
 * real reading and chat paths without `vercel dev`. Serves the exact
 * handlers the deployed functions use (api/_lib/reading.ts, _lib/chat.ts).
 * With no ANTHROPIC_API_KEY in .env.local both answer 503 and the client's
 * canned paths take over (fallback reading; the Reader ends the audience),
 * which is also the honest default for development.
 */

import type { Connect, Plugin } from 'vite'
import { loadEnv } from 'vite'

function serve(route: string, load: () => Promise<(r: Request) => Promise<Response>>): Connect.NextHandleFunction {
  return (req, res) => {
    const chunks: Buffer[] = []
    req.on('data', (c: Buffer) => chunks.push(c))
    req.on('end', async () => {
      const handler = await load()
      const headers = new Headers()
      for (const [k, v] of Object.entries(req.headers)) {
        if (typeof v === 'string') headers.set(k, v)
      }
      const method = req.method ?? 'GET'
      const body = chunks.length ? Buffer.concat(chunks) : undefined
      const request = new Request(`http://${req.headers.host}${route}`, {
        method,
        headers,
        body: method === 'POST' ? body : undefined,
      })
      const response = await handler(request)
      res.statusCode = response.status
      response.headers.forEach((value, key) => res.setHeader(key, value))
      res.end(await response.text())
    })
  }
}

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

      // chat first: connect matches prefixes, and the longer route must win
      server.middlewares.use(
        '/api/tarot-chat',
        serve('/api/tarot-chat', async () => (await import('../api/_lib/chat')).handleTarotChat),
      )
      server.middlewares.use(
        '/api/tarot',
        serve('/api/tarot', async () => (await import('../api/_lib/reading')).handleTarot),
      )
    },
  }
}
