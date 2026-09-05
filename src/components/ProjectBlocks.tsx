/**
 * ProjectBlocks — renders a project's extended case-study layout from its
 * typed `blocks` array (block shapes documented in data/projects.ts).
 * Rides the .prose type rhythm; the pb-* classes in minimal.css add the
 * layouts. Images are hatched placeholders until real art exists.
 */

import type { ProjectBlock } from '../data/projects'

function Placeholder({ aspect, caption }: { aspect?: string; caption?: string }) {
  return (
    <figure className="pb-fig">
      <div className="pb-img" style={aspect ? { aspectRatio: aspect } : undefined} />
      {caption && <figcaption className="pb-cap">{caption}</figcaption>}
    </figure>
  )
}

function Block({ b }: { b: ProjectBlock }) {
  switch (b.type) {
    case 'meta':
      return (
        <dl className="pb-meta">
          {b.items.map((it) => (
            <div key={it.label}>
              <dt>{it.label}</dt>
              <dd>{it.value}</dd>
            </div>
          ))}
        </dl>
      )
    case 'headline':
      return (
        <header className="pb-headline">
          {b.kicker && <div className="pb-kicker">{b.kicker}</div>}
          <h2>{b.title}</h2>
          {b.text && <p>{b.text}</p>}
        </header>
      )
    case 'prose':
      return <p>{b.text}</p>
    case 'image':
      return <Placeholder aspect={b.aspect} caption={b.caption} />
    case 'imagePair':
      return (
        <div className="pb-pair">
          <Placeholder aspect="4 / 3" caption={b.captions?.[0]} />
          <Placeholder aspect="4 / 3" caption={b.captions?.[1]} />
        </div>
      )
    case 'callouts':
      return (
        <div className="pb-callouts">
          {b.items.map((it) => (
            <div key={it.title}>
              <div className="pb-ct">{it.title}</div>
              <p>{it.text}</p>
            </div>
          ))}
        </div>
      )
    case 'insights':
      return (
        <ol className="pb-insights">
          {b.items.map((it, i) => (
            <li key={it.title}>
              <span className="pb-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <div className="pb-ct">{it.title}</div>
                <p>{it.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )
    case 'quote':
      return <blockquote className="pb-quote">{b.text}</blockquote>
    case 'list':
      return (
        <ul className="pb-deflist">
          {b.items.map((it) => (
            <li key={it.title}>
              <div className="pb-ct">{it.title}</div>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      )
  }
}

export default function ProjectBlocks({ blocks }: { blocks: ProjectBlock[] }) {
  return (
    <div className="prose">
      {blocks.map((b, i) => (
        <Block key={i} b={b} />
      ))}
    </div>
  )
}
