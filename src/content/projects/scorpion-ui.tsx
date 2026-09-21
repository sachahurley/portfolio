/**
 * Case study: Scorpion Design System.
 *
 * First article on the new template; intentionally exercises every article
 * component once (Figure, H2, Callout, CodeBlock, Demo, Quote, Divider) so
 * it doubles as the living reference for writing the next one.
 */

import {
  H2,
  CodeBlock,
  Demo,
  Figure,
  Callout,
  Quote,
  Divider,
  DotGridDemo,
} from '../../components/article'

export default function ScorpionUiArticle() {
  return (
    <>
      <p>
        Scorpion UI is a token-based design system built from the ground up with AI
        tools: a component library, a token architecture, and an{' '}
        <a href="https://sachahurley.github.io/scorpion-ui-v2/" target="_blank" rel="noopener noreferrer">
          interactive docs site
        </a>
        . Everything on this portfolio runs on it too; even the color you see on links
        here is just the system's <code>--accent</code> token resolving at runtime.
      </p>
      <p>
        This write-up covers why it looks the way it does, how the tokens are layered,
        and what building a design system with an AI pair actually taught me.
      </p>

      <Figure caption="The Scorpion UI docs site. (placeholder, screenshot coming)" />

      <H2 id="why-terminal">Why a terminal aesthetic</H2>
      <p>
        The system uses one font, one weight, everywhere. Emphasis comes from color,
        not boldness: primary text, secondary text, and a single warm accent. That
        constraint started as a nod to terminal UIs, but it earned its keep as a
        forcing function. When you can't reach for bold or a bigger size, hierarchy
        has to come from structure and rhythm, and that discipline shows up in every
        component the system ships.
      </p>
      <Callout>
        Constraint worth stating outright: a single 400 weight means <strong>color is
        the only emphasis channel</strong>. Every palette in the system has to keep
        three readable text tiers, or hierarchy collapses.
      </Callout>

      <H2 id="token-architecture">Token architecture</H2>
      <p>
        Tokens are layered: primitive scales at the bottom, semantic aliases on top,
        and components only ever read the semantic layer. The portfolio's stylesheet
        shows the shape; these aliases are the entire color contract:
      </p>
      <CodeBlock
        lang="css"
        title="index.css"
        code={`
:root {
  --bg: var(--surface-page);     /* page background */
  --fg: var(--text-primary);     /* labels, names, titles */
  --body: var(--text-secondary); /* paragraphs */
  --mut: var(--text-tertiary);   /* dates, meta */
  --accent: #e0a33d;             /* the one warm highlight */
}
`}
      />
      <p>
        Because components never touch raw values, re-theming is just rewriting the
        variables. The portfolio's egg system does exactly that: activating an egg
        writes new values onto <code>&lt;html&gt;</code> and the whole site follows,
        this page included.
      </p>
      <CodeBlock
        lang="tsx"
        title="applyTheme (simplified)"
        code={`
export function applyTheme(id: ThemeId) {
  const t = THEMES[id]
  const st = document.documentElement.style
  st.setProperty('--fire1', t.fire[0])
  st.setProperty('--fire2', t.fire[1])
  st.setProperty('--fire3', t.fire[2])
  st.setProperty('--accent', t.accent)
}
`}
      />

      <H2 id="show-dont-tell">Show, don't tell</H2>
      <p>
        The docs lean on live, slightly playful demos instead of static screenshots.
        The grid below reads <code>--accent</code> on every frame, so if you re-theme
        the site the demo follows. Move your cursor (or finger) over it.
      </p>
      <Demo label="cursor-reactive grid, same canvas pattern as the lab" resettable>
        <DotGridDemo />
      </Demo>

      <Quote
        attribution={
          <a href="https://x.com/sacha_hurley" target="_blank" rel="noopener noreferrer">
            a note to self, early in the build
          </a>
        }
      >
        <p>
          If the system needs a paragraph of explanation to justify a component, the
          component is wrong, not the paragraph.
        </p>
      </Quote>

      <Divider />

      <H2 id="what-i-learned">What I learned</H2>
      <p>
        Building a design system with an AI pair changes where the effort goes. The
        mechanical work gets cheap; the judgment gets more valuable:
      </p>
      <ul>
        <li>
          Tokens before components, always. Every hour spent on the semantic layer
          saved several downstream.
        </li>
        <li>
          AI is excellent at propagating a decision and terrible at making one. Decide
          the pattern by hand, then let it sweep the codebase.
        </li>
        <li>
          A docs site you actually enjoy visiting is the difference between a system
          people adopt and a folder of components people fork.
        </li>
      </ul>
    </>
  )
}
