/**
 * Shared plumbing for the dev-only API middlewares (tarotDevApi,
 * statsDevApi), so `npm run dev` exercises the real handlers without
 * `vercel dev`.
 *
 * Adapts Connect's node req/res to the web Request/Response signature the
 * Vercel functions are written against, and pipes the response body rather
 * than buffering it, because the chat handler streams and one flush at the
 * end would hide token streaming in dev.
 */

import type { Connect } from 'vite'

export type WebHandler = (request: Request) => Promise<Response>

export function serveHandler(route: string, load: () => Promise<WebHandler>): Connect.NextHandleFunction {
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
        body: method === 'GET' || method === 'HEAD' ? undefined : body,
      })
      const response = await handler(request)
      res.statusCode = response.status
      response.headers.forEach((value, key) => res.setHeader(key, value))
      if (response.body) {
        for await (const chunk of response.body) res.write(chunk)
      }
      res.end()
    })
  }
}
