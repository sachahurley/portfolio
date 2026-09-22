/**
 * PAGINATION COMPONENT
 *
 * Page picker for long, paged collections (tables, search results, logs).
 * A `<nav>` landmark with prev/next arrows (1-bit ArrowLeft/ArrowRight),
 * boundary pages, sibling pages around the current one, and an ellipsis
 * wherever a gap is skipped.
 *
 * SIZING: the visible plate follows the Button scale (`h-control-sm|md|lg`,
 * 32 / 40 / 48px) while every button's hit area stays at least
 * `touch.target` (44px). The button element is the full hit area and the
 * plate is an inner span, because the plate clip-path would also clip any
 * enlarged hit area drawn on the button itself.
 *
 * STATES: the current page is the primary plate (fill, not color alone) and
 * carries `aria-current="page"`. Prev/next disable at the ends.
 *
 * TOKENS USED:
 * - button.primary.background / text (current page)
 * - button.ghost.background / background-hover / text (other pages)
 * - control.height.sm/md/lg (plate), touch.target (hit area)
 * - plate.round, focus inset ring, duration.fast
 */
import { type ControlSizeProp } from "../lib/size";
/** A page number, or a skipped gap rendered as an ellipsis. */
export type PaginationRangeItem = number | "ellipsis-start" | "ellipsis-end";
/**
 * Computes the visible page list: `boundaryCount` pages at each end,
 * `siblingCount` pages on each side of `page`, and ellipsis markers for gaps.
 * The list length stays constant while paging so the control never jumps.
 * Exported for custom renderers and tests.
 */
export declare function getPaginationRange(page: number, pageCount: number, siblingCount?: number, boundaryCount?: number): PaginationRangeItem[];
export interface PaginationProps {
    /** Current page, 1-based (controlled). Pair with `onPageChange`. */
    page?: number;
    /** Starting page when uncontrolled (default 1). */
    defaultPage?: number;
    /** Total number of pages. Renders nothing when 0. */
    pageCount: number;
    /** Fires with the requested 1-based page when the user picks a page or steps prev/next. */
    onPageChange?: (page: number) => void;
    /** Pages shown on each side of the current page (default 1). */
    siblingCount?: number;
    /** Pages always shown at the start and end (default 1). */
    boundaryCount?: number;
    /** Plate height from the Button scale: sm 32px, md 40px (default), lg 48px. Hit areas stay 44px or more. */
    size?: ControlSizeProp;
    /** Show the previous/next arrow buttons (default true). */
    showPrevNext?: boolean;
    /** Accessible name of each page button (default "Page 3"). */
    getPageLabel?: (page: number) => string;
    /** Accessible name of the previous button (default "Previous page"). */
    previousLabel?: string;
    /** Accessible name of the next button (default "Next page"). */
    nextLabel?: string;
    /** Accessible name of the nav landmark (default "Pagination"). */
    "aria-label"?: string;
    /** Extra classes for the `<nav>`. */
    className?: string;
}
/**
 * Pagination
 *
 * ```tsx
 * const [page, setPage] = useState(1);
 * <Pagination page={page} pageCount={20} onPageChange={setPage} />
 * ```
 */
export declare function Pagination({ page: pageProp, defaultPage, pageCount, onPageChange, siblingCount, boundaryCount, size: sizeProp, showPrevNext, getPageLabel, previousLabel, nextLabel, "aria-label": ariaLabel, className, }: PaginationProps): import("react/jsx-runtime").JSX.Element | null;
export declare namespace Pagination {
    var displayName: string;
}
//# sourceMappingURL=Pagination.d.ts.map