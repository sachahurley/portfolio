/**
 * MODAL COMPONENT
 *
 * A reusable modal dialog component with backdrop overlay
 * Built entirely from design tokens defined in tokens.json
 *
 * FEATURES:
 * - Fixed header with title and a secondary-plate close button (always visible)
 * - Optional fixed footer band for CTAs via `footerContent`
 * - Scrollable content area (the panel is capped at 80vh; the body takes
 *   whatever is left after the header and optional footer and scrolls)
 * - Fades in on open and out on close (duration.normal); stays mounted
 *   through the exit animation and unmounts on animationend
 * - Focus trap: while modal, Tab and Shift+Tab cycle inside the panel
 * - Backdrop scrim (semi-transparent overlay)
 * - `docked` variant: at or above the `--breakpoint-docked` token (960px) the
 *   panel skips the scrim and pins bottom-center as a NON-modal dialog (no
 *   aria-modal, no scroll lock, page stays interactive), so the content behind
 *   stays in view while the dialog acts on it. Below it docked falls back to
 *   the standard centered modal, so consumers never branch on breakpoint
 *   themselves.
 * - Drop shadow using elevation tokens
 * - Click outside to close
 * - ESC key to close
 * - Full light/dark theme support
 *
 * DIMENSIONS:
 * - Width: `size` sm 360px, md 640px, lg 740px (default), full viewport
 * - Max height: 80% of viewport height
 *
 * SHAPE: the panel is a large plate (--plate-round-lg, stepped one-bit corners)
 * built with the ring recipe — outer layer is the stroke color clipped to the
 * plate, inner layer is the card fill clipped 1px inset (clip-path slices real
 * borders, so a border property cannot draw the ring).
 *
 * TOKENS USED:
 * - breakpoint.docked: the width at which `docked` takes effect
 * - surface.card, surface.container-stroke, surface.overlay
 * - text.primary (title)
 * - plate.round-lg: panel silhouette
 */
import { type ReactNode } from "react";
export interface ModalProps {
    /**
     * Whether the dialog is shown. Pass it with `onOpenChange` to control the
     * dialog: set it true to open, and false when `onOpenChange(false)` fires.
     * Omit it (and use `defaultOpen`) for a dialog that manages its own state.
     */
    open?: boolean;
    /**
     * Initial open state when `open` is not passed (default false). The dialog
     * then closes itself on Escape, the scrim or the close button.
     */
    defaultOpen?: boolean;
    /**
     * Called with `false` when the user asks to close (close button, Escape, or
     * a scrim click). Set `open` to false here when the dialog is controlled.
     */
    onOpenChange?: (open: boolean) => void;
    /** Heading in the fixed header; also the dialog's accessible name, so make it say what the dialog is for. */
    title: string;
    /** Body content. It scrolls inside the panel when it is taller than the viewport allows; header and footer stay fixed. */
    children: ReactNode;
    /**
     * Optional fixed footer for CTAs. Render DS Buttons here (e.g. a secondary
     * "Cancel" + primary confirm); actions align to the right on a subtle band.
     */
    footerContent?: ReactNode;
    /**
     * Panel width: `sm` (360px) for a short confirmation or notice, `md`
     * (640px) for a compare card or a short form, `lg` (740px, the default
     * when neither `size` nor `width` is passed) for a full task, `full` for
     * the whole viewport width. The panel never grows past the viewport.
     */
    size?: "sm" | "md" | "lg" | "full";
    /**
     * @deprecated Use `size`. Still honoured when `size` is not passed:
     * numbers are px, strings pass through.
     */
    width?: number | string;
    /**
     * Dock instead of covering: at or above the `--breakpoint-docked` token
     * (960px) the panel pins bottom-center with no scrim and no scroll lock (a
     * non-modal dialog), keeping the page behind visible and interactive. Below
     * it this is ignored and the standard centered modal renders, so the
     * responsive fallback lives here, not in the consumer.
     */
    docked?: boolean;
}
/**
 * A dialog that interrupts the page for a focused task or a confirmation; it traps focus (except when `docked`) and closes on Escape, the scrim or the close button.
 */
export declare function Modal({ open: openProp, defaultOpen, onOpenChange, title, children, footerContent, size, width, docked, }: ModalProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Modal.d.ts.map