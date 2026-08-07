/**
 * LAB DATA
 *
 * Small interactive experiments. Each has a detail page at /lab/:slug.
 * Items with a `demo` render a live toy on the detail page; items with a
 * `body` render a written description instead.
 */

export interface LabItem {
  slug: string     // URL path, e.g. "dawg"
  title: string    // Display name
  desc: string     // Short description (shown on row lists and as the lead)
  img?: boolean    // Show a 16:9 thumbnail on the row
  demo?: 'reactive-grid' | 'dot-loader' | 'dither-toy' // Which live demo to render, if any
  body?: string    // Longer write-up for the detail page (can accompany a demo)
  externalUrl?: string // Link out (repo or live tool), rendered as a CTA on the detail page
  image?: string   // Artwork shown on the detail page (path under public/)
  imageAlt?: string // Alt text for that artwork
}

export const lab: LabItem[] = [
  {
    slug: 'dawg',
    title: 'D.A.W.G.',
    desc: 'A local knowledge base and MCP server that teaches AI agents how I work.',
    image: '/dither/dawg.png',
    imageAlt: 'Dithered pixel-art portrait of a wolf, the DAWG mascot',
    body:
      'DAWG is a local knowledge base plus a RAG MCP server that plugs into Cursor and Claude Code. It holds my design system decisions, working principles, corrections, and process docs, and serves them to AI agents so they pick up context the way a teammate would. Embeddings run on Ollama and vectors live in a local ChromaDB, so nothing in the pipeline needs a cloud API.',
  },
  {
    slug: 'dot-loader',
    title: 'Dot loader',
    desc: 'A twinkling dot-matrix loading glyph with an elapsed-time readout.',
    demo: 'dot-loader',
  },
  {
    slug: 'dither-studio',
    title: 'Dither Studio',
    desc: 'The workshop where this site’s 1-bit art gets made, plus a pocket version to play with.',
    demo: 'dither-toy',
    externalUrl: 'https://github.com/sachahurley/dither-studio',
    body:
      'Dither Studio is a small authoring toolchain (Python plus a browser studio) for 1-bit dithered pixel art: the MacPaint-style "dither punk" look behind this site’s welcome title, the dungeon-gate hero, and the sepia threshold-dither doctrine everywhere else. It is deliberately a workshop, not a dependency: assets are authored there and exported into the portfolio as flat files. The toy above is a portfolio-native miniature that runs the same ordered-dither threshold the site itself uses.',
  },
]

// Helper: find a single experiment by its slug (for the detail page)
export function getLabBySlug(slug: string): LabItem | undefined {
  return lab.find((x) => x.slug === slug)
}
