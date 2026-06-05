/**
 * Notes Index Page (/notes)
 *
 * Shows a list of all notes, sorted newest first.
 */

import { Link } from 'react-router-dom'
import { Button } from '@scorp-ds/components'
import { ArrowLeft } from 'lucide-react'
import { getSortedPosts } from '../data/posts'
import PostCard from '../components/PostCard'
import PageContainer from '../components/PageContainer'

export default function Notes() {
  const sortedPosts = getSortedPosts()

  return (
    <PageContainer className="space-y-8">

      {/* Back to home */}
      <Link to="/" className="no-underline">
        <Button variant="link" iconLeft={<ArrowLeft size={16} className="-translate-y-px" />} className="-ml-6">
          Home
        </Button>
      </Link>

      {/* Page header - matches the home page type scale */}
      <div>
        <h1 className="text-base font-mono font-medium text-[var(--text-primary)] leading-[1.7] mb-3">
          Notes
        </h1>
        <p className="text-base font-mono text-[var(--text-secondary)] leading-[1.625]">
          Notes on building with AI, design process, and lessons learned along
          the way.
        </p>
      </div>

      {/* Posts list */}
      <div className="space-y-4">
        {sortedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Empty state if no posts */}
      {sortedPosts.length === 0 && (
        <p className="text-[var(--text-secondary)] text-center py-12">
          No posts yet. Check back soon!
        </p>
      )}

    </PageContainer>
  )
}
