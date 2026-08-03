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
  demo?: 'reactive-grid' // Which live demo to render, if any
  body?: string    // Longer write-up for the detail page (no live demo)
}

export const lab: LabItem[] = [
  {
    slug: 'dawg',
    title: 'D.A.W.G.',
    desc: 'A local knowledge base and MCP server that teaches AI agents how I work.',
    body:
      'DAWG is a local knowledge base plus a RAG MCP server that plugs into Cursor and Claude Code. It holds my design system decisions, working principles, corrections, and process docs, and serves them to AI agents so they pick up context the way a teammate would. Embeddings run on Ollama and vectors live in a local ChromaDB, so nothing in the pipeline needs a cloud API.',
  },
]

// Helper: find a single experiment by its slug (for the detail page)
export function getLabBySlug(slug: string): LabItem | undefined {
  return lab.find((x) => x.slug === slug)
}
