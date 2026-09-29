/**
 * SpeedInsightsRoute — Speed Insights with the route filled in.
 *
 * @vercel/speed-insights/react is framework-agnostic and has no router
 * integration: only the /next entry point learns routes on its own. Mounted
 * bare, every sample reports `route: undefined` and Vercel files the lot
 * under "Unknown", which makes its Routes tab useless. This hands it the
 * matched pattern instead.
 *
 * Must render inside <BrowserRouter> for useLocation.
 */

import { SpeedInsights } from '@vercel/speed-insights/react'
import { useLocation } from 'react-router-dom'
import { routePatternFor } from '../lib/routePattern'

export default function SpeedInsightsRoute() {
  const { pathname } = useLocation()
  return <SpeedInsights route={routePatternFor(pathname)} />
}
