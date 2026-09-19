/**
 * BackButton — pixel-plate icon button (same silhouette as the "See all"
 * button and menu rows) with the dither arrow-left, shown at the top of
 * detail pages. Goes back in history when the visitor navigated here from
 * within the site; deep links have no in-app history, so it falls back to
 * the section index instead.
 */

import { useNavigate } from 'react-router-dom'
import DitherIcon from './DitherIcon'

export default function BackButton({ fallback = '/' }: { fallback?: string }) {
  const navigate = useNavigate()
  const goBack = () => {
    const state = window.history.state as { idx?: number } | null
    if (state?.idx && state.idx > 0) navigate(-1)
    else navigate(fallback)
  }
  return (
    <button type="button" className="pageback" onClick={goBack} aria-label="Go back">
      <DitherIcon name="arrow-left" size={16} />
    </button>
  )
}
