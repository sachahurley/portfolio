/**
 * DROPDOWN COMPONENT
 *
 * A button that opens a menu of actions (action menu dropdown)
 * Built with accessibility in mind - keyboard navigation, ARIA attributes
 *
 * Features:
 * - Click outside to close
 * - Keyboard navigation (Arrow keys, Escape, Enter, Tab closes)
 * - Customizable trigger (any React element)
 * - Icon support for menu items
 * - Destructive action styling
 * - Left or right alignment
 *
 * Every button here is `type="button"`, so a Dropdown inside a `<form>`
 * opens the menu instead of submitting the form.
 */
import { type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
export interface DropdownItem {
    /** Item text and accessible name. Write it as a verb ("Duplicate"). */
    label: string;
    /** Called on activation; the menu then closes. */
    onClick: () => void;
    /** Left icon grouped with the label (use a `TuiIcon`). */
    icon?: ReactNode;
    /** Right-aligned icon, for a shortcut hint or an external-link marker. */
    iconRight?: ReactNode;
    /** `destructive` colors the item red for irreversible actions. */
    variant?: "default" | "destructive";
    /** Dims the item, blocks activation, and skips it during arrow-key navigation. */
    disabled?: boolean;
}
export interface DropdownProps {
    /**
     * Custom trigger, replacing the default button. A valid React element is
     * cloned: the toggle handler, `aria-haspopup` and `aria-expanded` are
     * attached to the element itself, so pass an interactive, focusable control
     * (a `Button`, for example) and not a bare `<span>`. Anything that is not an
     * element (a string, a fragment, an array) falls back to a `div` wrapper
     * with `role="button"` and `tabIndex={0}`.
     */
    trigger?: ReactNode;
    /** Menu entries, in order. */
    items: DropdownItem[];
    /** Which trigger edge the menu aligns to. Use `right` near the viewport edge. */
    align?: "left" | "right";
    /** Text (and accessible name) of the default trigger button. Ignored with a custom `trigger`. */
    label?: string;
    /** Trigger height, matching Button/Input: sm, md (default), lg. Legacy names are deprecated aliases. */
    size?: ControlSizeProp;
}
/**
 * Dropdown Component
 *
 * @param trigger - Custom trigger element (optional, defaults to button)
 * @param items - Array of menu items with labels, onClick handlers, and optional icons
 * @param align - Menu alignment: "left" or "right" (default: "left")
 * @param label - Label text for default trigger button (default: "Actions")
 * @param size - Default trigger height and item icon size (default: "md")
 */
export declare function Dropdown({ trigger, items, align, label, size: sizeProp }: DropdownProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Dropdown.d.ts.map