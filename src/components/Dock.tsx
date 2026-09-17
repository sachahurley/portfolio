/**
 * Dock — the mobile chrome (hidden at ≥960px, where the compass sidebar
 * is the sole nav).
 *
 * A stone notch grown out of the frame's bottom band, sibling to the
 * desktop side panel's drawer-pull tab: straight bottom edge merging into
 * the stonework, free corners notched. It carries the icon and label, and
 * it is the one control for the sheet — while the sheet is open it rides
 * above it and flips to a close affordance.
 *
 * In-page navigation back is handled by each page's .pageback button.
 */

import DitherIcon from './DitherIcon'

export default function Dock({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      className={`gf-tab${open ? ' is-open' : ''}`}
      aria-haspopup="dialog"
      aria-controls="sheet"
      aria-expanded={open}
      onClick={onToggle}
    >
      <DitherIcon name={open ? 'chevron-down' : 'home'} size={16} className="ic-home" />
      {open ? 'Close' : 'Menu'}
    </button>
  )
}
