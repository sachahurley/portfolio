/**
 * MESSAGE COMPONENT
 *
 * One turn in a conversation, drawn as a terminal transcript rather than
 * chat bubbles: every turn is full width and left aligned, and turns are told
 * apart by a role label and a gutter marker, never by side or color alone.
 *
 * - user: a ChevronRight prompt marker in the gutter and a --surface-muted
 *   plate behind the text, like a typed command.
 * - assistant: no marker, no plate; the text reads as output.
 * - system: one muted line (a mode change, "Replaying a recorded session").
 *
 * STREAMING: `status="streaming"` appends a block cursor (the full block
 * character, one cell wide in the mono stack) after the last character. It
 * is steady, not blinking: a reply can stream for longer than five seconds,
 * and blinking content that runs that long needs a way to stop it (WCAG
 * 2.2.2). A steady block is also a stable frame for visual regression. The
 * article is `aria-busy` meanwhile, so the transcript announces the finished
 * turn rather than every token.
 *
 * TOKENS USED:
 * - surface.muted (user plate; surface.subtle equals surface.page in dark,
 *   so it would vanish on the default theme), plate.round
 * - accent (prompt marker, cursor)
 * - text.primary (body), text.secondary (label, meta, system line, stopped)
 * - error AA pair 700 / 400 (error footer), as FieldMessage
 */
import { type ReactNode } from "react";
/** Who a turn is from. */
export type MessageAuthor = "user" | "assistant" | "system";
/** Where a turn is in its life. */
export type MessageStatus = "done" | "streaming" | "stopped" | "error";
export interface MessageProps {
    /** Who the turn is from: `user` (prompt marker and plate), `assistant` (plain output) or `system` (one muted line). Named `author`, not `role`, so it never collides with the ARIA attribute. */
    author: MessageAuthor;
    /** Visible role label, which also names the turn for screen readers (default "You", "Scorp" or "System"). Set it to the model or product name when that is clearer. */
    label?: ReactNode;
    /** Secondary header text after the label: a time, the model, "replayed". */
    meta?: ReactNode;
    /** `done` (default); `streaming` adds the block cursor and `aria-busy`; `stopped` adds a "Stopped" footer; `error` adds the error footer with `errorMessage`. */
    status?: MessageStatus;
    /** Footer text when `status="error"` (default "Something went wrong."). Say what failed and, with `onRetry`, that it can be retried. */
    errorMessage?: ReactNode;
    /** Adds a Retry button to the error footer. Only shown when `status="error"`. */
    onRetry?: () => void;
    /** Header actions (copy, retry, edit): ghost `size="sm"` icon-only Buttons with `type="button"` and an `aria-label`. Always rendered, never only on hover. */
    actions?: ReactNode;
    /** The turn's content. A string keeps its line breaks; nodes (paragraphs, a CodeBlock) render as given, `spacing.3` apart. */
    children: ReactNode;
    /** Anchor id, for linking to a turn. */
    id?: string;
    /** Extra classes for the article (margin). Spacing between turns belongs to `Transcript`. */
    className?: string;
}
/**
 * One turn in a conversation, drawn as a line of terminal transcript rather
 * than a chat bubble. Place Messages inside a `Transcript`, which owns the
 * scrolling and the space between turns.
 *
 * ```tsx
 * <Message author="user" meta="12:04">Make a settings screen</Message>
 * <Message author="assistant" status="streaming">Here is a settings screen</Message>
 * ```
 */
export declare function Message({ author, label, meta, status, errorMessage, onRetry, actions, children, id, className, }: MessageProps): import("react").JSX.Element;
export declare namespace Message {
    var displayName: string;
}
//# sourceMappingURL=Message.d.ts.map