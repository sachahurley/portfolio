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
 * - default / hover: ring color ramp (see above)
 * - focused: the system's 2px inset ring (`--focus-ring-width`) drawn inside
 *   the plate, on top of the ring wrapper's accent colour. The error state
 *   keeps its red ring wrapper and draws the inset ring in
 *   `--focus-ring-error`, so focus is visible in every state.
 * - disabled: the whole field (ring wrapper included) drops to 50% opacity;
 *   dimming only the inner fill used to leave a full-strength border.
 * - error: Red ring + tinted fill
 *
 * PLACEHOLDERS: `--field-placeholder` is sepia-700 in light (6.28:1 on the
 * white field) and sepia-500 in dark (9.45:1). Placeholders still must never
 * carry essential information (they vanish on input), so put format hints in
 * `helperText` and the name in `label`.
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