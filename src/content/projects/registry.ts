/**
 * slug -> lazy article content for project detail pages.
 *
 * To give a project a full case study: create ./<slug>.tsx default-exporting
 * the article BODY only (no MinimalPage, no <h1> - the header comes from
 * src/data/projects.ts), then register it here. Projects without an entry
 * render the FallbackArticle (description + CTA) instead.
 *
 * lazy() must only run at module scope - never inside a render.
 */

import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export const projectContent: Record<string, LazyExoticComponent<ComponentType>> = {
  'scorpion-ui': lazy(() => import('./scorpion-ui')),
}
