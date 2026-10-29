/**
 * BADGE COMPONENT
 *
 * Reusable badge/tag component for labels, status indicators, and counts
 * Built entirely from design tokens defined in tokens.json
 *
 * TONES (decision 0024's colour roles, plus Badge's own primary and bone):
 * - neutral: Neutral gray badge
 * - primary: Amber/primary brand color
 * - success: Green for positive states
 * - warning: Purple for warnings
 * - error: Red for errors
 * - info: Blue for informational messages
 * - bone: filled sepia-500 chip, identical in both themes — the
 *   tier-neutral state marker for surfaces that must not ride the accent
 *   or re-theme (the portfolio's equipped/loot chips)
 *
 * SIZES:
 * - sm: Compact badge (20px height)
 * - md: Standard badge (24px height, default)
 * - lg: Larger badge (28px height)
 *
 * FEATURES:
 * - Optional remove button (onDismiss prop, named by dismissLabel)
 * - Icon support (iconLeft prop)
 * - caps: uppercase eyebrow voice (uppercase + .08em tracking) for state
 *   chips ("EQUIPPED", "LEVEL UP") without per-site className overrides
 * - dashed: the not-yet-real voice — transparent fill with a dashed
 *   hairline for placeholders, empty slots, and free tiers ("FREE").
 *   Composes with any tone; the dash rides the tone's text color,
 *   except bone whose dash stays theme-stable sepia-500.
 * - Full light/dark theme support
 */
import { type ReactNode } from "react";
import type { ControlSize } from "../lib/size";
import { type IconSlot } from "../lib/icon-slot";
/**
 * Colour role of a Badge: the five semantic roles plus Badge's own `primary`
 * (the brand accent) and `bone` (a fixed tint that never follows the theme).
 */
export type BadgeTone = "neutral" | "info" | "success" | "warning" | "error" | "primary" | "bone";
export interface BadgeProps {
    /** Colour role. Pair a semantic role with text that says the same thing, since colour alone is not enough; `bone` is a fixed tint that never follows the theme. Default: "neutral". */
    tone?: BadgeTone;
    /** Badge height: sm 20px, md 24px (default), lg 28px. */
    size?: ControlSize;
    /** Uppercase eyebrow voice: uppercase text with .08em tracking. */
    caps?: boolean;
    /**
     * Not-yet-real voice: transparent fill with a 1px dashed border in the
     * tone's text color, for placeholders, empty slots, and free tiers.
     * Dashed chips drop the plate clip for sharp corners (the notched clip
     * would slice the dashes).
     */
    dashed?: boolean;
    /** The label: a word, a short phrase or a number. Keep it to one line. */
    children: ReactNode;
    /** Icon before the label, to reinforce the meaning of a status badge. Takes a TuiIcon name (`"Check"`) or an element. */
    iconLeft?: IconSlot | ReactNode;
    /** Adds a remove (x) button that calls this when pressed. Use it for filter chips and tags the user can clear. */
    onDismiss?: () => void;
    /**
     * Accessible name for the remove button. Defaults to `Remove {children}`
     * when the badge label is a plain string (so a list of filter chips reads as
     * "Remove Draft", "Remove Archived"), and to "Remove badge" otherwise. Pass
     * it explicitly whenever the label alone does not identify what is removed.
     */
    dismissLabel?: string;
    /** Extra classes on the badge (margin, alignment). */
    className?: string;
}
/**
 * A short status, category or count label set beside other content; with `onDismiss` it becomes a removable chip (a filter, a tag).
 */
export declare function Badge({ tone, size, caps, dashed, children, iconLeft, onDismiss, dismissLabel, className, }: BadgeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Badge.d.ts.map