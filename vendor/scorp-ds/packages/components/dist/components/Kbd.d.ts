/**
 * KBD COMPONENT
 *
 * Inline keyboard key: shortcut hints in menus, help text, and command
 * palettes. Renders `<kbd>`; a combo (`keys={["Ctrl", "K"]}`) renders the
 * HTML-recommended nested form, an outer `<kbd>` holding one `<kbd>` per
 * key, with a visible "+" separator that screen readers also read.
 *
 * SHAPE: each key is a small plate using the ring recipe (stroke layer +
 * fill inset 1px), with a 2px bottom lip so it reads as a keycap.
 *
 * SIZES: sm (20px keys, text-xs, default) for inline text and menus; md
 * (24px keys, text-sm) for standalone hints.
 *
 * TOKENS USED:
 * - surface.container-stroke (ring and lip), surface.muted (key fill)
 * - text.primary (key text), text.secondary (separator)
 * - plate.round
 */
import { type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
export interface KbdProps {
    /**
     * Keys of a combo, in press order (`["Ctrl", "Shift", "P"]`). Takes
     * precedence over `children`.
     */
    keys?: string[];
    /** A single key label when `keys` is not used. */
    children?: ReactNode;
    /** Key size: sm 20px (default) or md 24px. */
    size?: Extract<ControlSizeProp, "sm" | "md" | "small" | "medium">;
    /** Visible separator between combo keys (default "+"). */
    separator?: ReactNode;
    /** Extra classes for the outer `<kbd>`. */
    className?: string;
}
/**
 * Kbd
 *
 * ```tsx
 * <p>Open the palette with <Kbd keys={["Ctrl", "K"]} />.</p>
 * <Kbd>Esc</Kbd>
 * ```
 */
export declare function Kbd({ keys, children, size: sizeProp, separator, className }: KbdProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Kbd {
    var displayName: string;
}
//# sourceMappingURL=Kbd.d.ts.map