/**
 * useVault — unlock state for a password-locked project page.
 *
 * On mount it tries, in order: a `?key=<password>` URL param (the shareable
 * self-unlocking link — stripped from the URL either way), the in-memory key
 * cache, then the key persisted in localStorage (cleared if it no longer
 * decrypts, which handles password rotation). `submit(password)` drives the
 * gate's form. This is the site's first async data path; the state stays
 * local to the page — only one detail page consumes it at a time.
 */

import { useCallback, useEffect, useState } from 'react'
import type { ProjectBlock } from '../data/projects'
import { clearStoredKey, decryptBlocks, deriveKey, loadStoredKey, persistKey } from './vault'

// One shared password -> one key: navigating between locked pages should not
// re-derive (PBKDF2 is deliberately slow) or re-read storage.
let cachedKey: CryptoKey | null = null

export type VaultState =
  | { status: 'locked'; error: boolean }
  | { status: 'checking'; error: false }
  | { status: 'unlocked'; error: false; blocks: ProjectBlock[] }

export type Vault = VaultState & {
  submit: (password: string) => void
  /** Count of failed attempts; the gate keys its shake off this. */
  fails: number
}

/** Pass null for pages that aren't locked; the hook stays inert. */
export function useVault(slug: string | null): Vault {
  const [state, setState] = useState<VaultState>(
    slug ? { status: 'checking', error: false } : { status: 'locked', error: false },
  )
  const [fails, setFails] = useState(0)

  useEffect(() => {
    if (!slug) return
    let stale = false
    const settle = (next: VaultState) => {
      if (!stale) setState(next)
    }

    const run = async () => {
      // (Re)entering a locked page starts from "checking"; set here rather
      // than synchronously in the effect body so a slug change can't
      // trigger a cascading render.
      settle({ status: 'checking', error: false })
      // Self-unlocking link: consume ?key= and strip it from the URL
      // whether or not it works (it shouldn't linger in the address bar).
      // Stripped via history directly, not setSearchParams: that setter's
      // identity changes with the URL, and having it re-trigger this effect
      // cancels the in-flight decrypt (the key is gone on the second pass).
      const params = new URLSearchParams(window.location.search)
      const urlKey = params.get('key')
      if (urlKey !== null) {
        params.delete('key')
        const query = params.toString()
        window.history.replaceState(
          window.history.state,
          '',
          window.location.pathname + (query ? `?${query}` : '') + window.location.hash,
        )
      }
      if (urlKey) {
        try {
          const key = await deriveKey(urlKey)
          const blocks = await decryptBlocks(key, slug)
          cachedKey = key
          void persistKey(key)
          settle({ status: 'unlocked', error: false, blocks })
          return
        } catch {
          /* bad link key: fall through to the stored key, then the gate */
        }
      }
      if (cachedKey) {
        try {
          const blocks = await decryptBlocks(cachedKey, slug)
          settle({ status: 'unlocked', error: false, blocks })
          return
        } catch {
          cachedKey = null
        }
      }
      const stored = await loadStoredKey()
      if (stored) {
        try {
          const blocks = await decryptBlocks(stored, slug)
          cachedKey = stored
          settle({ status: 'unlocked', error: false, blocks })
          return
        } catch {
          clearStoredKey()
        }
      }
      settle({ status: 'locked', error: false })
    }

    void run()
    return () => {
      stale = true
    }
  }, [slug])

  const submit = useCallback(
    (password: string) => {
      if (!slug) return
      setState({ status: 'checking', error: false })
      void (async () => {
        try {
          const key = await deriveKey(password)
          const blocks = await decryptBlocks(key, slug)
          cachedKey = key
          void persistKey(key)
          setState({ status: 'unlocked', error: false, blocks })
        } catch {
          setFails((f) => f + 1)
          setState({ status: 'locked', error: true })
        }
      })()
    },
    [slug],
  )

  return { ...state, submit, fails }
}
