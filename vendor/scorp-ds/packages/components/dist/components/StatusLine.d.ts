/**
 * STATUS LINE COMPONENT (status bar)
 *
 * The bottom bar of a terminal app (vim, tmux): a strip of short segments
 * in three zones, left / center / right. Segments are `StatusLineSegment`
 * elements that can carry a 1-bit icon and a semantic tone.
 *
 * TONES: `neutral` (plain text), `primary` (the highlighted mode segment,
 * primary button fill), and `success` / `warning` / `error` / `info`
 * (tinted plates using the Badge AA pairs). Pair a tone with an icon or
 * words ("3 errors", not a red dot) so color is never the only signal.
 *
 * LIVE UPDATES: by default the bar is a named group and changes are not
 * announced. Set `live` to make it `role="status"` (polite announcements)
 * when its text reflects results the user is waiting on.
 *
 * TOKENS USED:
 * - surface.muted (bar), border.hairline (top edge)
 * - button.primary.background / text (primary segment)
 * - success / warning / error / info 50 / 950 fills with 800 / 300 text
 * - text.primary (neutral), control.height.sm (bar height)
 */
import type { ReactNode } from "react";
import { type TuiIconName } from "./TuiIcon";
/** Semantic tone of a status segment. */
export type StatusLineTone = "neutral" | "primary" | "success" | "warning" | "error" | "info";
export interface StatusLineProps {
    /** Left zone segments (mode, branch, file). */
    left?: ReactNode;
    /** Center zone segments (message, progress). */
    center?: ReactNode;
    /** Right zone segments (position, encoding, clock). */
    right?: ReactNode;
    /** Announce changes politely (`role="status"`). Off by default to avoid chatter. */
    live?: boolean;
    /** Accessible name of the bar (default "Status"). */
    "aria-label"?: string;
    /** Extra classes for the bar. */
    className?: string;
}
/**
 * StatusLine
 *
 * ```tsx
 * <StatusLine
 *   left={<StatusLineSegment tone="primary">NORMAL</StatusLineSegment>}
 *   center={<StatusLineSegment>sessions.log</StatusLineSegment>}
 *   right={<StatusLineSegment icon="AlertCircle" tone="error">2 errors</StatusLineSegment>}
 * />
 * ```
 */
export declare function StatusLine({ left, center, right, live, "aria-label": ariaLabel, className, }: StatusLineProps): import("react/jsx-runtime").JSX.Element;
export declare namespace StatusLine {
    var displayName: string;
}
export interface StatusLineSegmentProps {
    /** 1-bit icon before the text. Use one with any non-neutral tone. */
    icon?: TuiIconName;
    /** Semantic tone (default "neutral"). */
    tone?: StatusLineTone;
    /** Segment text. Keep it to a few words. */
    children: ReactNode;
    /** Extra classes for the segment. */
    className?: string;
}
/** One segment of a StatusLine zone. */
export declare function StatusLineSegment({ icon, tone, children, className }: StatusLineSegmentProps): import("react/jsx-runtime").JSX.Element;
export declare namespace StatusLineSegment {
    var displayName: string;
}
//# sourceMappingURL=StatusLine.d.ts.map