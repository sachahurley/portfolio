/**
 * vault — browser-side decrypt for password-locked case studies.
 *
 * Counterpart to scripts/lock-projects.mjs: that script encrypts each locked
 * project's ProjectBlock[] (PBKDF2 -> AES-GCM) into src/data/lockedBlocks.gen.ts;
 * this module derives the key from the visitor's password and decrypts in the
 * browser. A wrong password simply fails GCM authentication — no password
 * hash exists anywhere.
 *
 * The derived key (never the password itself) persists in localStorage under
 * `sh_vault` so a visitor unlocks once per device. Like `sh_side`, it is a
 * standalone entry beside — not inside — the `sh_min` save blob.
 */

import type { ProjectBlock } from '../data/projects'
import { VAULT_KDF, lockedBlocks } from '../data/lockedBlocks.gen'

const VAULT_STORE_KEY = 'sh_vault'

const enc = new TextEncoder()

// Explicit ArrayBuffer generic: the bare Uint8Array type widens to
// ArrayBufferLike, which crypto.subtle's BufferSource params reject.
function fromB64(b64: string): Uint8Array<ArrayBuffer> {
  const bin = atob(b64)
  const bytes = new Uint8Array(new ArrayBuffer(bin.length))
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

function toB64(buf: ArrayBuffer): string {
  let bin = ''
  for (const byte of new Uint8Array(buf)) bin += String.fromCharCode(byte)
  return btoa(bin)
}

/** PBKDF2 per VAULT_KDF; extractable so the key can persist across visits. */
export async function deriveKey(password: string): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
    'deriveKey',
  ])
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode(VAULT_KDF.salt),
      iterations: VAULT_KDF.iterations,
      hash: VAULT_KDF.hash,
    },
    base,
    { name: 'AES-GCM', length: 256 },
    true,
    ['decrypt'],
  )
}

/** Decrypt a locked project's blocks; throws when the key is wrong. */
export async function decryptBlocks(key: CryptoKey, slug: string): Promise<ProjectBlock[]> {
  const payload = lockedBlocks[slug]
  if (!payload) throw new Error(`no locked payload for "${slug}"`)
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromB64(payload.iv) },
    key,
    fromB64(payload.ct),
  )
  return JSON.parse(new TextDecoder().decode(plain)) as ProjectBlock[]
}

export async function persistKey(key: CryptoKey): Promise<void> {
  try {
    const raw = await crypto.subtle.exportKey('raw', key)
    localStorage.setItem(VAULT_STORE_KEY, toB64(raw))
  } catch {
    /* private mode: the unlock still holds for this visit */
  }
}

export async function loadStoredKey(): Promise<CryptoKey | null> {
  try {
    const b64 = localStorage.getItem(VAULT_STORE_KEY)
    if (!b64) return null
    return await crypto.subtle.importKey('raw', fromB64(b64), 'AES-GCM', true, ['decrypt'])
  } catch {
    return null
  }
}

/** Drop a stale stored key (e.g. after the shared password rotates). */
export function clearStoredKey(): void {
  try {
    localStorage.removeItem(VAULT_STORE_KEY)
  } catch {
    /* ignore */
  }
}
