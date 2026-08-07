/**
 * StageHero
 *
 * The bounded "stage" at the top of the home page content, showing the
 * studio-exported dither dungeon-gate loop (sepia, animated GIF) at the
 * asset's own aspect ratio. The earlier procedural diorama is benched,
 * not deleted: re-mount PixelCastle / RoamingScorpion below to bring the
 * castle facade and the roaming scorpion back.
 */

// import PixelCastle from './PixelCastle'
// import RoamingScorpion from './RoamingScorpion'

export default function StageHero() {
  return (
    <div className="stage-hero">
      <img
        className="stage-hero__scene"
        src="/dither/sacha-hurley-wild-loop.gif"
        alt="Dithered pixel-art dungeon gateway"
      />
      {/* <PixelCastle /> */}
      {/* <RoamingScorpion className="stage-hero__scorpion" /> */}
    </div>
  )
}
