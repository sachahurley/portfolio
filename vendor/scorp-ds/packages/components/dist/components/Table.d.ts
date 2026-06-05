/**
 * TABLE — semantic data grid primitives with token-backed chrome.
 * Compose `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, and `TableCell`.
 */
import { type HTMLAttributes, type TdHTMLAttributes, type ThHTMLAttributes, type TableHTMLAttributes } from "react";
export type TableProps = TableHTMLAttributes<HTMLTableElement> & {
    /** Zebra striping for body rows (even rows use `surface-subtle`). */
    striped?: boolean;
    /** Full outer border around the table. */
    bordered?: boolean;
};
/**
 * Root `<table>`. Wrap in a scroll container in product code when needed (`overflow-x-auto`).
 */
export declare const Table: import("react").ForwardRefExoticComponent<TableHTMLAttributes<HTMLTableElement> & {
    /** Zebra striping for body rows (even rows use `surface-subtle`). */
    striped?: boolean;
    /** Full outer border around the table. */
    bordered?: boolean;
} & import("react").RefAttributes<HTMLTableElement>>;
export type TableHeaderProps = HTMLAttributes<HTMLTableSectionElement>;
/**
 * `<thead>` — sticky header styling is left to the product (optional `className`).
 */
export declare const TableHeader: import("react").ForwardRefExoticComponent<TableHeaderProps & import("react").RefAttributes<HTMLTableSectionElement>>;
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
/** `<tbody>` */
export declare const TableBody: import("react").ForwardRefExoticComponent<TableBodyProps & import("react").RefAttributes<HTMLTableSectionElement>>;
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