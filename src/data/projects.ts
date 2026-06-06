/**
 * PROJECT DATA
 *
 * This is where all your projects live. To add a new project,
 * just add a new object to the "projects" array below.
 *
 * - "slug" is the URL-friendly name (e.g., /projects/scorpion-ui)
 * - every internal project has its own detail page at /projects/:slug
 * - "externalUrl" links OUT to the live project. Projects with an
 *   externalUrl are treated as external links (↗) in the row lists.
 * - "featured: true" makes it show on the Home page
 */

// TypeScript type - defines what a project object looks like
export interface Project {
  slug: string            // URL path, e.g. "scorpion-ui"
  title: string           // Display name
  description: string     // Short summary (1-2 sentences) - shown on row lists
  role?: string           // Your role, shown as meta on the detail page
  tags: string[]          // Category labels, e.g. ["Design System", "React"]
  featured: boolean       // Show on homepage?
  img?: boolean           // Show a 16:9 thumbnail on the row
  imgRight?: boolean      // On mobile, keep a two-column row with a portrait (4:3) image on the right
  external?: boolean      // If true, the row links straight out (no detail page)
  externalUrl?: string    // Link out to the live project (CTA on the detail page)
  thumbnail?: string      // Optional image path (used as the row thumbnail)
  tools?: string[]        // AI tools / tech used
  year?: string           // When the project was made
  longDescription?: string // Full description for the detail page
}

// ============================================
// YOUR PROJECTS - Add new ones here!
// ============================================
export const projects: Project[] = [
  {
    slug: 'scorpion-ui',
    title: 'Scorpion Design System',
    description: 'A terminal-style design system for building with AI.',
    role: 'Designer & Builder',
    tags: ['Design System', 'React', 'TypeScript'],
    featured: true,
    img: true,
    externalUrl: 'https://sachahurley.github.io/scorpion-ui-v2/',
    tools: ['Cursor', 'Claude', 'React', 'Tailwind CSS'],
    year: '2025',
    longDescription:
      'Scorpion UI is a token-based design system built from the ground up using AI tools. It includes a complete component library, design token system, and interactive documentation site.',
  },
  {
    slug: 'coldaw',
    title: 'ColDAW',
    description: 'Cloud-based collaborative DAW.',
    role: 'Founding PM',
    tags: ['Product', 'Audio', 'Collaboration'],
    featured: true,
    img: true,
    imgRight: true, // demo: two-column portrait thumbnail on mobile
    longDescription:
      'ColDAW is a cloud-based, collaborative digital audio workstation. Placeholder case study - replace with the real write-up.',
  },
  {
    slug: 'thinkle',
    title: 'Thinkle',
    description: 'Smart-glasses learning system.',
    role: 'Product Designer',
    tags: ['Product Design', 'Hardware', 'Learning'],
    featured: false,
    longDescription:
      'Thinkle is a smart-glasses learning system. Placeholder case study - replace with the real write-up.',
  },
]

// Helper: get only featured projects (for the Home page)
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

// Helper: find a single project by its slug (for the detail page)
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
