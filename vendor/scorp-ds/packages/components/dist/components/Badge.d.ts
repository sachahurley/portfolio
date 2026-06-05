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
 *
 * SIZES:
 * - small: Compact badge (20px height)
 * - medium: Standard badge (24px height, default)
 * - large: Larger badge (28px height)
 *
 * FEATURES:
 * - Optional close button (onClose prop)
 * - Icon support (iconLeft prop)
 * - Full light/dark theme support
 */
import { type ReactNode } from "react";
export interface BadgeProps {
    variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
    size?: "small" | "medium" | "large";
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
export declare function Badge({ variant, size, children, iconLeft, onClose, className, }: BadgeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Badge.d.ts.map