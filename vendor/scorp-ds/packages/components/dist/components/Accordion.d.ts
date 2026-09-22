/**
 * ACCORDION COMPONENT
 *
 * Stacked sections whose bodies expand and collapse under their headings.
 * Use it to shorten long pages of optional detail (FAQs, settings groups,
 * spec sheets). Don't hide content most people need; show that inline.
 *
 * API (compound):
 *   <Accordion type="single" collapsible defaultValue="shipping">
 *     <AccordionItem value="shipping">
 *       <AccordionTrigger>Shipping</AccordionTrigger>
 *       <AccordionContent>Ships in 2 days.</AccordionContent>
 *     </AccordionItem>
 *   </Accordion>
 *
 * - type="single": one item open at a time. Add `collapsible` to let the
 *   open item close again; without it, the open trigger is aria-disabled.
 * - type="multiple": any number open; value is a string array.
 * - Controlled via `value` + `onValueChange`, or uncontrolled via `defaultValue`.
 *
 * ACCESSIBILITY (WAI-ARIA accordion pattern): each trigger is a button
 * inside a heading (`headingLevel`, default 3) with aria-expanded and
 * aria-controls; each body is a region labelled by its trigger. Enter and
 * Space toggle; ArrowDown / ArrowUp move between triggers (wrapping), Home /
 * End jump to the first / last.
 *
 * MOTION: the body height animates on a grid-rows transition over
 * duration.normal (200ms) and the 1-bit ChevronRight rotates to point down.
 * Both are instant under prefers-reduced-motion. Collapsed bodies are
 * visibility-hidden, so they leave the tab order and accessibility tree.
 *
 * TOKENS USED:
 * - border.hairline (item dividers), surface.subtle (trigger hover)
 * - text.primary, text.secondary, focus.ring.primary (inset focus ring)
 * - duration.normal, duration.fast
 */
import { type ReactNode } from "react";
interface AccordionBaseProps {
    /** AccordionItem children. */
    children: ReactNode;
    /** Heading level wrapping each trigger, to fit the page outline (default 3). */
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    /** Disable every item. */
    disabled?: boolean;
    /** Extra classes for the root. */
    className?: string;
}
export interface AccordionSingleProps extends AccordionBaseProps {
    /** One item open at a time (default). */
    type?: "single";
    /** Controlled open item value (`""` for none). Pair with `onValueChange`. */
    value?: string;
    /** Initially open item when uncontrolled. */
    defaultValue?: string;
    /** Called with the open item's value (`""` when all are closed). */
    onValueChange?: (value: string) => void;
    /** Allow closing the open item so none are open (default false). */
    collapsible?: boolean;
}
export interface AccordionMultipleProps extends AccordionBaseProps {
    /** Any number of items open at once. */
    type: "multiple";
    /** Controlled open item values. Pair with `onValueChange`. */
    value?: string[];
    /** Initially open items when uncontrolled. */
    defaultValue?: string[];
    /** Called with the open item values. */
    onValueChange?: (value: string[]) => void;
    /** Always true for multiple; accepted for API symmetry. */
    collapsible?: boolean;
}
export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
/**
 * Accordion root. Holds which items are open and the keyboard roving
 * between triggers.
 *
 * @param type - "single" (default) or "multiple"
 * @param collapsible - Single mode: allow closing the open item
 * @param value / defaultValue / onValueChange - Controlled or uncontrolled
 * @param headingLevel - Heading element wrapping each trigger (default 3)
 */
export declare function Accordion(props: AccordionProps): import("react/jsx-runtime").JSX.Element;
export interface AccordionItemProps {
    /** Unique value identifying this item within the Accordion. */
    value: string;
    /** Disable just this item. */
    disabled?: boolean;
    /** AccordionTrigger and AccordionContent. */
    children: ReactNode;
    /** Extra classes for the item wrapper. */
    className?: string;
}
/** One section: a trigger plus its content. */
export declare function AccordionItem({ value, disabled, children, className }: AccordionItemProps): import("react/jsx-runtime").JSX.Element;
export interface AccordionTriggerProps {
    /** Section title. Keep it short; it is the heading text. */
    children: ReactNode;
    /** Extra classes for the button. */
    className?: string;
}
/** The heading button that toggles its item. */
export declare function AccordionTrigger({ children, className }: AccordionTriggerProps): import("react/jsx-runtime").JSX.Element;
export interface AccordionContentProps {
    /** Section body. */
    children: ReactNode;
    /** Extra classes for the inner padding box. */
    className?: string;
}
/** The collapsible body, a region labelled by its trigger. */
export declare function AccordionContent({ children, className }: AccordionContentProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Accordion.d.ts.map