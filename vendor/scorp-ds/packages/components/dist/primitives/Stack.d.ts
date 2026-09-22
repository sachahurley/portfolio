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
    /** Default vertical stack; horizontal for toolbars / button groups. */
    axis?: "vertical" | "horizontal";
}
/**
 * Stack — vertical or horizontal layout with token-backed gap spacing.
 * Use inside screens and compound components instead of ad-hoc `flex` + raw gap values.
 *
 * Forwards its ref to the underlying `<div>` and spreads any extra native
 * attributes (`id`, `role`, `aria-*`, `data-*`), so a stack can be a labelled
 * region or a scroll anchor without a wrapper element.
 */
export declare const Stack: import("react").ForwardRefExoticComponent<StackProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=Stack.d.ts.map