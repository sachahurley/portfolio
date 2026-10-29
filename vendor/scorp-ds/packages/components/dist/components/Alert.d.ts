/**
 * ALERT COMPONENT
 *
 * Reusable alert/notification component for user feedback
 * Built entirely from design tokens defined in tokens.json
 *
 * TONES (decision 0024's colour roles):
 * - neutral: Neutral gray alert
 * - success: Green for success messages
 * - warning: Purple for warnings
 * - error: Red for error messages
 * - info: Blue for informational messages
 * The deprecated `variant` prop still works; its `default` maps to `neutral`.
 *
 * FEATURES:
 * - Severity icon per tone from the 1-bit set: neutral Bell, info Info,
 *   success CheckCircle, warning AlertTriangle, error AlertCircle
 *   (override with iconLeft)
 * - Optional dismiss button (onDismiss prop), a 1-bit X. It is a `type="button"`
 *   control so an Alert inside a form never submits it, carries the system's
 *   inset focus ring, and gets an invisible 44x44px hit area from a
 *   pseudo-element (same recipe as Checkbox, so the visual stays 12px).
 * - Optional title and description
 * - Full light/dark theme support
 * - Accessible (ARIA attributes)
 */
import { type ReactNode } from "react";
import { type IconSlot } from "../lib/icon-slot";
/** Semantic colour role of an Alert: picks the colour set and the 1-bit severity icon. */
export type AlertTone = "neutral" | "info" | "success" | "warning" | "error";
export interface AlertProps {
    /** Severity: picks the colour set and the 1-bit severity icon. Default: "neutral". */
    tone?: AlertTone;
    /**
     * Severity under its old name; `default` maps to `neutral`. When both are set, `tone` wins.
     * @deprecated Use `tone`.
     */
    variant?: "default" | "success" | "warning" | "error" | "info";
    /** Short bold headline, one line. Say what happened, not "Error". */
    title?: string;
    /** Body copy under the title: what it means and what to do next. */
    description?: ReactNode;
    /** Replaces the tone's severity icon. Takes a TuiIcon name (`"Check"`) or an element. */
    iconLeft?: IconSlot | ReactNode;
    /** Adds a dismiss control (44px hit area) and is called when it is pressed. */
    onDismiss?: () => void;
    /**
     * Dismiss callback under its old name. When both are set, `onDismiss` wins.
     * @deprecated Use `onDismiss`.
     */
    onClose?: () => void;
    /**
     * Accessible name of the dismiss button (default "Close alert"). Name what it
     * dismisses when a page has several alerts ("Dismiss sync warning").
     */
    dismissLabel?: string;
    /** Extra classes on the outer ring layer (spacing and width only). */
    className?: string;
}
/**
 * An inline message about the state of a page or form that stays until the user acts, with an optional title, icon and dismiss button.
 *
 * @param tone - Alert colour role (default: "neutral")
 * @param title - Optional alert title
 * @param description - Optional alert description/content
 * @param iconLeft - Optional custom icon (defaults to the tone's icon)
 * @param onDismiss - Optional callback when the dismiss button is clicked
 * @param className - Additional CSS classes
 */
export declare function Alert({ tone: toneProp, variant, title, description, iconLeft, onDismiss: onDismissProp, onClose, dismissLabel, className, }: AlertProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Alert.d.ts.map