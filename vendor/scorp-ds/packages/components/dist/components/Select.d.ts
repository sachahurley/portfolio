/**
 * SELECT COMPONENT
 *
 * Custom select dropdown component with multiple sizes
 * Uses custom dropdown menu matching Dropdown component styling
 * Built entirely from design tokens defined in tokens.json
 *
 * SIZES: Matching input heights
 * - sm: 32px height
 * - md: 40px height (default)
 * - lg: 48px height
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
import { type ControlSizeProp } from "../lib/size";
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    /** Trigger height: sm 32px, md 40px (default), lg 48px. Legacy names are deprecated aliases. */
    size?: ControlSizeProp;
    /** Error styling without a message. Prefer `errorMessage` so users learn what to fix. */
    error?: boolean;
    /** Hint shown under the trigger. Linked via `aria-describedby`. */
    helperText?: ReactNode;
    /**
     * Validation message shown under the trigger. Sets the error state and
     * `aria-invalid`, and replaces `helperText` while present.
     */
    errorMessage?: ReactNode;
    /**
     * Optional visible label; associates with the custom trigger via `htmlFor` / `id` on the button.
     */
    label?: ReactNode;
}
/**
 * Select Component
 *
 * @param size - Select size matching input heights (default: "md")
 * @param error - Whether select has a validation error
 * @param disabled - Whether select is disabled
 * @param className - Additional CSS classes to apply
 * @param children - Option elements to display in the dropdown
 * @param value - Controlled value
 * @param defaultValue - Uncontrolled default value
 * @param onChange - Change handler
 * @param label - Optional visible label for the custom trigger (preferred over relying on `aria-label` alone)
 * @param helperText - Hint under the trigger
 * @param errorMessage - Validation message under the trigger (implies `error`)
 */
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLSelectElement>>;
//# sourceMappingURL=Select.d.ts.map