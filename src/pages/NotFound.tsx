/**
 * 404 — any unmatched route.
 */

import MinimalPage from '../components/MinimalPage'

export default function NotFound() {
  return (
    <MinimalPage>
      <h1 className="page">404</h1>
      <p className="lead">Nothing here — use the menu to navigate.</p>
    </MinimalPage>
  )
}
