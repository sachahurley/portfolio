/**
 * LockGate — the code prompt in front of a locked lab experiment.
 *
 * Renders the padlock sprite, the hint, and an input. A correct code stores the
 * unlock (see lib/unlocks) and awards XP once; a wrong one says so and keeps
 * focus in the field.
 */

import { useRef, useState, type FormEvent } from 'react'
import { TileBox } from '../TileSprite'
import { tryUnlock } from '../../lib/unlocks'
import { useXp, XP_AWARDS } from '../../context/XpProvider'
import './LockGate.css'

export default function LockGate({ slug, code, hint }: { slug: string; code: string; hint: string }) {
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { award, toast } = useXp()

  function submit(e: FormEvent) {
    e.preventDefault()
    if (tryUnlock(slug, code, value)) {
      award(XP_AWARDS.lab, 'picked a lock', `unlock:${slug}`)
      toast('Unlocked')
      return
    }
    setWrong(true)
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div className="lockgate">
      <TileBox x={10} y={45} scale={6} tint="var(--accent)" label="Locked" />
      <p className="lead">{hint}</p>
      <form className="lockgate-form" onSubmit={submit}>
        <input
          id="unlock-code"
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setWrong(false)
          }}
          placeholder="code"
          aria-label="Unlock code"
          aria-invalid={wrong}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <button type="submit">unlock</button>
      </form>
      <p className="lockgate-msg" role="status">{wrong ? 'Not it. Try again.' : ' '}</p>
    </div>
  )
}
