/**
 * POPOVER COMPONENT
 *
 * An anchored floating panel: rich, interactive content that opens next to a
 * trigger (filters, a small form, a details card). It is non-modal, like a
 * disclosure: the page stays interactive, focus is never trapped, and Tab
 * moves naturally from the trigger into the panel and back out.
 *
 * POSITIONING: written in-house (no floating-ui). The panel is fixed-position
 * and placed on `side` + `align` of the anchor; it flips to the opposite side
 * when it would overflow the viewport, shifts along the anchor to stay on
 * screen, and repositions on scroll, resize and size changes. The math lives
 * in lib/position.ts (`computePosition`) and lib/use-anchored-position.ts so
 * Combobox and future menus reuse it.
 *
 * DISMISSAL: outside click, Escape, and focus leaving both trigger and panel
 * close it. Escape and trigger toggles return focus to the trigger; an
 * outside click leaves focus where the user put it.
 *
 * SHAPE: plate ring recipe (stroke layer clipped to the plate, card fill
 * clipped 1px inset), stacked on `--z-index-popover`.
 *
 * Don't use this for: short hints (use Tooltip), action lists (use
 * Dropdown), or anything that must block the page (use Modal).
 *
 * TOKENS USED:
 * - surface.container-stroke (ring), surface.card (fill), text.primary
 * - plate.round, z-index.popover, duration.fast (fade)
 */
import { type AriaRole, type ReactElement, type ReactNode, type RefObject } from "react";
import type { FloatingAlign, FloatingSide } from "../lib/position";
export type PopoverSide = FloatingSide;
export type PopoverAlign = FloatingAlign;
export interface PopoverProps {
    /** Controlled open state. Pair with `onOpenChange`; omit for uncontrolled use. */
    open?: boolean;
    /** Initial open state when uncontrolled (default false). */
    defaultOpen?: boolean;
    /** Called whenever the popover asks to open or close (trigger, Escape, outside click, blur). */
    onOpenChange?: (open: boolean) => void;
    /**
     * The element that toggles the popover, usually a `Button`. It receives
     * `aria-expanded`, `aria-controls` and `aria-haspopup`, and a click handler
     * that toggles the panel (your own `onClick` still runs first).
     */
    trigger?: ReactElement;
    /**
     * Position against an element you render yourself instead of `trigger`
     * (e.g. an input). Clicks inside the anchor never count as outside clicks.
     * You own opening and ARIA wiring in that case.
     */
    anchorRef?: RefObject<HTMLElement | null>;
    /** Panel content. */
    children: ReactNode;
    /** Preferred side of the anchor (default "bottom"). Flips when there is no room. */
    side?: PopoverSide;
    /** Alignment along the anchor edge (default "start"). */
    align?: PopoverAlign;
    /** Gap between anchor and panel in px (default 8, one plate step multiple). */
    offset?: number;
    /** Close when the user presses outside the trigger and panel (default true). */
    closeOnOutsideClick?: boolean;
    /** Close on Escape (default true). */
    closeOnEscape?: boolean;
    /**
     * Move focus into the panel on open: the first focusable element, else the
     * panel itself (default true). Set false for panels that must leave focus
     * on the anchor, like a combobox listbox.
     */
    autoFocus?: boolean;
    /** Send focus back to the trigger when closed via Escape or the trigger (default true). */
    returnFocus?: boolean;
    /** Make the panel at least as wide as the anchor (default false). */
    matchAnchorWidth?: boolean;
    /**
     * ARIA role of the panel (default "dialog", a non-modal dialog). Pass
     * `null` when the content carries its own role (a listbox, a menu).
     */
    role?: AriaRole | null;
    /** Accessible name for the panel. Required for `role="dialog"` unless `aria-labelledby` is set. */
    "aria-label"?: string;
    /** Id of a visible heading inside the panel that names it. */
    "aria-labelledby"?: string;
    /** Id for the panel; generated when omitted. */
    id?: string;
    /** Extra classes for the outer ring layer (width, max-width). */
    className?: string;
    /** Extra classes for the inner fill (padding, layout). Defaults to `p-4`. */
    contentClassName?: string;
    /**
     * Render the panel into `document.body` (default false). Turn this on
     * inside plate-clipped containers (Card, Modal): clip-path clips even
     * fixed-position descendants. Inline rendering keeps DOM order, so Tab
     * flows from the trigger into the panel; a portaled panel relies on
     * `autoFocus` instead.
     */
    portal?: boolean;
    /** Extra classes for the span that wraps `trigger`. */
    triggerWrapperClassName?: string;
}
/**
 * Popover Component
 *
 * @example
 * <Popover trigger={<Button variant="secondary">Filters</Button>} aria-label="Filters">
 *   <Checkbox label="Only open issues" />
 * </Popover>
 *
 * @param trigger - Element that toggles the panel (or use `anchorRef`)
 * @param open / defaultOpen / onOpenChange - Controlled or uncontrolled state
 * @param side / align - Preferred placement; flips and shifts to stay on screen
 * @param role - Panel role, "dialog" by default
 */
export declare function Popover({ open: openProp, defaultOpen, onOpenChange, trigger, anchorRef, children, side, align, offset, closeOnOutsideClick, closeOnEscape, autoFocus, returnFocus, matchAnchorWidth, role, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, id: idProp, className, contentClassName, triggerWrapperClassName, portal, }: PopoverProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Popover {
    var displayName: string;
}
//# sourceMappingURL=Popover.d.ts.map