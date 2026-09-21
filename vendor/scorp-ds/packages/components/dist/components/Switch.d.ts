/**
 * SWITCH COMPONENT
 *
 * Reusable toggle switch component with multiple sizes
 * Built using design tokens for consistent styling
 *
 * SIZES: Proportional to button/input height system
 * - small: 24px height (h-6)
 * - medium: 32px height (h-8) - matches small button/input - default
 * - large: 40px height (h-10) - matches medium button/input
 *
 * SHAPE: track and knob are both clipped to the small plate (--plate-round).
 * Focus is an inset ring (the clip swallows outside outlines) and the knob
 * glides on the standard ease at duration-normal (200ms) — smooth, inside
 * the 150-200ms interactive-motion ceiling.
 *
 * Features:
 * - Accessible (ARIA attributes, keyboard support)
 * - Focus states matching design system
 * - Smooth knob glide (duration-normal)
 * - Optional label
 * - Optional icon inside knob (for special use cases like theme toggle)
 */
import { type ButtonHTMLAttributes, type ReactNode } from "react";
export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    size?: "small" | "medium" | "large";
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
 * @param size - Switch size (default: "medium")
 * @param label - Optional label text displayed next to switch (and the accessible name)
 * @param hideLabel - Use label as the accessible name only; render no visible text
 * @param disabled - Whether switch is disabled
 * @param icon - Optional icon to display inside the knob (e.g., Moon/Sun for theme toggle)
 */
export declare const Switch: import("react").ForwardRefExoticComponent<SwitchProps & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Switch.d.ts.map