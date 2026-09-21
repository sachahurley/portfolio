/**
 * Prominent blockquote with optional attribution. Also the stand-in for
 * tweet-style embeds: quote the post, link the attribution.
 */

import type { ReactNode } from 'react'

interface QuoteProps {
  children: ReactNode
  attribution?: ReactNode
}

export default function Quote({ children, attribution }: QuoteProps) {
  return (
    <blockquote className="quote">
      {children}
      {attribution && <footer className="quote-attr">&mdash; {attribution}</footer>}
    </blockquote>
  )
}
