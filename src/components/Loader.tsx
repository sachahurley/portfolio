/**
 * Loader — full-screen spinner shown on initial load.
 * Fades out after ~900ms then unmounts. Placeholder behavior for now.
 */

import { useEffect, useState } from 'react'

export default function Loader() {
  const [hidden, setHidden] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const hideTimer = setTimeout(() => setHidden(true), 900)
    const goneTimer = setTimeout(() => setGone(true), 1350)
    return () => {
      clearTimeout(hideTimer)
      clearTimeout(goneTimer)
    }
  }, [])

  if (gone) return null

  return (
    <div id="loader" className={hidden ? 'hide' : undefined}>
      <div className="spinner" />
    </div>
  )
}
