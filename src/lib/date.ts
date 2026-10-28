/** Format an ISO date (e.g. "2026-02-14") as "Feb 14, 2026".
 *  Parsed as a local calendar date: `new Date("2026-02-14")` is midnight UTC,
 *  which every time zone west of Greenwich shows as the day before. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
