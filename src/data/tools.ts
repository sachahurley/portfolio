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
  { name: 'Claude Code', use: 'AI pair for building', tier: 'daily', url: 'https://www.anthropic.com/claude-code' },
  { name: 'Figma', use: 'Design & prototyping', tier: 'daily', url: 'https://figma.com' },
  { name: 'Next.js', use: 'App framework', tier: 'daily', url: 'https://nextjs.org' },
  { name: 'React Three Fiber', use: '3D / WebGL in React', tier: 'often', url: 'https://docs.pmnd.rs/react-three-fiber' },
  { name: 'Tailwind CSS', use: 'Styling', tier: 'daily', url: 'https://tailwindcss.com' },
  { name: 'Vercel', use: 'Hosting & deploys', tier: 'deploy', url: 'https://vercel.com' },
]
