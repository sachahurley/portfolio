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
 * - icon: DEPRECATED alias for a 40px square. Icon-only buttons are detected
 *   automatically and squared at every size, so use `size="md"` instead.
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
import { type ControlSizeProp } from "../lib/size";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Visual style (default: "primary"). One primary per view; "link" is an
     * action styled as text (navigate with `Link` instead); "icon" is the
     * square icon plate, pair it with `aria-label`.
     */
    variant?: "primary" | "secondary" | "ghost" | "link" | "outline" | "destructive" | "icon";
    /**
     * Height: sm 32px, md 40px (default), lg 48px, from the control-height
     * tokens. Legacy small/medium/large still work (deprecated). Icon-only buttons
     * are squared automatically. `"icon"` is deprecated: use "md".
     */
    size?: ControlSizeProp | "icon";
    /** Disables the button (anchors drop `href` and set `aria-disabled`). */
    disabled?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    /**
     * Render as an `<a>` with this destination instead of a `<button>` — same
     * plate styling for link CTAs ("view project ↗"). Disabled anchors drop the
     * href and set `aria-disabled`.
     */
    href?: string;
    /** Anchor target (only with `href`), e.g. "_blank". */
    target?: string;
    /** Anchor rel (only with `href`); pair `target="_blank"` with "noopener noreferrer". */
    rel?: string;
    /**
     * Busy state for async actions (submitting, saving). Shows a Spinner over
     * the label, sets `aria-busy` and `aria-disabled`, and ignores clicks. The
     * button stays focusable (no native `disabled`, so focus isn't dropped
     * mid-submit) and keeps its width: the label is hidden in place, not
     * removed. Works for icon-only buttons too. `disabled` wins over `loading`.
     */
    loading?: boolean;
}
/**
 * Button Component
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
//# sourceMappingURL=Button.d.ts.map