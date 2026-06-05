/**
 * CHECKBOX COMPONENT
 *
 * Reusable checkbox component with multiple sizes
 * Built entirely from design tokens defined in tokens.json
 *
 * SIZES: Proportional to button/input height system
 * - small: 16px × 16px
 * - medium: 20px × 20px (default)
 * - large: 24px × 24px
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
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: "small" | "medium" | "large";
    label?: string | ReactNode;
    error?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}
/**
 * Checkbox Component
 *
 * @param size - Checkbox size (default: "medium")
 * @param label - Optional label text displayed next to checkbox
 * @param error - Whether checkbox has a validation error
 * @param disabled - Whether checkbox is disabled
 * @param checked - Whether checkbox is checked
 * @param onCheckedChange - Callback when checkbox state changes (alternative to onChange)
 */
export declare const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Checkbox.d.ts.map