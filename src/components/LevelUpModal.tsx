/**
 * LevelUpModal — the gem-award dialog, mounted once in MinimalChrome.
 *
 * Pull, not push: it opens only when the visitor taps the ▴ LEVEL UP badge
 * (celebrateLevel), then presents pending level-ups sequentially with a
 * short beat between them. Chrome (scrim, plate panel, Esc, focus
 * management, footer CTA band) is the DS Modal; this file keeps only the
 * queue choreography and the celebratory content.
 */

import { useEffect, useRef, useState } from 'react'
import { Button, Modal } from '@scorp-ds/components'
import { useXp } from '../context/XpProvider'
import { LEVEL_GEMS, THEMES } from '../lib/themes'
import Gem from './progress/Gem'

export default function LevelUpModal() {
  const { pendingLevels, celebrating, dismissModal } = useXp()
  const head = celebrating && pendingLevels.length ? pendingLevels[0] : null
  const [shown, setShown] = useState<number | null>(null)
  const wasOpenRef = useRef(false)

  // Follow the queue head; when one award replaces another, pause 260ms so
  // the swap reads as two awards rather than the text flashing in place.
  useEffect(() => {
    const delay = head != null && wasOpenRef.current ? 260 : 0
    const t = window.setTimeout(() => {
      setShown(head)
      wasOpenRef.current = head != null
    }, delay)
    return () => clearTimeout(t)
  }, [head])

  const gem = shown != null ? LEVEL_GEMS[shown - 1] : undefined

  return (
    <Modal
      isOpen={shown != null && gem != null}
      onClose={dismissModal}
      title="Level up"
      width={320}
      footerContent={
        <Button variant="secondary" size="small" type="button" onClick={dismissModal}>
          Add to your gems
        </Button>
      }
    >
      {shown != null && gem != null && (
        <div className="text-center">
          <div className="em-gem">
            <Gem themeId={gem} scale={8} cls="gem-art-lg" />
          </div>
          <div className="em-title">{`Level ${shown + 1}!`}</div>
          <div className="em-text">
            You earned the <b>{THEMES[gem].name}</b> gem. Drop it into the fire on your character
            page to recolor the site. A chest also waits there.
          </div>
        </div>
      )}
    </Modal>
  )
}
