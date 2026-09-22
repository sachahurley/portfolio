/**
 * BREADCRUMBS COMPONENT
 *
 * Shows where the current page sits in a hierarchy: a `<nav>` landmark
 * wrapping an ordered list of links, ending on the current page. Separators
 * are the 1-bit ChevronRight icon (hidden from assistive tech, the list
 * semantics already convey order).
 *
 * COLLAPSE: when `maxItems` is set and the trail is longer, the middle
 * items fold into a single overflow button. Activating it expands the trail
 * in place and moves focus to the first revealed link, so keyboard users
 * never lose their position.
 *
 * ROUTING: each item renders through `Link` (variant "quiet"), so an item
 * can be a plain `href` or a router link via `as` / `asProps`, the same
 * polymorphism Link and ListRow use.
 *
 * TOKENS USED:
 * - accent / text.link-hover (via Link), text.primary (current page)
 * - text.secondary (separators), surface.muted (overflow hover fill)
 * - plate.round (overflow button silhouette), focus inset ring
 * - touch.target (44px hit areas on links and the overflow button)
 */
import { type ElementType, type ReactNode } from "react";
/** One step in the trail. The last item is always treated as the current page. */
export interface BreadcrumbItem {
    /** Visible text for this step. Keep it short; long labels truncate. */
    label: ReactNode;
    /** Destination for ancestor steps. Ignored on the last (current) item. */
    href?: string;
    /**
     * Custom link component (e.g. a router `<Link>`) used instead of `<a href>`.
     * Its props go in `asProps` (`to`, `state`, ...).
     */
    as?: ElementType;
    /** Props spread onto the `as` component. */
    asProps?: Record<string, unknown>;
    /** Stable React key. Defaults to the index. */
    key?: string;
}
export interface BreadcrumbsProps {
    /** Trail from the root to the current page (last item = current page). */
    items: BreadcrumbItem[];
    /**
     * Collapse the middle of the trail once it has more than this many items.
     * Leave unset to always show every item.
     */
    maxItems?: number;
    /** Items kept visible before the overflow button when collapsed (default 1). */
    itemsBeforeCollapse?: number;
    /** Items kept visible after the overflow button when collapsed (default 1). */
    itemsAfterCollapse?: number;
    /**
     * Accessible name for the overflow button; receives the hidden count.
     * Default: "Show 3 more breadcrumbs".
     */
    expandLabel?: (hiddenCount: number) => string;
    /** Accessible name of the nav landmark (default "Breadcrumb"). */
    "aria-label"?: string;
    /** Extra classes for the `<nav>`. */
    className?: string;
}
/**
 * Breadcrumbs
 *
 * ```tsx
 * <Breadcrumbs
 *   maxItems={4}
 *   items={[
 *     { label: "Home", href: "/" },
 *     { label: "Projects", href: "/projects" },
 *     { label: "Scorp DS" },
 *   ]}
 * />
 * ```
 */
export declare function Breadcrumbs({ items, maxItems, itemsBeforeCollapse, itemsAfterCollapse, expandLabel, "aria-label": ariaLabel, className, }: BreadcrumbsProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Breadcrumbs {
    var displayName: string;
}
//# sourceMappingURL=Breadcrumbs.d.ts.map