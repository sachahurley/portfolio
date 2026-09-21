/**
 * BADGE COMPONENT
 *
 * Reusable badge/tag component for labels, status indicators, and counts
 * Built entirely from design tokens defined in tokens.json
 *
 * VARIANTS:
 * - default: Neutral gray badge
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
 * - small: Compact badge (20px height)
 * - medium: Standard badge (24px height, default)
 * - large: Larger badge (28px height)
 *
 * FEATURES:
 * - Optional close button (onClose prop)
 * - Icon support (iconLeft prop)
 * - caps: uppercase eyebrow voice (uppercase + .08em tracking) for state
 *   chips ("EQUIPPED", "LEVEL UP") without per-site className overrides
 * - dashed: the not-yet-real voice — transparent fill with a dashed
 *   hairline for placeholders, empty slots, and free tiers ("FREE").
 *   Composes with any variant; the dash rides the variant's text color,
 *   except bone whose dash stays theme-stable sepia-500.
 * - Full light/dark theme support
 */
import { type ReactNode } from "react";
export interface BadgeProps {
    variant?: "default" | "primary" | "success" | "warning" | "error" | "info" | "bone";
    size?: "small" | "medium" | "large";
    /** Uppercase eyebrow voice: uppercase text with .08em tracking. */
    caps?: boolean;
    /**
     * Not-yet-real voice: transparent fill with a 1px dashed border in the
     * variant's text color, for placeholders, empty slots, and free tiers.
     * Dashed chips drop the plate clip for sharp corners (the notched clip
     * would slice the dashes).
     */
    dashed?: boolean;
    children: ReactNode;
    iconLeft?: ReactNode;
    onClose?: () => void;
    className?: string;
}
/**
 * Badge Component
 *
 * @param variant - Badge color variant (default: "default")
 * @param size - Badge size (default: "medium")
 * @param children - Badge content (text, numbers, etc.)
 * @param iconLeft - Optional icon to display on the left
 * @param onClose - Optional callback when close button is clicked
 * @param className - Additional CSS classes
 */
export declare function Badge({ variant, size, caps, dashed, children, iconLeft, onClose, className, }: BadgeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Badge.d.ts.map