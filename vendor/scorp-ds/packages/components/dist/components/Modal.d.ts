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
 * - Width: 740px fixed
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
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    /**
     * Optional fixed footer for CTAs. Render DS Buttons here (e.g. a secondary
     * "Cancel" + primary confirm); actions align to the right on a subtle band.
     */
    footerContent?: ReactNode;
    /**
     * Panel width (default 740). Numbers are px; strings pass through
     * (e.g. "min(320px, 90vw)"). Small celebratory dialogs want ~320.
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
 * Modal Component
 *
 * @param isOpen - Whether the modal is currently visible
 * @param onClose - Callback function triggered when user closes modal
 * @param title - Header title text
 * @param children - Modal content (will be scrollable if it exceeds max-height)
 */
export declare function Modal({ isOpen, onClose, title, children, footerContent, width, docked }: ModalProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Modal.d.ts.map