/**
 * LIST ROW COMPONENT
 *
 * The portfolio's plate row, promoted into the DS: the list/navigation tier
 * of the container system. A row is clipped to the small plate; the clip is
 * invisible until hover fills it (surface.muted), so resting lists stay
 * quiet. Interactive rows carry the accent on their title.
 *
 * Don't use this for: framed content panels (use Card) or tabular data
 * (use Table). Rows are for scannable lists and navigation.
 *
 * TOKENS USED:
 * - plate.round (silhouette), surface.muted (hover fill)
 * - accent (interactive title), text.primary; meta/description use the
 *   secondary scale in AA-passing theme pairs (700/600 and 800/500)
 * - duration.fast (hover), focus inset ring (clip swallows outside outlines)
 */
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
type CommonProps = {
    /** Small line above the title (date, category). Rendered in text.tertiary. */
    meta?: ReactNode;
    /** Row title. Interactive rows (href/onClick) render it in the accent color. */
    title: ReactNode;
    /** Supporting line below the title. */
    description?: ReactNode;
    /** Trailing affordance next to the title (e.g. an external-link glyph). */
    titleSuffix?: ReactNode;
    className?: string;
};
export type ListRowProps = CommonProps & (({
    href: string;
    onClick?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "title">) | ({
    href?: never;
    onClick: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "className" | "title">) | {
    href?: never;
    onClick?: never;
});
/**
 * ListRow Component
 *
 * Renders an `<a>` when `href` is set, a `<button>` when `onClick` is set,
 * and a plain `<div>` for display-only rows.
 *
 * @param meta - Small tertiary line above the title (date, category)
 * @param title - Row title; accent-colored when the row is interactive
 * @param description - Supporting copy under the title
 * @param titleSuffix - Trailing glyph beside the title (external-link arrows etc.)
 */
export declare const ListRow: import("react").ForwardRefExoticComponent<ListRowProps & import("react").RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=ListRow.d.ts.map