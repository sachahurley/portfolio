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
    children: ReactNode;
    className?: string;
}
/**
 * Root tabs container. Provide either controlled `value` + `onValueChange`, or `defaultValue`.
 */
export declare function Tabs({ value: valueProp, defaultValue, onValueChange, children, className, }: TabsProps): import("react/jsx-runtime").JSX.Element;
export interface TabsListProps {
    children: ReactNode;
    className?: string;
    /** Accessible name for the tab strip (pass this or `aria-labelledby`). */
    "aria-label"?: string;
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
    children: ReactNode;
};
/**
 * Tab button. Icon-only triggers should set `aria-label` (native button prop).
 */
export declare const TabsTrigger: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Id matching a `TabsContent` `value`. */
    value: string;
    children: ReactNode;
} & React.RefAttributes<HTMLButtonElement>>;
export interface TabsContentProps {
    value: string;
    children: ReactNode;
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