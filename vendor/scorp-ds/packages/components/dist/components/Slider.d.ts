/**
 * SLIDER COMPONENT
 *
 * A styled native range input: the missing control tier between Input and
 * Select for continuous or stepped numeric values (zoom, size, bias).
 * Built entirely from design tokens defined in tokens.json.
 *
 * ANATOMY:
 * - Row: a 44px-tall (`h-touch`) full-width band. The whole band is the
 *   pointer target, so the control meets the 44px touch-target rule even
 *   though the visible rail is 4px tall.
 * - Rail: a 4px bar in `--control-track` (3.31:1 on the light page, 5.34:1
 *   on the dark page; the `--surface-muted` it replaced was 1.06:1 / 1.09:1,
 *   effectively invisible).
 * - Fill: the portion before the thumb, in `--accent` (4.9:1 on the light
 *   page, 8.24:1 on the dark page). A slider with no fill reads as unset.
 * - Thumb: a solid accent plate wearing the button silhouette
 *   (--plate-round, the stepped one-bit corners)
 * - Focus: the inset box-shadow ring recipe on the row (outlines get clipped
 *   elsewhere in the system, so focus is consistent ring-style everywhere)
 *
 * WIDTH: the root is a block-level `flex w-full`, so the slider fills its
 * container. Constrain it from the parent (`<div className="w-64">`) or by
 * passing a width in `className`.
 *
 * Native <input type="range"> underneath: keyboard arrows, min/max/step,
 * form participation, and assistive tech all come free.
 *
 * TOKENS USED:
 * - control.track (rail), accent (fill + thumb), text.secondary scale (label)
 * - touch.target (row height), plate.round (thumb)
 * - focus.ring (focus-visible), duration.fast (hover)
 */
import { type InputHTMLAttributes, type ReactNode } from "react";
/** Every Slider prop except the requirement that one accessible name is set. */
interface SliderOwnProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "aria-label" | "aria-labelledby"> {
    /**
     * Visible label tied to the input with htmlFor/id; one of `label`,
     * `aria-label` or `aria-labelledby` is required. Put the current value in it
     * when users need to see the number.
     */
    label?: ReactNode;
    /** Accessible name when the slider has no visible label of its own (a zoom slider in a toolbar). */
    "aria-label"?: string;
    /** Id of visible text elsewhere that names the slider, such as a column heading. */
    "aria-labelledby"?: string;
}
/** A label that renders something: `null`, `undefined` and booleans would leave the slider unnamed. */
type VisibleLabel = Exclude<ReactNode, null | undefined | boolean>;
/**
 * The name a Slider is announced by. The type requires one: a bare range
 * input is read as "slider, 40" with nothing saying what the number is.
 */
type SliderName = {
    label: VisibleLabel;
} | {
    "aria-label": string;
} | {
    "aria-labelledby": string;
};
/** Props of `Slider`: native range-input props plus a required accessible name, given as `label`, `aria-label` or `aria-labelledby`. */
export type SliderProps = SliderOwnProps & SliderName;
/**
 * A range input for choosing a number between `min` and `max` by dragging or with the arrow keys.
 *
 * Name it with `label` (a visible label wired to the input by id), or with
 * `aria-label` / `aria-labelledby`; the type requires one. All other props (min, max, step, value, onChange, disabled, ...) pass
 * through to the native range input.
 */
export declare const Slider: import("react").ForwardRefExoticComponent<SliderProps & import("react").RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=Slider.d.ts.map