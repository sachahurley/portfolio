/**
 * DitherAsset — the welcome screen as a studio-exported asset: a tiny
 * grid-resolution dither loop authored in the sibling dither-studio repo,
 * displayed at the largest exact integer pixel scale that fits the
 * viewport (nearest-neighbour only, never fractional). Reduced motion
 * swaps the loop for its still frame.
 */

import { useEffect, useRef, useState } from 'react'
import './DitherTitle.css'

export interface DitherAssetProps {
  /** Animated loop, referenced from public/ */
  src?: string
  /** Still frame shown under prefers-reduced-motion */
  stillSrc?: string
  /** Blinking prompt text; pass '' to hide */
  prompt?: string
  className?: string
}

export default function DitherAsset({
  src = '/dither/sacha-hurley-loop.webp',
  stillSrc = '/dither/sacha-hurley.webp',
  prompt = 'PRESS START',
  className,
}: DitherAssetProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const wrap = wrapRef.current
    const img = imgRef.current
    if (!wrap || !img) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    function layout() {
      if (!img!.naturalWidth) return
      const vw = Math.round(wrap!.clientWidth * dpr)
      const vh = Math.round(wrap!.clientHeight * dpr)
      const k = Math.max(
        1,
        Math.min(Math.floor(vw / img!.naturalWidth), Math.floor(vh / img!.naturalHeight)),
      )
      setSize({ w: (img!.naturalWidth * k) / dpr, h: (img!.naturalHeight * k) / dpr })
    }
    img.addEventListener('load', layout)
    layout()
    const ro = new ResizeObserver(layout)
    ro.observe(wrap)
    return () => {
      ro.disconnect()
      img.removeEventListener('load', layout)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label="Sacha Hurley, press any key or click to enter"
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      <img
        ref={imgRef}
        src={reduced ? stillSrc : src}
        alt=""
        style={{
          display: 'block',
          imageRendering: 'pixelated',
          visibility: size ? 'visible' : 'hidden',
          width: size ? `${size.w}px` : 'auto',
          height: size ? `${size.h}px` : 'auto',
        }}
      />
      {prompt ? (
        <span className="dither-prompt" aria-hidden="true">
          {prompt}
        </span>
      ) : null}
    </div>
  )
}
