/**
 * Vercel BotID check for the parlor endpoint (spec §9.2.1). The client
 * half is initBotId() in src/main.tsx plus the proxy rewrites in
 * vercel.json; this is the server half. checkBotId() reads the signals
 * the client runtime attached to the request, so the request's headers
 * are passed through explicitly (we hold a web Request, not Next's
 * ambient context).
 *
 * Fails OPEN on purpose: BotID is layer 1 of several, and a BotID outage
 * must not take the parlor down - rate limits, signed turns, and the
 * budget breakers hold without it. In dev the library bypasses itself
 * (NODE_ENV !== 'production'), so local requests always pass.
 */

export async function requestIsBot(request: Request): Promise<boolean> {
  if (process.env.NODE_ENV !== 'production') return false
  try {
    const { checkBotId } = await import('botid/server')
    const headers: Record<string, string> = {}
    request.headers.forEach((value, key) => {
      headers[key] = value
    })
    const verification = await checkBotId({ advancedOptions: { headers } })
    return verification.isBot
  } catch (err) {
    console.error('[parlor] botid:', err instanceof Error ? err.message : err)
    return false
  }
}
