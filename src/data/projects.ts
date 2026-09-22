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
  locked?: boolean        // Password-locked case study: the teaser (title,
                          // description, meta) stays public, but the blocks
                          // live encrypted in src/data/lockedBlocks.gen.ts
                          // (see scripts/lock-projects.mjs), not here
}

/**
 * Extended case-study blocks — the layout vocabulary for long-form project
 * pages, rendered by components/ProjectBlocks.tsx in array order:
 *
 * - meta:      label/value facts row (role, timeline, team, skills)
 * - headline:  section header — optional sentence-case kicker, title, intro text
 * - prose:     one paragraph
 * - image:     a figure; `src` for real art, omit it for the hatched
 *              placeholder. css aspect-ratio string like '21 / 9', optional
 *              caption. `width` breaks the text column: 'wide' adds ~120px
 *              each side, 'full' runs out to the page margins; omit for
 *              column width
 * - imagePair: two figures side by side (stack on small screens); same
 *              optional `width` breakout, `srcs` per side
 * - ascii:     a box-drawing diagram as live text rather than an image
 *              (selectable, retints with the theme). Generate the string
 *              with @scorp-ds/tui-art; `label` is what it says, for screen
 *              readers, since the glyphs themselves read as noise
 * - slot:      a live figure named in components/caseStudySlots (a
 *              component specimen, a token ramp). Falls back to the
 *              placeholder when the name has no entry
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
  | { type: 'image'; aspect?: string; caption?: string; width?: 'wide' | 'full'; src?: string; alt?: string }
  | {
      type: 'imagePair'
      captions?: [string, string]
      width?: 'wide' | 'full'
      srcs?: [string | undefined, string | undefined]
      alts?: [string | undefined, string | undefined]
    }
  | { type: 'ascii'; text: string; caption?: string; width?: 'wide' | 'full'; label?: string }
  | { type: 'slot'; name: string; caption?: string; width?: 'wide' | 'full'; aspect?: string }
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
    externalUrl: 'https://sachahurley.github.io/scorpion-design-system/',
    tools: ['Claude Code', 'Cursor', 'React', 'Tailwind CSS', 'Storybook'],
    year: '2025',
    thumbnail: '/dither/scorp-thumb.png',
    longDescription:
      'A token-based React component library with a terminal look, built solo and now running three production sites.',
    blocks: [
      {
        type: 'meta',
        items: [
          { label: 'Role', value: 'Designer and builder, solo' },
          { label: 'Timeline', value: 'Aug 2025 to now' },
          { label: 'Scope', value: '43 components, 378 tokens' },
          { label: 'Stack', value: 'React, TypeScript, Tailwind, Storybook' },
        ],
      },
      {
        type: 'headline',
        kicker: 'overview',
        title: 'A terminal-flavoured design system I build everything else on.',
        text:
          'Scorp DS is a token-based React library with a TUI look: sharp corners, one monospace face, a warm amber and sepia palette, and interaction states that never run past 200ms. This site is built out of it.',
      },
      {
        type: 'slot',
        name: 'scorp-interface',
        caption: 'Not a screenshot: Window, Table, Badge, Meter and StatusLine, live on this page',
      },
      {
        type: 'headline',
        kicker: 'the problem',
        title: 'It took three rewrites to get the foundation right.',
        text:
          'Scorpion UI shipped in 2025 as a folder of components with hardcoded values. v2 introduced tokens but left them tangled with the showcase site that displayed them. Either way, starting a new project meant copying components across and re-deciding colour and spacing by hand.',
      },
      {
        type: 'headline',
        kicker: 'the system',
        title: 'Tokens first, then everything else.',
      },
      {
        type: 'slot',
        name: 'scorp-palette',
        caption: 'The two scales a component is allowed to name, at every step that exists',
      },
      {
        type: 'list',
        items: [
          {
            title: 'One source of truth',
            text:
              'Every colour, size and duration lives in a single tokens.json in W3C design token format. Components are not allowed raw values. A parser turns the file into CSS custom properties and a Tailwind preset, so consumers get the whole theme from one import.',
          },
          {
            title: 'Semantic aliasing',
            text:
              'Components reference primary and secondary, never amber and sepia, even though they resolve to the same value. That one rule is what makes retheming possible: the unlockable colour themes on this site work by overriding those variables at runtime, with no component aware of it.',
          },
          {
            title: 'Packages that point one way',
            text:
              'Tokens, then tui-art (box-drawing frames as plain strings, no React), then components, then Storybook. Dependencies only flow downhill, so the token layer can never accidentally import a button.',
          },
        ],
      },
      {
        type: 'ascii',
        width: 'wide',
        label:
          'The four packages in dependency order: storybook, components, tokens, tui-art. Every import points down the list, never back up.',
        caption: 'Drawn by the system’s own tui-art package, so the diagram is text, not a picture',
        text: [
          "┌────────────────────────────────────────────────────────────┐",
          "│scorp-ds  ·  package layering                               │",
          "├────────────────────────────────────────────────────────────┤",
          "│storybook     65 stories, axe in light and dark             │",
          "│components    43 components, zero raw values                │",
          "│tokens        378 tokens, one source of truth               │",
          "│tui-art       box frames as plain strings                   │",
          "│                                                            │",
          "│every import points down this list, never back up           │",
          "└────────────────────────────────────────────────────────────┘",
        ].join('\n'),
      },
      {
        type: 'headline',
        kicker: 'documentation',
        title: 'Storybook is the contract, not a gallery.',
        text:
          '65 stories cover foundations, every component, and full screen samples. Accessibility is tested rather than asserted: the test runner replays each story through axe in both light and dark themes, so a contrast regression fails the build instead of shipping.',
      },
      {
        type: 'image',
        src: '/dither/scorp-storybook.png',
        caption: 'The Storybook, run through the same 1-bit dither the rest of the site uses',
      },
      {
        type: 'headline',
        kicker: 'tooling',
        title: 'The chores are automated, because I am the only one doing them.',
        text:
          'Nineteen Claude Code skills live in the repo: add a component, audit the tokens, check a story against the documentation rules, cut release notes, and push the built packages out to all three consumers. A solo system dies of admin, so the admin is the part that got written down first.',
      },
      {
        type: 'headline',
        kicker: 'in production',
        title: 'Three sites run on it.',
      },
      {
        type: 'callouts',
        items: [
          {
            title: 'This portfolio',
            text: 'Every page, and the case study sections you are reading, are scorp-ds components.',
          },
          {
            title: 'The showcase',
            text: 'A public front door for the system, deployed from its own repo on merge.',
          },
          {
            title: 'Protodash',
            text: 'A prototyping dashboard where new patterns get pressure-tested before they graduate.',
          },
        ],
      },
      {
        type: 'prose',
        text:
          'None of the three install from a registry. Each vendors a committed copy of the built packages, so any checkout builds offline and an upgrade is a reviewable diff rather than a version bump that silently moves a hundred pixels.',
      },
      {
        type: 'headline',
        kicker: 'reflection',
        title: 'What building it actually taught me.',
      },
      {
        type: 'list',
        items: [
          {
            title: 'Constraints travel further than components',
            text:
              'The rules that earned their keep are the boring prohibitions: no raw hex, no border radius, no sans-serif. They hold across every new component without anyone re-litigating them.',
          },
          {
            title: 'A system is only real once something depends on it',
            text:
              'The library was tidy in isolation and full of wrong assumptions the moment a second site consumed it. Shipping the portfolio on it found more gaps than any amount of reviewing the components alone.',
          },
        ],
      },
    ],
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
  {
    // Placeholder locked project: its case-study body is encrypted in
    // src/data/lockedBlocks.gen.ts (plaintext source: content/locked/,
    // demo password documented in its README). Real NDA work follows the
    // same pattern with an uncommitted password.
    slug: 'sealed-demo',
    title: 'Sealed Case Study (Demo)',
    description: 'A password-protected case study. The write-up stays encrypted until unlocked.',
    role: 'Demo',
    tags: ['Demo'],
    featured: false,
    year: '2026',
    locked: true,
    longDescription:
      'This project is under NDA, so the full write-up is sealed. The short version: it exists, it shipped, and the case study unlocks with a password. Ask me for the key.',
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
