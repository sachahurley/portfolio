/**
 * BOTTOM SHEET COMPONENT
 *
 * A bottom-anchored panel, upstreamed from the portfolio's iOS-style sheet.
 * The sheet is a large plate whose top corners step (--plate-round-lg-top)
 * while the bottom edge squares off against the viewport, built with the
 * ring recipe (stroke layer + fill layer, since clip-path slices borders).
 *
 * Don't use this for: blocking confirmations (use Modal) or persistent
 * navigation. Sheets are for menus and quick actions that dismiss easily.
 *
 * FEATURES:
 * - Scrim backdrop (surface.overlay), click or ESC to close
 * - Visible close button (1-bit X, 44px target) in the top-right of the header band
 * - Focus moves onto the sheet on open and returns to the invoker on close
 * - Focus trap: Tab and Shift+Tab cycle inside the sheet (it is aria-modal)
 * - Grabber marker at the top seam. It is a static marker, NOT a drag handle:
 *   there is no swipe or drag gesture, so every dismissal path is the scrim,
 *   the close button, or Escape.
 * - Slides up with the slow duration token
 * - Body scroll is locked while open
 *
 * TOKENS USED:
 * - plate.round-lg-top (silhouette), surface.container-stroke (ring), surface.card (fill)
 * - surface.overlay (scrim), z-index.overlay / z-index.modal (layers)
 * - duration.slow (enter/exit), duration.fast (close button hover)
 * - touch.target (44px close button)
 */
import { type ReactNode } from "react";
export interface BottomSheetProps {
    /** Controls whether the sheet is visible. */
    isOpen: boolean;
    /** Called when the user dismisses the sheet (close button, scrim click or ESC). */
    onClose: () => void;
    /** Accessible name for the sheet dialog. */
    ariaLabel: string;
    /**
     * Accessible name for the close button. Override it when several sheets can
     * be announced in the same view and "Close" alone would be ambiguous.
     */
    closeLabel?: string;
    /** Sheet content. */
    children: ReactNode;
}
/**
 * BottomSheet Component
 *
 * @param isOpen - Whether the sheet is currently visible
 * @param onClose - Callback when the user dismisses (close button, scrim click or ESC)
 * @param ariaLabel - Accessible name announced for the dialog
 * @param closeLabel - Accessible name for the close button (default "Close")
 * @param children - Sheet content
 */
export declare function BottomSheet({ isOpen, onClose, ariaLabel, closeLabel, children }: BottomSheetProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=BottomSheet.d.ts.map