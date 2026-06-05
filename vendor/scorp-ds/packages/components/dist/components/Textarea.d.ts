/**
 * TEXTAREA COMPONENT
 *
 * Reusable textarea component with multiple sizes
 * Built entirely from design tokens defined in tokens.json
 *
 * SIZES: Matching input heights
 * - small: 32px min-height (matches small input)
 * - medium: 40px min-height (matches medium input - default)
 * - large: 48px min-height (matches large input)
 *
 * STATES:
 * - default: Standard textarea appearance
 * - hover: Subtle border change on mouse over
 * - focused: Primary color focus ring (keyboard accessible)
 * - disabled: Reduced opacity, not interactive
 * - error: Red border to indicate validation issues
 */
import { type ReactNode, type TextareaHTMLAttributes } from "react";
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: "small" | "medium" | "large";
    error?: boolean;
    /**
     * Optional visible label. When set, renders a `<label>` associated with the textarea via `htmlFor` / `id`.
     */
    label?: ReactNode;
}
/**
 * Textarea Component
 *
 * @param size - Textarea size matching input heights (default: "medium")
 * @param error - Whether textarea has a validation error
 * @param disabled - Whether textarea is disabled
 * @param className - Additional CSS classes to apply
 * @param label - Optional visible label wired to the control with matching `id`
 */
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
//# sourceMappingURL=Textarea.d.ts.map