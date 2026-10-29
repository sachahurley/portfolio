/**
 * CODE BLOCK COMPONENT
 *
 * Read-only code: a snippet in a chat reply, the generated source of a
 * layout, a config file. A title bar (file name or language, a hairline rule
 * filling the gap as in Window, and a copy button), then the code on the
 * page fill, with optional line numbers and highlighted lines. Same frame as
 * LogView, so code and logs read as the same kind of surface.
 *
 * NO SYNTAX COLORS (v1): the token set has no syntax roles yet, and inventing
 * them here would break the semantic-aliases-only rule (decision 0006).
 *
 * COPY: writes `code` to the clipboard, shows "Copied" (or "Copy failed")
 * for two seconds and announces it through a polite status region. The
 * button is not rendered when the Clipboard API is unavailable.
 *
 * TOKENS USED:
 * - surface.container-stroke (ring, title rule), surface.page (code fill)
 * - surface.muted (highlighted lines), accent (highlight marker)
 * - text.primary (code), text.secondary (title, line numbers)
 * - plate.round-lg, focus-ring.primary, focus-ring.width
 */
import { type ReactNode } from "react";
export interface CodeBlockProps {
    /** The code, as one string with `\n` line breaks. Rendered as text, never as HTML, so it is safe for generated source. */
    code: string;
    /** Language name ("tsx", "json"). A label only for now (no syntax colors); also set as `data-language`, and the title when `title` is unset. */
    language?: string;
    /** Title bar text, usually the file name ("settings-screen.tsx"). Defaults to `language`. */
    title?: ReactNode;
    /** Show a gutter of 1-based line numbers (default false), for code people will discuss by line. Numbers are hidden from screen readers and from copying. */
    showLineNumbers?: boolean;
    /** 1-based lines to mark with a muted row and a gutter marker (never color alone), for the lines an answer is about. */
    highlightLines?: number[];
    /** Wrap long lines instead of scrolling horizontally (default false). Turn on for prose-like content such as JSON in a narrow pane. */
    wrap?: boolean;
    /** Show the copy button (default true). It is not rendered without the Clipboard API. */
    copyable?: boolean;
    /** Fires with the code after a successful copy, for analytics or a toast. */
    onCopy?: (code: string) => void;
    /** Draw the plate ring (default true). Set false inside a Window body or a tab panel that already frames it. */
    framed?: boolean;
    /** Accessible name of the block. Defaults to the title when it is text, else the language, else "Code"; set it when the title is a node. */
    "aria-label"?: string;
    /** Extra classes for the figure. Cap the height here (`max-h-96`); the code then scrolls. */
    className?: string;
}
/**
 * Read-only code in a terminal frame: a title bar with the file name and a
 * copy button, then the code with optional line numbers and highlighted
 * lines. Use `LogView` for streaming output and `Kbd` for keys in a sentence.
 *
 * ```tsx
 * <CodeBlock title="settings-screen.tsx" language="tsx" code={source} showLineNumbers />
 * ```
 */
export declare function CodeBlock({ code, language, title, showLineNumbers, highlightLines, wrap, copyable, onCopy, framed, "aria-label": ariaLabel, className, }: CodeBlockProps): import("react").JSX.Element;
export declare namespace CodeBlock {
    var displayName: string;
}
//# sourceMappingURL=CodeBlock.d.ts.map