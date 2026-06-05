/**
 * DROPDOWN COMPONENT
 *
 * A button that opens a menu of actions (action menu dropdown)
 * Built with accessibility in mind - keyboard navigation, ARIA attributes
 *
 * Features:
 * - Click outside to close
 * - Keyboard navigation (Arrow keys, Escape, Enter)
 * - Customizable trigger (any React element)
 * - Icon support for menu items
 * - Destructive action styling
 * - Left or right alignment
 */
import { type ReactNode } from "react";
export interface DropdownItem {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    iconRight?: ReactNode;
    variant?: "default" | "destructive";
    disabled?: boolean;
}
export interface DropdownProps {
    trigger?: ReactNode;
    items: DropdownItem[];
    align?: "left" | "right";
    label?: string;
    size?: "small" | "medium" | "large";
}
/**
 * Dropdown Component
 *
 * @param trigger - Custom trigger element (optional, defaults to button)
 * @param items - Array of menu items with labels, onClick handlers, and optional icons
 * @param align - Menu alignment: "left" or "right" (default: "left")
 * @param label - Label text for default trigger button (default: "Actions")
 */
export declare function Dropdown({ trigger, items, align, label, size }: DropdownProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Dropdown.d.ts.map