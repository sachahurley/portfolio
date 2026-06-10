/**
 * PixelFire Component
 *
 * A pixel art fire animation that uses Scorpion UI design system colors.
 * Based on the classic "doom fire" spread algorithm.
 *
 * - Only animates when the user scrolls to the bottom of the page
 * - Full page width (edge to edge)
 * - Max flame height ~60px with varying heights across the width
 * - Uses DS amber and sepia colors exclusively
 * - Separate palettes for light and dark mode
 * - Recolors when an egg theme is active, and exposes an imperative handle
 *   (setFlare / surge / getElement) so the EXP system's egg drag can tease
 *   and ignite THIS fire - it is the drop target on the home page.
 */

import { forwardRef, useEffect, useImperativeHandle, useRef, useState, useCallback, useMemo } from 'react'
import { useXp } from '../context/XpProvider'
import { DEFAULT_FIRE_PALETTE, firePaletteFor } from '../lib/themes'

// Dark mode palette lives in lib/themes (DEFAULT_FIRE_PALETTE) so the egg
// theme system can keep the stock look pixel-identical while generating
// matching ramps for the other themes.
const DARK_PALETTE = DEFAULT_FIRE_PALETTE

// Light mode palette: warm sepia/amber tones that look soft on light backgrounds
const LIGHT_PALETTE = [
  'transparent',        // 0: no fire
  '#FFFBEB',            // 1: amber-50 (barely visible)
  '#FEF3C7',            // 2: amber-100 (faint warmth)
  '#FDE68A',            // 3: amber-200 (soft glow)
  '#FDE68A',            // 4: amber-200
  '#FCD34D',            // 5: amber-300
  '#FCD34D',            // 6: amber-300 (warm glow)
  '#FBBF24',            // 7: amber-400
  '#FBBF24',            // 8: amber-400
  '#F59E0B',            // 9: amber-500
  '#D97706',            // 10: amber-600 (bright flame)
  '#B45309',            // 11: amber-700
  '#92400E',            // 12: amber-800 (hot core)
  '#78350F',            // 13: amber-900 (deep core)
]

const PIXEL_SIZE = 4          // Each "pixel" is 4x4 real pixels
// The sim grid is taller than the fire's visual band: the extra rows are
// headroom so surged flames taper off naturally instead of being sliced
// flat at the canvas ceiling. The footer keeps the original 60px footprint;
// the canvas bottom-aligns inside it and extends (transparently) upward.
const FIRE_HEIGHT = 21        // Grid rows (84px canvas, ~60px typical flames)
const VISUAL_HEIGHT = 60      // Footer band height (layout footprint)
const ANIMATION_SPEED = 150   // ms between frames (slower crackle)
const SURGE_MS = 850

export interface PixelFireHandle {
  /** Hover tease while an egg is dragged over the fire. */
  setFlare(on: boolean): void
  /** The ~850ms blowup when an egg lands. */
  surge(): void
  /** The fire's footer element, for drop hit-testing and impact anchoring. */
  getElement(): HTMLElement | null
}

