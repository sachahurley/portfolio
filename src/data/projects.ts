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
  blocks?: ProjectBlock[] // Extended case-study layout (see block shapes below);
                          // when present, the detail page renders these instead
                          // of the simple prose template
}

/**
 * Extended case-study blocks — the layout vocabulary for long-form project
 * pages, rendered by components/ProjectBlocks.tsx in array order:
 *
 * - meta:      label/value facts row (role, timeline, team, skills)
 * - headline:  section header — optional sentence-case kicker, title, intro text
 * - prose:     one paragraph
 * - image:     hatched placeholder (real art later); css aspect-ratio
 *              string like '21 / 9', optional caption. `width` breaks the
 *              text column: 'wide' adds ~120px each side, 'full' runs out
 *              to the page margins; omit for column width
 * - imagePair: two placeholders side by side (stack on small screens);
 *              same optional `width` breakout
 * - callouts:  2-3 titled blurbs in a row (opportunity pillars, directions)
 * - insights:  numbered titled blurbs (key insights)
 * - quote:     accent pull-quote / challenge statement; optional name,
 *              role, image make it an attributed testimonial (image is a
 *              src url; omit it for the hatched placeholder avatar)
 * - list:      stacked titled blurbs (core flows, reflection learnings)
 */
export type ProjectBlock =
  | { type: 'meta'; items: { label: string; value: string }[] }
  | { type: 'headline'; kicker?: string; title: string; text?: string }
  | { type: 'prose'; text: string }
  | { type: 'image'; aspect?: string; caption?: string; width?: 'wide' | 'full' }
  | { type: 'imagePair'; captions?: [string, string]; width?: 'wide' | 'full' }
  | { type: 'callouts'; items: { title: string; text: string }[] }
  | { type: 'insights'; items: { title: string; text: string }[] }
  | { type: 'quote'; text: string; name?: string; role?: string; image?: string }
  | { type: 'list'; items: { title: string; text: string }[] }

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
    // Fake project: a working template exercising every extended layout
    // block, modelled on a long-form case-study structure (metadata row,
    // sectioned narrative, full-bleed art, callouts, insights, reflection).
    slug: 'case-study-template',
    title: 'Case Study Template',
    description: 'A fake project exercising the extended case-study layouts.',
    role: 'Template',
    tags: ['Template'],
    featured: false,
    year: '2026',
    blocks: [
      {
        type: 'meta',
        items: [
          { label: 'Role', value: 'Product Designer' },
          { label: 'Timeline', value: 'Aug to Sep 2026' },
          { label: 'Team', value: '3 designers' },
          { label: 'Skills', value: 'Strategy, prototyping' },
        ],
      },
      {
        type: 'headline',
        kicker: 'overview',
        title: 'What should the first device in this space look like?',
        text:
          'Placeholder intro: two or three sentences framing the project, who it was for, and the question it set out to answer. This block is a headline with an optional kicker and intro text.',
      },
      {
        type: 'callouts',
        items: [
          { title: 'Product strategy', text: 'Placeholder blurb for the first pillar of the approach.' },
          { title: 'Prototyping & testing', text: 'Placeholder blurb for the second pillar.' },
          { title: 'Iterating with feedback', text: 'Placeholder blurb for the third pillar.' },
        ],
      },
      {
        type: 'headline',
        kicker: 'the problem',
        title: 'The stack everyone builds on belongs to someone else.',
        text:
          'Placeholder problem statement: what was broken, the constraints in play, and why it mattered enough to work on.',
      },
      { type: 'image', aspect: '21 / 9', caption: 'Wide diagram placeholder (21:9, breaks the column)', width: 'wide' },
      {
        type: 'headline',
        kicker: 'the opportunity',
        title: 'Memory as the competitive advantage.',
      },
      {
        type: 'callouts',
        items: [
          { title: 'Independence', text: 'Placeholder benefit blurb one.' },
          { title: 'Ecosystem lock-in', text: 'Placeholder benefit blurb two.' },
          { title: 'New input modalities', text: 'Placeholder benefit blurb three.' },
        ],
      },
      {
        type: 'headline',
        kicker: 'the solution',
        title: 'Meet the product.',
        text: 'Placeholder solution description: name the thing and say what it does in one breath.',
      },
      { type: 'image', caption: 'Hero product image placeholder (16:9, full page margins)', width: 'full' },
      {
        type: 'headline',
        kicker: 'core flows',
        title: 'Six moments the product has to nail.',
      },
      {
        type: 'list',
        items: [
          { title: 'Capture', text: 'Placeholder flow description: the trigger, the action, the payoff.' },
          { title: 'Recall', text: 'Placeholder flow description for the second scenario.' },
          { title: 'Handoff', text: 'Placeholder flow description for the third scenario.' },
          { title: 'Review', text: 'Placeholder flow description for the fourth scenario.' },
        ],
      },
      {
        type: 'headline',
        kicker: 'research',
        title: 'What the field already taught us.',
        text: 'Placeholder research summary: interviews, teardown notes, comparative scans.',
      },
      { type: 'image', caption: 'Research documentation placeholder (16:9)' },
      {
        type: 'headline',
        kicker: 'form factors',
        title: 'Three directions, one bet.',
        text: 'Placeholder exploration text: the shapes considered and how the field narrowed.',
      },
      {
        type: 'imagePair',
        captions: ['Direction A placeholder (4:3)', 'Direction B placeholder (4:3)'],
      },
      {
        type: 'quote',
        text: 'How do you constrain the experience so the hardware never has to apologise for itself?',
      },
      {
        type: 'headline',
        kicker: 'key insights',
        title: 'What testing kept saying.',
      },
      {
        type: 'insights',
        items: [
          { title: 'People trust what they can see', text: 'Placeholder insight text: the observation, then the implication for the design.' },
          { title: 'Defaults do the heavy lifting', text: 'Placeholder insight text for the second numbered finding.' },
        ],
      },
      {
        type: 'quote',
        text: 'Placeholder testimonial: one sentence a real participant or teammate actually said.',
        name: 'Firstname Lastname',
        role: 'Research participant',
      },
      {
        type: 'headline',
        kicker: 'design decisions',
        title: 'Where the insights landed.',
        text: 'Placeholder synthesis: the system-level decisions the insights forced.',
      },
      { type: 'image', aspect: '21 / 9', caption: 'Systems diagram placeholder (21:9)' },
      {
        type: 'headline',
        kicker: 'reflection',
        title: 'What I would carry forward.',
      },
      {
        type: 'list',
        items: [
          { title: 'Constraints are the brief', text: 'Placeholder learning: one honest sentence about what this project taught.' },
          { title: 'Prototype the risky part first', text: 'Placeholder learning: a second takeaway written the same way.' },
        ],
      },
    ],
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
