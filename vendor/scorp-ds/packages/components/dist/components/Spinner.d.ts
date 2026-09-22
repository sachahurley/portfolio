/**
 * SPINNER COMPONENT
 *
 * TUI loading indicator in the 1-bit icon language: eight square dots on an
 * 8x8 pixel grid (the terminal "dots" spinner, drawn as crisp SVG squares
 * like TuiIcon) with a two-dot gap that steps around the ring. Frames step,
 * they never ease, so the motion hops on the pixel grid like the plates.
 * It paints with `currentColor`, so inside a Button, a Toast, or a table
 * cell it takes on that surface's text color.
 *
 * SIZES (box matches the TuiIcon scale; whole-pixel steps keep edges sharp):
 * - sm: 12px, for inline text and 32px controls
 * - md: 16px (default), for 40px controls
 * - lg: 24px, for 48px controls and empty states
 *
 * ACCESSIBILITY:
 * - role="status" with a visually hidden `label` (default "Loading"), so a
 *   screen reader hears what is loading once, not the frames.
 * - The graphic is aria-hidden.
 * - prefers-reduced-motion: the spinner holds a static frame (the full
 *   ring) instead of cycling.
 *
 * TOKENS USED: color inherits (currentColor); no timing token applies to a
 * continuous loop, so the frame interval is a structural constant.
 */
import { type ControlSizeProp } from "../lib/size";
export interface SpinnerProps {
    /** Box size: sm 12px (inline, 32px controls), md 16px (default), lg 24px (48px controls, empty states). */
    size?: ControlSizeProp;
    /**
     * What is loading, read by screen readers and never shown (default "Loading").
     * Be specific when several things load at once: "Loading invoices".
     */
    label?: string;
    /** Extra classes for the wrapper, e.g. a text color (`text-[var(--text-secondary)]`). */
    className?: string;
}
/**
 * Spinner Component
 *
 * Use for waits of unknown length. For a button that is submitting, prefer
 * `<Button loading>`, which places a Spinner for you and keeps the button's
 * width stable.
 *
 * @param size - sm | md | lg (default: "md")
 * @param label - Visually hidden status text (default: "Loading")
 * @param className - Extra wrapper classes (color, margin)
 */
export declare function Spinner({ size: sizeProp, label, className }: SpinnerProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Spinner {
    var displayName: string;
}
//# sourceMappingURL=Spinner.d.ts.map