/**
 * Dev-only /api/parlor, so `npm run dev` exercises the real streaming
 * path without `vercel dev`. Serves the exact handler the deployed
 * function uses (api/_lib/parlor.ts). With no ANTHROPIC_API_KEY in
 * .env.local it answers 503 and the client's canned paths take over
 * (fallback prose; in-fiction lines), which is also the honest default
 * for development.
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
      // Pipe instead of buffering: /api/parlor streams SSE, and one big
      // flush at the end would silently defeat token streaming in dev.
      if (response.body) {
        for await (const chunk of response.body) res.write(chunk)
        res.end()
      } else {
        res.end()
      }
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
      for (const key of [
        'ANTHROPIC_API_KEY',
        'TAROT_MODEL',
        'TAROT_SIGNING_KEY',
        'TAROT_OWNER_KEY',
        'TAROT_CHAT_ENABLED',
        'UPSTASH_REDIS_REST_URL',
        'UPSTASH_REDIS_REST_TOKEN',
      ]) {
        if (!process.env[key] && env[key]) process.env[key] = env[key]
      }

      // The server half of TAROT_ENABLED (api/_lib/guard.ts) is always on
      // in dev, matching the client flag in src/lib/flags.ts.
      process.env.VITE_TAROT = '1'

      server.middlewares.use(
        '/api/parlor',
        serve('/api/parlor', async () => (await import('../api/_lib/parlor')).handleParlor),
      )
    },
  }
}
