/**
 * INPUT COMPONENT
 *
 * Reusable text input component with multiple sizes
 * Built entirely from design tokens defined in tokens.json
 *
 * SIZES: Matching button heights
 * - small: 32px height
 * - medium: 40px height (default)
 * - large: 48px height
 *
 * STATES:
 * - default: Standard input appearance
 * - hover: Subtle border change on mouse over
 * - focused: Primary color focus ring (keyboard accessible)
 * - disabled: Reduced opacity, not interactive
 * - error: Red border to indicate validation issues
 */
import { type InputHTMLAttributes, type ReactNode } from "react";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: "small" | "medium" | "large";
    error?: boolean;
    /**
     * Optional visible label. When set, renders a `<label>` associated with the input via `htmlFor` / `id`.
     * Prefer this or `aria-label` so the field is announced correctly by screen readers.
     */
    label?: ReactNode;
}
/**
 * Input Component
 *
 * @param size - Input size matching button heights (default: "medium")
 * @param error - Whether input has a validation error
 * @param disabled - Whether input is disabled
 * @param className - Additional CSS classes to apply
 * @param label - Optional visible label wired to the input with matching `id`
 */
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map