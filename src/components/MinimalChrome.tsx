/**
 * MinimalChrome — the persistent UI mounted once in Layout.
 * Loader, the floating dock, the bottom sheet, toasts, and the first-visit tip.
 */

import { useEffect, useState } from 'react'
import Loader from './Loader'
import Dock from './Dock'
import BottomSheet from './BottomSheet'
import Toaster from './Toaster'

export default function MinimalChrome() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [tip, setTip] = useState(false)

  // First-visit hint pointing at the menu button
  useEffect(() => {
    try {
      if (!localStorage.getItem('sh_tip')) {
        setTip(true)
        localStorage.setItem('sh_tip', '1')
        const t = setTimeout(() => setTip(false), 4200)
        return () => clearTimeout(t)
      }
    } catch {
      /* ignore storage failures */
    }
  }, [])

  return (
    <>
      <Loader />
      {tip && <span className="tip">navigation</span>}
      <Dock onMenu={() => setSheetOpen(true)} />
      <BottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
      <Toaster />
    </>
  )
}
