/**
 * JeweledFrame — the jeweled stone border around the welcome screen's
 * viewport. A nine-slice border-image whose 48x48 source is generated at
 * runtime by lib/jeweledFrame.ts: 16x16 garnet-jewel corner bosses stay
 * fixed while the 8x8 stone tiles repeat along the edges.
 */

import { useMemo } from 'react'
import { buildFrameDataUrl, FRAME_SLICE } from '../lib/jeweledFrame'

export default function JeweledFrame() {
  const url = useMemo(() => buildFrameDataUrl(), [])
  return (
    <div
      className="jewel-frame"
      aria-hidden="true"
      style={{ borderImage: `url(${url}) ${FRAME_SLICE} repeat` }}
    />
  )
}
