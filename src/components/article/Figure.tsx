/**
 * Media (image / video) with an optional caption. With no src it renders the
 * striped placeholder block so articles can be drafted before assets exist.
 */

import type { ReactNode } from 'react'

interface FigureProps {
  src?: string
  alt?: string
  caption?: ReactNode
  video?: boolean
}

export default function Figure({ src, alt = '', caption, video }: FigureProps) {
  return (
    <figure className="media">
      {src ? (
        video ? (
          <video src={src} controls playsInline muted loop />
        ) : (
          <img src={src} alt={alt} loading="lazy" />
        )
      ) : (
        <div className="media-ph" aria-hidden />
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
