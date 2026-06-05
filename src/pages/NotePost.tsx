/**
 * Single Note Page (/notes/:slug)
 *
 * Displays a full note with title, date, tags, and content.
 * The content is rendered as HTML (from the data file).
 *
 * NOTE: The prose styling below is a custom "article content" layout
 * NOT from Scorpion UI - candidate component for the design system.
 */

import { useParams, Link } from 'react-router-dom'
import { Button, Badge, Divider } from '@scorp-ds/components'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug } from '../data/posts'
import PageContainer from '../components/PageContainer'

export default function NotePost() {
  // Read the slug from the URL
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  // If no post found
  if (!post) {
    return (
      <PageContainer className="space-y-6">
        <h1 className="text-base font-mono font-medium text-[var(--text-primary)] leading-[1.7]">
          Note Not Found
        </h1>
        <p className="text-base font-mono text-[var(--text-secondary)] leading-[1.625]">
          The note you're looking for doesn't exist.
        </p>
        <Link to="/notes">
          <Button variant="link" iconLeft={<ArrowLeft size={16} className="-translate-y-px" />} className="-ml-6">
            Back to Notes
          </Button>
        </Link>
      </PageContainer>
    )
  }

  // Format the date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <PageContainer className="space-y-8">

      {/* Back link */}
      <Link to="/notes" className="no-underline">
        <Button variant="link" iconLeft={<ArrowLeft size={16} className="-translate-y-px" />} className="-ml-6">
          All Notes
        </Button>
      </Link>

      {/* Post header */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h1 className="text-base font-mono font-medium text-[var(--text-primary)] leading-[1.7]">
          {post.title}
        </h1>
        <time className="block text-sm text-[var(--text-secondary)] font-mono">
          {formattedDate}
        </time>
      </div>

      <Divider />

      {/* Post content - rendered as HTML */}
      {/* The "prose" styles below make the note content look nice */}
      <article
        className="
          font-mono text-base text-[var(--text-primary)] leading-[1.625] space-y-4
          [&_h2]:text-base [&_h2]:font-medium [&_h2]:text-[var(--text-primary)] [&_h2]:mt-8 [&_h2]:mb-3
          [&_h3]:text-base [&_h3]:font-medium [&_h3]:text-[var(--text-primary)] [&_h3]:mt-6 [&_h3]:mb-3
          [&_p]:text-base [&_p]:text-[var(--text-secondary)] [&_p]:leading-[1.625] [&_p]:mb-4
          [&_a]:text-[var(--color-primary-500)] [&_a]:underline
          [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2
          [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2
          [&_li]:text-[var(--text-secondary)]
          [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-primary-500)] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[var(--text-secondary)]
          [&_code]:bg-[var(--surface-raised)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
        "
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <Divider />

      {/* Back to all notes */}
      <Link to="/notes" className="no-underline">
        <Button variant="link" iconLeft={<ArrowLeft size={16} className="-translate-y-px" />} className="-ml-6">
          Back to All Notes
        </Button>
      </Link>

    </PageContainer>
  )
}
