/**
 * Note detail (/notes/:slug)
 *
 * Date + title + prose body. The special
 * "uses" note (/notes/uses) renders the tools list instead of its HTML body -
 * this is where "What I Use" lives (it is not a standalone page).
 */

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MinimalPage from '../components/MinimalPage'
import BackButton from '../components/BackButton'
import PagerNav from '../components/PagerNav'
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
      <BackButton fallback="/notes" />
      {/* title first so every page's h1 sits on the same 96px line; the
          date drops to a meta line below it */}
      <h1 className="page">{post.title}</h1>
      <div className="meta" style={{ marginTop: 8 }}>
        {formatDate(post.date)}
      </div>

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
            <p>Most days that's Conductor and Claude Code, with Notion for planning.</p>
          </>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        )}
      </div>

      <PagerNav section="notes" slug={post.slug} />
    </MinimalPage>
  )
}
