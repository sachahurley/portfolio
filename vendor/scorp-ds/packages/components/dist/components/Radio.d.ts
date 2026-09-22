/**
 * RADIO COMPONENT
 *
 * Reusable radio button component with multiple sizes
 * Built entirely from design tokens defined in tokens.json
 *
 * SIZES: Proportional to button/input height system
 * - sm: 16px × 16px
 * - md: 20px × 20px (default)
 * - lg: 24px × 24px
 * SHAPE: the stepped plate silhouette (--plate-round), same as Checkbox;
 * checked shows a square dot where Checkbox shows a check.
 * Every size gets an invisible 44×44px hit area centered on the box (a
 * pseudo-element, so layout is unchanged) to meet the touch-target rule.
 *
 * STATES:
 * - unchecked: Default state with border
 * - checked: Filled with primary color, inner square dot
 * - disabled: Reduced opacity, not interactive
 * - error: Red border to indicate validation issues
 *
 * Features:
 * - Accessible (ARIA attributes, keyboard support)
 * - Focus states matching design system
 * - Smooth transitions
 * - Optional label
 * - Optional helperText / errorMessage under the label, wired through
 *   `aria-describedby` by the shared field helper (same as Checkbox)
 * - Works with radio groups (use same name prop)
 */
import { type InputHTMLAttributes, type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Box size: sm 16px, md 20px (default), lg 24px. The tap target is 44×44px at every size. */
    size?: ControlSizeProp;
    /** Visible label next to the box; clicking it selects the radio. Without one, pass `aria-label`. */
    label?: string | ReactNode;
    /** Error styling without a message. Prefer `errorMessage` so users learn what to fix. */
    error?: boolean;
    /** Secondary line under the label (explains what picking this option means). */
    helperText?: ReactNode;
    /** Validation message under the label. Sets the error state and replaces `helperText`. */
    errorMessage?: ReactNode;
    /**
     * Called with this radio's checked state after a change (alternative to
     * `onChange`). A radio only fires when it becomes selected, so the value is
     * `true`; losing selection to a sibling fires nothing, as with a native radio.
     */
    onCheckedChange?: (checked: boolean) => void;
}
/**
 * Radio Component
 *
 * @param size - Radio size (default: "md")
 * @param label - Optional label text displayed next to radio
 * @param error - Whether radio has a validation error
 * @param helperText - Secondary line under the label
 * @param errorMessage - Validation message under the label (implies `error`)
 * @param disabled - Whether radio is disabled
 * @param checked - Controlled checked state; omit it to use the native
 *                  uncontrolled behavior (`defaultChecked` + radio-group name)
 * @param name - Name attribute for radio group (required for grouping)
 * @param value - Value attribute for this radio option
 * @param onCheckedChange - Callback when radio state changes (alternative to onChange)
 */
export declare const Radio: import("react").ForwardRefExoticComponent<RadioProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Radio.d.ts.map