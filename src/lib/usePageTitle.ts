/**
 * usePageTitle: per-route document titles and descriptions for the SPA.
 *
 * "Page · Sacha Hurley" on sub-pages, bare "Sacha Hurley" on home. Detail
 * pages pass the entity title (project/note/lab names) and its one-line
 * summary, which replaces the site description in the description, Open
 * Graph and Twitter tags. Pages that pass no description get the site's
 * own, read from index.html, so first paint and hydration agree.
 *
 * Crawlers that run JS (Google) see the per-page values; link unfurlers
 * (Slack, iMessage) read index.html and get the site defaults.
 */

import { useEffect } from 'react'

const SITE = 'Sacha Hurley'

const DESCRIPTION_TAGS = [
  'meta[name="description"]',
  'meta[property="og:description"]',
  'meta[name="twitter:description"]',
]
const TITLE_TAGS = ['meta[property="og:title"]', 'meta[name="twitter:title"]']

// The site-wide description as shipped in index.html, captured once.
let siteDescription: string | null = null

function setContent(selectors: string[], value: string) {
  for (const sel of selectors) document.querySelector(sel)?.setAttribute('content', value)
}

export function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    const full = title ? `${title} · ${SITE}` : SITE
    document.title = full
    setContent(TITLE_TAGS, full)

    if (siteDescription === null) {
      siteDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
    }
    setContent(DESCRIPTION_TAGS, description || siteDescription)
  }, [title, description])
}
