/**
 * Hand-authored village parts that live with the site rather than in the
 * onebit-kit tool. catalog.gen.ts is regenerated from the tool, so parts
 * the site needs on its own go here, in the same ASCII format ('.' empty,
 * 'X' ink, 'H' highlight), and villageKit registers them beside the
 * catalog.
 */

import type { VillagePart } from './catalog.gen'

export const SITE_PARTS: VillagePart[] = [
  // The Lab app's potion, one size up. The catalog's 11x12 potion read
  // small beside the home grid's 16-18px icons; pixel art only grows in
  // whole pixels, so this is redrawn rather than scaled: one row taller
  // and a pixel wider each side (13x13), keeping the flask symmetric
  // about its neck and the same cork, shoulder, liquid and sparkle seeds.
  {
    name: 'potion_lg',
    w: 13,
    h: 13,
    cat: 'prop',
    kind: 'sprite',
    rows: [
      '.....XXX.....',
      '.....XXX.....',
      '....XXXXX....',
      'H...X...X...H',
      '...XX...XX...',
      '..X.......X..',
      '.X.........X.',
      'X...........X',
      'XHHHHHHHHHHHX',
      'XHH.HHHHHHHHX',
      'XHHHHHHHH.HHX',
      '.XHHHHHHHHHX.',
      '..XXXXXXXXX..',
    ],
  },
]
