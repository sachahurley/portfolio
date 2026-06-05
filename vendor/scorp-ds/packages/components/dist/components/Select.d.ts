/**
 * SELECT COMPONENT
 *
 * Custom select dropdown component with multiple sizes
 * Uses custom dropdown menu matching Dropdown component styling
 * Built entirely from design tokens defined in tokens.json
 *
 * SIZES: Matching input heights
 * - small: 32px height
 * - medium: 40px height (default)
 * - large: 48px height
 *
 * STATES:
 * - default: Standard select appearance
 * - hover: Subtle border change on mouse over
 * - focused: Primary color focus ring (keyboard accessible)
 * - disabled: Reduced opacity, not interactive
 * - error: Red border to indicate validation issues
 *
 * Features:
 * - Custom dropdown menu matching Dropdown component styling
 * - Keyboard navigation (Arrow keys, Escape, Enter)
 * - Click outside to close
 * - Maintains form compatibility with hidden native select
 */
import { type ReactNode, type SelectHTMLAttributes } from "react";
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    size?: "small" | "medium" | "large";
    error?: boolean;
    /**
     * Optional visible label; associates with the custom trigger via `htmlFor` / `id` on the button.
     */
    label?: ReactNode;
}
/**
 * Select Component
 *
 * @param size - Select size matching input heights (default: "medium")
 * @param error - Whether select has a validation error
 * @param disabled - Whether select is disabled
 * @param className - Additional CSS classes to apply
 * @param children - Option elements to display in the dropdown
 * @param value - Controlled value
 * @param defaultValue - Uncontrolled default value
 * @param onChange - Change handler
 * @param label - Optional visible label for the custom trigger (preferred over relying on `aria-label` alone)
 */
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLSelectElement>>;
//# sourceMappingURL=Select.d.ts.map