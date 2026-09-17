/**
 * Dock — the mobile chrome (hidden at ≥960px, where the compass sidebar
 * is the sole nav).
 *
 * A floating bottom-center container holding the Menu button. In-page
 * navigation back is handled by each page's .pageback button instead.
 */

import DitherIcon from './DitherIcon'

export default function Dock({ onMenu }: { onMenu: () => void }) {
  return (
    <div className="dock">
      <span className="menuwrap">
        <button
          className="menubtn"
          aria-haspopup="dialog"
          aria-controls="sheet"
          onClick={onMenu}
        >
          <DitherIcon name="home" size={16} className="ic-home" />
          Menu
        </button>
      </span>
    </div>
  )
}
