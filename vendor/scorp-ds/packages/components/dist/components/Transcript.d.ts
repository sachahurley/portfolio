/**
 * TRANSCRIPT COMPONENT
 *
 * The scrolling region that holds a conversation's Messages, oldest first.
 * It follows the newest content the way LogView follows a log: pinned to the
 * bottom while a reply streams, paused when the reader scrolls up, and a
 * "Jump to latest" button with the count of new turns.
 *
 * Unlike a log, a conversation also grows inside its last turn as tokens
 * stream in, so Transcript follows content height (a ResizeObserver on the
 * content column) as well as the number of turns. Both behaviors come from
 * the shared useFollowScroll hook, so LogView and Transcript cannot drift.
 *
 * ACCESSIBILITY: the scroll region is `role="log"` (polite, additions only)
 * and focusable for keyboard scrolling. Its name is required by the props
 * type (decision 0029): `aria-label` or `aria-labelledby`, with no default.
 * Streaming turns are `aria-busy`; because support for that varies, a
 * separate visually hidden status region also says "Responding" and
 * "Response complete" as `busy` changes.
 *
 * TOKENS USED:
 * - surface.container-stroke (ring) and surface.page (fill) when `framed`
 * - plate.round-lg, focus-ring.primary, focus-ring.width
 * - spacing 6 between turns
 */
import { type ReactNode } from "react";
/** Max width of the content column, from the Container scale (`sm` 640px, `md` 768px, `lg` 1024px). */
export type TranscriptWidth = "sm" | "md" | "lg" | "full";
interface TranscriptOwnProps {
    /** Messages, oldest first. Append new turns to the end; a streaming reply grows in place as the last child. */
    children?: ReactNode;
    /** A reply is streaming. Drives the "Responding" and "Response complete" announcements; pair it with the last Message's `status="streaming"` and the Composer's `busy`. */
    busy?: boolean;
    /** Follow new content to the bottom (default true). Following pauses while the reader is scrolled up and resumes at the bottom or from "Jump to latest". */
    autoScroll?: boolean;
    /** Shown centered when there are no children. Usually an EmptyState with starter prompts that teach what to ask. */
    emptyState?: ReactNode;
    /** Max width of the content column: `sm`, `md` (default), `lg` or `full`, on the Container scale. Use `full` inside a narrow pane. */
    width?: TranscriptWidth;
    /** Draw the plate ring, as LogView does (default false: a Transcript usually fills a pane that is already framed, such as a Window). */
    framed?: boolean;
    /** Accessible name of the log region, such as "Conversation"; this or `aria-labelledby` is required. */
    "aria-label"?: string;
    /** Id of visible text that names the log region, such as the pane title. Use it instead of `aria-label` when such text exists. */
    "aria-labelledby"?: string;
    /** Fires with `false` when following pauses (the reader scrolled up) and `true` when it resumes. */
    onFollowChange?: (following: boolean) => void;
    /** Extra classes for the wrapper. Set the height here (`h-96`) or let a flex parent size it (`min-h-0 flex-1`). */
    className?: string;
}
/** The log region's accessible name, required (decision 0029). */
type TranscriptName = {
    "aria-label": string;
} | {
    "aria-labelledby": string;
};
/** Props of `Transcript`: its own props plus a required accessible name, given as `aria-label` or `aria-labelledby`. */
export type TranscriptProps = TranscriptOwnProps & TranscriptName;
/**
 * The scrolling list of turns in a conversation. It stays pinned to the
 * newest text while a reply streams, pauses when the reader scrolls up, and
 * offers "Jump to latest". Use `LogView` for machine output with no turns.
 *
 * ```tsx
 * <Transcript aria-label="Conversation" busy={streaming} className="min-h-0 flex-1">
 *   {turns.map((t) => <Message key={t.id} author={t.author}>{t.text}</Message>)}
 * </Transcript>
 * ```
 */
export declare function Transcript({ children, busy, autoScroll, emptyState, width, framed, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, onFollowChange, className, }: TranscriptProps): import("react").JSX.Element;
export declare namespace Transcript {
    var displayName: string;
}
export {};
//# sourceMappingURL=Transcript.d.ts.map