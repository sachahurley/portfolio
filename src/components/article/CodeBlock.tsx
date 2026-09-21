/**
 * Syntax-highlighted code block. Renders the raw code in a plain <pre> first
 * (same font/size/line-height as the shiki output, so the swap causes zero
 * layout shift), then lazily highlights via src/lib/shiki. If highlighting
 * fails for any reason, the plain block simply stays.
 *
 * dangerouslySetInnerHTML is safe here by constraint: the HTML is shiki's
 * output over string literals authored in this repo's content files. Never
 * pipe user or CMS input through this component.
 */

import { useEffect, useState } from 'react'
import type { ArticleLang } from '../../lib/shiki'

interface CodeBlockProps {
  code: string
  lang?: ArticleLang
  title?: string
}

export default function CodeBlock({ code, lang = 'tsx', title }: CodeBlockProps) {
  const text = code.trim()
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    import('../../lib/shiki')
      .then((m) => m.highlight(text, lang))
      .then((h) => {
        if (alive) setHtml(h)
      })
      .catch(() => {
        /* stay on the plain fallback */
      })
    return () => {
      alive = false
    }
  }, [text, lang])

  return (
    <figure className="codefig">
      {title && (
        <figcaption className="codehead">
          <span>{title}</span>
          <span className="codelang">{lang}</span>
        </figcaption>
      )}
      {html ? (
        <div className="codeblock" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <div className="codeblock">
          <pre>
            <code>{text}</code>
          </pre>
        </div>
      )}
    </figure>
  )
}
