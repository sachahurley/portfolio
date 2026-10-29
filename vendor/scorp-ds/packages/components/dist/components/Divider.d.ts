/**
 * DIVIDER COMPONENT
 *
 * Reusable divider/separator component for visual separation
 * Built entirely from design tokens defined in tokens.json
 *
 * FORMS:
 * - orientation="horizontal": full-width rule (default)
 * - orientation="vertical": full-height rule
 * - label: a horizontal rule with a centred label; each side is a hairline that
 *   fills the width beside the label, and a long label truncates
 *
 * SPACING: vertical margins (`my-*`) on every horizontal form, labelled or
 * not; side margins (`mx-*`) on the vertical rule.
 */
import { type ReactNode } from "react";
import type { ControlSize } from "../lib/size";
export interface DividerProps {
    /** `horizontal` (default) for a full-width rule between stacked blocks; `vertical` for a full-height rule between items in a row (the parent needs a height). */
    orientation?: "horizontal" | "vertical";
    /** Centred label on a horizontal rule ("or", a section name), drawn between two hairline runs that fill the width beside it. Passing it gives the labelled form; a string label is also the separator's accessible name. Keep it short: a label wider than the row truncates with an ellipsis. Ignored when `orientation` is `vertical`. */
    label?: ReactNode;
    /** Margin around the rule: none, sm 4px, md 16px (default), lg 32px. Above and below a horizontal rule (labelled or not), either side of a vertical one. */
    spacing?: "none" | ControlSize;
    /** Extra classes on the rule (width, colour override, alignment). They win over the defaults, so `w-64` replaces the default `w-full`. */
    className?: string;
}
/**
 * A rule that separates groups of content, horizontal or vertical, optionally with a centred text label.
 *
 * ```tsx
 * <Divider />
 * <Divider label="or" />
 * <Divider orientation="vertical" spacing="none" className="self-stretch" />
 * ```
 */
export declare function Divider({ orientation, label, spacing, className, }: DividerProps): import("react").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map