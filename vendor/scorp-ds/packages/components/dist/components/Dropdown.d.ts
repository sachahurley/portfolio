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
 * - Start or end alignment (`align`)
 *
 * Every button here is `type="button"`, so a Dropdown inside a `<form>`
 * opens the menu instead of submitting the form.
 */
import { type ReactNode } from "react";
import type { ControlSize } from "../lib/size";
import { type IconSlot } from "../lib/icon-slot";
export interface DropdownItem {
    /** Item text and accessible name. Write it as a verb ("Duplicate"). */
    label: string;
    /** Called on activation; the menu then closes. */
    onClick: () => void;
    /** Left icon grouped with the label. Takes a TuiIcon name (`"Check"`) or an element. */
    icon?: IconSlot | ReactNode;
    /** Right-aligned icon, for a shortcut hint or an external-link marker. Takes a TuiIcon name (`"Check"`) or an element. */
    iconRight?: IconSlot | ReactNode;
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
    /**
     * Which trigger edge the menu lines up with (default "start", the leading
     * edge). Use `end` for a trigger at the trailing edge of a row or header, so
     * the menu opens inward.
     */
    align?: "start" | "end";
    /** Text (and accessible name) of the default trigger button. Ignored with a custom `trigger`. */
    label?: string;
    /** Trigger height, matching Button/Input: sm, md (default), lg. */
    size?: ControlSize;
}
/**
 * A button that opens a menu of commands; for choosing a form value use `Select` instead.
 *
 * @param trigger - Custom trigger element (optional, defaults to button)
 * @param items - Array of menu items with labels, onClick handlers, and optional icons
 * @param align - Menu alignment: "start" or "end" (default: "start")
 * @param label - Label text for default trigger button (default: "Actions")
 * @param size - Default trigger height and item icon size (default: "md")
 */
export declare function Dropdown({ trigger, items, align, label, size }: DropdownProps): import("react").JSX.Element;
//# sourceMappingURL=Dropdown.d.ts.map