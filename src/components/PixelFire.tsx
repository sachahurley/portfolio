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
 */

import { useEffect, useRef, useState, useCallback } from 'react'

// Dark mode palette: bright flames on dark background
const DARK_PALETTE = [
  'transparent',        // 0: no fire
  '#0A0704',            // 1: sepia-1000 (barely visible ember)
  '#120D09',            // 2: sepia-975
  '#1A150F',            // 3: sepia-950
  '#2D1102',            // 4: amber-975 (dark ember)
  '#451A03',            // 5: amber-950
  '#78350F',            // 6: amber-900
  '#92400E',            // 7: amber-800
  '#B45309',            // 8: amber-700 (warm glow)
  '#D97706',            // 9: amber-600
  '#F59E0B',            // 10: amber-500 (bright flame)
  '#FBBF24',            // 11: amber-400
  '#FCD34D',            // 12: amber-300 (hot tip)
  '#FDE68A',            // 13: amber-200 (white-hot)
]

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
const FIRE_HEIGHT = 15        // Grid rows (~60px at 4px per pixel)
const ANIMATION_SPEED = 150   // ms between frames (slower crackle)

export default function PixelFire() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fireArrayRef = useRef<number[]>([])
  const animFrameRef = useRef<number | null>(null)
  const lastFrameTimeRef = useRef<number>(0)
  const [isVisible, setIsVisible] = useState(false)
  const [fireWidth, setFireWidth] = useState(0)
  const [isDark, setIsDark] = useState(false)

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

  // Get the active palette based on theme
  const palette = isDark ? DARK_PALETTE : LIGHT_PALETTE
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
          // Random decay (0-2) and random horizontal wind (-1 to 1)
          const decay = Math.floor(Math.random() * 3)
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
    for (let x = 0; x < fireWidth; x++) {
      const intensity = paletteMax - Math.floor(Math.random() * 4)
      fire[bottomStart + x] = intensity
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
    <footer className="mt-12">
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ height: `${FIRE_HEIGHT * PIXEL_SIZE}px`, imageRendering: 'pixelated' }}
      />
    </footer>
  )
}
