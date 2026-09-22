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
 * - Optional close button (onClose prop), a 1-bit X
 * - Optional title and description
 * - Full light/dark theme support
 * - Accessible (ARIA attributes)
 */
import { type ReactNode } from "react";
export interface AlertProps {
    variant?: "default" | "success" | "warning" | "error" | "info";
    title?: string;
    description?: ReactNode;
    iconLeft?: ReactNode;
    onClose?: () => void;
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