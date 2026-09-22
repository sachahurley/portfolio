/**
 * CHECKBOX COMPONENT
 *
 * Reusable checkbox component with multiple sizes
 * Built entirely from design tokens defined in tokens.json
 *
 * SIZES: Proportional to button/input height system
 * - sm: 16px × 16px
 * - md: 20px × 20px (default)
 * - lg: 24px × 24px
 * Every size gets an invisible 44×44px hit area centered on the box (a
 * pseudo-element, so layout is unchanged) to meet the touch-target rule.
 *
 * STATES:
 * - unchecked: Default state with border
 * - checked: Filled with primary color, checkmark icon
 * - disabled: Reduced opacity, not interactive
 * - error: Red border to indicate validation issues
 *
 * Features:
 * - Accessible (ARIA attributes, keyboard support)
 * - Focus states matching design system
 * - Smooth transitions
 * - Optional label
 */
import { type InputHTMLAttributes, type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Box size. The tap target is 44×44px at every size. */
    size?: ControlSizeProp;
    /** Visible label; clicking it toggles the box. Without one, pass `aria-label`. */
    label?: string | ReactNode;
    /** Error styling without a message. Prefer `errorMessage` so users learn what to fix. */
    error?: boolean;
    /** Secondary line under the label (explains the consequence of checking). */
    helperText?: ReactNode;
    /** Validation message under the label. Sets the error state and replaces `helperText`. */
    errorMessage?: ReactNode;
    /** Called with the new checked state (alternative to `onChange`). */
    onCheckedChange?: (checked: boolean) => void;
    /**
     * Mixed state, for a parent box whose children are partly checked ("select
     * all" over a half-selected list). Sets the native `indeterminate` property,
     * so assistive tech announces "mixed", and draws a 1-bit bar instead of the
     * check. The prop is the source of truth: a click still fires `onChange` /
     * `onCheckedChange`, and the box stays mixed until you pass `false`
     * (typically after checking or clearing every child).
     */
    indeterminate?: boolean;
}
/**
 * Checkbox Component
 *
 * @param size - Checkbox size (default: "md")
 * @param label - Optional label text displayed next to checkbox
 * @param error - Whether checkbox has a validation error
 * @param helperText - Secondary line under the label
 * @param errorMessage - Validation message under the label (implies `error`)
 * @param disabled - Whether checkbox is disabled
 * @param checked - Controlled checked state; omit it to use the native
 *                  uncontrolled behavior (`defaultChecked`)
 * @param onCheckedChange - Callback when checkbox state changes (alternative to onChange)
 * @param indeterminate - Mixed state (native `indeterminate`), drawn as a bar
 */
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Checkbox.d.ts.map