/**
 * INPUT COMPONENT
 *
 * Reusable text input component with multiple sizes
 * Built entirely from design tokens defined in tokens.json
 *
 * SIZES: Matching button heights
 * - sm: 32px height
 * - md: 40px height (default)
 * - lg: 48px height
 *
 * STATES:
 * - default: Standard input appearance
 * - hover: Subtle border change on mouse over
 * - focused: Primary color focus ring (keyboard accessible)
 * - disabled: Reduced opacity, not interactive
 * - error: Red border to indicate validation issues
 */
import { type InputHTMLAttributes, type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Field height: sm 32px, md 40px (default), lg 48px. Legacy small/medium/large are deprecated aliases. */
    size?: ControlSizeProp;
    /**
     * Visual variant. "box" (default) is the plate field; "quiet" is the
     * underline recipe — transparent, bottom hairline only, the site's voice
     * for inline fields (passwords, rename-in-place). Same border ramp:
     * idle hairline → hover mut → focus accent.
     */
    variant?: "box" | "quiet";
    /** Error styling without a message. Prefer `errorMessage` so users learn what to fix. */
    error?: boolean;
    /** Hint shown under the field (format, constraints). Linked via `aria-describedby`. */
    helperText?: ReactNode;
    /**
     * Validation message shown under the field. Sets the error state and
     * `aria-invalid`, and replaces `helperText` while present.
     */
    errorMessage?: ReactNode;
    /**
     * Optional visible label. When set, renders a `<label>` associated with the input via `htmlFor` / `id`.
     * Prefer this or `aria-label` so the field is announced correctly by screen readers.
     */
    label?: ReactNode;
}
/**
 * Input Component
 *
 * @param size - Input size matching button heights (default: "md")
 * @param error - Whether input has a validation error
 * @param disabled - Whether input is disabled
 * @param className - Additional CSS classes to apply
 * @param label - Optional visible label wired to the input with matching `id`
 * @param helperText - Hint under the field
 * @param errorMessage - Validation message under the field (implies `error`)
 */
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map