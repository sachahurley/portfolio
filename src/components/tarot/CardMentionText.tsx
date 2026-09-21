/**
 * Reader prose with card mentions. The server guarantees every complete
 * `[[card:id]]` token references a real deck card (api/_lib/mentions.ts
 * drops the rest), so rendering is a straight split: mention tokens become
 * accent chips carrying the card's name, everything else is plain text
 * nodes (never HTML; §9.5). Tapping a chip opens the compendium in Phase
 * 4; until then the chip is inert but already reads as the card.
 */

import { CARD_BY_ID } from '../../data/tarot'

const MENTION = /\[\[card:([A-Za-z0-9_/-]{1,48})\]\]/g

export default function CardMentionText({ text }: { text: string }) {
  const parts: React.ReactNode[] = []
  let last = 0
  let key = 0
  for (const match of text.matchAll(MENTION)) {
    const at = match.index ?? 0
    if (at > last) parts.push(text.slice(last, at))
    const card = CARD_BY_ID.get(match[1])
    // Unknown ids should not survive the server filter; render the raw
    // token as text if one somehow does, never a broken chip.
    parts.push(card ? (
      <span key={key++} className="pt-mention">{card.name}</span>
    ) : (
      match[0]
    ))
    last = at + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}
