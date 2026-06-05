import { type ReactNode } from "react";
declare const gapClass: {
    readonly none: "gap-0";
    readonly "1": "gap-1";
    readonly "2": "gap-2";
    readonly "3": "gap-3";
    readonly "4": "gap-4";
    readonly "6": "gap-6";
    readonly "8": "gap-8";
};
export type StackGap = keyof typeof gapClass;
export interface StackProps {
    children: ReactNode;
    /** Maps to the spacing scale (`gap-*` utilities). */
    gap?: StackGap;
    className?: string;
    /** Default vertical stack; horizontal for toolbars / button groups. */
    axis?: "vertical" | "horizontal";
}
/**
 * Stack — vertical or horizontal layout with token-backed gap spacing.
 * Use inside screens and compound components instead of ad-hoc `flex` + raw gap values.
 */
export declare function Stack({ children, gap, className, axis }: StackProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Stack.d.ts.map