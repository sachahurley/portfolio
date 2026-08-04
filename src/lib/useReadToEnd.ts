/**
 * useReadToEnd — fires once when a bottom sentinel scrolls into view.
 * Powers the "read a quest to the end" XP award. Place the returned ref on
 * an empty element at the end of the content; works inside the game frame's
 * internal scroller because IntersectionObserver intersects against the
 * browser viewport regardless of which ancestor scrolls.
 */

import { useEffect, useRef } from 'react'

export function useReadToEnd(onEnd: () => void, enabled = true) {
  const ref = useRef<HTMLDivElement>(null)
  const cbRef = useRef(onEnd)
  useEffect(() => {
    cbRef.current = onEnd
  })

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        cbRef.current()
        io.disconnect()
      }
    })
    io.observe(el)
    return () => io.disconnect()
  }, [enabled])

  return ref
}
