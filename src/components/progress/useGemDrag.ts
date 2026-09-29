/**
 * useGemDrag — the drag-a-gem-into-the-cauldron interaction.
 *
 * Pointer-events based (mouse + touch; the slots set touch-action: none). A
 * fixed-position DOM clone follows the pointer; the drop is hit-tested
 * against whatever GemSinkHandle the host passes (the character screen's
 * PixelCauldron). A drop counts when the pointer is inside the sink's rect
 * (padded HIT_PAD_ABOVE above, 40px below) OR the dragged gem itself overlaps
 * it, so the sink can sit close under the track without a dead zone. Gems are
 * reusable, never consumed - dropping just switches the active theme.
 *
 * The sink's rect is its LAYOUT box, not its canvas: the cauldron's steam
 * headroom hangs outside that box on purpose, because a rect that included it
 * would push the live band up into the sockets.
 *
 * Landing is the sink's ANCHOR (the cauldron's mouth), not the bottom of its
 * rect - the bottom of a cauldron is its feet, and gems do not go there.
 *
 * Gravity: releasing short of the sink doesn't always snap back. If the gem
 * was pulled down past GRAVITY_MIN_PULL and sits above it, it free-falls the
 * rest of the way (duration scales with distance) and lands as a normal drop.
 * The sink flares whenever a release would land, so the visitor can see the
 * drop is armed. Upward/sideways releases still snap home, as does a
 * cancelled pointer.
 *
 * Drop timeline (t=0 at pointerup over fire):
 *   t=0     clone falls into the fire (.42s: shrink, spin, fade)
 *   t=330ms impact: canvas surge + embers/flash/pulse + theme applies
 *   t=580ms confirmation toast
 */

import { useCallback, useEffect, useRef } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'
import { runImpact } from '../../lib/impactFx'
import { THEMES, type ThemeId } from '../../lib/themes'

/** Where a dropped gem actually lands, in viewport px: the mouth's centre and
 *  half-width. Anything narrower than the sink's own rect belongs here. */
export interface GemSinkAnchor {
  x: number
  y: number
  rx: number
}

/** What a gem can be dropped into. Implemented by PixelCauldron. */
export interface GemSinkHandle {
  /** Hover tease while a gem is dragged over it. */
  setFlare(on: boolean): void
  /** The ~850ms boil-over when a gem lands. */
  surge(): void
  /** The sink's layout box, for drop hit-testing. */
  getElement(): HTMLElement | null
  getAnchor(): GemSinkAnchor | null
}

// a release this many px below the socket hands the gem to gravity
const GRAVITY_MIN_PULL = 20
// the sink's hit rect reaches this far above its layout box
const HIT_PAD_ABOVE = 24

interface DragState {
  clone: HTMLDivElement
  slot: HTMLElement
  id: ThemeId
  dx: number
  dy: number
  home: DOMRect
}

