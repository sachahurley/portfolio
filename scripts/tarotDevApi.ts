/**
 * Dev-only /api/tarot-chat, so `npm run dev` exercises the real streaming
 * chat without `vercel dev`. Serves the exact handler the deployed function
 * uses (api/_lib/chat.ts). Put ANTHROPIC_API_KEY in .env.local; without it
 * the endpoint answers 503 and the parlor shows its "away" line.
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
      // Pipe, don't buffer: the chat streams, and one flush at the end
      // would hide token streaming in dev.
      if (response.body) {
        for await (const chunk of response.body) res.write(chunk)
      }
      res.end()
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

      server.middlewares.use(
        '/api/tarot-chat',
        serve('/api/tarot-chat', async () => (await import('../api/_lib/chat')).handleTarotChat),
      )
    },
  }
}
