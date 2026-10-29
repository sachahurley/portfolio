/**
 * TABLE — semantic data grid primitives with token-backed chrome.
 * Compose `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell`.
 *
 * STATES: `TableBody` owns the loading and empty states, because the body is
 * the part that changes. `loading` swaps the rows for Skeleton rows (one
 * placeholder per column) and marks the whole `<table>` `aria-busy`;
 * `emptyState` renders in one full-width cell when the body has no rows. Both
 * span the header's column count, read from the rendered `<thead>` unless
 * `colSpan` says otherwise.
 *
 * TOKENS: rules are drawn at `--border-width-hairline` (1px), the system's
 * only rule weight, replacing the ad hoc 0.5px rules that browsers snapped
 * unevenly. Column headers are `font-bold` (`--font-weight-bold`, 700);
 * the weight scale is 400 / 500 / 700, so `font-semibold` (600) was off-token.
 */
import { type HTMLAttributes, type ReactNode, type TdHTMLAttributes, type ThHTMLAttributes, type TableHTMLAttributes } from "react";
/** Row padding density. `compact` is the default data-grid rhythm; the other
 *  two step up the cell padding on the 4px grid for lower-density reading. */
export type TableDensity = "compact" | "comfortable" | "spacious";
export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
    /** Zebra striping for body rows (even rows use `surface-subtle`). */
    striped?: boolean;
    /** Full outer border around the table. */
    bordered?: boolean;
    /** Row padding rhythm (default `compact`); cells read it via context. */
    density?: TableDensity;
};
/**
 * Root `<table>`. Wrap in a scroll container in product code when needed (`overflow-x-auto`).
 * `bordered` frames the table on the large plate via the ring recipe (outer layer =
 * stroke clipped to the plate, inner layer = fill clipped 1px inset) — clip-path
 * slices real borders, so a border property cannot draw the frame.
 */
export declare const Table: import("react").ForwardRefExoticComponent<TableHTMLAttributes<HTMLTableElement> & {
    /** Zebra striping for body rows (even rows use `surface-subtle`). */
    striped?: boolean;
    /** Full outer border around the table. */
    bordered?: boolean;
    /** Row padding rhythm (default `compact`); cells read it via context. */
    density?: TableDensity;
} & import("react").RefAttributes<HTMLTableElement>>;
export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
/**
 * `<thead>` — sticky header styling is left to the product (optional `className`).
 */
export declare const TableHeader: import("react").ForwardRefExoticComponent<TableHeaderProps & import("react").RefAttributes<HTMLTableSectionElement>>;
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement> & {
    /** Show placeholder rows instead of the children while the data loads. Sets
     *  `aria-busy` on the parent `Table`; keep it on until the real rows render. */
    loading?: boolean;
    /** How many Skeleton rows `loading` shows (default 3). Match the page size you
     *  expect so the table does not jump when the rows arrive. */
    loadingRows?: number;
    /** What to show when the body has no rows: a sentence, or an `EmptyState
     *  size="sm"`. Rendered in one cell spanning every column. Ignored while `loading`. */
    emptyState?: ReactNode;
    /** Columns the loading and empty rows span. Leave it unset to use the
     *  `TableHeader` column count; set it when the table has no header row. */
    colSpan?: number;
};
/**
 * `<tbody>`. Pass `loading` while the data is on its way and `emptyState` for
 * the no-rows case; otherwise it renders its children unchanged.
 *
 * @example
 * <TableBody loading={isLoading} emptyState={<EmptyState size="sm" title="No builds yet" />}>
 *   {builds.map((b) => <TableRow key={b.id}>...</TableRow>)}
 * </TableBody>
 */
export declare const TableBody: import("react").ForwardRefExoticComponent<HTMLAttributes<HTMLTableSectionElement> & {
    /** Show placeholder rows instead of the children while the data loads. Sets
     *  `aria-busy` on the parent `Table`; keep it on until the real rows render. */
    loading?: boolean;
    /** How many Skeleton rows `loading` shows (default 3). Match the page size you
     *  expect so the table does not jump when the rows arrive. */
    loadingRows?: number;
    /** What to show when the body has no rows: a sentence, or an `EmptyState
     *  size="sm"`. Rendered in one cell spanning every column. Ignored while `loading`. */
    emptyState?: ReactNode;
    /** Columns the loading and empty rows span. Leave it unset to use the
     *  `TableHeader` column count; set it when the table has no header row. */
    colSpan?: number;
} & import("react").RefAttributes<HTMLTableSectionElement>>;
export type TableFooterProps = HTMLAttributes<HTMLTableSectionElement>;
/** `<tfoot>` — often used for summary rows */
export declare const TableFooter: import("react").ForwardRefExoticComponent<TableFooterProps & import("react").RefAttributes<HTMLTableSectionElement>>;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
/** `<tr>` */
export declare const TableRow: import("react").ForwardRefExoticComponent<TableRowProps & import("react").RefAttributes<HTMLTableRowElement>>;
export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>;
/** `<th>` — defaults `scope="col"` for column headers */
export declare const TableHead: import("react").ForwardRefExoticComponent<TableHeadProps & import("react").RefAttributes<HTMLTableCellElement>>;
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;
/** `<td>` */
export declare const TableCell: import("react").ForwardRefExoticComponent<TableCellProps & import("react").RefAttributes<HTMLTableCellElement>>;
//# sourceMappingURL=Table.d.ts.map