/**
 * FIELDSET COMPONENT
 *
 * A native `<fieldset>` whose `<legend>` names a group of related controls:
 * radios answering one question, checkboxes for one setting, or a titled
 * section of a settings card. Screen readers announce the legend when focus
 * enters the group.
 *
 * The browser's fieldset chrome (border, padding, `min-width: min-content`) is
 * reset; a Fieldset draws no frame, because forms already sit in a Card or a
 * page column. The legend takes one of the two voices in the composition
 * rules: `eyebrow` (`text-xs uppercase tracking-wider`, `--text-primary`,
 * `mb-3`) or `field` (the Input label style: `text-sm`, `secondary-800` /
 * `secondary-200`, `mb-2`). The children sit in a flex column whose `gap` uses
 * Stack's gap scale. A description and an error message share the field helper,
 * so they read like every other field's small print.
 */
import { type FieldsetHTMLAttributes, type ReactNode } from "react";
declare const gapClass: {
    readonly none: "gap-0";
    readonly "1": "gap-1";
    readonly "2": "gap-2";
    readonly "3": "gap-3";
    readonly "4": "gap-4";
    readonly "5": "gap-5";
    readonly "6": "gap-6";
    readonly "8": "gap-8";
};
/** Space between a Fieldset's children; the same steps as `StackGap`. */
export type FieldsetGap = keyof typeof gapClass;
/**
 * Legend voice: `eyebrow` titles a group in a settings card, `field` asks one
 * question in a form (the composition rules' "eyebrow style" and "field label style").
 */
export type FieldsetVariant = "eyebrow" | "field";
export interface FieldsetProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, "children" | "role"> {
    /**
     * The group's name, rendered as the `<legend>` and announced when focus enters
     * the group. Write the question ("Theme") or the section title ("Notifications").
     * To hide it visually, pass `<VisuallyHidden>Name</VisuallyHidden>`.
     */
    legend: ReactNode;
    /**
     * The controls in the group: Radios sharing one `name`, Checkboxes, Switches or
     * fields. They are laid out in a column with `gap` between them.
     */
    children: ReactNode;
    /**
     * One line under the legend that explains the choice. It is linked to the group
     * with `aria-describedby`, so it is read after the legend.
     */
    description?: ReactNode;
    /**
     * Legend voice. `eyebrow` (default, `text-xs` uppercase) titles a group inside a settings card;
     * `field` matches the Input label and suits a group that asks one question in a form.
     */
    variant?: FieldsetVariant;
    /**
     * Space between the children, on the Stack gap scale: `2` (default) between the
     * options of one choice group, `4` for a group mixing Switch rows and Checkboxes.
     */
    gap?: FieldsetGap;
    /**
     * Disables every control in the group natively (the browser disables each
     * descendant input and button) and dims the controls but not the legend, as
     * Input dims its field but not its label. Do not also pass `disabled` to the
     * children, or they dim twice.
     */
    disabled?: boolean;
    /**
     * Group-level error without a message. Prefer `errorMessage` so the user learns
     * what to fix. With `role="radiogroup"` it sets `aria-invalid` on the group; a plain
     * group cannot carry `aria-invalid` (ARIA 1.2), so there only the message is announced.
     * Set `error` on each child as well for the error styling.
     */
    error?: boolean;
    /**
     * Group-level validation message under the controls ("Pick a plan"), linked with
     * `aria-describedby`. Implies `error`. For a message about one option, use that
     * control's own `errorMessage`.
     */
    errorMessage?: ReactNode;
    /**
     * `radiogroup` for a set of Radios: it is the role that can carry the group's
     * invalid state (decision 0029, `Radio.md`). Leave it unset for checkboxes and
     * mixed controls; the native fieldset is already a `group`.
     */
    role?: "group" | "radiogroup";
    /** Layout classes for the fieldset itself (width, margin). The legend and the children column are not styled through it. */
    className?: string;
}
/**
 * Names a group of related controls with a legend, so forms stop hand-writing
 * `fieldset` and `legend` styling. Use it around radios that answer one question,
 * a set of checkboxes, or a titled group of settings. For a single control use
 * that control's own `label`; for a framed group with a header and footer use `Card`.
 *
 * ```tsx
 * <Fieldset legend="Theme" variant="field" role="radiogroup">
 *   <Radio name="theme" value="light" label="Light" />
 *   <Radio name="theme" value="dark" label="Dark" />
 * </Fieldset>
 * ```
 */
export declare const Fieldset: import("react").ForwardRefExoticComponent<FieldsetProps & import("react").RefAttributes<HTMLFieldSetElement>>;
export {};
//# sourceMappingURL=Fieldset.d.ts.map