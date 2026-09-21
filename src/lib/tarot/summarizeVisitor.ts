/**
 * Distill the XP save into the compact, site-generated visitor summary the
 * reading prompt uses. Pure function over values already in the XP context;
 * nothing new is tracked or persisted, and nothing user-entered goes in
 * (the character name deliberately stays local).
 */

import {
  AWARDS_MAX,
  AWARD_KEY_MAX,
  GEMS_MAX,
  GEM_MAX,
  VISITED_MAX,
  XP_MAX,
  type TimeOfDay,
  type VisitorSummary,
} from './contract'
import { levelInfo } from '../levels'
import { resolveItem, STAT_IDS, type SavedItem, type Slot } from '../../game/loot'

function timeOfDay(now = new Date()): TimeOfDay {
  const h = now.getHours()
  if (h < 6) return 'night'
  if (h < 12) return 'morning'
  if (h < 18) return 'afternoon'
  if (h < 22) return 'evening'
  return 'night'
}

export function summarizeVisitor(state: {
  xp: number
  earned: string[]
  gems: string[]
  items: SavedItem[]
  equipment: Partial<Record<Slot, number>>
  isReturning: boolean
}): VisitorSummary {
  const awards = state.earned
    .slice(-AWARDS_MAX)
    .map((k) => k.slice(0, AWARD_KEY_MAX))
  // Clamped to the contract's caps (like awards above) so a long-lived
  // save can never outgrow the server's validation.
  const visited = state.earned
    .filter((k) => k.startsWith('visit:'))
    .map((k) => k.slice('visit:'.length, 'visit:'.length + AWARD_KEY_MAX))
    .slice(-VISITED_MAX)

  const byId = new Map(state.items.map((i) => [i.id, i]))
  const gear = Object.entries(state.equipment).flatMap(([slot, id]) => {
    const saved = id != null ? byId.get(id) : undefined
    if (!saved) return []
    const item = resolveItem(saved)
    const topStat = [...STAT_IDS].sort((a, b) => (item.stats[b] ?? 0) - (item.stats[a] ?? 0))[0]
    return [{ slot, name: item.name, topStat }]
  })

  return {
    returning: state.isReturning,
    levelTitle: levelInfo(state.xp).title,
    xp: Math.min(Math.max(0, Math.floor(state.xp)), XP_MAX),
    gems: state.gems.slice(0, GEMS_MAX).map((g) => g.slice(0, GEM_MAX)),
    awards,
    gear,
    timeOfDay: timeOfDay(),
    visited,
  }
}
