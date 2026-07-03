/**
 * StageHero
 *
 * The bounded "stage" at the top of the home page content: a 200px box
 * holding an 8-bit pixel diorama. PixelCastle draws the stone facade, round
 * arch, and keystone skull; the roaming scorpion wanders in front of it.
 */

import PixelCastle from './PixelCastle'
import RoamingScorpion from './RoamingScorpion'

export default function StageHero() {
  return (
    <div className="stage-hero">
      <PixelCastle />
      <RoamingScorpion className="stage-hero__scorpion" />
    </div>
  )
}
