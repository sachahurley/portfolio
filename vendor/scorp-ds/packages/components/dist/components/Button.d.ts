/**
 * BUTTON COMPONENT
 *
 * Reusable button component with multiple variants and sizes
 * Built entirely from design tokens defined in tokens.json
 *
 * VARIANTS (fills from semantic CSS variables in tokens.css — theme switches via `.dark`):
 * - primary: gold CTA fill · secondary: the quiet plate that flips to gold on hover
 * - ghost / outline / destructive / link: same semantic layer
 * - icon: square plate using `--button-icon-*` (background, hover, text, disabled)
 *
 * SHAPE: every button is clipped to the plate silhouette (--plate-round, stepped
 * one-bit corners). The clip swallows outside focus outlines, so focus renders as
 * an INSET ring (box-shadow) using the --focus-ring-* tokens. The outline variant
 * uses the ring recipe (element = border color clipped, ::before = opaque fill
 * clipped 1px inset) so its border walks the stepped corners like every other
 * bordered plate; its fill is the page surface, not transparent.
 *
 * SIZES: All defined in tokens.json
 * - sm: 32px height
 * - md: 40px height (default)
 * - lg: 48px height
 * Icon-only buttons are detected automatically and squared at every size.
 *
 * ICON-ONLY BUTTONS: `variant` picks the look, `size` picks the dimension.
 * `variant="icon"` is the dedicated icon plate (`--button-icon-*`); any other
 * variant with only an icon child is also squared.
 *
 * LINK VARIANT vs `Link`: `variant="link"` is a BUTTON that looks like text,
 * for in-place actions ("Forgot password?", "Show more"). For navigation to
 * another page, use the `Link` component so it has anchor semantics.
 */
import { type ButtonHTMLAttributes } from "react";
import type { ControlSize } from "../lib/size";
import { type IconSlot } from "../lib/icon-slot";
/** Props every Button takes, whether it renders a `<button>` or an `<a>`. */
interface ButtonBaseProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "rel"> {
    /**
     * Visual style (default: "primary"). One primary per view; "link" is an
     * action styled as text (navigate with `Link` instead); "icon" is the
     * square icon plate, pair it with `aria-label`.
     */
    variant?: "primary" | "secondary" | "ghost" | "link" | "outline" | "destructive" | "icon";
    /**
     * Height: sm 32px, md 40px (default), lg 48px, from the control-height
     * tokens. Icon-only buttons are squared automatically.
     */
    size?: ControlSize;
    /** Disables the button (anchors drop `href` and set `aria-disabled`). */
    disabled?: boolean;
    /**
     * Icon before the label, usually a `TuiIcon`, to make the action quicker to
     * recognise ("+ New"). For an icon-only button, pass the icon as `children`
     * instead (the button squares itself) and give it an `aria-label`. Takes a TuiIcon name (`"Check"`) or an element.
     */
    iconLeft?: IconSlot | React.ReactNode;
    /**
     * Icon after the label, for direction or destination (an arrow on "Next", an
     * external-link glyph on a link CTA). Takes a TuiIcon name (`"Check"`) or an element.
     */
    iconRight?: IconSlot | React.ReactNode;
    /**
     * Busy state for async actions (submitting, saving). Shows a Spinner over
     * the label, sets `aria-busy` and `aria-disabled`, and ignores clicks. The
     * button stays focusable (no native `disabled`, so focus isn't dropped
     * mid-submit) and keeps its width: the label is hidden in place, not
     * removed. Works for icon-only buttons too. `disabled` wins over `loading`.
     */
    loading?: boolean;
}
/** The link form: `href` turns the button into an `<a>`, and only then do `target` and `rel` apply. */
interface ButtonLinkProps {
    /**
     * Render as an `<a>` with this destination instead of a `<button>`: same
     * plate styling for link CTAs ("view project ↗"). Disabled anchors drop the
     * href and set `aria-disabled`.
     */
    href: string;
    /** Anchor target, e.g. "_blank". Only accepted together with `href`. */
    target?: string;
    /** Anchor rel; pair `target="_blank"` with "noopener noreferrer". Only accepted together with `href`. */
    rel?: string;
}
/** The button form: no `target` or `rel`, since they mean nothing without `href`. */
interface ButtonActionProps {
    /** A destination that may be undefined: a defined value still renders an `<a>`. To pass `target` or `rel`, `href` must be a definite string. */
    href?: string;
    /** Not accepted without `href`: an anchor target means nothing on a `<button>`. */
    target?: never;
    /** Not accepted without `href`: an anchor rel means nothing on a `<button>`. */
    rel?: never;
}
/**
 * Button props. `target` and `rel` type-check only alongside a string `href`
 * (the link form); everything else is shared by both forms.
 */
export type ButtonProps = ButtonBaseProps & (ButtonLinkProps | ButtonActionProps);
/**
 * The control for triggering an action, or for navigating when given `href`; pick the `variant` by the action's weight on the page.
 *
 * @param variant - Button style variant (default: "primary")
 * @param size - Button size (default: "md")
 * @param disabled - Whether button is disabled
 * @param className - Additional CSS classes to apply
 * @param children - Button content (text, icons, etc.)
 * @param iconLeft - Icon element to display on the left side of text
 * @param iconRight - Icon element to display on the right side of text
 * @param loading - Busy state: Spinner over the label, clicks ignored, stays focusable
 *
 * Icon-only usage: pass `aria-label` or `aria-labelledby` (standard button attributes) so assistive tech has an accessible name.
 */
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=Button.d.ts.map