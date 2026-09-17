/**
 * ItemPlate — loot shown on the same cell the character screen uses.
 *
 * The paperdoll and the pack both draw an item as the li.sel ring trick: a
 * wrapper clipped to the notched square and filled with the rarity colour,
 * 1px of padding, and the plate clipped to the same polygon inside, so a
 * uniform ring of tier colour shows through.
 *
 * The dialogs (chest reveal, item card) render this instead of a bare
 * sprite, so an item is the same size and wears the same border there as it
 * does on the screen behind them.
 */

import PixelItem from './PixelItem'
import type { Item } from '../../game/loot'

export default function ItemPlate({ item }: { item: Item }) {
  return (
    <span className={`ch-plate bg-rar-${item.rarity}`}>
      <span className="ch-plate-in">
        <PixelItem kind={item.slot} base={item.base} rarity={item.rarity} cell={4} />
      </span>
    </span>
  )
}
