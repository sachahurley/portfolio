/**
 * Level math + the shared progress copy string.
 *
 * Levels at cumulative XP thresholds (the RPG structure doc's economy:
 * a visitor who genuinely reads 2-3 case studies reaches Level 2; Level 4
 * is for completionists). cur/need are within-band so the numbers always
 * match the progress bar fill. Lives in lib (not the provider file) so it
 * can be imported anywhere without dragging in React context.
 */

// Cumulative XP thresholds for levels 2..4 (display level = bands crossed + 1).
export const LEVELS = [100, 250, 500]

// Display-level titles, index = display level - 1.
export const LEVEL_TITLES = ['Traveller', 'Apprentice', 'Journeyfolk', 'Archmage']

export function levelInfo(xp: number) {
  const level = LEVELS.filter((t) => xp >= t).length // 0..3 thresholds crossed
  const prev = level === 0 ? 0 : LEVELS[level - 1]
  const next = level < LEVELS.length ? LEVELS[level] : null
  return {
    level,
    title: LEVEL_TITLES[level] ?? LEVEL_TITLES[LEVEL_TITLES.length - 1],
    cur: xp - prev, // XP within the current band (matches the bar fill)
    need: next != null ? next - prev : null,
    pct: next != null ? Math.round(((xp - prev) / (next - prev)) * 100) : 100,
  }
}

export type LevelInfo = ReturnType<typeof levelInfo>

/**
 * The single shared progress string - used verbatim by the character panel,
 * the home status row, and the bottom-sheet footer so they can never drift.
 */
export function levelLabel(info: LevelInfo): string {
  return info.need != null
    ? `Level ${info.level + 1} · ${info.title} · ${info.cur}/${info.need} XP`
    : `Level ${info.level + 1} · ${info.title} · MAX`
}
