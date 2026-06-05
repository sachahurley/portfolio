/**
 * LAB DATA
 *
 * Small interactive experiments. Each has a detail page at /lab/:slug.
 * Only "reactive-grid" ships a live demo today; the rest are placeholders.
 */

export interface LabItem {
  slug: string     // URL path, e.g. "reactive-grid"
  title: string    // Display name
  desc: string     // Short description (shown on row lists and as the lead)
  img?: boolean    // Show a 16:9 thumbnail on the row
  demo?: 'reactive-grid' // Which live demo to render, if any
}

export const lab: LabItem[] = [
  { slug: 'reactive-grid', title: 'Reactive grid', desc: 'A grid that leans toward your cursor.', img: true, demo: 'reactive-grid' },
  { slug: 'voxel-toy', title: 'Voxel toy', desc: 'Spin a little voxel object.' },
  { slug: 'type-gen', title: 'Type generator', desc: 'Generative type, tweakable params.' },
  { slug: 'cursor-trails', title: 'Cursor trails', desc: 'Trailing particles on move.' },
]

// Helper: find a single experiment by its slug (for the detail page)
export function getLabBySlug(slug: string): LabItem | undefined {
  return lab.find((x) => x.slug === slug)
}
