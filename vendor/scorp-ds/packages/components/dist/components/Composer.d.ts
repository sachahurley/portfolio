/**
 * COMPOSER COMPONENT
 *
 * The prompt box of a chat surface: a multi-line field that grows with its
 * content from `minRows` to `maxRows`, sends on Enter (Shift+Enter breaks
 * the line), and turns its send button into a stop button while a reply is
 * streaming. Field and actions share one plate, so it reads as a command
 * line rather than a form with a button parked beside it.
 *
 * SHAPE: Textarea's plate ring recipe on the large plate. The ring wrapper
 * is the border color clipped to --plate-round-lg; the fill layer is
 * clipped 1px inset and holds the context row, the field and the action
 * row. The ring walks the same ramp: idle hairline, hover, focus accent.
 *
 * FOCUS: a colour change only, as in every text field (decision 0022): the
 * 1px ring turns --field-border-focus while the textarea has focus, and
 * focus wins over error. The ring follows the textarea, not the whole form,
 * so tabbing on to an action or the send button shows only that button's
 * own inset ring instead of lighting both.
 *
 * NAME: the field's accessible name is required by the props type
 * (decision 0029): a visible `label`, an `aria-label` or an
 * `aria-labelledby`. There is no default name.
 *
 * KEYBOARD: `submitKey="enter"` (default) sends on Enter and breaks the line
 * on Shift+Enter; `"mod-enter"` sends on Cmd/Ctrl+Enter and leaves Enter
 * alone. Enter never sends during IME composition. While `busy`, Enter does
 * not send; the field stays editable so the next message can be drafted.
 *
 * TOKENS USED:
 * - field.background / field.background-error (fill)
 * - field.border / -hover / -focus / -error (ring)
 * - field.placeholder, text.primary, text.secondary (hint)
 * - plate.round-lg
 * - duration.fast (ring transition)
 */
import { type ReactNode } from "react";
import type { ControlSize } from "../lib/size";
/** Which key combination sends. */
export type ComposerSubmitKey = "enter" | "mod-enter";
/** Composer sizes. There is no `sm`: a 32px prompt cannot hold the action row at a 44px touch target. */
export type ComposerSize = Extract<ControlSize, "md" | "lg">;
interface ComposerOwnProps {
    /** Controlled text. Pair with `onValueChange`; the parent clears it after a send. */
    value?: string;
    /** Starting text when uncontrolled (default ""). An uncontrolled Composer clears itself after a send. */
    defaultValue?: string;
    /** Fires on every edit with the new text, and with "" when an uncontrolled Composer clears itself after a send. */
    onValueChange?: (value: string) => void;
    /**
     * Fires with the trimmed text on Enter (per `submitKey`) or the send
     * button, only when the text is not blank and the Composer is neither
     * `busy` nor `disabled`.
     */
    onSubmit: (value: string) => void;
    /**
     * A reply is streaming. With `onStop` the send button becomes a stop
     * button; without it, send shows Button's loading state. Enter does not
     * send, but the field stays editable so the next message can be drafted.
     */
    busy?: boolean;
    /** Called by the stop button while `busy`. Pass it whenever the reply can be cancelled. */
    onStop?: () => void;
    /** `enter` (default): Enter sends, Shift+Enter breaks the line. `mod-enter`: Cmd/Ctrl+Enter sends, for long multi-paragraph messages. */
    submitKey?: ComposerSubmitKey;
    /** Rows shown when empty (default 1). Raise it where messages are usually long. */
    minRows?: number;
    /** Rows the field grows to before it scrolls instead (default 8). */
    maxRows?: number;
    /** Type size, padding and send button size: `md` (default), or `lg` for a prompt that leads the page. */
    size?: ComposerSize;
    /** Row of chips above the field for what the message refers to: attachments, referenced components (`@Card`). */
    context?: ReactNode;
    /** Leading actions in the action row (attach, insert): ghost icon-only Buttons with `type="button"` and an `aria-label`. More than three belong in a menu. */
    actions?: ReactNode;
    /** Text before the send button, linked to the field as its description. Defaults to the shortcut for `submitKey`; `false` hides it. Hidden below `sm`. */
    hint?: ReactNode | false;
    /** Placeholder text (default "Message"). Never the only description of the field: it vanishes as soon as someone types. */
    placeholder?: string;
    /** Visible label above the plate, wired to the field; one of `label`, `aria-label` or `aria-labelledby` is required. A chat pane usually uses `aria-label` instead. */
    label?: ReactNode;
    /** Accessible name of the field when there is no visible label, such as "Message"; one of `label`, `aria-label` or `aria-labelledby` is required. Wins over `label`. */
    "aria-label"?: string;
    /** Id of visible text elsewhere that names the field, such as the pane title. Wins over `label` and `aria-label`. */
    "aria-labelledby"?: string;
    /** Hint under the plate (a character limit, why typing is off), linked as a description. Hidden while `errorMessage` is set. */
    helperText?: ReactNode;
    /** Error under the plate. Sets the error ring and fill and `aria-invalid`, and replaces `helperText`. */
    errorMessage?: ReactNode;
    /** Disables the field, the actions and the send button together (one disabled fieldset) and dims the plate to 50%. Use it when typing is off, not while a reply streams (use `busy`). */
    disabled?: boolean;
    /** Native character limit on the field. Say what the limit is in `helperText`. */
    maxLength?: number;
    /** Accessible name of the send button (default "Send message"). */
    sendLabel?: string;
    /** Accessible name of the stop button (default "Stop response"). */
    stopLabel?: string;
    /** Field `name`, for native form handling. */
    name?: string;
    /** Extra classes for the ring wrapper (margin). Width comes from the parent. */
    className?: string;
}
/** The field's accessible name, required (decision 0029). */
type ComposerName = {
    label: ReactNode;
} | {
    "aria-label": string;
} | {
    "aria-labelledby": string;
};
/** Props of `Composer`: its own props plus a required accessible name, given as `label`, `aria-label` or `aria-labelledby`. */
export type ComposerProps = ComposerOwnProps & ComposerName;
/**
 * The prompt box of a chat surface: type a request, Enter sends it, and the
 * send button becomes stop while the reply streams. Use `Textarea` in forms,
 * where Enter must insert a line break.
 *
 * ```tsx
 * <Composer aria-label="Message" onSubmit={send} busy={streaming} onStop={stop} />
 * ```
 */
export declare const Composer: import("react").ForwardRefExoticComponent<ComposerProps & import("react").RefAttributes<HTMLTextAreaElement>>;
export {};
//# sourceMappingURL=Composer.d.ts.map