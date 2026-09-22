/**
 * TEXTAREA COMPONENT
 *
 * Reusable textarea component with multiple sizes
 * Built entirely from design tokens defined in tokens.json
 *
 * SIZES: Matching input heights
 * - sm: 32px min-height (matches small input)
 * - md: 40px min-height (matches medium input - default)
 * - lg: 48px min-height (matches large input)
 *
 * SHAPE: plate ring recipe, identical to Input — wrapper = border color clipped
 * to --plate-round, textarea = fill clipped 1px inset. The ring walks the
 * portfolio ramp: idle hairline → hover mut → focus accent.
 *
 * STATES:
 * - default / hover / focused: ring color ramp (see above)
 * - disabled: Reduced opacity, not interactive
 * - error: Red ring + tinted fill
 */
import { type ReactNode, type TextareaHTMLAttributes } from "react";
import { type ControlSizeProp } from "../lib/size";
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Minimum height and padding: sm, md (default), lg, matching Input. Legacy names are deprecated aliases. */
    size?: ControlSizeProp;
    /** Error styling without a message. Prefer `errorMessage` so users learn what to fix. */
    error?: boolean;
    /** Hint shown under the field (length, format). Linked via `aria-describedby`. */
    helperText?: ReactNode;
    /**
     * Validation message shown under the field. Sets the error state and
     * `aria-invalid`, and replaces `helperText` while present.
     */
    errorMessage?: ReactNode;
    /**
     * Optional visible label. When set, renders a `<label>` associated with the textarea via `htmlFor` / `id`.
     */
    label?: ReactNode;
}
/**
 * Textarea Component
 *
 * @param size - Textarea size matching input heights (default: "md")
 * @param error - Whether textarea has a validation error
 * @param disabled - Whether textarea is disabled
 * @param className - Additional CSS classes to apply
 * @param label - Optional visible label wired to the control with matching `id`
 * @param helperText - Hint under the field
 * @param errorMessage - Validation message under the field (implies `error`)
 */
export declare const Textarea: import("react").ForwardRefExoticComponent<TextareaProps & import("react").RefAttributes<HTMLTextAreaElement>>;
//# sourceMappingURL=Textarea.d.ts.map