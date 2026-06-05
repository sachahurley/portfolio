/**
 * RADIO COMPONENT
 *
 * Reusable radio button component with multiple sizes
 * Built entirely from design tokens defined in tokens.json
 *
 * SIZES: Proportional to button/input height system
 * - small: 16px × 16px
 * - medium: 20px × 20px (default)
 * - large: 24px × 24px
 *
 * STATES:
 * - unchecked: Default state with border
 * - checked: Filled with primary color, inner dot
 * - disabled: Reduced opacity, not interactive
 * - error: Red border to indicate validation issues
 *
 * Features:
 * - Accessible (ARIA attributes, keyboard support)
 * - Focus states matching design system
 * - Smooth transitions
 * - Optional label
 * - Works with radio groups (use same name prop)
 */
import { type InputHTMLAttributes, type ReactNode } from "react";
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: "small" | "medium" | "large";
    label?: string | ReactNode;
    error?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}
/**
 * Radio Component
 *
 * @param size - Radio size (default: "medium")
 * @param label - Optional label text displayed next to radio
 * @param error - Whether radio has a validation error
 * @param disabled - Whether radio is disabled
 * @param checked - Whether radio is checked
 * @param name - Name attribute for radio group (required for grouping)
 * @param value - Value attribute for this radio option
 * @param onCheckedChange - Callback when radio state changes (alternative to onChange)
 */
export declare const Radio: import("react").ForwardRefExoticComponent<RadioProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Radio.d.ts.map