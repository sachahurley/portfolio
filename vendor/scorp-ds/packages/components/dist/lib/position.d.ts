/**
 * FLOATING POSITION (internal)
 *
 * Pure placement math for anchored floating panels (Popover, Combobox, and
 * any future menu). No runtime dependency: given the anchor's viewport rect
 * and the panel's size, it returns fixed-position coordinates.
 *
 * Steps:
 * 1. Place the panel on the requested `side` of the anchor, `offset` px away,
 *    aligned to the anchor's start, center, or end on the cross axis.
 * 2. FLIP: if the panel overflows the viewport on its main axis and the
 *    opposite side has more room, move it to the opposite side.
 * 3. SHIFT: clamp the cross axis so the panel stays `padding` px inside the
 *    viewport (it slides along the anchor instead of running off screen).
 *
 * The result also reports the space available on the chosen side, so lists
 * can cap their height instead of overflowing.
 *
 * Not exported from the package barrel: this is plumbing, not a component.
 */
export type FloatingSide = "top" | "bottom" | "left" | "right";
export type FloatingAlign = "start" | "center" | "end";
/** The subset of DOMRect the math needs (viewport coordinates). */
export interface AnchorRect {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface ComputePositionOptions {
    /** Anchor rect in viewport coordinates (getBoundingClientRect). */
    anchor: AnchorRect;
    /** Measured panel size. */
    floating: {
        width: number;
        height: number;
    };
    /** Preferred side (default "bottom"). */
    side?: FloatingSide;
    /** Cross-axis alignment (default "start"). */
    align?: FloatingAlign;
    /** Gap between anchor and panel in px (default 8). */
    offset?: number;
    /** Minimum distance kept from the viewport edge in px (default 8). */
    padding?: number;
    /** Viewport size; defaults to window.innerWidth / innerHeight. */
    viewport?: {
        width: number;
        height: number;
    };
    /** Disable the flip step (default true = flip allowed). */
    flip?: boolean;
}
export interface FloatingPosition {
    /** Fixed-position top in px. */
    top: number;
    /** Fixed-position left in px. */
    left: number;
    /** Side actually used after flipping. */
    side: FloatingSide;
    /** Alignment requested (shifting may nudge the panel off it). */
    align: FloatingAlign;
    /** Room on the chosen side's main axis, minus offset and padding. */
    available: number;
}
/**
 * Computes fixed-position coordinates for a floating panel next to an anchor,
 * flipping to the opposite side and shifting along the cross axis so the panel
 * stays inside the viewport.
 */
export declare function computePosition({ anchor, floating, side: preferred, align, offset, padding, viewport, flip, }: ComputePositionOptions): FloatingPosition;
//# sourceMappingURL=position.d.ts.map