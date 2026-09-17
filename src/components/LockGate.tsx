/**
 * LockGate — the one barrier in front of anything locked: a sealed case
 * study (password, decrypts the write-up) or a locked lab experiment (a
 * code puzzle). Both wear the same chrome so a lock always looks like a
 * lock: a centered panel, the Urizen padlock in the accent, the Loader's
 * asterisk-box prompt, the character panel's underline input, and a plate
 * button. A wrong answer shakes the panel (reduced motion: message only).
 *
 * The host owns what unlocking means: `onSubmit` verifies, `error` and
 * `busy` describe the attempt, and `children` render under the gate (the
 * hatched bars standing in for a redacted case study).
 */

import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { TileBox } from './TileSprite'

/** items/lock/padlock_01 on the Urizen sheet (see /lab/tile-atlas). */
const PADLOCK: readonly [number, number] = [10, 45]

export default function LockGate({
  kicker,
  hint,
  inputType = 'text',
  busy = false,
  error,
  fails = 0,
  onSubmit,
  children,
}: {
  /** Small caps label above the prompt, e.g. "sealed" or "locked". */
  kicker: string
  /** One line telling the visitor what to type. */
  hint: string
  inputType?: 'text' | 'password'
  busy?: boolean
  /** Message for the last failed attempt, if any. */
  error?: string
  /** Failed-attempt counter; a new fail shakes the panel once. */
  fails?: number
  onSubmit: (value: string) => void
  children?: ReactNode
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  // Shake once per failed attempt: unacknowledged fails shake, and the
  // animation end acknowledges them (no animation under reduced motion,
  // so there is nothing to clear).
  const [ackedFails, setAckedFails] = useState(fails)
  const shaking = fails > ackedFails

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const value = inputRef.current?.value ?? ''
    if (value) onSubmit(value)
  }

  return (
    <>
      <form
        className={`vault-gate${shaking ? ' err' : ''}`}
        onSubmit={submit}
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget) setAckedFails(fails)
        }}
      >
        <TileBox x={PADLOCK[0]} y={PADLOCK[1]} scale={4} tint="var(--accent)" label="Locked" />
        <span className="vault-sealed">{kicker}</span>
        <StarBox text={hint} />
        <div className="vault-form">
          <input
            ref={inputRef}
            className="vault-input"
            type={inputType}
            aria-label={inputType === 'password' ? 'Password' : 'Unlock code'}
            aria-invalid={!!error}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            disabled={busy}
          />
          <button className="platebtn" type="submit" disabled={busy}>
            {busy ? 'checking' : 'unlock'}
          </button>
        </div>
        <span className="vault-err" aria-live="polite">
          {error ?? ' '}
        </span>
      </form>
      {children}
    </>
  )
}

/** Same three-line asterisk frame as the welcome screen's StarBox (Loader.tsx). */
function StarBox({ text }: { text: string }) {
  const inner = `* ${text} *`
  const edge = '*'.repeat(inner.length)
  return <span className="ts-hint ts-hint-box">{`${edge}\n${inner}\n${edge}`}</span>
}
