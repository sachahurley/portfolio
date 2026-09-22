/**
 * TOOLTIP COMPONENT
 *
 * Reusable tooltip component for helpful hints and descriptions
 * Built entirely from design tokens defined in tokens.json
 *
 * POSITIONS:
 * - top: Above the trigger element (default)
 * - bottom: Below the trigger element
 * - left: To the left of the trigger element
 * - right: To the right of the trigger element
 *
 * FEATURES:
 * - Arrow/pointer indicator
 * - Auto-positioning (adjusts if near viewport edge)
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
    /** Side of the trigger the tooltip sits on (default: "top"). */
    position?: "top" | "bottom" | "left" | "right";
    /** Milliseconds before showing on hover or focus (default: 200). */
    delay?: number;
    /** Max width of the balloon, any CSS length (default: "200px"). */
    maxWidth?: string;
    /** Extra classes for the wrapper (e.g. a width class for a full-width trigger). */
    className?: string;
}
/**
 * Tooltip Component
 *
 * @param content - Tooltip text/content to display
 * @param children - Trigger element (wrapped with tooltip)
 * @param position - Tooltip position relative to trigger (default: "top")
 * @param delay - Delay before showing tooltip in ms (default: 200)
 * @param maxWidth - Maximum width of tooltip (default: "200px")
 * @param className - Additional CSS classes for tooltip wrapper
 */
export declare function Tooltip({ content, children, position, delay, maxWidth, className, }: TooltipProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Tooltip.d.ts.map