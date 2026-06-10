/**
 * Notes index (/notes)
 *
 * A row list with the date shown on each row. No tag-filter row.
 */

import MinimalPage from '../components/MinimalPage'
import { Item, List } from '../components/Item'
import { getSortedPosts } from '../data/posts'
import { formatDate } from '../lib/date'
import { usePageTitle } from '../lib/usePageTitle'

export default function Notes() {
  usePageTitle('Notes')
  const posts = getSortedPosts()

  return (
    <MinimalPage>
      <h1 className="page">Notes</h1>
      <p className="lead">Short notes &amp; things I'm learning.</p>

      <div className="mn-block">
        <List>
          {posts.map((n) => (
            <Item
              key={n.slug}
              to={`/notes/${n.slug}`}
              date={formatDate(n.date)}
              title={n.title}
              desc={n.excerpt}
              img={n.img}
            />
          ))}
        </List>
      </div>
    </MinimalPage>
  )
}
