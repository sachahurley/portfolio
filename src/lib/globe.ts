/**
 * The turning 1-bit globe, as pixels: shared by PixelGlobe (the stat
 * dialog's canvas) and the home grid's World app (a live village item).
 *
 * Not a sprite loop: every frame is ray-cast against an actual sphere, so
 * the land compresses towards the limb and slides across the face the way a
 * globe really does. Screen pixel -> unit sphere -> latitude/longitude ->
 * a sample of the equirectangular mask below. At this size that costs a few
 * hundred lookups a frame, which is cheaper than shipping frames of art and
 * means the turn has no seam to hide.
 */

/**
 * Equirectangular land mask: 36 columns of 10 degrees of longitude (column
 * 0 starts at 180W) by 18 rows of 10 degrees of latitude (row 0 is the
 * north pole).
 *
 * Deliberately coarse, and deliberately more ocean than the real Earth has
 * at these latitudes. What makes a turning globe legible at this size is
 * the GAPS: continents have to separate and rejoin as they come round. A
 * geographically faithful northern hemisphere is close to unbroken land
 * from Alaska to Kamchatka, which at 24 pixels is one blob that never
 * appears to move.
 */
const LAND = [
  '....................................',
  '..............##...........#####....',
  '....######....##.......########.....',
  '.....#####.........###...#######....',
  '......####.........##.....######....',
  '.......###........####....#####.....',
  '........#........#####.....##.#.....',
  '.........#.......####.....##..#.....',
  '...........###....####........##....',
  '...........###....###..........##...',
  '...........###....###.........###...',
  '...........##.....##..........####..',
  '...........##......#..........###...',
  '...........#........................',
  '...........#........................',
  '....................................',
  '####################################',
  '####################################',
]
const MAP_W = LAND[0].length
const MAP_H = LAND.length

/** One full turn. Slow enough to be ambient, quick enough to be noticed. */
export const GLOBE_PERIOD_MS = 18_000

/**
 * Accent splatter: map cells picked by a fixed hash, so the spots belong to
 * the surface and turn with it rather than twinkling in place. Land takes
 * one cell in three; ocean one in seven (on its weave's ink pixels), so the
 * mostly-sea side still carries some accent as it comes round.
 */
const cellHash = (col: number, row: number) => {
  // integer mix, so neither the column nor the row alone decides (a plain
  // linear sum lit whole rows up whenever its column factor shared the modulus)
  let h = Math.imul(col, 374761393) + Math.imul(row, 668265263)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return (h ^ (h >>> 16)) >>> 0
}
const LAND_SPARK = 3
const SEA_SPARK = 7

/**
 * One frame of the globe, `size` pixels square, turned `rotation` radians:
 * 1 is ink, 0 is paper, 2 (only with `sparks`) is accent. The rim is a
 * solid one-pixel limb; inside it, land is solid and ocean a half-density
 * weave. One ink, two densities: that IS the 1-bit trick, and it beats
 * colouring whole continents, which at this diameter just produced a
 * bright blob. `sparks` flecks some land with accent instead (the World
 * app, to match the accent the other home icons carry).
 */
export function globeMask(rotation: number, size: number, sparks = false): Uint8Array {
  const px = new Uint8Array(size * size)
  const r = size / 2
  // The limb: everything outside this radius (squared, to keep the inner
  // loop free of square roots) is drawn solid, giving a one-pixel rim.
  const limb2 = ((r - 1) / r) ** 2
  for (let py = 0; py < size; py++) {
    for (let x = 0; x < size; x++) {
      const nx = (x + 0.5) / r - 1
      const ny = (py + 0.5) / r - 1
      const d2 = nx * nx + ny * ny
      if (d2 > 1) continue // off the disc: paper
      let v = 0
      if (d2 > limb2) {
        v = 1
      } else {
        const nz = Math.sqrt(1 - d2)
        // Screen y grows downward, so north is -ny.
        const lat = Math.asin(-ny)
        const lon = Math.atan2(nx, nz) + rotation
        let u = (lon + Math.PI) / (2 * Math.PI)
        u -= Math.floor(u) // wrap into [0, 1) whatever the rotation is
        const col = Math.min(MAP_W - 1, (u * MAP_W) | 0)
        const row = Math.min(MAP_H - 1, ((0.5 - lat / Math.PI) * MAP_H) | 0)
        const land = LAND[row][col] === '#'
        const weave = (x + py) % 2 === 0
        const every = land ? LAND_SPARK : SEA_SPARK
        const spark = sparks && cellHash(col, row) % every === 0
        v = land || weave ? (spark ? 2 : 1) : 0
      }
      if (v) px[py * size + x] = v
    }
  }
  return px
}
