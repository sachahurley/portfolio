import { type HTMLAttributes, type ReactNode } from "react";
import type { StackGap } from "./Stack";
/** Space between tracks. Same keys as `StackGap`, so grids and stacks share one scale. */
export type GridGap = StackGap;
/** Track counts the grid supports. Counts that do not divide 12 evenly are left out. */
export type GridColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 12;
/** Breakpoint names, matching the breakpoint tokens wired into the Tailwind `screens` scale. */
export type GridBreakpoint = "base" | "sm" | "md" | "lg" | "xl";
/**
 * A fixed track count, or a map from breakpoint to track count. `base` applies
 * below `sm` (640px); `sm` 640px and up, `md` 768px, `lg` 1024px, `xl` 1280px.
 */
export type GridColumns = GridColumnCount | Partial<Record<GridBreakpoint, GridColumnCount>>;
/** Vertical placement of items inside their row. */
export type GridAlign = "start" | "center" | "end" | "stretch";
export interface GridProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Cells to place in the tracks; each child fills one cell in source order. */
    children: ReactNode;
    /**
     * Track count. Pass a number for a fixed grid, or a map such as
     * `{ base: 1, md: 2, lg: 3 }` to change the count at a breakpoint. A map
     * without `base` starts at one column.
     */
    columns?: GridColumns;
    /**
     * Space between all tracks, from the spacing scale: `none` 0, `1` 4px,
     * `2` 8px, `3` 12px, `4` 16px (default), `5` 20px, `6` 24px, `8` 32px.
     */
    gap?: GridGap;
    /** Space between rows when it differs from `gap`, for example a tight grid with airy rows. */
    rowGap?: GridGap;
    /** Space between columns when it differs from `gap`. */
    columnGap?: GridGap;
    /**
     * How cells sit vertically in their row. `stretch` (default) gives every
     * card in a row the height of the tallest one; `start` lets them keep their
     * own height.
     */
    align?: GridAlign;
    /** Extra classes (width, padding, explicit row definitions), merged with `cn()` so they win. */
    className?: string;
}
/**
 * Grid is two-dimensional layout with a token-backed gap and a responsive
 * column count.
 *
 * Use it for card galleries, token swatch walls and any layout where items
 * must line up across rows as well as along them. Grid owns only the tracks
 * and the gaps, never padding or a surface, so wrap it in a Box or a Container
 * when it needs either. For a single row that wraps use Inline; for a single
 * column use Stack.
 *
 * Forwards its ref to the underlying `<div>` and spreads native attributes
 * (`id`, `role`, `aria-*`, `data-*`), so a grid can be a labelled `list` or
 * `region` without a wrapper element.
 */
export declare const Grid: import("react").ForwardRefExoticComponent<GridProps & import("react").RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Grid.d.ts.map