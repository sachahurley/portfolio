/**
 * SWITCH COMPONENT
 *
 * Reusable toggle switch component with multiple sizes
 * Built using design tokens for consistent styling
 *
 * SIZES: Proportional to button/input height system. Every measurement comes
 * from the `global.switch` tokens (`--switch-track-*`, `--switch-knob-*`), so
 * nothing about the geometry is typed into this file:
 * - sm: 24px track (one step below the control scale; no control-height token)
 * - md: 32px track, aliases `--control-height-sm` (default)
 * - lg: 40px track, aliases `--control-height-md`
 * Every size's tap target is at least 44px tall: the (unclipped) button
 * carries a pseudo-element hit area, so the visual track keeps its size.
 *
 * SHAPE: track and knob are both clipped to the small plate (--plate-round).
 * The clip lives on an inner track span, not the button, so the hit area
 * isn't clipped away. Focus is an inset ring on the track and the knob
 * glides on the standard ease at duration-normal (200ms) — smooth, inside
 * the 150-200ms interactive-motion ceiling, and instant under
 * prefers-reduced-motion.
 *
 * CONTRAST: the off track is `--control-track` (sepia-600): 3.31:1 on the
 * light page / 5.34:1 on the dark page, and 3.39:1 / 5.69:1 against the knob,
 * so the control reads as a control per WCAG 1.4.11. The on track is
 * `--accent`, which keeps the same knob separation (4.9:1 light, 8.78:1 dark);
 * the bright `--button-primary-background` amber it replaced left the white
 * knob at 1.67:1 in the light theme.
 *
 * Features:
 * - Accessible (ARIA attributes, keyboard support)
 * - Focus states matching design system
 * - Smooth knob glide (duration-normal), reduced-motion safe
 * - A required accessible name (`label`, `aria-label` or `aria-labelledby`);
 *   a visible label is clickable like a native control label
 * - Controlled (`checked`) or uncontrolled (`defaultChecked`)
 * - Optional icon inside knob (for special use cases like theme toggle)
 */
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import type { ControlSize } from "../lib/size";
import { type IconSlot } from "../lib/icon-slot";
/** Every Switch prop except the requirement that one accessible name is set. */
interface SwitchOwnProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "defaultChecked" | "aria-label" | "aria-labelledby"> {
    /** Whether the switch is on, for a controlled switch: keep it in state and update it from `onCheckedChange`. Omit it (and use `defaultChecked`) to let the switch keep its own state. */
    checked?: boolean;
    /** Whether an uncontrolled switch starts on. Ignored when `checked` is set. Default: false. */
    defaultChecked?: boolean;
    /** Called with the next value when the user clicks the track or label, or presses Space or Enter. A controlled switch cannot change without it. */
    onCheckedChange?: (checked: boolean) => void;
    /** Track size. The tap target is at least 44px tall at every size. */
    size?: ControlSize;
    /** Visible label and accessible name; one of `label`, `aria-label` or `aria-labelledby` is required. Clicking it toggles the switch. Use `hideLabel` to keep it aria-only. */
    label?: string;
    /** Accessible name when there is no `label` (a theme toggle whose state is shown by an icon). Wins over `label` when both are set. */
    "aria-label"?: string;
    /** Id of visible text elsewhere that names the switch, such as a settings row heading. Wins over `label` and `aria-label`. */
    "aria-labelledby"?: string;
    /**
     * Keep `label` as the accessible name only (no visible text). Use in
     * compositions where the row already carries a visible heading, such as a
     * settings row, so the name isn't duplicated next to the track.
     */
    hideLabel?: boolean;
    /** Blocks interaction and dims the switch. Prefer explaining nearby why a setting is unavailable. */
    disabled?: boolean;
    /** Icon drawn inside the knob, for a switch whose two states have a picture (a moon and sun for the theme toggle). Takes a TuiIcon name (`"Check"`) or an element. */
    icon?: IconSlot | ReactNode;
}
/**
 * The name a Switch is announced by. The type requires one: a switch read as
 * only "on" or "off" does not say what it turns on.
 */
type SwitchName = {
    label: string;
} | {
    "aria-label": string;
} | {
    "aria-labelledby": string;
};
/** Props of `Switch`: its own props plus a required accessible name, given as `label`, `aria-label` or `aria-labelledby`. */
export type SwitchProps = SwitchOwnProps & SwitchName;
/**
 * A toggle for a setting that takes effect at once, such as a preference; for a choice submitted with a form use `Checkbox`.
 */
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=Switch.d.ts.map