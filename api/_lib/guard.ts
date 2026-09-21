/**
 * Shared request guards for the tarot endpoints (api/_lib/reading.ts and
 * api/_lib/chat.ts run these before touching the body).
 *
 * tarotApiEnabled is the server half of TAROT_ENABLED (src/lib/flags.ts):
 * the client flag removes the parlor's UI from the bundle at build time,
 * this one hides the endpoints at runtime, so a flagged-off deploy has no
 * reachable surface even for someone who knows the URLs. It reads the same
 * Vercel env var (VITE_TAROT, on unless set to 0) on purpose: one env flip
 * shuts the API immediately and the UI at the next build. The Vite dev middleware
 * (scripts/tarotDevApi.ts) force-enables it, matching the client flag
 * being always on in dev.
 */

export const tarotApiEnabled = () => process.env.VITE_TAROT !== '0'

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })

/**
 * Cross-site rejection, three independent tells (any one refuses):
 *  - Origin/host mismatch: browsers send Origin on cross-site POSTs.
 *  - Sec-Fetch-Site: set by every modern browser and unforgeable from JS;
 *    anything but a same-origin (or user-initiated) request is refused.
 *  - Content-Type must be JSON: an HTML form can only post urlencoded,
 *    multipart, or text/plain, so a forged form submission dies here even
 *    from a browser too old to send the headers above.
 * Non-browser clients can fake all three, but they are the rate limiter's
 * problem, not a CSRF vector. Returns a Response to send, or null to
 * proceed.
 */
export function rejectCrossSite(request: Request): Response | null {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json(403, { error: 'origin' })
    } catch {
      return json(403, { error: 'origin' })
    }
  }

  const site = request.headers.get('sec-fetch-site')
  if (site && site !== 'same-origin' && site !== 'none') {
    return json(403, { error: 'origin' })
  }

  const type = request.headers.get('content-type') ?? ''
  if (!type.toLowerCase().includes('application/json')) {
    return json(415, { error: 'content type' })
  }

  return null
}
