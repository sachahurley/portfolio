/**
 * COMBOBOX COMPONENT
 *
 * A text field with a filtered listbox: type to narrow a long list, then pick
 * one option. Use it instead of Select when the list is long enough that
 * scanning hurts (countries, repos, people). Built on Popover's positioning,
 * so the list flips above the field near the bottom of the viewport.
 *
 * PATTERN: WAI-ARIA 1.2 combobox with a listbox popup and list autocomplete.
 * Focus never leaves the input; the highlighted option is conveyed with
 * `aria-activedescendant`.
 *
 * KEYBOARD:
 * - ArrowDown / ArrowUp: open the list, then move the highlight (wraps)
 * - Alt+ArrowDown: open without moving the highlight
 * - Home / End: first / last option while the list is open
 * - Enter: pick the highlighted option
 * - Escape: close the list (restoring the committed label); when already
 *   closed, clear the field
 * - Tab: close and move on (nothing is picked implicitly)
 *
 * VISUAL: Input's plate ring recipe (field ring ramp: idle, hover, focus
 * accent, error) and control-height sizes; the list is a Popover plate.
 *
 * TOKENS USED:
 * - field.background(-error), field.border(-hover/-focus/-error), field.placeholder
 * - surface.card, surface.container-stroke, surface.subtle (highlight)
 * - text.primary, text.secondary, border.focus (selected check)
 * - control-height.sm|md|lg, duration.fast
 */
import { type InputHTMLAttributes, type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
/** One entry in a Combobox list. */
export interface ComboboxOption {
    /** Value reported through `onValueChange` and the hidden form input. */
    value: string;
    /** Text shown in the list and in the field once picked. */
    label: string;
    /** Shown but not selectable; skipped by keyboard navigation. */
    disabled?: boolean;
}
export interface ComboboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "defaultValue" | "onChange" | "role" | "type"> {
    /** Options to filter and choose from. */
    options: ComboboxOption[];
    /** Controlled selected value (`null` for nothing picked). Pair with `onValueChange`. */
    value?: string | null;
    /** Initial selected value when uncontrolled. */
    defaultValue?: string | null;
    /** Called with the picked value and option (or `null` when the field is cleared). */
    onValueChange?: (value: string | null, option: ComboboxOption | null) => void;
    /** Called on every keystroke with the raw query text. */
    onInputChange?: (query: string) => void;
    /**
     * Custom matcher. Defaults to a case-insensitive "label contains query".
     * Return true to keep the option in the list.
     */
    filter?: (option: ComboboxOption, query: string) => boolean;
    /** Message shown when nothing matches (default "No matches"). */
    emptyText?: ReactNode;
    /** Field height: sm 32px, md 40px (default), lg 48px. */
    size?: ControlSizeProp;
    /** Visible label, wired to the input. Without it, pass `aria-label`. */
    label?: ReactNode;
    /** Hint under the field. Linked via `aria-describedby`. */
    helperText?: ReactNode;
    /** Validation message under the field; sets `aria-invalid` and replaces `helperText`. */
    errorMessage?: ReactNode;
    /** Error styling without a message. Prefer `errorMessage`. */
    error?: boolean;
    /** Open the list when the field gains focus (default false: opens on typing, click, or arrows). */
    openOnFocus?: boolean;
    /**
     * Render the list into `document.body`. Needed inside plate-clipped
     * containers (Card, Modal): clip-path clips fixed-position descendants.
     */
    portal?: boolean;
    /** Extra classes for the outer wrapper (width). */
    className?: string;
}
/**
 * Combobox Component
 *
 * @example
 * <Combobox
 *   label="Country"
 *   options={[{ value: "ca", label: "Canada" }, { value: "fr", label: "France" }]}
 *   onValueChange={(value) => setCountry(value)}
 * />
 *
 * @param options - `{ value, label, disabled? }` entries
 * @param value / defaultValue / onValueChange - Controlled or uncontrolled selection
 * @param filter - Custom matcher (default: label contains query)
 * @param emptyText - Shown when no option matches
 */
export declare const Combobox: import("react").ForwardRefExoticComponent<ComboboxProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Combobox.d.ts.map