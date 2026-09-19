/**
 * TOAST COMPONENT
 *
 * Transient feedback plates, upstreamed from the portfolio's XP toaster.
 * A Toast is a small plate (ring recipe: hairline ring + muted fill) that
 * rises from the bottom edge on a stepped transition — steps(), not an ease,
 * so the plate hops on the pixel grid like the rest of the system's art.
 *
 * Don't use this for: errors that require action (use Alert), or anything
 * the user must read before continuing (use Modal).
 *
 * TOKENS USED:
 * - plate.round (silhouette), border.hairline (ring), surface.muted (fill)
 * - text.primary, duration.normal + steps(5) (motion)
 * - z-index.popover (toasts stack above modals by decision)
 */
import { type ReactNode } from "react";
/** A single toast entry rendered by the Toaster region. */
export interface ToastItem {
    /** Stable key for the toast (also used by dismissal callbacks). */
    id: string | number;
    /** Toast content — keep it to one short line. */
    message: ReactNode;
}
export interface ToasterProps {
    /** Toasts to render, oldest first; the newest renders closest to the screen edge. */
    toasts: ToastItem[];
    /** Called when a toast's plate is clicked (wire to your dismiss/queue logic). */
    onDismiss?: (id: ToastItem["id"]) => void;
}
/**
 * A single toast plate. Usually rendered via `Toaster`, but exported for
 * custom placements. Announced politely via `role="status"`.
 */
export declare function Toast({ children, onClick }: {
    children: ReactNode;
    onClick?: () => void;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Fixed toast region, bottom-center. Screen readers are told about new
 * toasts via the polite live region; pointer users can click a plate to
 * dismiss it when `onDismiss` is wired.
 *
 * @param toasts - The queue to render (state lives in the app, not here)
 * @param onDismiss - Optional click-to-dismiss callback
 */
export declare function Toaster({ toasts, onDismiss }: ToasterProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Toast.d.ts.map