/**
 * BLOG POST DATA
 *
 * This is where all your blog posts live. To add a new post,
 * just add a new object to the "posts" array below.
 *
 * - "slug" is the URL-friendly name (e.g., /notes/building-with-ai)
 * - "content" holds the full blog post text (can include simple HTML)
 * - Posts are automatically sorted by date (newest first)
 */

// TypeScript type - defines what a blog post object looks like
export interface Post {
  slug: string       // URL path, e.g. "building-with-ai"
  title: string      // Post title
  date: string       // Publication date, e.g. "2026-02-15"
  excerpt: string    // Short preview (1-2 sentences, shown in post lists)
  tags: string[]     // Topic labels, e.g. ["AI", "Design"]
  content: string    // Full post content (supports basic HTML)
}

// ============================================
// YOUR BLOG POSTS - Add new ones here!
// ============================================
export const posts: Post[] = [
  {
    slug: 'design-to-engineering-handoff-is-dead',
    title: 'The Design-to-Engineering Handoff Is Dead. Here\u2019s What Replaced It.',
    date: '2026-02-15',
    excerpt:
      'The design-to-engineering workflow hasn\u2019t just improved - the entire model has changed. Here\u2019s how an AI-first workflow replaces the handoff entirely.',
    tags: ['AI', 'Design', 'Engineering', 'Process'],
    content: `
      <p>
        For years, the design-to-engineering workflow has looked the same: designer builds mockups in Figma, writes specs, hands them over a wall, and hopes the engineer interprets them correctly. Then weeks later, you\u2019re in a QA review comparing screenshots to Figma frames, filing tickets for every misaligned pixel.
      </p>
      <p>
        That workflow is over. Not because the tools got slightly better - but because the entire model has changed.
      </p>
      <p>
        I\u2019ve been shipping product with an AI-first design-to-engineering workflow for the past year, and the difference isn\u2019t incremental. It\u2019s structural. Here\u2019s how it works.
      </p>

      <h2>The flow in 8 steps</h2>

      <p><strong>1. Define the flow.</strong><br/>
        The PM writes a brief or PRD. I use Claude to generate the first draft of user flow diagrams directly from those requirements - screens, states, decision points. I\u2019m editing and shaping, not starting from a blank canvas.
      </p>

      <p><strong>2. Prototype in code.</strong><br/>
        This is the big shift. Instead of designing in Figma, I build a working prototype in v0 or Cursor. It uses real design system tokens and components. It deploys to a live preview URL. The prototype <em>is</em> code - not a representation of what code might eventually look like.
      </p>

      <p><strong>3. Review on a real preview.</strong><br/>
        Stakeholders review the prototype on a deployed URL. They\u2019re interacting with real components, real responsive behavior, real data states. Not clicking through a Figma prototype with fake hotspots.
      </p>

      <p><strong>4. Iterate in place.</strong><br/>
        Feedback comes in, I make changes in code, the preview URL updates automatically. No re-spec. No re-handoff. No waiting for an engineer to rebuild what I already showed the team. The iteration cycle drops from days to hours.
      </p>

      <p><strong>5. Engineer hardens.</strong><br/>
        The engineer takes the prototype codebase and elevates it to production quality - backend integrations, state management, error handling, tests. They\u2019re refining working code, not interpreting a spec doc. The \u201chandoff\u201d is a repository, not a Figma link.
      </p>

      <p><strong>6. Design QA.</strong><br/>
        I review the production build in-browser. Because I helped build the prototype it\u2019s based on, discrepancies are minimal. No more screenshot comparisons. Fixes happen in real-time, in the same environment.
      </p>

      <p><strong>7. Ship.</strong><br/>
        Merge, deploy, monitor. AI agents handle code review before merge and watch for anomalies in production after deploy.
      </p>

      <p><strong>8. Learn and loop.</strong><br/>
        Analytics and user feedback get synthesized by AI into actionable insights. Those feed directly into the next cycle. The loop closes faster because the tool that helps you build also helps you learn.
      </p>

      <h2>Why this works</h2>
      <p>
        The fundamental insight is simple: <strong>working software is the design artifact.</strong> The prototype isn\u2019t a step on the way to the real thing - it <em>is</em> the first draft of the real thing.
      </p>
      <p>
        This changes everything downstream. There\u2019s no interpretation gap between design and engineering. There\u2019s no rebuild. Stakeholders give feedback on the actual product, not a simulation of it. And because AI handles the mechanical parts - generating components, scaffolding flows, reviewing code - everyone on the team operates at a higher level.
      </p>
      <p>
        Designers think about systems and interactions, not pixel-pushing. Engineers think about architecture and performance, not translating mockups. PMs see working product in days, not weeks.
      </p>

      <h2>What you need to make it work</h2>
      <p>
        This isn\u2019t just about swapping tools. The workflow depends on a few things:
      </p>
      <ul>
        <li><strong>An AI-readable design system.</strong> Your tokens, components, and conventions need to be structured so AI tools can consume them - not just so humans can reference a Figma library. An AGENTS.md file and Cursor rules are as important as your Figma components.</li>
        <li><strong>Designers willing to work in code.</strong> Not writing production code from scratch - but working in tools like v0 and Cursor where the output is real, deployable UI. The learning curve is real but short.</li>
        <li><strong>Engineers willing to share the codebase early.</strong> The prototype lives in the same repo. That means engineers need to be comfortable with designers contributing code, and designers need to be comfortable with engineers refining their work.</li>
        <li><strong>Preview deploys as the review surface.</strong> Every PR gets a deployed preview. That\u2019s where feedback happens - not in Figma, not in Slack threads describing what something should look like.</li>
      </ul>

      <h2>The result</h2>
      <p>
        What used to take 2-4 weeks - from kickoff to first reviewable prototype - now takes 2-4 days. The gap between \u201cwhat we designed\u201d and \u201cwhat we shipped\u201d effectively disappears. And every cycle gets faster, because the design system and AI context improve with each iteration.
      </p>
      <p>
        The handoff isn\u2019t dead because we found a better way to hand things off. It\u2019s dead because there\u2019s nothing to hand off anymore. Designer and engineer work in the same medium, on the same artifact, toward the same deployed output.
      </p>
      <p>
        That\u2019s the workflow. It\u2019s not theoretical - it\u2019s how I ship product today.
      </p>
    `,
  },
  {
    slug: 'why-design-systems',
    title: 'Why Every AI Builder Needs a Design System',
    date: '2026-02-10',
    excerpt:
      'A design system isn\'t just for big teams. If you\'re building with AI, having consistent tokens and components makes everything better.',
    tags: ['Design Systems', 'AI', 'Process'],
    content: `
      <h2>The problem with one-off builds</h2>
      <p>
        When you build each project from scratch, every new page looks slightly
        different. Colors don't match, spacing is inconsistent, and buttons come
        in five different sizes.
      </p>

      <h2>How Scorpion UI changed my workflow</h2>
      <p>
        Building Scorpion UI was my first major AI-assisted project. Now every
        new project starts with a consistent foundation - the same colors, the
        same typography, the same components.
      </p>

      <h2>Getting started</h2>
      <p>
        You don't need to build a full design system to get started. Even just
        defining your color palette and a few reusable components makes a huge
        difference. This is a sample post - replace it with your real content!
      </p>
    `,
  },
]

// Helper: get all posts sorted by date (newest first)
export function getSortedPosts(): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

// Helper: get the N most recent posts (for the Home page)
export function getLatestPosts(count: number): Post[] {
  return getSortedPosts().slice(0, count)
}

// Helper: find a single post by its slug (for the post detail page)
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}
