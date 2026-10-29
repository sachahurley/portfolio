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
 * - focused: a colour change only. The 1px ring turns `--field-border-focus`
 *   (the quiet underline does the same); nothing thickens, so the field does
 *   not look bigger. Focus wins over error, so an errored field still shows
 *   the change. See docs/decisions/0022.
 * - disabled: the whole field (ring wrapper included) drops to 50% opacity;
 *   dimming only the inner fill used to leave a full-strength border.
 * - error: Red ring to indicate validation issues
 *
 * TRAILING ACTION: `trailingAction` puts one icon button inside the field's
 * end (a password reveal, a clear button). It is a real `<button
 * type="button">` over the input's right end, inside the 1px ring, square at
 * the control height (the same box as an icon-only Button of that size), with a 44px hit
 * area from a centered `::before` and the system's inset focus ring on an
 * `::after` clipped to the plate (decision 0002: the action is a button, not a
 * text field, so 0022 does not apply to it). The input gets right padding equal
 * to the action's width so text never runs under it. The action sits outside
 * the clipped ring wrapper, so the plate clip does not trim its hit area.
 *
 * PLACEHOLDERS: `--field-placeholder` is sepia-700 in light (6.28:1 on the
 * white field) and sepia-500 in dark (9.45:1). Placeholders still must never
 * carry essential information (they vanish on input), so put format hints in
 * `helperText` and the name in `label`.
 */
import { type InputHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import type { ControlSize } from "../lib/size";
import { type IconSlot } from "../lib/icon-slot";
/**
 * One icon button inside the end of an Input: a password reveal, a clear
 * button, a copy button. Pass it to `trailingAction`.
 */
export interface InputTrailingAction {
    /**
     * The icon: a TuiIcon name (`"Eye"`) or an element. A name is sized to the
     * field (16px at sm, 20px at md, 24px at lg). Swap it with state if the
     * action toggles (`"Eye"` / `"EyeOff"`).
     */
    icon: IconSlot;
    /**
     * Accessible name of the button, read by screen readers and required: the
     * button shows only an icon. Name the action ("Show password", "Clear
     * search"). For a toggle, keep the label fixed and use `pressed` for the state.
     */
    label: string;
    /** Called when the button is clicked or activated with Enter or Space. */
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Makes the action a toggle button: sets `aria-pressed`, so assistive tech
     * announces "pressed" or "not pressed". Use it for a password reveal
     * (`pressed={visible}`). Leave it undefined for a one-shot action (clear,
     * copy), which then carries no `aria-pressed`.
     */
    pressed?: boolean;
}
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Field height: sm 32px, md 40px (default), lg 48px. */
    size?: ControlSize;
    /**
     * Visual variant. "box" (default) is the plate field; "quiet" is the
     * underline recipe: transparent, bottom hairline only, the site's voice
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
    /**
     * One icon button inside the end of the field, such as a password reveal
     * (`{ icon: visible ? "EyeOff" : "Eye", label: "Show password", pressed:
     * visible, onClick: toggle }`). Renders a real `<button type="button">` after
     * the input in the tab order, with a 44px hit area and the system focus ring;
     * the input is padded so text never runs under it. `disabled` disables it too.
     */
    trailingAction?: InputTrailingAction;
}
/**
 * A single-line text field, with an optional label, helper text and error message wired up for assistive tech.
 *
 * @param size - Input size matching button heights (default: "md")
 * @param error - Whether input has a validation error
 * @param disabled - Whether input is disabled
 * @param className - Additional CSS classes to apply
 * @param label - Optional visible label wired to the input with matching `id`
 * @param helperText - Hint under the field
 * @param errorMessage - Validation message under the field (implies `error`)
 * @param trailingAction - Icon button inside the end of the field (password reveal, clear)
 */
export declare const Input: import("react").ForwardRefExoticComponent<InputProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map