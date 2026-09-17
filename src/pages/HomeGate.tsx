/**
 * Home gate (/)
 *
 * The feature flag between the two home pages: the village map
 * (VillageHome, the default) and the classic list home, preserved under
 * the sh_home flag. The menu's toggle row navigates to /?home=... and
 * the classic page's in-page link switches directly; either way the
 * choice persists.
 */

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Home from './Home'
import VillageHome from './VillageHome'
import { peekHomeVariant, writeHomeVariant, type HomeVariant } from '../lib/homeVariant'

export default function HomeGate() {
  const location = useLocation()
  // In-page switches pin a variant for the current URL; a navigation
  // (new search) unpins and the URL/flag decides again.
  const [pinned, setPinned] = useState<{ search: string; v: HomeVariant } | null>(null)
  const variant =
    pinned && pinned.search === location.search ? pinned.v : peekHomeVariant(location.search)

  // Persist a URL override (?home=...) so later plain "/" visits keep it.
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('home')
    if (q === 'classic' || q === 'village') writeHomeVariant(q)
  }, [location.search])

  const switchTo = (v: HomeVariant) => {
    writeHomeVariant(v)
    setPinned({ search: location.search, v })
    window.scrollTo(0, 0)
    document.getElementById('gf-viewport')?.scrollTo(0, 0)
  }

  return variant === 'village' ? (
    <VillageHome />
  ) : (
    <Home onSwitchHome={() => switchTo('village')} />
  )
}
