/**
 * Deck shuffle and draw. Pure random via crypto.getRandomValues, NOT the
 * save-seeded RNG the loot system uses: loot wants determinism per save,
 * a reading wants to differ every time the cards are asked.
 */

import { TAROT_DECK, type SpreadDef, type SpreadPosition, type TarotCard } from '../../data/tarot'

/** Chance a drawn card lands reversed. Below a coin flip on purpose: a
 *  spread that is mostly upright reads as counsel, mostly reversed as doom. */
const REVERSAL_CHANCE = 0.3

export interface DrawnCard {
  card: TarotCard
  position: SpreadPosition
  reversed: boolean
}

/** Uniform float in [0, 1) from the crypto RNG. */
function rand(): number {
  const buf = new Uint32Array(1)
  crypto.getRandomValues(buf)
  return buf[0] / 2 ** 32
}

/** Fisher-Yates over the deck indices; returns the first n cards. */
function drawCards(n: number): TarotCard[] {
  const order = TAROT_DECK.map((_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order.slice(0, n).map((i) => TAROT_DECK[i])
}

export function drawSpread(spread: SpreadDef): DrawnCard[] {
  const cards = drawCards(spread.positions.length)
  return spread.positions.map((position, i) => ({
    card: cards[i],
    position,
    reversed: rand() < REVERSAL_CHANCE,
  }))
}
