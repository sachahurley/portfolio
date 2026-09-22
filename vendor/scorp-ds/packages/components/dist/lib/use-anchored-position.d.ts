/**
 * ANCHORED POSITION HOOK (internal)
 *
 * Wires {@link computePosition} to the DOM: measures the anchor and the
 * floating panel while `open`, and recomputes on scroll (any scroll
 * container, via a capturing listener), window resize, and size changes of
 * either element (ResizeObserver when available).
 *
 * The panel is expected to render with `position: fixed` and apply the
 * returned `top` / `left`. Until the first measurement lands, `position` is
 * null; render the panel hidden (visibility) so it can be measured without
 * flashing at 0,0.
 *
 * Not exported from the package barrel.
 */
import { type RefObject } from "react";
import { type FloatingAlign, type FloatingPosition, type FloatingSide } from "./position";
export interface AnchoredPosition extends FloatingPosition {
    /** Anchor width in px, for panels that match their trigger's width. */
    anchorWidth: number;
}
export declare function useAnchoredPosition({ open, anchorRef, floatingRef, side, align, offset, padding, }: {
    open: boolean;
    anchorRef: RefObject<HTMLElement | null>;
    floatingRef: RefObject<HTMLElement | null>;
    side?: FloatingSide;
    align?: FloatingAlign;
    offset?: number;
    padding?: number;
}): {
    position: AnchoredPosition | null;
    update: () => void;
};
//# sourceMappingURL=use-anchored-position.d.ts.map