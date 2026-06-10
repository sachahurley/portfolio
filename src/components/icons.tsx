/**
 * Inline SVG arrow icons
 *
 * Fragment Mono has no → (U+2192) or ↗ (U+2197) glyph, so the old text
 * arrows fell through to each platform's fallback mono font (SF Mono on
 * macOS, Consolas on Windows) and looked different everywhere, including
 * design tools. Vectors render identically on every platform.
 *
 * Sized in em so they track the surrounding font size; stroked with
 * currentColor so they inherit the link/text color.
 */

const attrs = {
  width: '0.875em',
  height: '0.875em',
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  className: 'icon-arrow',
} as const

/** → used by "See all" links */
export function ArrowRight() {
  return (
    <svg {...attrs}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  )
}

/** ↗ used by external links */
export function ArrowUpRight() {
  return (
    <svg {...attrs}>
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  )
}
