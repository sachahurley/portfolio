/**
 * detailNav — the global detail-page chain: every project, lab experiment,
 * and note in site order (projects -> lab -> notes; notes newest-first,
 * matching the lists). Powers the prev/next pager at the bottom of the
 * detail pages. All projects are in the chain, external ones included —
 * their detail page houses the link out.
 */

import { projects } from '../data/projects'
import { lab } from '../data/lab'
import { getSortedPosts } from '../data/posts'

export type DetailSection = 'projects' | 'lab' | 'notes'

export type DetailEntry = {
  section: DetailSection
  slug: string
  title: string
  path: string
  img?: boolean
  imgSrc?: string
}

export function getDetailChain(): DetailEntry[] {
  return [
    ...projects.map((p) => ({
      section: 'projects' as const,
      slug: p.slug,
      title: p.title,
      path: `/projects/${p.slug}`,
      img: p.img,
      imgSrc: p.thumbnail,
    })),
    ...lab.map((x) => ({
      section: 'lab' as const,
      slug: x.slug,
      title: x.title,
      path: `/lab/${x.slug}`,
      img: x.img,
    })),
    ...getSortedPosts().map((n) => ({
      section: 'notes' as const,
      slug: n.slug,
      title: n.title,
      path: `/notes/${n.slug}`,
      img: n.img,
    })),
  ]
}

export function getDetailNeighbors(section: DetailSection, slug: string) {
  const chain = getDetailChain()
  const i = chain.findIndex((e) => e.section === section && e.slug === slug)
  return {
    prev: i > 0 ? chain[i - 1] : undefined,
    next: i >= 0 && i < chain.length - 1 ? chain[i + 1] : undefined,
  }
}
