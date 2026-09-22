import { type HTMLAttributes, type ReactNode } from "react";
import type { StackGap } from "./Stack";
/**
 * Padding steps Box accepts. Same keys as `StackGap`, so a Box padding and a
 * Stack gap are always drawn from one scale.
 */
export type BoxSpace = StackGap;
/** Semantic surface roles a Box can paint. Raw color scales are deliberately absent. */
export type BoxBackground = "none" | "page" | "container" | "card" | "subtle" | "muted" | "raised" | "inverse";
/** Border treatment. `hairline` draws the plate ring; there is no width or color choice. */
export type BoxBorder = "none" | "hairline";
/** Elements a Box may render as. Interactive tags are excluded on purpose. */
export type BoxElement = "div" | "section" | "article" | "aside" | "header" | "footer" | "main" | "nav" | "figure" | "li" | "span";
export interface BoxProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    /** Content to sit inside the padding and on top of the background. */
    children?: ReactNode;
    /**
     * Padding on all four sides, from the spacing scale: `none` 0, `1` 4px,
     * `2` 8px, `3` 12px, `4` 16px, `5` 20px, `6` 24px, `8` 32px. Omit it for a
     * flush Box.
     */
    padding?: BoxSpace;
    /** Left/right inset when it differs from the vertical one; replaces `padding` on that axis. */
    paddingX?: BoxSpace;
    /** Top/bottom inset when it differs from the horizontal one; replaces `padding` on that axis. */
    paddingY?: BoxSpace;
    /**
     * Semantic surface to paint behind the content. `card` sits on top of
     * `container`, `container` sits on `page`; `inverse` also flips the text
     * color so content stays readable. Omit it to stay transparent.
     */
    background?: BoxBackground;
    /**
     * `hairline` wraps the content in the plate ring (outer stroke layer plus a
     * 1px-inset fill layer) because `clip-path` would slice a real CSS border.
     * A ringed Box with no `background` falls back to the `card` surface, so the
     * ring reads as a stroke and not as a solid plate.
     */
    border?: BoxBorder;
    /**
     * Element to render when the Box is a landmark or a list item rather than a
     * generic grouping (`section`, `nav`, `li`, ...). Defaults to `div`.
     */
    as?: BoxElement;
    /** Extra classes (width, height, position), merged with `cn()` so they beat the generated ones. */
    className?: string;
}
/**
 * Box is the base surface primitive: token-backed padding, a semantic
 * background, and an optional hairline plate ring, on the element of your
 * choice.
 *
 * Reach for Box when a wrapper needs a surface, an inset, or a ring. Keep
 * writing a plain `div` when the wrapper only needs layout classes: Box has no
 * width, display, flex, margin, radius or style API, and never takes arbitrary
 * values. Use Stack, Inline or Grid to arrange children, and Container or
 * Center for page width.
 *
 * Forwards its ref to the outer element and spreads native attributes
 * (`id`, `role`, `aria-*`, `data-*`, handlers).
 */
export declare const Box: import("react").ForwardRefExoticComponent<BoxProps & import("react").RefAttributes<HTMLElement>>;
//# sourceMappingURL=Box.d.ts.map