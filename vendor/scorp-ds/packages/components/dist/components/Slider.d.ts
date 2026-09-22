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
export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
    /**
     * Optional visible label. When set, renders a <label> associated with the
     * input via htmlFor/id. Prefer this or `aria-label` so the control is
     * announced correctly by screen readers.
     */
    label?: ReactNode;
}
/**
 * Slider Component
 *
 * @param label - Optional visible label wired to the input with matching id
 * All other props (min, max, step, value, onChange, disabled, ...) pass
 * through to the native range input.
 */
export declare const Slider: import("react").ForwardRefExoticComponent<SliderProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Slider.d.ts.map