/**
 * TABS — WAI-ARIA tablist / tab / tabpanel pattern for switching related views.
 * TUI-friendly: sharp corners, monospace, underline-style selection on the tab strip.
 */
import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
export interface TabsProps {
    /** Selected panel id (controlled). */
    value?: string;
    /** Initial panel when uncontrolled; use `undefined` to auto-select the first tab. */
    defaultValue?: string;
    /** Fires when the active tab changes. */
    onValueChange?: (value: string) => void;
    /** One `TabsList` followed by a `TabsContent` for each trigger. */
    children: ReactNode;
    /** Extra classes on the wrapper (width, spacing between the strip and panels). */
    className?: string;
}
/**
 * Root tabs container. Provide either controlled `value` + `onValueChange`, or `defaultValue`.
 */
export declare function Tabs({ value: valueProp, defaultValue, onValueChange, children, className, }: TabsProps): import("react/jsx-runtime").JSX.Element;
export interface TabsListProps {
    /** The `TabsTrigger` buttons, in the order the arrow keys move through them. */
    children: ReactNode;
    /** Extra classes on the tab strip (alignment, overflow). */
    className?: string;
    /** Accessible name for the tab strip (pass this or `aria-labelledby`). */
    "aria-label"?: string;
    /** Id of a visible heading that names the tab strip; use it instead of `aria-label` when such a heading exists. */
    "aria-labelledby"?: string;
}
/**
 * Tab buttons row. Direct children should be `TabsTrigger` elements only (order defines keyboard flow).
 */
export declare function TabsList({ children, className, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, }: TabsListProps): import("react/jsx-runtime").JSX.Element;
export declare namespace TabsList {
    var displayName: string;
}
export type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Id matching a `TabsContent` `value`. */
    value: string;
    /** The tab's label: a short noun for the panel it opens, optionally with an icon. */
    children: ReactNode;
};
/**
 * Tab button. Icon-only triggers should set `aria-label` (native button prop).
 */
export declare const TabsTrigger: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Id matching a `TabsContent` `value`. */
    value: string;
    /** The tab's label: a short noun for the panel it opens, optionally with an icon. */
    children: ReactNode;
} & React.RefAttributes<HTMLButtonElement>>;
export interface TabsContentProps {
    /** Id of this panel; the `TabsTrigger` with the same `value` opens it. */
    value: string;
    /** The panel's content, shown while its tab is selected. */
    children: ReactNode;
    /** Extra classes on the panel (padding, a min-height so the layout does not jump between tabs). */
    className?: string;
    /** Keep inactive panels mounted (hidden) so form state is preserved. */
    forceMount?: boolean;
}
/**
 * Panel for the matching `value`. Renders nothing when inactive unless `forceMount`.
 */
export declare function TabsContent({ value, children, className, forceMount }: TabsContentProps): import("react/jsx-runtime").JSX.Element | null;
export declare namespace TabsContent {
    var displayName: string;
}
//# sourceMappingURL=Tabs.d.ts.map