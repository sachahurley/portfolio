/**
 * ChestSignal — the waiting-chest indicator shared by the game frame's
 * character strip and the menu sheet's character row: the pack's chest
 * art wearing the village tappables' twin glints (villageKit.ts bakes
 * them into canvas; here the same 14-frame star on the 300ms beat is
 * rebuilt as CSS pixels, accent-inked like the village's live cue).
 * Decorative only: both hosts carry the waiting state in their labels.
 */

import PixelItem from './PixelItem'

export default function ChestSignal() {
  return (
    <span className="chest-signal" aria-hidden="true">
      <PixelItem kind="chest" rarity="common" cell={2} />
      <i className="chest-glint chest-glint-a" />
      <i className="chest-glint chest-glint-b" />
    </span>
  )
}
