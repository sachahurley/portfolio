/**
 * DIVIDER COMPONENT
 *
 * Reusable divider/separator component for visual separation
 * Built entirely from design tokens defined in tokens.json
 *
 * FORMS:
 * - orientation="horizontal": full-width rule (default)
 * - orientation="vertical": full-height rule
 * - label: a horizontal rule with a centred label between box-drawing runs
 *
 * `variant` (horizontal | vertical | withText) and `text` are deprecated
 * aliases for `orientation` and `label` (decision 0024).
 *
 * SPACING: vertical margins (`my-*`) on every horizontal form, labelled or
 * not; side margins (`mx-*`) on the vertical rule.
 */
import { type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
export interface DividerProps {
    /** `horizontal` (default) for a full-width rule between stacked blocks; `vertical` for a full-height rule between items in a row (the parent needs a height). */
    orientation?: "horizontal" | "vertical";
    /** Centred label on a horizontal rule ("or", a section name), drawn between box-drawing runs. Passing it gives the labelled form; a string label is also the separator's accessible name. Ignored when `orientation` is `vertical`. */
    label?: ReactNode;
    /**
     * @deprecated Use `orientation`, and `label` for the labelled form (`withText`).
     * `horizontal` and `vertical` map onto `orientation`; `withText` is a horizontal rule
     * that shows `text`. `orientation` and `label` win when both forms are passed.
     */
    variant?: "horizontal" | "vertical" | "withText";
    /** @deprecated Use `label`. Shown only with `variant="withText"`; `label` wins when both are passed. */
    text?: ReactNode;
    /** Margin around the rule: none, sm 4px, md 16px (default), lg 32px. Above and below a horizontal rule (labelled or not), either side of a vertical one. Legacy names are deprecated aliases. */
    spacing?: "none" | ControlSizeProp;
    /** Extra classes on the rule (width, colour override, alignment). */
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
export declare function Divider({ orientation: orientationProp, label: labelProp, variant, text, spacing: spacingProp, className, }: DividerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map