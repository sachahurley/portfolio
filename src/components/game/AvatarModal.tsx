/**
 * AvatarModal, the character sheet's appearance dialog (opened from the
 * avatar button). Two choices: a figure (the current one plus 7 procedural
 * candidates, rerollable) and an ink from the limited avatar palette, which
 * repaints the silhouette. Every pick applies and saves at once, like the
 * rest of the save file; the candidates preview in the chosen ink, so the
 * grid doubles as the preview. Chrome (scrim, Esc, focus, footer band) is
 * the DS Modal.
 */

import { useState } from 'react'
import { Button, Modal } from '@scorp-ds/components'
import { useXp } from '../../context/XpProvider'
import { AVATAR_INKS, inkColor } from '../../game/avatarInks'
import { randomSeed } from '../../game/names'
import PixelPortrait from './PixelPortrait'

const rollCandidates = (keep: number) => [keep, ...Array.from({ length: 7 }, () => randomSeed())]

export default function AvatarModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { avatarSeed, setAvatarSeed, avatarInk, setAvatarInk } = useXp()
  const [candidates, setCandidates] = useState<number[]>([])

  // Fresh candidates on every open, led by the current figure so the pick
  // being replaced stays visible (adjust-state-during-render, as in ItemCard).
  const [wasOpen, setWasOpen] = useState(false)
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen)
    if (isOpen) setCandidates(rollCandidates(avatarSeed))
  }

  const ink = inkColor(avatarInk)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Appearance"
      width="min(420px, 92vw)"
      footerContent={
        <Button variant="secondary" size="small" type="button" onClick={onClose}>
          Done
        </Button>
      }
    >
      <div className="gf-label">figure</div>
      <div className="av-grid" role="group" aria-label="Choose a figure">
        {candidates.map((s, i) => (
          <button
            key={`${i}:${s}`}
            type="button"
            className="cs-cand av-cand"
            aria-pressed={s === avatarSeed}
            aria-label={i === 0 ? 'Current figure' : `Figure ${i + 1}`}
            onClick={() => setAvatarSeed(s)}
          >
            <PixelPortrait seed={s} cell={3} ink={ink} />
          </button>
        ))}
      </div>
      <Button
        variant="ghost"
        size="small"
        type="button"
        className="av-reroll"
        onClick={() => setCandidates(rollCandidates(avatarSeed))}
      >
        ↻ Reroll
      </Button>

      <div className="gf-label av-inklabel">ink</div>
      <div className="av-inks" role="group" aria-label="Choose an ink">
        {AVATAR_INKS.map((k) => (
          <button
            key={k.id}
            type="button"
            className="av-ink"
            aria-pressed={k.id === avatarInk}
            aria-label={k.name}
            title={k.name}
            onClick={() => setAvatarInk(k.id)}
          >
            <span className="av-ink-fill" style={{ background: k.color }} />
          </button>
        ))}
      </div>
    </Modal>
  )
}
