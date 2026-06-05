/**
 * Dock — the only persistent chrome.
 *
 * A floating bottom-center container holding the Menu pill and a back chevron
 * that slides in on every page except Home. Back uses router history.
 */

import { useLocation, useNavigate } from 'react-router-dom'

export default function Dock({ onMenu }: { onMenu: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const isSub = location.pathname !== '/'

  const onBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
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
        className="menubtn"
        aria-haspopup="dialog"
        aria-controls="sheet"
        onClick={onMenu}
      >
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
