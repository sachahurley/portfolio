/**
 * LINK COMPONENT
 *
 * Inline text link for navigation. Always renders a real anchor (or a custom
 * router link via `as`), never a button: links navigate, buttons act. Use
 * `Button` with `href` for plate-shaped link CTAs; use `Link` inside prose,
 * captions, and nav lists.
 *
 * VARIANTS:
 * - inline (default): persistent underline, the safe treatment inside body
 *   text (color is never the sole indicator of a link)
 * - quiet: underline only on hover/focus, for nav lists and footers where
 *   position already signals the link
 *
 * There is no disabled state by design: a link with no destination is just
 * text, so render text instead.
 *
 * TOKENS USED:
 * - accent: resting link color ("Brand accent: links, active nav" per the
 *   token docs; also what ListRow interactive titles use, and what theme
 *   eggs override at runtime). text.link's rest value predates the merged
 *   identity and is NOT used here.
 * - text.link-hover: hover color (darkens in light, brightens in dark)
 * - focus.ring.primary + --focus-ring-width/--focus-ring-offset: outside
 *   outline (links are not plate-clipped, so outside outlines are safe;
 *   buttons need inset rings because the clip slices them off)
 * - duration.fast: hover color transition
 */
import { type AnchorHTMLAttributes, type ElementType, type ReactNode } from "react";
type CommonProps = {
    /**
     * Visual treatment. `inline` (default) keeps a persistent underline so the
     * link reads inside body text without relying on color alone; `quiet`
     * underlines only on hover/focus, for nav lists and footers where position
     * already signals the link.
     */
    variant?: "inline" | "quiet";
    /**
     * Marks an external destination: opens in a new tab (`target="_blank"`,
     * `rel="noopener noreferrer"`, both overridable), appends the ExternalLink
     * glyph, and announces "(opens in new tab)" to screen readers. Behaves the
     * same in the `as` form: the new-tab attributes are passed to the custom
     * component (router links forward them to the anchor they render), and
     * anything in `asProps` overrides them.
     */
    external?: boolean;
    /** Additional CSS classes (size, margin, color overrides). */
    className?: string;
    /** Link text. Keep it descriptive of the destination; avoid bare "here". */
    children: ReactNode;
};
export type LinkProps = CommonProps & (({
    href: string;
    as?: never;
    asProps?: never;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">)
/**
 * Custom link component (e.g. a router <Link>): rendered with identical
 * styling and `asProps` spread onto it (`to`, `state`, ...), so
 * client-side navigation works without a full page load.
 */
 | {
    as: ElementType;
    asProps?: Record<string, unknown>;
    href?: never;
});
/**
 * Link Component
 *
 * Renders an `<a href>` by default, or a custom component via `as`/`asProps`
 * (mirrors the `ListRow` polymorphism, so router links work the same way in
 * both).
 *
 * @param variant - "inline" (persistent underline, default) or "quiet"
 * @param external - Open in a new tab with the external glyph and SR notice
 * @param children - Descriptive link text
 */
export declare const Link: import("react").ForwardRefExoticComponent<LinkProps & import("react").RefAttributes<HTMLAnchorElement>>;
export {};
//# sourceMappingURL=Link.d.ts.map