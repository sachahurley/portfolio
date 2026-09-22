/**
 * PROGRESS BAR COMPONENT
 *
 * Shows how far along a task is. Determinate when you know the fraction
 * (`value` of `max`), indeterminate when you only know that work is
 * happening (omit `value`).
 *
 * TUI RENDERING: the track is a sharp hairline-ringed bar filled with
 * discrete blocks on the 2px pixel grid, like a terminal progress meter.
 * Progress fills whole blocks (never a smooth sliver), so 20 blocks read in
 * 5% steps. Indeterminate progress is a short run of blocks that hops along
 * the track one block at a time; with prefers-reduced-motion it holds still
 * as a dimmed, fully filled track instead.
 *
 * ACCESSIBILITY: role="progressbar" with aria-valuemin/max/now (and a
 * percentage aria-valuetext). Indeterminate bars omit aria-valuenow, which is
 * how assistive tech knows the value is unknown. Always name the bar with
 * `label` (shown above it, or hidden with `showLabel={false}`).
 *
 * TOKENS USED:
 * - border.default (ring), surface.subtle (track), surface.muted (empty blocks)
 * - primary / success / warning / error scales (filled blocks)
 * - text.primary, text.secondary, duration.fast (indeterminate hop interval)
 */
import { type ControlSizeProp } from "../lib/size";
export interface ProgressBarProps {
    /** Current progress, 0 to `max`. Omit (or pass `null`) for an indeterminate bar. */
    value?: number | null;
    /** Value that means complete (default 100). */
    max?: number;
    /** Accessible name, e.g. "Uploading report.pdf". Shown above the bar unless `showLabel` is false. */
    label: string;
    /** Show the label visually (default true). When false it is still announced. */
    showLabel?: boolean;
    /** Show the percentage next to the label for determinate bars (default true). */
    showValue?: boolean;
    /** Track thickness: sm, md (default), lg. */
    size?: ControlSizeProp;
    /** Fill color by meaning: primary (default accent), success, warning, error. */
    variant?: "primary" | "success" | "warning" | "error";
    /** Number of blocks across the track (default 20, so each block is 5%). */
    segments?: number;
    /** Extra classes for the root (width). */
    className?: string;
}
/**
 * ProgressBar Component
 *
 * @example
 * <ProgressBar label="Uploading" value={42} />
 * <ProgressBar label="Connecting" />  // indeterminate
 *
 * @param value - Progress toward `max`; omit for indeterminate
 * @param label - Accessible name (visible by default)
 * @param variant - primary, success, warning, error
 * @param size - sm, md, lg track thickness
 */
export declare function ProgressBar({ value, max, label, showLabel, showValue, size: sizeProp, variant, segments, className, }: ProgressBarProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ProgressBar {
    var displayName: string;
}
//# sourceMappingURL=ProgressBar.d.ts.map