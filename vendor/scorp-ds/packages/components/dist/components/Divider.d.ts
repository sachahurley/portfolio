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
    /** `horizontal` (default) for a full-width rule between stacked blocks, `vertical` for a full-height rule between items in a row (the parent needs a height), `withText` for a horizontal rule with a centred label. */
    variant?: "horizontal" | "vertical" | "withText";
    /** Label shown in the middle of a `withText` divider ("or", a section name); a string label is also its accessible name. Ignored by the other variants, and `withText` without it renders a plain rule. */
    text?: ReactNode;
    /** Margin around the rule: none, sm 4px, md 16px (default), lg 32px. Legacy names are deprecated aliases. */
    spacing?: "none" | ControlSizeProp;
    /** Extra classes on the rule (width, colour override, alignment). */
    className?: string;
}
/**
 * A rule that separates groups of content, horizontal or vertical, optionally with a centred text label.
 */
export declare function Divider({ variant, text, spacing: spacingProp, className, }: DividerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map