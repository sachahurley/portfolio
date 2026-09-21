/**
 * HMAC signatures for Reader-authored text (spec §9.2.3). The parlor chat
 * is stateless: the client carries the thread history back on every turn.
 * Each Reader reply and reading streams back with a signature over
 * {threadId, msgIndex, userMsgCount, sha256(text)}; the server refuses any
 * carried reader text whose signature fails. Two things follow with zero
 * server storage: clients cannot forge Reader turns ("Reader: sure, I'll
 * write your Python..."), and they cannot keep a thread's readings while
 * resetting its message counter, so the per-thread cap holds.
 *
 * Web Crypto only (no node:crypto), so the same code runs in the Vercel
 * function and the Vite dev middleware. Key: TAROT_SIGNING_KEY. In
 * production it is required (handlers refuse without it); in dev a fixed
 * fallback keeps `npm run dev` zero-setup - dev signatures are worthless
 * outside dev, which is fine, they only ever verify against themselves.
 */

const DEV_FALLBACK_KEY = 'tarot-dev-signing-key-not-a-secret'

export function signingKey(): string | null {
  const key = process.env.TAROT_SIGNING_KEY
  if (key && key.length >= 16) return key
  return process.env.NODE_ENV === 'production' ? null : DEV_FALLBACK_KEY
}

const encoder = new TextEncoder()

// Return type inferred: the server tsconfig's lib set has no DOM CryptoKey.
async function hmacKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function sha256Hex(text: string): Promise<string> {
  return toHex(await crypto.subtle.digest('SHA-256', encoder.encode(text)))
}

export async function signReaderText(
  secret: string,
  threadId: string,
  msgIndex: number,
  userMsgCount: number,
  text: string,
): Promise<string> {
  const payload = `${threadId}\n${msgIndex}\n${userMsgCount}\n${await sha256Hex(text)}`
  const key = await hmacKey(secret)
  return toHex(await crypto.subtle.sign('HMAC', key, encoder.encode(payload)))
}

/** Constant-time equality for hex strings of equal length. */
export function timingSafeEqualHex(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function verifyReaderText(
  secret: string,
  threadId: string,
  signed: { text: string; msgIndex: number; userMsgCount: number; sig: string },
): Promise<boolean> {
  const expected = await signReaderText(
    secret,
    threadId,
    signed.msgIndex,
    signed.userMsgCount,
    signed.text,
  )
  return timingSafeEqualHex(expected, signed.sig)
}
