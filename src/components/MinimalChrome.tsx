/**
 * MinimalChrome — the persistent UI mounted once in Layout.
 * Loader, the floating dock, the bottom sheet, toasts, the level-up modal,
 * and the first-visit tip.
 */

import { useState } from 'react'
import Loader from './Loader'
import Dock from './Dock'
import BottomSheet from './BottomSheet'
import Toaster from './Toaster'
import LevelUpModal from './LevelUpModal'

export default function MinimalChrome() {
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      <Loader />
      <Dock onMenu={() => setSheetOpen(true)} />
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
      <Toaster />
      <LevelUpModal />
    </>
  )
}
