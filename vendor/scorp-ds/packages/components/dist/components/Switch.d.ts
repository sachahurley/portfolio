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
 * - Optional label, clickable like a native control label
 * - Optional icon inside knob (for special use cases like theme toggle)
 */
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    /** Track size. The tap target is at least 44px tall at every size. */
    size?: ControlSizeProp;
    /** Visible label and accessible name. Clicking it toggles the switch. Use `hideLabel` to keep it aria-only. */
    label?: string;
    /**
     * Keep `label` as the accessible name only (no visible text). Use in
     * compositions where the row already carries a visible heading — e.g. a
     * settings row — so the name isn't duplicated next to the track.
     */
    hideLabel?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
}
/**
 * Switch Component
 *
 * @param checked - Whether switch is checked/on (default: false)
 * @param onCheckedChange - Callback when switch state changes
 * @param size - Switch size (default: "md")
 * @param label - Optional label text displayed next to switch (and the accessible name); clicking it toggles
 * @param hideLabel - Use label as the accessible name only; render no visible text
 * @param disabled - Whether switch is disabled
 * @param icon - Optional icon to display inside the knob (e.g., Moon/Sun for theme toggle)
 */
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Switch.d.ts.map