/**
 * nameArt — the shared "Sacha Hurley" composition builder.
 *
 * Pure functions extracted verbatim from AsciiName so both renderers — the
 * text renderer (components/AsciiName.tsx) and the 8-bit canvas renderer
 * (components/PixelName.tsx) — draw the exact same composition: hand-designed
 * pixel letterforms, sheared italic, carved-stone shading, drip columns, and
 * the checkered stone frame. Cells are CHAR_W x LINE_H em units.
 *
 * Note: the glyph set covers exactly the letters S A C H U R L E Y. To render
 * other text, add 7x8 bitmaps to GLYPHS.
 */

// Fragment Mono's advance is 0.618em (measured); 0.62 adds a hair of slack
// so the widest line never overflows the container and clips the right edge.
export const CHAR_W = 0.62;
export const LINE_H = 1.2;
export const DRIP_RAMP = ["▓", "▒", "▒", "░", "░", "░"];

const GLYPHS: Record<string, string[]> = {
  S: ["..#####", ".##...#", ".##....", "..###..", "....##.", "#...##.", "#..##..", ".###..."],
  A: ["...#...", "..###..", ".##.##.", ".#...#.", ".#####.", "##...##", "#.....#", "#.....#"],
  C: ["..####.", ".##..#.", "##.....", "##.....", "##.....", "##...#.", ".##..#.", "..###.."],
  H: ["##...##", "##...##", "##...##", "#######", "##...##", "##...##", "##...##", "##...##"],
  U: ["##...##", "##...##", "##...##", "##...##", "##...##", "##...##", ".##.##.", "..###.."],
  R: ["######.", "##...##", "##...##", "######.", "##.##..", "##..##.", "##...##", "##...##"],
  L: ["##.....", "##.....", "##.....", "##.....", "##.....", "##.....", "##....#", "#######"],
  E: ["#######", "##.....", "##.....", "#####..", "##.....", "##.....", "##.....", "#######"],
  Y: ["##...##", ".##.##.", "..###..", "..##...", "..##...", "..##...", "..##...", "..##..."],
};

export interface Drip {
  /** column (ch units) and first row (line units) of the drip, frame-relative */
  x: number;
  y: number;
  chars: string[];
  seed: number;
}

interface WordArt {
  lines: string[];
  drips: Drip[];
  cols: number;
}

export interface Composition {
  lines: string[];
  drips: Drip[];
  cols: number;
  rows: number;
}

function wordGrid(word: string, gap = 1): boolean[][] {
  const rows: string[] = Array.from({ length: 8 }, () => "");
  for (const ch of word) {
    const g = GLYPHS[ch];
    if (!g) throw new Error(`nameArt: no glyph for "${ch}"`);
    for (let i = 0; i < 8; i++) rows[i] += g[i] + ".".repeat(gap);
  }
  const big: boolean[][] = [];
  for (const r of rows) {
    const scaled: boolean[] = [];
    for (const c of r) { scaled.push(c === "#", c === "#"); }
    big.push(scaled, [...scaled]);
  }
  return big;
}

function shear(grid: boolean[][]): boolean[][] {
  const H = grid.length;
  const maxShift = (H - 1) >> 1;
  return grid.map((row, y) => {
    const s = (H - 1 - y) >> 1;
    return [
      ...Array.from({ length: s }, () => false),
      ...row,
      ...Array.from({ length: maxShift - s }, () => false),
    ];
  });
}

function carve(grid: boolean[][], dripTable: number[]): WordArt {
  const H = grid.length;
  const W = Math.max(...grid.map((r) => r.length));
  const filled = (x: number, y: number) =>
    y >= 0 && y < H && x >= 0 && x < W && !!grid[y][x];

  const out: string[][] = Array.from({ length: H }, () => Array(W).fill(" "));
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (!filled(x, y)) continue;
      const interior =
        filled(x + 1, y) && filled(x - 1, y) && filled(x, y + 1) && filled(x, y - 1);
      const h = (x * 7349 + y * 1543) % 23;
      if (interior) out[y][x] = h <= 1 ? "░" : "▒";
      else out[y][x] = h === 2 || h === 3 ? "▓" : "█";
    }
  }

  const drips: Drip[] = [];
  for (let x = 0; x < W; x++) {
    let b = -1;
    for (let y = 0; y < H; y++) if (filled(x, y)) b = y;
    if (b < H - 5) continue; // baseline region only, not crossbars
    const seed = (x * 2654435761) % dripTable.length;
    const len = dripTable[seed];
    if (len <= 0) continue;
    drips.push({
      x,
      y: b + 1,
      chars: Array.from({ length: len }, (_, i) => DRIP_RAMP[Math.min(i, DRIP_RAMP.length - 1)]),
      seed,
    });
  }
  return { lines: out.map((r) => r.join("")), drips, cols: W };
}

