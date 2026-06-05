/**
 * PageContainer Component
 *
 * The shared content shell used by every page. Centers content in the same
 * narrow 672px column as the Home page, with matching horizontal padding.
 *
 * - `className` adds inner spacing (e.g. "space-y-8")
 * - `flushTop` keeps bottom-only padding (Home uses this — the pixel clouds
 *   provide the top space). Other pages use full top + bottom padding.
 */

import { type ReactNode } from 'react'

interface PageContainerProps {
  children: ReactNode
  className?: string
  flushTop?: boolean
}

export default function PageContainer({
  children,
  className = '',
  flushTop = false,
}: PageContainerProps) {
  return (
    <div
      className={`max-w-[672px] mx-auto px-6 md:px-0 ${
        flushTop ? 'pb-12 md:pb-20' : 'py-12 md:py-20'
      } ${className}`}
    >
      {children}
    </div>
  )
}
