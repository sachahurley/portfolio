/**
 * TOOLTIP COMPONENT
 *
 * Reusable tooltip component for helpful hints and descriptions
 * Built entirely from design tokens defined in tokens.json
 *
 * PLACEMENT (`side` + `align`, decision 0024):
 * - side top: Above the trigger element (default)
 * - side bottom: Below the trigger element
 * - side left: To the left of the trigger element
 * - side right: To the right of the trigger element
 * - align center (default) centers the balloon on the trigger; start / end
 *   line its leading / trailing edge up with the trigger's. The caret always
 *   points at the trigger's center.
 *
 * FEATURES:
 * - Arrow/pointer indicator
 * - Viewport-aware: measured after it opens; if the chosen side would
 *   overflow the viewport it flips to the opposite side (when that side has
 *   room), and top/bottom tooltips slide horizontally to stay on screen
 *   while the caret keeps pointing at the trigger
 * - Delay for show/hide (prevents accidental triggers)
 * - Max width constraint
 * - Full light/dark theme support
 *
 * ACCESSIBILITY (WCAG 2.1.1, 1.4.13):
 * - Opens on keyboard focus as well as hover; closes on blur.
 * - Escape dismisses it without moving focus or the pointer.
 * - Hoverable: the pointer can travel from the trigger onto the tooltip (a
 *   transparent bridge spans the gap) without it closing.
 * - The trigger is described by the tooltip via `aria-describedby`. That
 *   wiring needs a single element child (a Button, a link); the tooltip
 *   still opens for other children but can't describe them.
 * - Content is for supplementary hints only: never put the only copy of
 *   essential information, or anything interactive, in a tooltip.
 */
import { type ReactNode } from "react";
export interface TooltipProps {
    /** Short supplementary hint. Plain text; no links or buttons. */
    content: ReactNode;
    /** The trigger. Pass one focusable element so keyboard users can open the tooltip and hear it. */
    children: ReactNode;
    /**
     * Preferred side of the trigger (default "top"). It flips to the opposite
     * side when this one would overflow the viewport.
     */
    side?: "top" | "right" | "bottom" | "left";
    /**
     * Where the balloon sits along the trigger edge (default "center"). `start`
     * and `end` line its leading or trailing edge up with the trigger's, for a
     * trigger at the edge of a row; the caret still points at the trigger.
     */
    align?: "start" | "center" | "end";
    /** @deprecated Use `side`. Still honoured when `side` is not passed. */
    position?: "top" | "bottom" | "left" | "right";
    /** Delay in milliseconds before showing on hover or focus (default 200). Hiding is immediate. */
    delay?: number;
    /**
     * Max width of the balloon, any CSS length (default "200px"); text wraps
     * inside it. This stays a free CSS length because no token describes a
     * reading width: the spacing scale stops at 96px and the breakpoints are
     * page widths. Widen it for a long hint rather than shortening the copy.
     */
    maxWidth?: string;
    /** Extra classes for the wrapper (e.g. a width class for a full-width trigger). */
    className?: string;
}
/**
 * A short text hint shown while its trigger is hovered or focused; for interactive content use `Popover`.
 *
 * @example
 * <Tooltip content="Copy" side="bottom">
 *   <Button variant="ghost" aria-label="Copy"><TuiIcon name="Copy" /></Button>
 * </Tooltip>
 */
export declare function Tooltip({ content, children, side: sideProp, align, position: legacyPosition, delay, maxWidth, className, }: TooltipProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Tooltip.d.ts.map