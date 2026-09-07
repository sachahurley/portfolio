/**
 * Dock — the mobile chrome (hidden at ≥960px, where the compass sidebar
 * is the sole nav).
 *
 * A floating bottom-center container holding the Menu button. In-page
 * navigation back is handled by each page's .pageback button instead.
 */

import { useEffect, useRef, useState } from 'react'
import MenuFire from './MenuFire'
import DitherIcon from './DitherIcon'

// First tap: hold the sheet back briefly so the extinguish smoke puff is visible
// before the sheet rises over the dock. Later taps open immediately.
const SMOKE_DELAY = 600 // ms

export default function Dock({ onMenu }: { onMenu: () => void }) {
  // The Menu pill burns on load; the first tap puts it out for good.
  const [lit, setLit] = useState(true)
  const openTimer = useRef<number | null>(null)

  useEffect(() => () => {
    if (openTimer.current) clearTimeout(openTimer.current)
  }, [])

  const onMenuClick = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current)
      openTimer.current = null
    }
    if (lit) {
      // First tap: extinguish, let the smoke play, then bring the sheet up.
      setLit(false)
      openTimer.current = window.setTimeout(() => {
        openTimer.current = null
        onMenu()
      }, SMOKE_DELAY)
    } else {
      onMenu()
    }
  }

  return (
    <div className="dock">
      {/* MenuFire sits outside the button: the notched clip-path would
          swallow it (it hangs above the button box), so it anchors to the
          wrapper instead */}
      <span className="menuwrap">
        <MenuFire lit={lit} />
        <button
          className={`menubtn${lit ? ' lit' : ''}`}
          aria-haspopup="dialog"
          aria-controls="sheet"
          onClick={onMenuClick}
        >
          <DitherIcon name="home" size={16} className="ic-home" />
          Menu
        </button>
      </span>
    </div>
  )
}
