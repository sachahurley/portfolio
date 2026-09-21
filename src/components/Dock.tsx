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
import { useXp } from '../context/XpProvider'

export default function Dock({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  // Any waiting chest (an unopened loot chest or an unclaimed level-up,
  // which is a chest too) gets one accent pip on the notch: mobile's single
  // persistent signal beyond the transient toast (the sheet row's chest art
  // answers it). Collapsed state only: the pip unmounts the moment the
  // sheet opens, rather than just sinking with the notch.
  const { chests, pendingLevels } = useXp()
  const waiting = pendingLevels.length + chests.length > 0

  // Stays mounted while the sheet is open: the notch sinks into the stone
  // band (CSS .is-sunk) as the sheet rises carrying its twin, so the two
  // tabs read as one plate diving under and resurfacing. visibility:hidden
  // at the end of the sink keeps it out of the tab order.
  // The holder owns the fixed centring and the sink: the button's
  // clip-path clips every descendant, and the pip straddles the notch
  // corner, so it must live OUTSIDE the clipped element as a sibling.
  return (
    <div className={`gf-tab-holder${open ? ' is-sunk' : ''}`}>
      <button
        className="gf-tab"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={waiting ? 'Menu, rewards waiting' : undefined}
        onClick={onToggle}
      >
        <DitherIcon name="home" size={16} className="ic-home" />
        Menu
      </button>
      {!open && waiting && (
        <span className="gf-tab-dot" aria-hidden="true" />
      )}
    </div>
  )
}