export function useGemDrag(opts: {
  sinkRef: RefObject<GemSinkHandle | null>
  onDrop: (id: ThemeId) => void
  toast: (msg: string) => void
  /** A press released without a real drag (tap/click); wear the gem directly. */
  onTap?: (id: ThemeId) => void
}) {
  const { sinkRef, onDrop, toast, onTap } = opts
  const dragRef = useRef<DragState | null>(null)
  const busyRef = useRef(false)

  const sinkRect = useCallback(() => {
    const el = sinkRef.current?.getElement()
    return el ? el.getBoundingClientRect() : null
  }, [sinkRef])

  /** Where a release at (x, y) would send the gem: into the pot, falling, or home. */
  const dropMode = useCallback(
    (x: number, y: number): 'hit' | 'fall' | null => {
      const d = dragRef.current
      const fr = sinkRect()
      if (!d || !fr) return null
      const top = y - d.dy
      const left = x - d.dx
      const bottom = top + d.home.height
      const inSpanX = x > fr.left && x < fr.right
      // pointer in the padded band (40px below for forgiveness)
      const pointerHit = inSpanX && y > fr.top - HIT_PAD_ABOVE && y < fr.bottom + 40
      // or the gem body itself dipping into the band
      const gemHit =
        left + d.home.width > fr.left && left < fr.right && bottom > fr.top && top < fr.bottom + 40
      if (pointerHit || gemHit) return 'hit'
      // gravity: a real downward pull, with the pot still below the gem
      if (inSpanX && top - d.home.top > GRAVITY_MIN_PULL && bottom <= fr.top) return 'fall'
      return null
    },
    [sinkRect]
  )

  const onMove = useCallback(
    (e: PointerEvent) => {
      const d = dragRef.current
      if (!d) return
      d.clone.style.left = `${e.clientX - d.dx}px`
      d.clone.style.top = `${e.clientY - d.dy}px`
      sinkRef.current?.setFlare(dropMode(e.clientX, e.clientY) !== null)
    },
    [sinkRef, dropMode]
  )

  const onUpRef = useRef<(e: PointerEvent) => void>(() => {})
  const onUp = useCallback(
    (e: PointerEvent) => {
      const d = dragRef.current
      if (!d) return
      // a cancelled pointer (touch scroll takeover, etc.) always snaps home
      const mode = e.type === 'pointercancel' ? null : dropMode(e.clientX, e.clientY)
      dragRef.current = null
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUpRef.current)
      document.removeEventListener('pointercancel', onUpRef.current)
      sinkRef.current?.setFlare(false)
      const { clone, slot, id, home } = d
      const restoreSlot = () => {
        slot.style.opacity = '1'
      }
      const doneMsg =
        id === 'default'
          ? 'reverted to the default look'
          : `dropped the ${THEMES[id].name} gem · site recolored`

      const fr = sinkRect()
      const anchor = sinkRef.current?.getAnchor() ?? null
      const cloneTop = parseFloat(clone.style.top)
      const hitPot = mode === 'hit'

      // a press released in place (not a cancel) is a tap, not a drag
      const moved = Math.hypot(parseFloat(clone.style.left) - home.left, cloneTop - home.top)
      if (!mode && moved < 6 && e.type !== 'pointercancel' && onTap) {
        clone.remove()
        restoreSlot()
        onTap(id)
        return
      }

      if (!mode || !fr || !anchor) {
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
      // land in the mouth: fr.bottom is the pot's feet, standing in the embers
      const fb = anchor.y
      const finish = (impactAt: number, cleanupAt: number) => {
        setTimeout(() => {
          sinkRef.current?.surge()
          const el = sinkRef.current?.getElement()
          if (el) runImpact(el, THEMES[id], sinkRef.current?.getAnchor() ?? undefined)
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

      if (hitPot) {
        // fall into the brew: shrink toward the surface, spin, fade. Track the
        // release point across the mouth, but clamp to the mouth rather than
        // the sink's box, or a wide release dives past the rim into the iron
        const fc = Math.min(Math.max(e.clientX, anchor.x - anchor.rx), anchor.x + anchor.rx)
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
      // accelerating, then sink into the brew on landing
      sinkRef.current?.setFlare(true)
      const dy = fb - cloneTop - clone.offsetHeight * 0.6
      const fallMs = Math.max(300, Math.min(800, Math.sqrt(dy) * 26))
      const rot = (Math.random() < 0.5 ? -1 : 1) * (10 + Math.random() * 15)
      clone.style.transition = `transform ${fallMs}ms cubic-bezier(.5,.05,.9,.4)`
      clone.style.transform = `translate(0px, ${dy}px) rotate(${rot}deg)`
      setTimeout(() => {
        sinkRef.current?.setFlare(false)
        clone.style.transition = 'transform .18s ease-in, opacity .18s ease-in'
        clone.style.transform = `translate(0px, ${dy + 10}px) scale(.18) rotate(${rot * 2}deg)`
        clone.style.opacity = '0'
      }, fallMs)
      finish(fallMs, fallMs + 200)
    },
    [dropMode, sinkRef, sinkRect, onDrop, onMove, onTap, toast]
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
      // the ghost is the socket's own gem art, cloned so it always matches
      const art = slot.querySelector('.gem-art')
      clone.innerHTML = art ? art.outerHTML : ''
      clone.style.left = `${r.left}px`
      clone.style.top = `${r.top}px`
      clone.style.width = `${r.width}px`
      clone.style.height = `${r.height}px`
      document.body.appendChild(clone)
      slot.style.opacity = '.3'
      dragRef.current = { clone, slot, id, dx: e.clientX - r.left, dy: e.clientY - r.top, home: r }
      document.addEventListener('pointermove', onMove)
      document.addEventListener('pointerup', onUpRef.current)
      document.addEventListener('pointercancel', onUpRef.current)
    },
    [onMove]
  )

  // Safety net: clear any in-flight clone if the section unmounts mid-drag.
  useEffect(() => {
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUpRef.current)
      document.removeEventListener('pointercancel', onUpRef.current)
      if (dragRef.current) {
        dragRef.current.clone.remove()
        dragRef.current.slot.style.opacity = '1'
        dragRef.current = null
      }
    }
  }, [onMove])

  return { onPointerDown }
}
