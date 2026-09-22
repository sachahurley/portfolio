import { type HTMLAttributes, type ReactNode } from "react";
/** Elements a VisuallyHidden may render as, covering inline, block and label content. */
export type VisuallyHiddenElement = "span" | "div" | "p" | "label" | "legend" | "li";
export interface VisuallyHiddenProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    /** Text or markup to announce. It stays in the accessibility tree, so keep it short and literal. */
    children: ReactNode;
    /**
     * Whether the content shows itself once anything inside it takes focus.
     * Turn it on for a skip link, which must be invisible until a keyboard user
     * tabs to it; the revealed element is statically positioned, so give it its
     * own placement classes through `className`.
     */
    focusable?: boolean;
    /**
     * Element to render, when the hidden text is a `label` for a control or a
     * `li` inside a list rather than a generic `span`.
     */
    as?: VisuallyHiddenElement;
    /** Extra classes (placement for the focusable variant), merged with `cn()` so they win. */
    className?: string;
}
/**
 * VisuallyHidden is content that screen readers announce but nobody sees.
 *
 * Use it for a label a sighted user gets from an icon or from position: the
 * word "Close" in an icon button, a table caption, or the "Skip to content"
 * link at the top of a page. It applies the clip-rect recipe (`sr-only`:
 * 1px box, clipped, still rendered), never `display: none` or
 * `visibility: hidden`, which would take the text out of the accessibility
 * tree along with the pixels. If the text should be hidden from everyone, use
 * `aria-hidden` or do not render it.
 *
 * Forwards its ref to the underlying element and spreads native attributes
 * (`id`, `htmlFor` via `label`, `data-*`), so the hidden text can be
 * referenced by `aria-labelledby` or `aria-describedby`.
 */
export declare const VisuallyHidden: import("react").ForwardRefExoticComponent<VisuallyHiddenProps & import("react").RefAttributes<HTMLElement>>;
//# sourceMappingURL=VisuallyHidden.d.ts.map