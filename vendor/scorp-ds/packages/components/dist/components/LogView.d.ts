/**
 * LOG VIEW COMPONENT
 *
 * A monospace, scrolling log tail: build output, server logs, job runs.
 * Each line shows an optional line number, an optional timestamp, the
 * level as a 1-bit icon PLUS a text tag (INFO / WARN / ERROR / DEBUG, so
 * color is never the only signal), and the message.
 *
 * AUTO-SCROLL: with `autoScroll` (default on) the view follows new lines,
 * like `tail -f`. Scrolling up pauses following so the reader keeps their
 * place; a "Jump to latest" button appears with the count of unseen lines
 * and resumes following. Scrolling back to the bottom also resumes.
 *
 * ACCESSIBILITY: the scroll container is `role="log"` with
 * `aria-live="polite"`, so appended lines are announced without
 * interrupting. It is focusable so keyboard users can scroll it.
 *
 * TOKENS USED:
 * - surface.page (log background), surface.container-stroke (ring);
 *   unframed logs inherit the surrounding surface
 * - text.primary (messages), text.secondary (numbers, timestamps)
 * - info / warning / error semantic scales (level tags, AA pairs 700 on
 *   light, 400 on dark), secondary scale (debug)
 * - plate.round-lg (frame), focus inset ring
 */
import { type ReactNode } from "react";
/** Severity of a log line. Drives the icon, the text tag, and the tag color. */
export type LogLevel = "info" | "warn" | "error" | "debug";
/** One line in the log. */
export interface LogLine {
    /** Stable id (used as the React key; keep it unique and stable across appends). */
    id: string | number;
    /** The message. Plain text keeps the monospace grid; nodes are allowed. */
    text: ReactNode;
    /** Severity. Lines without a level render no tag. */
    level?: LogLevel;
    /** Timestamp text, pre-formatted ("12:04:01"). */
    timestamp?: string;
}
export interface LogViewProps {
    /** Lines to show, oldest first. Append to the end to stream. */
    lines: LogLine[];
    /** Follow new lines to the bottom (default true). Pauses while the user is scrolled up. */
    autoScroll?: boolean;
    /** Show a gutter of 1-based line numbers (default false). */
    showLineNumbers?: boolean;
    /** Wrap long lines instead of scrolling horizontally (default true). */
    wrap?: boolean;
    /** Accessible name of the log region (default "Log"). */
    "aria-label"?: string;
    /** Rendered when `lines` is empty (default "No output yet."). */
    emptyState?: ReactNode;
    /**
     * Draw the plate ring frame (default true). Set false when the log sits
     * inside another frame, such as a Window body.
     */
    framed?: boolean;
    /** Fires when following pauses (user scrolled up) or resumes. */
    onFollowChange?: (following: boolean) => void;
    /** Extra classes for the frame. Set the height here (default h-80). */
    className?: string;
}
/**
 * LogView
 *
 * ```tsx
 * <LogView
 *   aria-label="Build output"
 *   showLineNumbers
 *   lines={[{ id: 1, level: "info", timestamp: "12:04:01", text: "connection accepted" }]}
 * />
 * ```
 */
export declare function LogView({ lines, autoScroll, showLineNumbers, wrap, "aria-label": ariaLabel, emptyState, framed, onFollowChange, className, }: LogViewProps): import("react/jsx-runtime").JSX.Element;
export declare namespace LogView {
    var displayName: string;
}
//# sourceMappingURL=LogView.d.ts.map