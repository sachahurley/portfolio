import React from "react";
/**
 * TuiIcon -- Terminal UI Icon component (Tier 2)
 *
 * Every icon is drawn as inline SVG on a 16px grid in the plate language:
 * 2px strokes, square caps, miter joins, filled forms only where filled is
 * the convention (media controls, star). Drawing instead of typing a glyph
 * makes icons identical on every OS: Fragment Mono lacks nearly all symbol
 * glyphs, so typed icons fell back to per-platform system fonts.
 *
 * TUI_ICON_GLYPHS keeps each icon's Unicode form for plain-text contexts
 * (tui-art frames, terminal-style strings); those render consistently via
 * the Scorp Symbols face in --font-family-mono.
 */
/**
 * Unicode text form of each icon name (Lucide-compatible keys), for plain-text
 * contexts. TuiIcon itself renders the drawings in {@link TUI_ICON_DRAWINGS}.
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
/** One icon: `stroke` paths draw at 2px in currentColor, `fill` paths fill solid. */
interface IconDrawing {
    stroke?: string;
    fill?: string;
}
/**
 * The drawn icon set, 16x16 viewBox. Keyed by every {@link TuiIconName}, so
 * adding a glyph name without a drawing is a type error.
 */
export declare const TUI_ICON_DRAWINGS: Record<TuiIconName, IconDrawing>;
export interface TuiIconProps {
    /** Icon name -- must match a key in {@link TUI_ICON_GLYPHS} (same as the Lucide component name). */
    name: string;
    /** Tailwind size number: "3" | "4" | "5" | "6" | "8". Defaults to "4". */
    size?: string;
    /** Additional CSS classes (color, margin, etc.) */
    className?: string;
}
export declare const TuiIcon: React.FC<TuiIconProps>;
export default TuiIcon;
//# sourceMappingURL=TuiIcon.d.ts.map