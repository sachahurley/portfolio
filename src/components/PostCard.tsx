/**
 * PostCard Component
 *
 * Displays a single blog post in a card-like row format. Used on
 * both the Home page (latest posts) and the Notes index page.
 *
 * Uses Scorpion UI: Badge
 * NOT in Scorpion UI: This post list item layout is custom.
 */

import { Link } from 'react-router-dom'
import type { Post } from '../data/posts'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  // Format the date nicely (e.g., "Feb 15, 2026")
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link
      to={`/notes/${post.slug}`}
      className="no-underline block group"
    >
      <article className="py-6 space-y-4">
        {/* Date - subtle sepia, same size/weight as everything else */}
        <span className="block text-sm font-mono font-normal text-sepia-500 dark:text-sepia-600">
          {formattedDate}
        </span>

        {/* Title - amber, same size/weight */}
        <h3 className="text-sm font-mono font-normal text-amber-700 dark:text-amber-500 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {post.title}
        </h3>

        {/* Excerpt - default text color, same size/weight */}
        <p className="text-sm font-mono font-normal text-[var(--text-secondary)] leading-relaxed">
          {post.excerpt}
        </p>
      </article>
    </Link>
  )
}
