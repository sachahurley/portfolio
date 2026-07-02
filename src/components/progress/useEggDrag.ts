/**
 * useEggDrag — the drag-an-egg-into-the-fire interaction.
 *
 * Pointer-events based (mouse + touch; the slots set touch-action: none). A
 * fixed-position DOM clone follows the pointer; the drop is hit-tested
 * against THE page-bottom PixelFire (the site's one real fire), rect extended
 * 40px below for forgiveness. Eggs are reusable, never consumed - dropping
 * just switches the active theme.
 *
 * Gravity: releasing short of the fire doesn't always snap back. If the egg
 * was pulled down past GRAVITY_MIN_PULL and the fire is still below it, the
 * egg free-falls the rest of the way (duration scales with distance) and
 * lands as a normal drop. Upward/sideways releases still snap home.
 *
 * Drop timeline (t=0 at pointerup over fire):
 *   t=0     clone falls into the fire (.42s: shrink, spin, fade)
 *   t=330ms impact: canvas surge + embers/flash/pulse + theme applies
 *   t=580ms confirmation toast
 */

import { useCallback, useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'
import { eggSVG } from '../../lib/eggArt'
import { runImpact } from '../../lib/impactFx'
import { THEMES, type ThemeId } from '../../lib/themes'
import type { PixelFireHandle } from '../PixelFire'

// a release this many px below the slot hands the egg to gravity
const GRAVITY_MIN_PULL = 60

interface DragState {
  clone: HTMLDivElement
  slot: HTMLElement
  id: ThemeId
  dx: number
  dy: number
  home: DOMRect
}

export function useEggDrag(opts: {
  fireApiRef: RefObject<PixelFireHandle | null>
  onDrop: (id: ThemeId) => void
  toast: (msg: string) => void
}) {
  const { fireApiRef, onDrop, toast } = opts
  const dragRef = useRef<DragState | null>(null)
  const busyRef = useRef(false)

  const fireRect = useCallback(() => {
    const el = fireApiRef.current?.getElement()
    return el ? el.getBoundingClientRect() : null
  }, [fireApiRef])

  const overFire = useCallback(
    (x: number, y: number) => {
      const fr = fireRect()
      // hit area extends 40px below the band so dropping is forgiving
      return !!fr && x > fr.left && x < fr.right && y > fr.top && y < fr.bottom + 40
    },
    [fireRect]
  )

  const onMove = useCallback(
    (e: PointerEvent) => {
      const d = dragRef.current
      if (!d) return
      d.clone.style.left = `${e.clientX - d.dx}px`
      d.clone.style.top = `${e.clientY - d.dy}px`
      fireApiRef.current?.setFlare(overFire(e.clientX, e.clientY))
    },
    [fireApiRef, overFire]
  )

  const onUpRef = useRef<(e: PointerEvent) => void>(() => {})
  const onUp = useCallback(
    (e: PointerEvent) => {
      const d = dragRef.current
      if (!d) return
      dragRef.current = null
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUpRef.current)
      fireApiRef.current?.setFlare(false)
      const { clone, slot, id, home } = d
      const restoreSlot = () => {
        slot.style.opacity = '1'
      }
      const doneMsg =
        id === 'default'
          ? 'reverted to the default look'
          : `dropped the ${THEMES[id].name} egg · site recolored`

      const fr = fireRect()
      const cloneTop = parseFloat(clone.style.top)
      const hitFire = overFire(e.clientX, e.clientY)
      // gravity handoff: released mid-air after a real downward pull, with
      // the fire still below the egg and the release inside the fire's span
      const gravity =
        !hitFire &&
        !!fr &&
        cloneTop - home.top > GRAVITY_MIN_PULL &&
        fr.top > cloneTop + clone.offsetHeight &&
        e.clientX > fr.left &&
        e.clientX < fr.right

      if (!hitFire && !gravity) {
        // snap back to the slot
        clone.classList.add('snap')
        clone.style.left = `${home.left}px`
        clone.style.top = `${home.top}px`
        setTimeout(() => {
          clone.remove()
          restoreSlot()
        }, 320)
        return
      }

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        clone.remove()
        restoreSlot()
        onDrop(id)
        toast(doneMsg)
        return
      }

      busyRef.current = true
      const fb = fr!.bottom - 18
      const finish = (impactAt: number, cleanupAt: number) => {
        setTimeout(() => {
          fireApiRef.current?.surge()
          const el = fireApiRef.current?.getElement()
          if (el) runImpact(el, THEMES[id])
          onDrop(id) // provider effect runs the applyTheme cascade
        }, impactAt)
        setTimeout(() => {
          clone.remove()
          restoreSlot()
        }, cleanupAt)
        setTimeout(() => {
          toast(doneMsg)
          busyRef.current = false
        }, impactAt + 250)
      }

      if (hitFire) {
        // fall into the fire: shrink toward the flame base, spin, fade
        const fc = fr!.left + fr!.width / 2
        const rot = (Math.random() < 0.5 ? -1 : 1) * (25 + Math.random() * 35)
        clone.classList.add('fall')
        clone.style.transform = `translate(${fc - parseFloat(clone.style.left) - clone.offsetWidth / 2}px, ${
          fb - cloneTop - clone.offsetHeight * 0.6
        }px) scale(.18) rotate(${rot}deg)`
        clone.style.opacity = '0'
        finish(330, 440)
        return
      }

      // gravity: free-fall straight down from the release point, full size and
      // accelerating, then sink into the flames on landing
      fireApiRef.current?.setFlare(true)
      const dy = fb - cloneTop - clone.offsetHeight * 0.6
      const fallMs = Math.max(300, Math.min(800, Math.sqrt(dy) * 26))
      const rot = (Math.random() < 0.5 ? -1 : 1) * (10 + Math.random() * 15)
      clone.style.transition = `transform ${fallMs}ms cubic-bezier(.5,.05,.9,.4)`
      clone.style.transform = `translate(0px, ${dy}px) rotate(${rot}deg)`
      setTimeout(() => {
        fireApiRef.current?.setFlare(false)
        clone.style.transition = 'transform .18s ease-in, opacity .18s ease-in'
        clone.style.transform = `translate(0px, ${dy + 10}px) scale(.18) rotate(${rot * 2}deg)`
        clone.style.opacity = '0'
      }, fallMs)
      finish(fallMs, fallMs + 200)
    },
    [fireApiRef, fireRect, onDrop, onMove, overFire, toast]
  )
  useEffect(() => {
    onUpRef.current = onUp
  }, [onUp])

  const onPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLElement>, id: ThemeId) => {
      if (busyRef.current || dragRef.current) return
      e.preventDefault()
      const slot = e.currentTarget as HTMLElement
      const r = slot.getBoundingClientRect()
      const clone = document.createElement('div')
      clone.className = 'dragclone'
      clone.innerHTML = eggSVG(THEMES[id], 'egg-art')
      clone.style.left = `${r.left}px`
      clone.style.top = `${r.top}px`
      clone.style.width = `${r.width}px`
      clone.style.height = `${r.height}px`
      document.body.appendChild(clone)
      slot.style.opacity = '.3'
      dragRef.current = { clone, slot, id, dx: e.clientX - r.left, dy: e.clientY - r.top, home: r }
      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUpRef.current)
    },
    [onMove]
  )

  // Safety net: clear any in-flight clone if the section unmounts mid-drag.
  useEffect(() => {
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUpRef.current)
      if (dragRef.current) {
        dragRef.current.clone.remove()
        dragRef.current.slot.style.opacity = '1'
        dragRef.current = null
      }
    }
  }, [onMove])

  return { onPointerDown }
}
