import { type HTMLAttributes, type ReactNode } from "react";
declare const gapClass: {
    readonly none: "gap-0";
    readonly "1": "gap-1";
    readonly "2": "gap-2";
    readonly "3": "gap-3";
    readonly "4": "gap-4";
    readonly "5": "gap-5";
    readonly "6": "gap-6";
    readonly "8": "gap-8";
};
export type StackGap = keyof typeof gapClass;
/** One layout direction: `vertical` is a column, `horizontal` a row that wraps. */
export type StackAxisValue = "vertical" | "horizontal";
/** Breakpoint names, matching the breakpoint tokens wired into the Tailwind `screens` scale. */
export type StackBreakpoint = "base" | "sm" | "md" | "lg" | "xl";
/**
 * A direction per breakpoint, mobile first. `base` is required and applies below
 * `sm` (640px); each later key applies from its breakpoint up until the next key
 * overrides it: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.
 */
export type StackResponsiveAxis = {
    base: StackAxisValue;
} & Partial<Record<Exclude<StackBreakpoint, "base">, StackAxisValue>>;
/** A fixed direction, or a direction per breakpoint (decision 0032). */
export type StackAxis = StackAxisValue | StackResponsiveAxis;
/** Cross-axis placement of children, at every breakpoint. */
export type StackAlign = "start" | "center" | "end" | "stretch";
export interface StackProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Stack contents; laid out along `axis` with `gap` between them. */
    children: ReactNode;
    /**
     * Maps to the spacing scale (`gap-*` utilities): `none` 0, `1` 4px, `2` 8px,
     * `3` 12px, `4` 16px (default), `5` 20px, `6` 24px, `8` 32px.
     */
    gap?: StackGap;
    /** Additional CSS classes (width, padding, alignment overrides). */
    className?: string;
    /**
     * Layout direction: `"vertical"` (default, a column), `"horizontal"` (a row
     * that wraps and centres its children), or a breakpoint map such as
     * `{ base: "vertical", md: "horizontal" }` (keys `base`, `sm`, `md`, `lg`,
     * `xl`; `base` required). Use the map for a split that stacks on small
     * screens and sits side by side from a breakpoint.
     */
    axis?: StackAxis;
    /**
     * Cross-axis placement of children at every breakpoint; unset, a column
     * stretches them and a row centres them. Set `stretch` on a responsive split
     * so its panes share one height once they sit side by side.
     */
    align?: StackAlign;
}
/**
 * Stack is vertical or horizontal layout with token-backed gap spacing.
 * Use inside screens and compound components instead of ad-hoc `flex` + raw gap values.
 *
 * `axis` can change at a breakpoint (`{ base: "vertical", md: "horizontal" }`), so a
 * two-pane split that stacks on phones needs no hand-written flex.
 *
 * Forwards its ref to the underlying `<div>` and spreads any extra native
 * attributes (`id`, `role`, `aria-*`, `data-*`), so a stack can be a labelled
 * region or a scroll anchor without a wrapper element.
 */
export declare const Stack: import("react").ForwardRefExoticComponent<StackProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=Stack.d.ts.map