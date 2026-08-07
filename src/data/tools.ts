/**
 * TOOLS DATA
 *
 * The tools I reach for. Consumed by the About page and the
 * "What I Use" note (/notes/uses).
 */

export interface Tool {
  name: string  // Tool name
  use: string   // What it's for
  tier: string  // How often / what kind of use
  url: string   // Link to the tool's site
}

export const tools: Tool[] = [
  { name: 'Conductor', use: 'Parallel Claude Code agents', tier: 'daily', url: 'https://conductor.build' },
  { name: 'Claude Code', use: 'AI pair for building', tier: 'daily', url: 'https://www.anthropic.com/claude-code' },
  { name: 'Notion', use: 'Docs & planning', tier: 'daily', url: 'https://notion.so' },
  { name: 'Figma', use: 'Design & prototyping', tier: 'not often', url: 'https://figma.com' },
]
