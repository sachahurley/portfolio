/**
 * MinimalChrome — the persistent UI mounted once in Layout.
 * Loader (title screen), the frame's menu notch, the bottom sheet, toasts
 * (mobile; the message log narrates on desktop), the level-up modal, and
 * the World dialog (opened from the home grid, compass or sheet).
 * Sheet state is owned by Layout so the game frame's character strip can
 * open the sheet too.
 */

import Loader from './Loader'
import Dock from './Dock'
import BottomSheet from './BottomSheet'
import Toaster from './Toaster'
import LevelUpModal from './LevelUpModal'
import WorldStatsModal from './WorldStatsModal'

export default function MinimalChrome({
  sheetOpen,
  onSheetOpenChange,
}: {
  sheetOpen: boolean
  onSheetOpenChange: (open: boolean) => void
}) {
  return (
    <>
      <Loader />
      <Dock open={sheetOpen} onToggle={() => onSheetOpenChange(!sheetOpen)} />
      <BottomSheet open={sheetOpen} onClose={() => onSheetOpenChange(false)} />
      <Toaster />
      <LevelUpModal />
      <WorldStatsModal />
    </>
  )
}
