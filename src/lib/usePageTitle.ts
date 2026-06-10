/**
 * usePageTitle — per-route document titles for the SPA.
 *
 * "Page · Sacha Hurley" on sub-pages, bare "Sacha Hurley" on home. Detail
 * pages pass the entity title (project/note/lab names). The index.html
 * <title> is the same site name, so first paint and hydration agree.
 */

import { useEffect } from 'react'

const SITE = 'Sacha Hurley'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : SITE
  }, [title])
}
