/**
 * VillageScene — the village-kit scene renderer on one canvas.
 *
 * Draws a kit recipe (villageKit.ts, the onebit-kit engine port) at an
 * exact integer zoom, inked through the active gem theme: line art in
 * the theme's heading color, the live cue's highlights and glints in
 * the accent. Paper is transparent so the page background shows
 * through, which keeps gem re-theming free.
 *
 * DOM handles all text and a11y, like TownScene: mono labels under the
 * tappable items (the tool's CSS-label mechanism) and visually-hidden
 * focusable hotspot buttons per tap target; the canvas is aria-hidden.
 *
 * Reduced motion: the 300ms live beat never starts; the scene renders
 * one still frame (frame 0), hover/press/focus and taps still work.
 */

import { useEffect, useRef, useState } from 'react'
import { useXp } from '../../context/XpProvider'
import { THEMES } from '../../lib/themes'
import {
  BEAT_MS,
  LABEL_H,
  hitItem,
  renderScene,
  type SceneRender,
  type VillageItem,
} from './villageKit'

interface Spot {
  idx: number
  aria: string
  left: number
  top: number
  width: number
  height: number
}
interface Label {
  idx: number
  text: string
  left: number
  top: number
}

const hexRgb = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]

export default function VillageScene({
  items,
  onNavigate,
}: {
  items: VillageItem[]
  onNavigate: (href: string) => void
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [spots, setSpots] = useState<Spot[]>([])
  const [labels, setLabels] = useState<Label[]>([])
  const { activeGem } = useXp()

  const apiRef = useRef<{
    setActive(i: number): void
    idAt(offX: number, offY: number): number
    tapOf(i: number): string | null
  } | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Base asset colour = the theme's body text (the lab tool's ink is
    // sampled from the same warm gray), accent for the live cue.
    const ink = hexRgb(THEMES[activeGem].text)
    const accent = hexRgb(THEMES[activeGem].accent)

    let zoom = 3
    let W = 0
    let canvasLeft = 0
    let frame = 0
    let active = -1
    let scene: SceneRender | null = null
    let timer: number | null = null
    const off = document.createElement('canvas')

    const hasLabels = items.some((it) => it.tap?.label)

    function paint() {
      scene = renderScene(items, {
        W,
        align: 'center',
        ground: true,
        foot: hasLabels ? Math.ceil(LABEL_H / zoom) : 0,
        frame,
        live: true,
        active,
      })
      const { bmp } = scene
      off.width = bmp.w
      off.height = bmp.h
      const octx = off.getContext('2d')!
      const img = octx.createImageData(bmp.w, bmp.h)
      for (let i = 0; i < bmp.px.length; i++) {
        const v = bmp.px[i]
        if (!v) continue
        const c = v === 2 ? accent : ink
        const k = i * 4
        img.data[k] = c[0]
        img.data[k + 1] = c[1]
        img.data[k + 2] = c[2]
        img.data[k + 3] = 255
      }
      octx.putImageData(img, 0, 0)
      const cw = bmp.w * zoom
      const ch = bmp.h * zoom
      if (canvas!.width !== cw || canvas!.height !== ch) {
        canvas!.width = cw
        canvas!.height = ch
        canvas!.style.width = `${cw}px`
        canvas!.style.height = `${ch}px`
      }
      ctx!.clearRect(0, 0, cw, ch)
      ctx!.imageSmoothingEnabled = false
      ctx!.drawImage(off, 0, 0, cw, ch)
    }

    function build() {
      const wrapW = wrap!.clientWidth
      zoom = wrapW >= 1080 ? 4 : wrapW >= 540 ? 3 : 2
      W = Math.floor(wrapW / zoom)
      canvasLeft = Math.floor((wrapW - W * zoom) / 2)
      canvas!.style.left = `${canvasLeft}px`
      paint()
      if (!scene) return
      const { lay, bs } = scene
      const nextSpots: Spot[] = []
      const nextLabels: Label[] = []
      items.forEach((it, i) => {
        if (!it.tap) return
        const p = lay.pos[i]
        const sb = bs[i]
        nextSpots.push({
          idx: i,
          aria: it.tap.label ? `Enter ${it.tap.label}` : 'Enter',
          left: canvasLeft + (p.x - 1) * zoom,
          top: (p.y - 1) * zoom,
          width: (sb.w + 2) * zoom,
          height: (sb.h + 2) * zoom,
        })
        if (it.tap.label) {
          const row = lay.rows.find((r) => p.y >= r.top && p.y < r.top + r.h) || {
            top: p.y,
            h: sb.h,
          }
          nextLabels.push({
            idx: i,
            text: it.tap.label,
            left: canvasLeft + (p.x + sb.w / 2) * zoom,
            top: (row.top + row.h + 3) * zoom,
          })
        }
      })
      setSpots(nextSpots)
      setLabels(nextLabels)
    }

    apiRef.current = {
      setActive(i) {
        if (i === active) return
        active = i
        paint()
      },
      idAt(offX, offY) {
        if (!scene) return -1
        return hitItem(items, scene.lay, scene.bs, offX / zoom, offY / zoom)
      },
      tapOf(i) {
        return (i >= 0 && items[i]?.tap?.href) || null
      },
    }

    build()

    if (!reduced) {
      timer = window.setInterval(() => {
        if (document.hidden) return
        frame++
        paint()
      }, BEAT_MS)
    }

    let lastW = wrap.clientWidth
    const ro = new ResizeObserver(() => {
      if (wrap.clientWidth === lastW) return
      lastW = wrap.clientWidth
      build()
    })
    ro.observe(wrap)

    return () => {
      if (timer != null) clearInterval(timer)
      ro.disconnect()
      apiRef.current = null
    }
  }, [items, activeGem])

  return (
    <div ref={wrapRef} className="vg-frame">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        onPointerMove={(e) => {
          const api = apiRef.current
          if (!api) return
          const i = api.idAt(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
          const href = api.tapOf(i)
          e.currentTarget.style.cursor = href ? 'pointer' : ''
          api.setActive(href ? i : -1)
        }}
        onPointerLeave={() => apiRef.current?.setActive(-1)}
        onClick={(e) => {
          const api = apiRef.current
          if (!api) return
          const href = api.tapOf(api.idAt(e.nativeEvent.offsetX, e.nativeEvent.offsetY))
          if (href) onNavigate(href)
        }}
      />
      {labels.map((l) => (
        <div key={l.idx} className="vg-label" style={{ left: l.left, top: l.top }}>
          {l.text}
        </div>
      ))}
      {/* reward badges/markers retired: the waiting signal lives on the
          character strip / sheet row / dock dot, one surface per chrome */}
      {spots.map((s) => (
        <button
          key={s.idx}
          type="button"
          className="vg-hotspot"
          aria-label={s.aria}
          style={{ left: s.left, top: s.top, width: s.width, height: s.height }}
          onFocus={() => apiRef.current?.setActive(s.idx)}
          onBlur={() => apiRef.current?.setActive(-1)}
          onClick={() => {
            const href = apiRef.current?.tapOf(s.idx)
            if (href) onNavigate(href)
          }}
        />
      ))}
    </div>
  )
}
