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
 * - Accessible (ARIA attributes)
 */
import { type ReactNode } from "react";
export interface TooltipProps {
    content: ReactNode;
    children: ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    delay?: number;
    maxWidth?: string;
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