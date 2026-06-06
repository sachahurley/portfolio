/**
 * Dock — the only persistent chrome.
 *
 * A floating bottom-center container holding the Menu pill and a back chevron
 * that slides in on every page except Home. Back uses router history.
 */

import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MenuFire from './MenuFire'

// First tap: hold the sheet back briefly so the extinguish smoke puff is visible
// before the sheet rises over the dock. Later taps open immediately.
const SMOKE_DELAY = 600 // ms

export default function Dock({ onMenu }: { onMenu: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isSub = location.pathname !== '/'
  // The Menu pill burns on load; the first tap puts it out for good.
  const [lit, setLit] = useState(true)
  const openTimer = useRef<number | null>(null)

  useEffect(() => () => {
    if (openTimer.current) clearTimeout(openTimer.current)
  }, [])

  const onBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

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
    <div className={`dock${isSub ? ' sub' : ''}`}>
      <button className="backbtn" aria-label="Back" onClick={onBack}>
        <svg
          width="14"
          height="22"
          viewBox="0 0 14 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 4 L4 11 L10 18" />
        </svg>
      </button>
      <button
        className={`menubtn${lit ? ' lit' : ''}`}
        aria-haspopup="dialog"
        aria-controls="sheet"
        onClick={onMenuClick}
      >
        <MenuFire lit={lit} />
        <span className="ic">
          <span />
          <span />
          <span />
        </span>
        Menu
      </button>
    </div>
  )
}
