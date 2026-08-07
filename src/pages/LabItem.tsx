/**
 * Lab experiment (/lab/:slug)
 *
 * Title + a live demo. "reactive-grid" ships a cursor-reactive dot grid on a
 * canvas; other experiments are placeholders.
 */

import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import PagerNav from '../components/PagerNav'
import DotLoader from '../components/DotLoader'
import DitherToy from '../components/DitherToy'
import { getLabBySlug } from '../data/lab'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import NotFound from './NotFound'
import { usePageTitle } from '../lib/usePageTitle'
import { ArrowUpRight } from '../components/icons'

export default function LabItem() {
  const { slug } = useParams<{ slug: string }>()
  const item = slug ? getLabBySlug(slug) : undefined
  usePageTitle(item?.title)
  const { award } = useXp()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hasDemo = item?.demo === 'reactive-grid'

  useEffect(() => {
    if (item) award(XP_AWARDS.lab, 'played in the lab', `lab:${item.slug}`)
  }, [item, award])

  useEffect(() => {
    if (!hasDemo) return
    const c = canvasRef.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return

    let raf = 0
    const m = { x: -999, y: -999 }

    const size = () => {
      const r = c.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      c.width = r.width * dpr
      c.height = r.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    size()

    const pos = (e: MouseEvent | TouchEvent) => {
      const r = c.getBoundingClientRect()
      const t = 'touches' in e ? e.touches[0] : e
      m.x = t.clientX - r.left
      m.y = t.clientY - r.top
    }
    const onLeave = () => {
      m.x = -999
      m.y = -999
    }

    window.addEventListener('resize', size)
    c.addEventListener('mousemove', pos)
    c.addEventListener('touchmove', pos, { passive: true })
    c.addEventListener('mouseleave', onLeave)

    const draw = () => {
      const w = c.clientWidth
      const h = c.clientHeight
      ctx.clearRect(0, 0, w, h)
      const gap = 24
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const dx = m.x - x
          const dy = m.y - y
          const d = Math.hypot(dx, dy)
          const f = Math.max(0, 1 - d / 140)
          const r = 1.1 + f * 3.4
          const g = Math.round(70 + 160 * f)
          ctx.fillStyle = `rgb(${g},${g},${g})`
          ctx.beginPath()
          ctx.arc(x + dx * f * 0.35, y + dy * f * 0.35, r, 0, 7)
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      c.removeEventListener('mousemove', pos)
      c.removeEventListener('touchmove', pos)
      c.removeEventListener('mouseleave', onLeave)
    }
  }, [hasDemo])

  if (!item) return <NotFound />

  return (
    <MinimalPage>
      <BackButton fallback="/lab" />
      <h1 className="page">{item.title}</h1>
      <p className="lead">
        {item.desc}
        {hasDemo ? ' Move your cursor (or finger) over the canvas.' : ''}
      </p>

      {hasDemo ? (
        <>
          <canvas id="labcanvas" ref={canvasRef} />
          <p className="meta">demo: a reactive dot grid — every lab toy would be its own experiment.</p>
        </>
      ) : item.demo === 'dot-loader' ? (
        <>
          <div style={{ marginTop: 24 }}>
            <DotLoader label="conjuring" />
          </div>
          <p className="meta" style={{ marginTop: 18 }}>
            demo: the site's loading indicator — six dots twinkling at random, and the time
            you've spent watching them.
          </p>
        </>
      ) : item.demo === 'dither-toy' ? (
        <>
          <div style={{ marginTop: 24 }}>
            <DitherToy />
          </div>
          <p className="meta" style={{ marginTop: 18 }}>
            demo: the site's ordered-dither pass, live. Drop in any image and slide the ink.
          </p>
        </>
      ) : null}

      {item.image && <img className="lab-art" src={item.image} alt={item.imageAlt ?? ''} />}

      {item.body && <p style={{ marginTop: 18 }}>{item.body}</p>}

      {item.externalUrl && (
        <a
          className="platebtn"
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: 24 }}
        >
          view on GitHub <ArrowUpRight />
        </a>
      )}

      {!item.demo && !item.body && (
        <p className="meta" style={{ marginTop: 18 }}>
          Placeholder — this experiment isn't wired up yet.
        </p>
      )}

      <PagerNav section="lab" slug={item.slug} />
    </MinimalPage>
  )
}
