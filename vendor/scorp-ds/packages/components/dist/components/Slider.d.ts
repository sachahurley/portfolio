/**
 * SLIDER COMPONENT
 *
 * A styled native range input: the missing control tier between Input and
 * Select for continuous or stepped numeric values (zoom, size, bias).
 * Built entirely from design tokens defined in tokens.json.
 *
 * ANATOMY:
 * - Track: a thin muted bar (surface.muted), sharp corners per the TUI tier
 * - Thumb: a solid accent plate wearing the button silhouette
 *   (--plate-round, the stepped one-bit corners), sized for a 44px-tall
 *   touch target via the input's hit area
 * - Focus: the inset box-shadow ring recipe (outlines get clipped elsewhere
 *   in the system, so focus is consistent ring-style everywhere)
 *
 * Native <input type="range"> underneath: keyboard arrows, min/max/step,
 * form participation, and assistive tech all come free.
 *
 * TOKENS USED:
 * - surface.muted (track), accent (thumb), text.secondary scale (label)
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