/**
 * MinimalChrome — the persistent UI mounted once in Layout.
 * Loader (title screen), the floating dock, the bottom sheet, toasts
 * (mobile; the message log narrates on desktop), and the level-up modal.
 * Sheet state is owned by Layout so the game frame's character strip can
 * open the sheet too.
 */

import Loader from './Loader'
import Dock from './Dock'
import BottomSheet from './BottomSheet'
import Toaster from './Toaster'
import LevelUpModal from './LevelUpModal'

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
      <Dock onMenu={() => onSheetOpenChange(true)} />
      <BottomSheet open={sheetOpen} onClose={() => onSheetOpenChange(false)} />
      <Toaster />
      <LevelUpModal />
    </>
  )
}
