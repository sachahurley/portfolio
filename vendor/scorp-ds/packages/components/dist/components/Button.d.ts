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
 * - small: 32px height
 * - medium: 40px height (default)
 * - large: 48px height
 */
import { type ButtonHTMLAttributes } from "react";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "link" | "outline" | "destructive" | "icon";
    size?: "small" | "medium" | "large" | "icon";
    disabled?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
}
/**
 * Button Component
 *
 * @param variant - Button style variant (default: "primary")
 * @param size - Button size (default: "medium")
 * @param disabled - Whether button is disabled
 * @param className - Additional CSS classes to apply
 * @param children - Button content (text, icons, etc.)
 * @param iconLeft - Icon element to display on the left side of text
 * @param iconRight - Icon element to display on the right side of text
 *
 * Icon-only usage: pass `aria-label` or `aria-labelledby` (standard button attributes) so assistive tech has an accessible name.
 */
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Button.d.ts.map