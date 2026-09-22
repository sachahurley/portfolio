import React from "react";
/**
 * TuiIcon -- Terminal UI Icon component (Tier 2)
 *
 * Every icon is 1-bit pixel art on a 7x7 grid (TUI_ICON_BITMAPS), drawn as
 * crisp SVG squares. One art pixel is 2px at the default size, the same
 * 2px step the plates and the portfolio's Urizen tiles use; larger sizes
 * step in whole pixels so edges never blur. The odd grid gives every icon a
 * true center column, so 1-pixel lines stay symmetric.
 *
 * TUI_ICON_GLYPHS keeps each icon's Unicode form for plain-text contexts
 * (tui-art frames, terminal-style strings); those render consistently via
 * the Scorp Symbols face in --font-family-mono.
 */
/**
 * Unicode text form of each icon name (Lucide-compatible keys), for plain-text
 * contexts. TuiIcon itself renders the bitmaps in {@link TUI_ICON_BITMAPS}.
 */
export declare const TUI_ICON_GLYPHS: {
    readonly AlertCircle: "⚠";
    readonly AlertTriangle: "⚠";
    readonly Archive: "✇";
    readonly ArrowLeft: "←";
    readonly ArrowRight: "→";
    readonly Bell: "♪";
    readonly Check: "✓";
    readonly CheckCircle: "✓";
    readonly ChevronDown: "▼";
    readonly ChevronRight: "▶";
    readonly ChevronUp: "▲";
    readonly Copy: "⎘";
    readonly Download: "⤓";
    readonly Edit: "✎";
    readonly ExternalLink: "↗";
    readonly Eye: "◉";
    readonly EyeOff: "◌";
    readonly FileText: "☷";
    readonly Globe: "⊕";
    readonly HelpCircle: "?";
    readonly Info: "i";
    readonly Lock: "☖";
    readonly LogOut: "→";
    readonly Mail: "✉";
    readonly Moon: "☾";
    readonly MoreVertical: "⋮";
    readonly Music2: "♫";
    readonly Pause: "⏸";
    readonly Play: "▶";
    readonly Plus: "+";
    readonly Repeat: "↻";
    readonly Save: "⤓";
    readonly Search: "⌕";
    readonly Send: "➤";
    readonly Settings: "⚙";
    readonly Share2: "↗";
    readonly Shield: "☖";
    readonly Shuffle: "⇄";
    readonly SkipBack: "⏮";
    readonly SkipForward: "⏭";
    readonly Star: "★";
    readonly Sun: "☀";
    readonly Tag: "⌂";
    readonly Trash2: "✗";
    readonly Upload: "⤒";
    readonly User: "@";
    readonly Volume2: "♫";
    readonly VolumeX: "✖";
    readonly X: "✕";
};
/** Keys of {@link TUI_ICON_GLYPHS} — use for typed catalogs or selects. */
export type TuiIconName = keyof typeof TUI_ICON_GLYPHS;
/**
 * The 1-bit icon set: seven rows of seven pixels each, `#` on and `.` off.
 * Keyed by every {@link TuiIconName}, so a name without a bitmap is a type
 * error. Filled silhouettes with knocked-out detail (the ! in AlertTriangle)
 * follow the Urizen 1-bit tileset the portfolio uses.
 */
export declare const TUI_ICON_BITMAPS: Record<TuiIconName, readonly string[]>;
/** Icon box sizes, named after the Tailwind size number (4 = 16px). */
export type TuiIconSize = "3" | "4" | "5" | "6" | "8";
export interface TuiIconProps {
    /** Icon name -- must match a key in {@link TUI_ICON_GLYPHS} (same as the Lucide component name). */
    name: string;
    /** Box size as a Tailwind size number: "3" (12px), "4" (16px, default), "5" (20px), "6" (24px), "8" (32px). */
    size?: TuiIconSize;
    /** Additional CSS classes (color, margin, etc.) */
    className?: string;
}
export declare const TuiIcon: React.FC<TuiIconProps>;
export default TuiIcon;
//# sourceMappingURL=TuiIcon.d.ts.map