/** Per-word drip profiles (HURLEY bleeds harder, as commissioned). */
const WORDS: { text: string; dripTable: number[]; dripMax: number }[] = [
  { text: "SACHA", dripTable: [0, 1, 2, 2, 3, 4, 5], dripMax: 5 },
  { text: "HURLEY", dripTable: [1, 2, 2, 3, 4, 4, 5, 6], dripMax: 6 },
];

export function buildArt(): Composition {
  const arts = WORDS.map((w) => ({
    art: carve(shear(wordGrid(w.text)), w.dripTable),
    dripMax: w.dripMax,
  }));
  const cols = Math.max(...arts.map((a) => a.art.cols));
  const lines: string[] = [];
  const drips: Drip[] = [];
  arts.forEach(({ art, dripMax }, i) => {
    const off = (cols - art.cols) >> 1;
    const pad = " ".repeat(off);
    const yBase = lines.length;
    for (const l of art.lines) lines.push((pad + l).padEnd(cols, " "));
    for (let d = 0; d < dripMax; d++) lines.push(" ".repeat(cols)); // reserve drip space
    for (const dr of art.drips) drips.push({ ...dr, x: dr.x + off, y: dr.y + yBase });
    if (i < arts.length - 1) lines.push(" ".repeat(cols)); // gap between words
  });
  return { lines, drips, cols, rows: lines.length };
}

/** Frame texture: only the two DENSE shades, checkered in both directions.
 *  ░ is reserved for the drips — in the frame its faint cells punch visual
 *  holes, which made the side bands read thinner than the top/bottom. */
const T_TOP = "▓▒";
const T_BOT = "▒▓";
const cyc = (pat: string, n: number) => pat.repeat(Math.ceil(n / pat.length)).slice(0, n);

/** Side borders continue the checker vertically, both columns always dense,
 *  so all four edges read as the same chunky band (2ch ≈ 1 line ≈ 1.2em). */
const sideL = (y: number) => (y % 2 === 0 ? "▓▒" : "▒▓");
const sideR = (y: number) => (y % 2 === 0 ? "▒▓" : "▓▒");

/** Center the art inside a frame of targetCols x targetRows (borders included). */
export function frameTo(art: Composition, targetCols: number, targetRows: number): Composition {
  const innerC = Math.max(targetCols - 4, art.cols);
  const innerR = Math.max(targetRows - 2, art.rows);
  const offX = (innerC - art.cols) >> 1;
  const offY = (innerR - art.rows) >> 1;
  const lines: string[] = [cyc(T_TOP, innerC + 4)];
  for (let y = 0; y < innerR; y++) {
    const src = y - offY;
    const row =
      src >= 0 && src < art.rows
        ? (" ".repeat(offX) + art.lines[src]).padEnd(innerC, " ").slice(0, innerC)
        : " ".repeat(innerC);
    lines.push(sideL(y + 1) + row + sideR(y + 1));
  }
  lines.push(cyc(T_BOT, innerC + 4));
  return {
    lines,
    drips: art.drips.map((d) => ({ ...d, x: d.x + offX + 2, y: d.y + offY + 1 })),
    cols: innerC + 4,
    rows: innerR + 2,
  };
}

export function mergeDrips(lines: string[], drips: Drip[]): string[] {
  const grid = lines.map((l) => l.split(""));
  for (const d of drips)
    d.chars.forEach((c, i) => {
      const y = d.y + i;
      if (grid[y] && grid[y][d.x] === " ") grid[y][d.x] = c;
    });
  return grid.map((r) => r.join(""));
}
