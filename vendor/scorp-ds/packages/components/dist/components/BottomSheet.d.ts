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
interface BottomSheetBaseProps {
    /**
     * Whether the sheet is shown. Pass it with `onOpenChange` to control the
     * sheet: set it true to open, and false when `onOpenChange(false)` fires.
     * Omit it (and use `defaultOpen`) for a sheet that manages its own state.
     */
    open?: boolean;
    /**
     * Initial open state when `open` is not passed (default false). The sheet
     * then closes itself on Escape, the scrim or the close button.
     */
    defaultOpen?: boolean;
    /**
     * Called with `false` when the user dismisses the sheet (close button, scrim
     * click or Escape). Set `open` to false here when the sheet is controlled.
     */
    onOpenChange?: (open: boolean) => void;
    /** @deprecated Use `open`. Still honoured when `open` is not passed. */
    isOpen?: boolean;
    /** @deprecated Use `onOpenChange`. Still called whenever `onOpenChange(false)` is. */
    onClose?: () => void;
    /**
     * Accessible name for the close button. Override it when several sheets can
     * be announced in the same view and "Close" alone would be ambiguous.
     */
    closeLabel?: string;
    /** Sheet content. */
    children: ReactNode;
}
/** Names the sheet with `aria-label` (the current prop). */
interface BottomSheetNamedProps extends BottomSheetBaseProps {
    /** Accessible name announced for the sheet dialog, e.g. "Site menu". Required. */
    "aria-label": string;
    /** @deprecated Use `aria-label`. Ignored when `aria-label` is passed. */
    ariaLabel?: string;
}
/** Names the sheet with the deprecated `ariaLabel`, so existing callers still type-check. */
interface BottomSheetLegacyNamedProps extends BottomSheetBaseProps {
    /** Accessible name announced for the sheet dialog, e.g. "Site menu". Required. */
    "aria-label"?: string;
    /** @deprecated Use `aria-label`. Ignored when `aria-label` is passed. */
    ariaLabel: string;
}
/**
 * Props for `BottomSheet`. An accessible name is required: pass `aria-label`
 * (or, deprecated, `ariaLabel`).
 */
export type BottomSheetProps = BottomSheetNamedProps | BottomSheetLegacyNamedProps;
/**
 * A modal panel that slides up from the bottom edge, for short tasks and option lists on narrow screens.
 *
 * @example
 * <BottomSheet open={open} onOpenChange={setOpen} aria-label="Site menu">
 *   <nav>...</nav>
 * </BottomSheet>
 */
export declare function BottomSheet({ open: openProp, defaultOpen, onOpenChange, isOpen: isOpenProp, onClose, "aria-label": ariaLabelProp, ariaLabel: legacyAriaLabel, closeLabel, children, }: BottomSheetProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=BottomSheet.d.ts.map