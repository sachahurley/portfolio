/**
 * METER COMPONENT
 *
 * A gauge for a value inside a known range: disk usage, quota, battery,
 * signal. Not a progress bar (use it for "how full", not "how far along").
 * Renders `role="meter"` with `aria-valuenow` / `min` / `max` /
 * `aria-valuetext`, drawn as stepped blocks on the pixel grid.
 *
 * THRESHOLDS follow the native `<meter>` model: `low` and `high` split the
 * range into three regions, and `optimum` says which region is good.
 * - value in the optimum's region: `success`
 * - one region away: `warning`
 * - two regions away (optimum low, value high, or the reverse): `error`
 * With no thresholds the meter stays `primary`. Pass `tone` to override.
 *
 * COLOR IS NEVER THE ONLY SIGNAL: the label and the value text are always
 * visible, and warning / error states add a 1-bit icon.
 *
 * TOKENS USED:
 * - success / warning / error / primary semantic scales (filled blocks:
 *   600 on light, 400 on dark)
 * - surface.muted (empty blocks), surface.container-stroke (block ring)
 * - text.primary (label), text.secondary (value text)
 */
import { type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
/** Semantic tone of the filled blocks. */
export type MeterTone = "primary" | "success" | "warning" | "error";
export interface MeterProps {
    /** Current value. Clamped to `[min, max]`. */
    value: number;
    /** Lower bound (default 0). */
    min?: number;
    /** Upper bound (default 100). */
    max?: number;
    /** Upper edge of the low region. Values below it are "low". */
    low?: number;
    /** Lower edge of the high region. Values above it are "high". */
    high?: number;
    /** The ideal value; decides which region reads as good. */
    optimum?: number;
    /** Visible label ("Disk"). Also the meter's accessible name. */
    label: ReactNode;
    /**
     * Human-readable value, shown next to the label and used as
     * `aria-valuetext` ("42 GB of 64 GB"). Defaults to a percentage.
     */
    valueText?: string;
    /** Force a tone instead of deriving it from the thresholds. */
    tone?: MeterTone;
    /** Number of blocks the range is divided into (default 20). */
    segments?: number;
    /** Block height: sm 8px, md 12px (default). */
    size?: Extract<ControlSizeProp, "sm" | "md" | "small" | "medium">;
    /** Extra classes for the wrapper. */
    className?: string;
}
/**
 * Derives the meter tone from thresholds using the native `<meter>` rules.
 * Returns `primary` when no thresholds are set. Exported for custom gauges.
 */
export declare function getMeterTone({ value, min, max, low, high, optimum, }: Pick<MeterProps, "value" | "min" | "max" | "low" | "high" | "optimum">): MeterTone;
/**
 * Meter
 *
 * ```tsx
 * <Meter label="Disk" value={58} max={64} high={48} optimum={0} valueText="58 GB of 64 GB" />
 * ```
 */
export declare function Meter({ value, min, max, low, high, optimum, label, valueText, tone: toneProp, segments, size: sizeProp, className, }: MeterProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Meter {
    var displayName: string;
}
//# sourceMappingURL=Meter.d.ts.map