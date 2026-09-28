/**
 * ErrorBoundary: the app's one catch-all, wrapped around <App /> in main.tsx.
 *
 * React 19 unmounts the whole root on an uncaught render or effect error,
 * which on this site leaves a solid dark page with no text and, inside an
 * in-app browser, no way to refresh. This keeps something on screen instead:
 * the same name / role / status block as the boot screen in index.html
 * (it reuses that file's .boot classes), plus a reload button.
 */

import { Component, type ErrorInfo, type ReactNode } from 'react'

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App crashed:', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="boot" role="alert">
        <h1 className="boot-name">Sacha Hurley</h1>
        <p className="boot-role">Product Design Engineer</p>
        <p className="boot-status">Something broke while loading the site.</p>
        <button type="button" className="boot-retry" onClick={() => location.reload()}>
          tap to reload
        </button>
      </div>
    )
  }
}
