/**
 * TOAST COMPONENT
 *
 * Transient feedback plates, upstreamed from the portfolio's XP toaster.
 * A Toast is a small plate (ring recipe: ring layer + fill inset 1px) that
 * rises from the bottom edge on a stepped transition: steps(), not an ease,
 * so the plate hops on the pixel grid like the rest of the system's art.
 *
 * Don't use this for: errors that require action (use Alert), or anything
 * the user must read before continuing (use Modal).
 *
 * TWO WAYS TO DRIVE IT:
 * 1. Imperative (recommended): mount `<Toaster />` once near the app root,
 *    then call `toast("Saved")`, `toast.success(...)`, `toast.error(...)`
 *    from anywhere, including outside React. `useToast()` exposes the same
 *    queue to components that want to read it.
 * 2. Controlled (original API): `<Toaster toasts={...} onDismiss={...} />`
 *    renders a queue the app owns. Items only auto-dismiss when they set a
 *    `duration`, so existing callers keep their own timing.
 *
 * VARIANTS: default | success | warning | error | info, with the same 1-bit
 * severity icons and semantic colors as Alert (default Bell, info Info,
 * success CheckCircle, warning AlertTriangle, error AlertCircle).
 *
 * TIMING: imperative toasts auto-dismiss after 5000ms; the timer pauses while
 * the plate is hovered or holds focus, and `duration: Infinity` persists
 * the toast (it then shows a dismiss button so keyboard users can close it).
 *
 * ACCESSIBILITY: the region is `aria-live="polite"`; error toasts are
 * `role="alert"` (announced immediately), all others `role="status"`.
 *
 * TOKENS USED:
 * - plate.round (silhouette); default: border.hairline (ring), surface.muted (fill)
 * - variants: success / warning / error / info 50, 300, 700, 950 scales (as Alert)
 * - text.primary, duration.normal + steps(5) (motion), focus.ring.*
 * - z-index.popover (toasts stack above modals by decision)
 */
import { type ReactNode } from "react";
/** Severity of a toast; picks the icon, colors, and live-region role. */
export type ToastVariant = "default" | "success" | "warning" | "error" | "info";
/** A single inline action on a toast, e.g. `{ label: "Undo", onClick: restore }`. */
export interface ToastAction {
    /** Short verb shown as the button text ("Undo", "Retry", "View"). */
    label: string;
    /** Runs when the action is pressed; the toast dismisses itself afterwards. */
    onClick: () => void;
}
/** A single toast entry rendered by the Toaster region. */
export interface ToastItem {
    /** Stable key for the toast (also used by dismissal callbacks). */
    id: string | number;
    /** Toast content. Keep it to one short line. */
    message: ReactNode;
    /** Severity (default: "default"). "error" is announced assertively. */
    variant?: ToastVariant;
    /** Optional inline action, such as Undo. */
    action?: ToastAction;
    /**
     * Milliseconds before auto-dismiss; `Infinity` persists. Omit on
     * controlled items to keep managing timing yourself.
     */
    duration?: number;
}
export interface ToasterProps {
    /**
     * Controlled mode: the toasts to render, oldest first (the newest renders
     * closest to the screen edge). Omit to render the imperative `toast()` queue.
     */
    toasts?: ToastItem[];
    /**
     * Controlled mode: called when a toast is clicked, its action runs, or its
     * `duration` elapses. Ignored in imperative mode (the queue dismisses itself).
     */
    onDismiss?: (id: ToastItem["id"]) => void;
}
export interface ToastProps {
    /** Toast content. Keep it to one short line. */
    children: ReactNode;
    /** Called when the plate is clicked (pointer shortcut; wire to dismiss). */
    onClick?: () => void;
    /** Severity (default: "default"): icon, colors, and `role` (error = alert). */
    variant?: ToastVariant;
    /** Optional inline action button, such as Undo. Pressing it also dismisses. */
    action?: ToastAction;
    /**
     * Auto-dismiss after this many ms, paused on hover and focus. `Infinity`
     * persists and shows a dismiss button. Needs `onDismiss`.
     */
    duration?: number;
    /** Removes the toast (timer, action, or the dismiss button call it). */
    onDismiss?: () => void;
}
/**
 * A single toast plate. Usually rendered via `Toaster`, but exported for
 * custom placements. Announced via `role="status"` (`role="alert"` for errors).
 */
export declare function Toast({ children, onClick, variant, action, duration, onDismiss }: ToastProps): import("react/jsx-runtime").JSX.Element;
/** Options for `toast()`; everything but the message is optional. */
export interface ToastOptions {
    /** Severity (default: "default"). The `toast.success()` style helpers set it for you. */
    variant?: ToastVariant;
    /** Optional inline action, such as Undo. */
    action?: ToastAction;
    /** Milliseconds before auto-dismiss (default 5000); `Infinity` persists. */
    duration?: number;
    /** Reuse an id to replace a toast in place (e.g. "Saving..." then "Saved"). */
    id?: ToastItem["id"];
}
type ShowToast = (message: ReactNode, options?: Omit<ToastOptions, "variant">) => ToastItem["id"];
/** The `toast` function plus its severity helpers and `dismiss`. */
export interface ToastApi {
    /** Queues a toast and returns its id. Needs a mounted `<Toaster />` to be seen. */
    (message: ReactNode, options?: ToastOptions): ToastItem["id"];
    /** Queues a success toast (CheckCircle, green). */
    success: ShowToast;
    /** Queues a warning toast (AlertTriangle, purple). */
    warning: ShowToast;
    /** Queues an error toast (AlertCircle, red), announced with `role="alert"`. */
    error: ShowToast;
    /** Queues an info toast (Info, blue). */
    info: ShowToast;
    /** Removes one toast by id, or every toast when called without one. */
    dismiss: (id?: ToastItem["id"]) => void;
}
declare function dismiss(id?: ToastItem["id"]): void;
/**
 * Queue a toast from anywhere. Render `<Toaster />` once (no props) to show them.
 *
 * @example
 * toast("Link copied");
 * toast.success("Profile saved");
 * toast.error("Upload failed", { action: { label: "Retry", onClick: retry } });
 * toast("Item deleted", { action: { label: "Undo", onClick: restore }, duration: 8000 });
 * const id = toast("Syncing", { duration: Infinity }); toast.dismiss(id);
 */
export declare const toast: ToastApi;
/**
 * Reads the imperative toast queue from a component (e.g. to render a
 * custom region or show a count). Returns the live `toasts` plus the same
 * `toast` and `dismiss` functions exported at module level.
 */
export declare function useToast(): {
    toasts: ToastItem[];
    toast: ToastApi;
    dismiss: typeof dismiss;
};
/**
 * Fixed toast region, bottom-center. Screen readers hear new toasts via the
 * polite live region (errors assertively via `role="alert"`); pointer users
 * can click a plate to dismiss it.
 *
 * - `<Toaster />`: renders the imperative `toast()` queue.
 * - `<Toaster toasts={...} onDismiss={...} />`: renders a queue the app owns.
 *
 * @param toasts - Controlled queue; omit for the imperative queue
 * @param onDismiss - Controlled dismissal callback
 */
export declare function Toaster({ toasts, onDismiss }: ToasterProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Toast.d.ts.map