/**
 * ABOUT DATA
 *
 * The About page's prose sections: how I work, what people say, and who
 * I've worked with. Consumed by the About page (tools live in tools.ts).
 *
 * Endorsement quotes are verbatim. Wrap a phrase in **double asterisks** to
 * emphasise it: the site has one font weight, so emphasis renders as the
 * brighter foreground color rather than bold.
 */

export interface Principle {
  name: string // Short name
  text: string // One sentence on what it means in practice
}

export interface Endorsement {
  quote: string // Verbatim, with **emphasis** markers
  name: string  // As they agreed to be credited, e.g. "Michael M."
  role: string  // Title and company
}

export const principles: Principle[] = [
  { name: 'Evidence-based', text: 'I zero in on the facts to identify and close the gaps between what we know and what we need to learn.' },
  { name: 'Bias for action', text: 'I’d rather show progress through prototypes and visuals than bury ideas in documentation.' },
  { name: 'Shared ownership', text: 'Whether working independently or collaboratively, I keep everyone engaged throughout the process.' },
  { name: 'Speed', text: 'By iterating quickly, we can explore broadly and refine fast, until we find what fits.' },
  { name: 'Show and tell', text: 'I regularly share work in progress to keep collaboration open and feedback flowing.' },
  { name: 'Systems in parallel', text: 'From features to full systems, I build reusable components to keep teams fast and consistent.' },
]

export const endorsements: Endorsement[] = [
  {
    quote:
      'Sacha brings **clarity to complexity** and **momentum to execution**. He works fast, collaborates deeply, and consistently delivers thoughtful, impactful design.',
    name: 'Michael M.',
    role: 'Director of IT, Robinhood',
  },
  {
    quote:
      'Sacha is a **trusted partner** in our development process. He always brings a **new perspective** and **deep insights** of how new features will fit into our overall experience and impact for the user, which is invaluable at all steps of the lifecycle.',
    name: 'Justin L.',
    role: 'Sr Product Manager, Betterfly',
  },
  {
    quote:
      'I’ve always been inspired by his **enthusiasm**, **kindness**, and **focus**. Any team will benefit from Sacha’s ability to bring people together and lead them toward creating **outstanding products**.',
    name: 'Xiaohang Z.',
    role: 'Design Manager, TikTok',
  },
]

/** Companies and clients, in the order they read best. */
export const workedWith: string[] = ['Betterfly', 'Meta', 'EA Sports', 'SureCo', 'Aritzia']
