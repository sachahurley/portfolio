import React from "react";
/**
 * TuiIcon -- Terminal UI Icon component (Tier 2)
 *
 * Replaces Lucide SVG icons with Unicode characters for a true
 * terminal aesthetic. Each icon name maps to a single Unicode glyph
 * rendered in a monospace font at the same sizes Lucide used
 * (w-4 h-4, w-5 h-5, w-6 h-6).
 */
/**
 * Canonical Unicode glyph for each supported icon name (Lucide-compatible keys).
 * Exported for catalogs, tooling, and tests — keep in sync with {@link TuiIcon}.
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
    readonly Copy: "⎘";
    readonly Download: "⤓";
    readonly Edit: "✎";
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
    readonly Plus: "+";
    readonly Save: "⤓";
    readonly Search: "⌕";
    readonly Send: "➤";
    readonly Settings: "⚙";
    readonly Share2: "↗";
    readonly Shield: "☖";
    readonly Star: "★";
    readonly Sun: "☀";
    readonly Tag: "⌂";
    readonly Trash2: "✗";
    readonly Upload: "⤒";
    readonly User: "@";
    readonly Volume2: "♫";
    readonly VolumeX: "✖";
    readonly X: "✗";
};
/** Keys of {@link TUI_ICON_GLYPHS} — use for typed catalogs or selects. */
export type TuiIconName = keyof typeof TUI_ICON_GLYPHS;
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