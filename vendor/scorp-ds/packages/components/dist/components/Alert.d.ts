/**
 * ALERT COMPONENT
 *
 * Reusable alert/notification component for user feedback
 * Built entirely from design tokens defined in tokens.json
 *
 * VARIANTS:
 * - default: Neutral gray alert
 * - success: Green for success messages
 * - warning: Purple for warnings
 * - error: Red for error messages
 * - info: Blue for informational messages
 *
 * FEATURES:
 * - Severity icon per variant from the 1-bit set: default Bell, info Info,
 *   success CheckCircle, warning AlertTriangle, error AlertCircle
 *   (override with iconLeft)
 * - Optional close button (onClose prop), a 1-bit X. It is a `type="button"`
 *   control so an Alert inside a form never submits it, carries the system's
 *   inset focus ring, and gets an invisible 44x44px hit area from a
 *   pseudo-element (same recipe as Checkbox, so the visual stays 12px).
 * - Optional title and description
 * - Full light/dark theme support
 * - Accessible (ARIA attributes)
 */
import { type ReactNode } from "react";
export interface AlertProps {
    /** Severity: picks the color set and the 1-bit severity icon. */
    variant?: "default" | "success" | "warning" | "error" | "info";
    /** Short bold headline, one line. Say what happened, not "Error". */
    title?: string;
    /** Body copy under the title: what it means and what to do next. */
    description?: ReactNode;
    /** Replaces the variant's severity icon. Use a `TuiIcon`. */
    iconLeft?: ReactNode;
    /** Adds a dismiss control (44px hit area) and is called when it is pressed. */
    onClose?: () => void;
    /** Extra classes on the outer ring layer (spacing and width only). */
    className?: string;
}
/**
 * Alert Component
 *
 * @param variant - Alert color variant (default: "default")
 * @param title - Optional alert title
 * @param description - Optional alert description/content
 * @param iconLeft - Optional custom icon (defaults to variant icon)
 * @param onClose - Optional callback when close button is clicked
 * @param className - Additional CSS classes
 */
export declare function Alert({ variant, title, description, iconLeft, onClose, className, }: AlertProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Alert.d.ts.map