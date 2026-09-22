/**
 * FIELD MESSAGES (internal)
 *
 * Shared helper/error text for form controls (Input, Textarea, Select,
 * Checkbox). One place owns the ids, `aria-describedby` and `aria-invalid`
 * wiring so every control announces its message the same way.
 *
 * An error message replaces the helper text while it is present (the Carbon /
 * Polaris convention), so the field never shows two lines of small print.
 * The error line carries a `[er]` prefix, the same severity glyph as Alert,
 * so meaning never rides on color alone.
 *
 * Not exported from the package barrel: this is plumbing, not a component.
 */
import { type ReactNode } from "react";
export interface FieldMessageOptions {
    /** Boolean error flag from the control's props. */
    error?: boolean;
    /** Hint shown under the control. */
    helperText?: ReactNode;
    /** Validation message; implies the error state when set. */
    errorMessage?: ReactNode;
    /** Consumer-supplied `aria-describedby`, merged in front of ours. */
    describedBy?: string;
}
/**
 * Resolves the field's invalid state and the ids that tie its message to the
 * control. Spread `aria-describedby` / `aria-invalid` onto the focusable
 * element and render `<FieldMessage {...message} />` under it.
 */
export declare function useFieldMessage({ error, helperText, errorMessage, describedBy }: FieldMessageOptions): {
    invalid: boolean;
    hasMessage: boolean;
    describedBy: string | undefined;
    message: {
        id: string | undefined;
        tone: "error" | "helper";
        children: ReactNode;
    };
};
/** The small print under a field. Renders nothing when there is no message. */
export declare function FieldMessage({ id, tone, children, className, }: {
    id?: string;
    tone: "helper" | "error";
    children?: ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=field.d.ts.map