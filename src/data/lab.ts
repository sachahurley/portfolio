/**
 * LAB DATA
 *
 * Small interactive experiments. Each has a detail page at /lab/:slug.
 * "reactive-grid" and "tile-atlas" ship live demos; the rest are placeholders.
 *
 * `lock` gates an experiment behind a code. Locked rows still show in the list
 * (greyed, with a padlock) so visitors know there is something to find. The
 * code lives in the bundle — it is a puzzle, not a password.
 */

export interface LabItem {
  slug: string     // URL path, e.g. "reactive-grid"
  title: string    // Display name
  desc: string     // Short description (shown on row lists and as the lead)
  img?: boolean    // Show a 16:9 thumbnail on the row
  demo?: 'reactive-grid' | 'tile-atlas' // Which live demo to render, if any
  lock?: {
    code: string   // What the visitor has to type
    hint: string   // Shown above the input, and on the locked row
  }
}

export const lab: LabItem[] = [
  {
    slug: 'tile-atlas',
    title: 'Tile atlas',
    desc: '5,461 named sprites from a one-bit tileset, searchable.',
    demo: 'tile-atlas',
    lock: {
      code: 'urizen',
      hint: 'Name the tileset these sprites come from.',
    },
  },
  { slug: 'reactive-grid', title: 'Reactive grid', desc: 'A grid that leans toward your cursor.', img: true, demo: 'reactive-grid' },
  { slug: 'voxel-toy', title: 'Voxel toy', desc: 'Spin a little voxel object.' },
  { slug: 'type-gen', title: 'Type generator', desc: 'Generative type, tweakable params.' },
  { slug: 'cursor-trails', title: 'Cursor trails', desc: 'Trailing particles on move.' },
]

// Helper: find a single experiment by its slug (for the detail page)
export function getLabBySlug(slug: string): LabItem | undefined {
  return lab.find((x) => x.slug === slug)
}
