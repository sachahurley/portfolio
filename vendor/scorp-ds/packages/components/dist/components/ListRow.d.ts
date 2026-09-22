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
 * - plate.round (silhouette), surface.muted (hover fill; `selected` holds it)
 * - accent (interactive title), text.primary; meta/description use the
 *   secondary scale in AA-passing theme pairs (700/600 and 800/500)
 * - duration.fast (hover), focus inset ring (clip swallows outside outlines)
 */
import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ElementType, type HTMLAttributes, type ReactNode } from "react";
type CommonProps = {
    /**
     * Small line above the title (date, category). Rendered one step darker
     * than text.tertiary (`secondary-700` in light, `secondary-600` in dark),
     * so it clears AA (6.13:1 / 5.34:1) at 14px; text.tertiary is 3.31:1 and
     * only safe for large or decorative text.
     */
    meta?: ReactNode;
    /**
     * Row title. Interactive rows (href/onClick) render it in the accent color.
     * Titles are single-line: anything longer than the row ellipsizes.
     */
    title: ReactNode;
    /** Supporting line below the title. */
    description?: ReactNode;
    /** Trailing affordance next to the title (e.g. an external-link glyph). */
    titleSuffix?: ReactNode;
    /**
     * Thumbnail slot beside the text (a sized <img> or framed node; the row
     * reserves the slot with flex-shrink: 0 and never scales it).
     */
    thumb?: ReactNode;
    /** Which side the thumbnail sits on (default "start"). */
    thumbPosition?: "start" | "end";
    /**
     * Marks the row as the current selection (the active nav route, the
     * chosen item): the row holds the hover state — surface.muted fill,
     * accent title — per the SideNavigation pattern (fill + color, never
     * color alone, never weight). Nav consumers should also pass
     * `aria-current="page"` so the state is announced.
     */
    selected?: boolean;
    className?: string;
};
export type ListRowProps = CommonProps & (({
    href: string;
    onClick?: never;
    as?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "title">) | ({
    href?: never;
    onClick: () => void;
    as?: never;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "className" | "title">)
/**
 * Custom link component (e.g. a router <Link>): the row renders it with
 * interactive styling and spreads `asProps` onto it (`to`, `state`,
 * ...), so client-side navigation works without a full page load.
 */
 | ({
    as: ElementType;
    asProps?: Record<string, unknown>;
    href?: never;
    onClick?: never;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "title">) | ({
    href?: never;
    onClick?: never;
    as?: never;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "title">));
/**
 * ListRow Component
 *
 * Renders an `<a>` when `href` is set, a `<button>` when `onClick` is set,
 * and a plain `<div>` for display-only rows.
 *
 * Extra native attributes (`aria-*`, `id`, `data-*`) are forwarded in every
 * form, including display rows and the `as` form.
 *
 * @param meta - Small line above the title (date, category), in the AA-passing
 *               secondary pair (700 light / 600 dark), not text.tertiary
 * @param title - Row title; accent-colored when the row is interactive, and
 *                truncated with an ellipsis when it outgrows the row
 * @param description - Supporting copy under the title
 * @param titleSuffix - Trailing glyph beside the title (external-link arrows etc.)
 */
export declare const ListRow: import("react").ForwardRefExoticComponent<ListRowProps & import("react").RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=ListRow.d.ts.map