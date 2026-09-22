/**
 * DESCRIPTION LIST COMPONENT (key / value)
 *
 * Term and definition pairs on a real `<dl>`: metadata panels, config
 * readouts, `neofetch`-style summaries. Each pair is a `<div>` holding one
 * `<dt>` and one `<dd>` (valid HTML grouping inside a `<dl>`).
 *
 * LAYOUTS:
 * - inline (default): term and value on one row, value right-aligned.
 *   `leader` draws a dotted rule between them (the TUI table-of-contents
 *   look). The leader is a pseudo-element on the term, so it adds no nodes
 *   to the list.
 * - stacked: small term above its value, for long values or narrow panes.
 *
 * TOKENS USED:
 * - text.secondary (terms), text.primary (values)
 * - surface.container-stroke (dotted leader, the plate ring color)
 */
import type { ReactNode } from "react";
/** One term / value pair. */
export interface DescriptionListItem {
    /** The key ("Kernel", "Region"). */
    term: ReactNode;
    /** The value. Any inline content: text, a Badge, a Link. */
    description: ReactNode;
    /** Stable React key. Defaults to the index. */
    key?: string;
}
export interface DescriptionListProps {
    /** Pairs to render, in order. */
    items: DescriptionListItem[];
    /** `inline` puts term and value on one row (default); `stacked` puts the term above. */
    layout?: "inline" | "stacked";
    /** Dotted leader between term and value (inline layout only). */
    leader?: boolean;
    /** Extra classes for the `<dl>`. */
    className?: string;
}
/**
 * DescriptionList
 *
 * ```tsx
 * <DescriptionList
 *   leader
 *   items={[
 *     { term: "OS", description: "scorp-os 1.2" },
 *     { term: "Uptime", description: "4 days" },
 *   ]}
 * />
 * ```
 */
export declare function DescriptionList({ items, layout, leader, className }: DescriptionListProps): import("react/jsx-runtime").JSX.Element;
export declare namespace DescriptionList {
    var displayName: string;
}
//# sourceMappingURL=DescriptionList.d.ts.map