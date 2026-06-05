/**
 * SWITCH COMPONENT
 *
 * Reusable toggle switch component with multiple sizes
 * Built using design tokens for consistent styling
 *
 * SIZES: Proportional to button/input height system
 * - small: 24px height (h-6)
 * - medium: 32px height (h-8) - matches small button/input - default
 * - large: 40px height (h-10) - matches medium button/input
 *
 * Features:
 * - Accessible (ARIA attributes, keyboard support)
 * - Focus states matching design system
 * - Smooth animations
 * - Optional label
 * - Optional icon inside knob (for special use cases like theme toggle)
 */
import { type ButtonHTMLAttributes, type ReactNode } from "react";
export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    size?: "small" | "medium" | "large";
    label?: string;
    disabled?: boolean;
    icon?: ReactNode;
}
/**
 * Switch Component
 *
 * @param checked - Whether switch is checked/on (default: false)
 * @param onCheckedChange - Callback when switch state changes
 * @param size - Switch size (default: "medium")
 * @param label - Optional label text displayed next to switch
 * @param disabled - Whether switch is disabled
 * @param icon - Optional icon to display inside the knob (e.g., Moon/Sun for theme toggle)
 */
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Switch.d.ts.map