const PixelFire = forwardRef<PixelFireHandle>(function PixelFire(_, ref) {
  const footerRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireArrayRef = useRef<number[]>([])
  const animFrameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number>(0)
  const [isVisible, setIsVisible] = useState(false)
  const [fireWidth, setFireWidth] = useState(0)
  const [isDark, setIsDark] = useState(false)
  const flareRef = useRef(false)
  const surgeUntilRef = useRef(0)
  const surgeTimerRef = useRef<number | null>(null)

  const applyFilter = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (performance.now() < surgeUntilRef.current) {
      canvas.style.filter = 'brightness(1.4) saturate(1.15)'
      canvas.style.transform = 'scaleY(1.18)' // leap up; origin bottom, no clip
    } else if (flareRef.current) {
      canvas.style.filter = 'brightness(1.15)'
      canvas.style.transform = ''
    } else {
      canvas.style.filter = ''
      canvas.style.transform = ''
    }
  }, [])

  useImperativeHandle(ref, () => ({
    setFlare(on: boolean) {
      flareRef.current = on
      applyFilter()
    },
    surge() {
      surgeUntilRef.current = performance.now() + SURGE_MS
      applyFilter()
      if (surgeTimerRef.current) clearTimeout(surgeTimerRef.current)
      surgeTimerRef.current = window.setTimeout(applyFilter, SURGE_MS + 20)
    },
    getElement() {
      return footerRef.current
    },
  }))

  // Detect light/dark mode
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkTheme()

    // Watch for class changes on <html> (theme toggle)
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  // Get the active palette: an active egg theme overrides; otherwise the
  // stock light/dark palettes (default keeps today's exact rendering).
  const { activeEgg } = useXp()
  const themePalette = useMemo(() => firePaletteFor(activeEgg), [activeEgg])
  const palette = activeEgg !== 'default' ? themePalette : isDark ? DARK_PALETTE : LIGHT_PALETTE
  const paletteMax = palette.length - 1

  // Detect when user scrolls to the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY
      const pageHeight = document.documentElement.scrollHeight
      // Trigger when within 100px of the bottom
      setIsVisible(scrollBottom >= pageHeight - 100)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate fire grid width based on full window width
  useEffect(() => {
    const updateWidth = () => {
      setFireWidth(Math.floor(window.innerWidth / PIXEL_SIZE))
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Initialize fire array when dimensions change
  useEffect(() => {
    if (fireWidth === 0) return
    const totalCells = fireWidth * FIRE_HEIGHT
    fireArrayRef.current = new Array(totalCells).fill(0)
  }, [fireWidth])

  // Spread fire algorithm - each pixel pulls from below with random decay
  const spreadFire = useCallback(() => {
    const fire = fireArrayRef.current
    if (fire.length === 0) return

    for (let x = 0; x < fireWidth; x++) {
      for (let y = 1; y < FIRE_HEIGHT; y++) {
        const srcIdx = y * fireWidth + x
        const srcVal = fire[srcIdx]

        if (srcVal === 0) {
          fire[(y - 1) * fireWidth + x] = 0
        } else {
          // Random decay (0-2; hotter while surging) + random wind (-1 to 1).
          // Surge decay averages ~0.7 so peaks stay inside the headroom rows.
          const surging = performance.now() < surgeUntilRef.current
          const decay = surging ? (Math.random() < 0.7 ? 1 : 0) : Math.floor(Math.random() * 3)
          const wind = Math.floor(Math.random() * 3) - 1
          const destX = Math.min(Math.max(x + wind, 0), fireWidth - 1)
          const destIdx = (y - 1) * fireWidth + destX
          fire[destIdx] = Math.max(0, srcVal - decay)
        }
      }
    }
  }, [fireWidth])

  // Set the bottom row with varying intensity for natural look
  const igniteBottomRow = useCallback(() => {
    const fire = fireArrayRef.current
    if (fire.length === 0) return

    const bottomStart = (FIRE_HEIGHT - 1) * fireWidth
    const surging = performance.now() < surgeUntilRef.current
    for (let x = 0; x < fireWidth; x++) {
      // flare keeps the base hotter; surge pins it to the ceiling
      const cool = surging ? 0 : Math.floor(Math.random() * (flareRef.current ? 2 : 4))
      fire[bottomStart + x] = paletteMax - cool
    }
  }, [fireWidth, paletteMax])

  // Extinguish the bottom row to fade out
  const extinguishBottomRow = useCallback(() => {
    const fire = fireArrayRef.current
    if (fire.length === 0) return

    const bottomStart = (FIRE_HEIGHT - 1) * fireWidth
    for (let x = 0; x < fireWidth; x++) {
      fire[bottomStart + x] = 0
    }
  }, [fireWidth])

  // Render fire to canvas
  const renderFire = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const fire = fireArrayRef.current
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let y = 0; y < FIRE_HEIGHT; y++) {
      for (let x = 0; x < fireWidth; x++) {
        const idx = y * fireWidth + x
        const colorIdx = fire[idx]
        if (colorIdx === 0) continue

        ctx.fillStyle = palette[colorIdx]
        ctx.fillRect(
          x * PIXEL_SIZE,
          y * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        )
      }
    }
  }, [fireWidth, palette])

  // Main animation loop
  useEffect(() => {
    if (fireWidth === 0) return

    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = fireWidth * PIXEL_SIZE
    canvas.height = FIRE_HEIGHT * PIXEL_SIZE

    const animate = (timestamp: number) => {
      if (timestamp - lastFrameTimeRef.current >= ANIMATION_SPEED) {
        if (isVisible) {
          igniteBottomRow()
        } else {
          extinguishBottomRow()
        }
        spreadFire()
        renderFire()
        lastFrameTimeRef.current = timestamp
      }
      animFrameRef.current = requestAnimationFrame(animate)
    }

    animFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [fireWidth, isVisible, spreadFire, renderFire, igniteBottomRow, extinguishBottomRow])

  return (
    // The footer keeps the 60px layout footprint; the taller sim canvas is
    // bottom-aligned inside it so headroom rows overlap the page padding
    // above as transparent pixels (drop hit-testing uses the footer rect).
    <footer className="mt-12" ref={footerRef} style={{ height: VISUAL_HEIGHT, position: 'relative' }}>
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          height: `${FIRE_HEIGHT * PIXEL_SIZE}px`,
          imageRendering: 'pixelated',
          transition: 'filter .25s ease, transform .25s ease',
          transformOrigin: 'bottom',
        }}
      />
    </footer>
  )
})

export default PixelFire
