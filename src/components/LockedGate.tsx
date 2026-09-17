/**
 * LockedGate — the "sealed" barrier on a password-locked project page.
 *
 * Speaks the site's existing terminal vocabulary: the Loader's asterisk-box
 * prompt, the character panel's underline input, a plate button, and hatched
 * bars standing in for the redacted case-study body. A wrong password shakes
 * the gate (reduced motion: message only).
 */

import { useRef, useState } from 'react'
import DitherIcon from './DitherIcon'
import type { Vault } from '../lib/useVault'

// Same three-line asterisk frame as the welcome screen's StarBox (Loader.tsx).
function StarBox({ text }: { text: string }) {
  const inner = `* ${text} *`
  const edge = '*'.repeat(inner.length)
  return <span className="ts-hint ts-hint-box">{`${edge}\n${inner}\n${edge}`}</span>
}

export default function LockedGate({ vault }: { vault: Vault }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const failed = vault.status === 'locked' && vault.error

  // Shake once per failed attempt, derived from the hook's fail counter:
  // unacknowledged fails shake, and animation end acknowledges them (with
  // reduced motion there's no animation, and no shake to clear).
  const [ackedFails, setAckedFails] = useState(vault.fails)
  const shaking = vault.fails > ackedFails

  const submit = () => {
    const password = inputRef.current?.value ?? ''
    if (password) vault.submit(password)
  }

  const checking = vault.status === 'checking'

  return (
    <>
      <div
        className={`vault-gate${shaking ? ' err' : ''}`}
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget) setAckedFails(vault.fails)
        }}
      >
        <DitherIcon name="lock" size={24} />
        <span className="vault-sealed">sealed</span>
        <StarBox text="enter the password to unlock" />
        <div className="vault-form">
          <input
            ref={inputRef}
            className="vault-input"
            type="password"
            aria-label="Password"
            autoComplete="off"
            disabled={checking}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit()
            }}
          />
          <button className="platebtn" type="button" onClick={submit} disabled={checking}>
            {checking ? 'checking' : 'unlock'}
          </button>
        </div>
        <span className="vault-err" aria-live="polite">
          {failed ? 'wrong password' : ' '}
        </span>
      </div>
      {/* the redacted body: hatched placeholder bars until unlocked */}
      <div className="vault-redacted" aria-hidden="true">
        <div className="vault-hatch" />
        <div className="vault-hatch" />
        <div className="vault-hatch" />
      </div>
    </>
  )
}
