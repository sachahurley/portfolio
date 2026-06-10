/**
 * Level math + the shared progress copy string.
 *
 * Three levels at cumulative XP thresholds; cur/need are within-band so the
 * numbers always match the progress bar fill. Lives in lib (not the provider
 * file) so it can be imported anywhere without dragging in React context.
 */

// Cumulative XP thresholds for levels 1..3 (display level = band + 1).
export const LEVELS = [60, 160, 320]

export function levelInfo(xp: number) {
  const level = LEVELS.filter((t) => xp >= t).length // 0..3 thresholds crossed
  const prev = level === 0 ? 0 : LEVELS[level - 1]
  const next = level < LEVELS.length ? LEVELS[level] : null
  return {
    level,
    cur: xp - prev, // XP within the current band (matches the bar fill)
    need: next != null ? next - prev : null,
    pct: next != null ? Math.round(((xp - prev) / (next - prev)) * 100) : 100,
  }
}

export type LevelInfo = ReturnType<typeof levelInfo>

/**
 * The single shared progress string - used verbatim by both the home status
 * row and the bottom-sheet footer so the two can never drift.
 */
export function levelLabel(info: LevelInfo): string {
  return info.need != null
    ? `Level ${info.level + 1} · ${info.cur}/${info.need} XP`
    : `Level ${info.level + 1} · MAX`
}
