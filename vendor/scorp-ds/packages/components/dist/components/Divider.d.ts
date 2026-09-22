/**
 * DIVIDER COMPONENT
 *
 * Reusable divider/separator component for visual separation
 * Built entirely from design tokens defined in tokens.json
 *
 * VARIANTS:
 * - horizontal: Full-width horizontal divider (default)
 * - vertical: Full-height vertical divider
 * - withText: Horizontal divider with centered text label
 *
 * FEATURES:
 * - Light/dark theme support
 * - Customizable spacing (margin)
 * - Optional text label for horizontal dividers
 */
import { type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
export interface DividerProps {
    variant?: "horizontal" | "vertical" | "withText";
    text?: ReactNode;
    /** Margin around the rule: none, sm 4px, md 16px (default), lg 32px. Legacy names are deprecated aliases. */
    spacing?: "none" | ControlSizeProp;
    className?: string;
}
/**
 * Divider Component
 *
 * @param variant - Divider orientation/style (default: "horizontal")
 * @param text - Optional text label (only used with "withText" variant)
 * @param spacing - Vertical/horizontal spacing around divider (default: "md")
 * @param className - Additional CSS classes
 */
export declare function Divider({ variant, text, spacing: spacingProp, className, }: DividerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map