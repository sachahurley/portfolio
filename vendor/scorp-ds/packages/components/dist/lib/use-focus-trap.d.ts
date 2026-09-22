/**
 * Focus trap for modal surfaces (Modal, BottomSheet).
 *
 * A dialog with `aria-modal="true"` promises that nothing behind it is
 * reachable, so Tab and Shift+Tab have to cycle inside the panel. This hook
 * implements that promise without a runtime dependency: it listens for Tab on
 * the capture phase while the trap is active and, when focus would step past
 * either end of the container, sends it to the other end instead.
 *
 * It deliberately does NOT move focus on mount or restore it on unmount, so it
 * composes with the focus-on-open / focus-return-on-close effects the dialogs
 * already run. Pass `active: false` for non-modal surfaces (Modal's `docked`
 * variant) so they keep letting focus flow to the page behind them.
 */
import { type RefObject } from "react";
/** Tab stops inside `container`, in DOM order, skipping hidden subtrees. */
export declare function getTabbableElements(container: HTMLElement): HTMLElement[];
/**
 * Cycles Tab and Shift+Tab within `containerRef` while `active` is true.
 *
 * @param containerRef - The dialog panel; it should carry `tabIndex={-1}` so it
 *   can hold focus before the user Tabs anywhere.
 * @param active - Whether the trap runs. False for non-modal surfaces.
 */
export declare function useFocusTrap(containerRef: RefObject<HTMLElement | null>, active: boolean): void;
//# sourceMappingURL=use-focus-trap.d.ts.map