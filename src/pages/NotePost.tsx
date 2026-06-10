/**
 * Note detail (/notes/:slug)
 *
 * Date + title + prose body, ending with a "Discuss on X ↗" link. The special
 * "uses" note (/notes/uses) renders the tools list instead of its HTML body -
 * this is where "What I Use" lives (it is not a standalone page).
 */

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import { ArrowUpRight } from '../components/icons'
import { getPostBySlug } from '../data/posts'
import { tools } from '../data/tools'
import { useXp, XP_AWARDS } from '../context/XpProvider'
import { formatDate } from '../lib/date'
import NotFound from './NotFound'
import { usePageTitle } from '../lib/usePageTitle'

export default function NotePost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined
  usePageTitle(post?.title)
  const { award } = useXp()

  useEffect(() => {
    if (post) award(XP_AWARDS.note, 'read a note', `note:${post.slug}`)
  }, [post, award])

  if (!post) return <NotFound />

  const isUses = post.slug === 'uses'

  return (
    <MinimalPage>
      <div className="meta">{formatDate(post.date)}</div>
      <h1 className="page" style={{ marginTop: 2 }}>
        {post.title}
      </h1>

      <div className="prose">
        {isUses ? (
          <>
            <p>{post.excerpt} I keep the kit small and lean on AI tooling to move fast.</p>
            <h2>Tools</h2>
            <ul>
              {tools.map((t) => (
                <li key={t.name}>
                  <strong>{t.name}</strong> — {t.use} · {t.tier}
                </li>
              ))}
            </ul>
            <p>Most days that's Claude Code plus Figma, shipping straight to Vercel.</p>
          </>
        ) : (
          <>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <p>
              <a href="https://x.com/sacha_hurley" target="_blank" rel="noopener noreferrer">
                Discuss on X <ArrowUpRight />
              </a>
            </p>
          </>
        )}
      </div>
    </MinimalPage>
  )
}
