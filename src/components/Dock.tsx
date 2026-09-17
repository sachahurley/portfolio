/**
 * Dock — the mobile chrome (hidden at ≥960px, where the compass sidebar
 * is the sole nav).
 *
 * A stone notch grown out of the frame's bottom band, sibling to the
 * desktop side panel's drawer-pull tab: straight bottom edge merging into
 * the stonework, free corners notched, carrying the icon and label. It
 * opens the sheet and then gets out of the way: the sheet's own notch, at
 * its top edge, is what closes it, so only one notch is ever on screen.
 *
 * In-page navigation back is handled by each page's .pageback button.
 */

import DitherIcon from './DitherIcon'

export default function Dock({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  if (open) return null

  return (
    <button
      className="gf-tab"
      aria-haspopup="dialog"
      aria-controls="sheet"
      aria-expanded={false}
      onClick={onToggle}
    >
      <DitherIcon name="home" size={16} className="ic-home" />
      Menu
    </button>
  )
}
