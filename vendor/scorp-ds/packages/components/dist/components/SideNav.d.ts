/**
 * SIDE NAV COMPONENT (navigation rail)
 *
 * The Patterns/SideNavigation recipe as a component: plate rows on a
 * container surface. Idle rows are quiet secondary text; hover fills the
 * plate with surface.muted and flips the text to the accent; the active
 * route holds that state (fill + color, never color alone, never weight)
 * and carries `aria-current="page"`.
 *
 * COMPOUND API:
 *   <SideNav aria-label="Primary">
 *     <SideNavSection heading="Workspace">
 *       <SideNavItem icon="Star" label="Home" href="/" active />
 *       <SideNavItem icon="Settings" label="Settings">
 *         <SideNavItem label="Profile" href="/settings/profile" />
 *       </SideNavItem>
 *     </SideNavSection>
 *   </SideNav>
 *
 * An item with child items becomes a collapsible group: its row is a
 * button with `aria-expanded` / `aria-controls`, and it starts expanded
 * when it contains the active item.
 *
 * COLLAPSED MODE: `collapsed` shrinks the rail to icon-only rows. Labels
 * move into each row's accessible name (`aria-label`) and a Tooltip, and
 * section headings become screen-reader only.
 *
 * TOKENS USED:
 * - surface.container (rail), border.hairline (rail edge)
 * - surface.muted (hover / active fill), accent (hover / active text)
 * - text.secondary (idle rows, section headings)
 * - plate.round, focus inset ring, duration.fast, touch.target (row height)
 */
import { type ElementType, type MouseEvent, type ReactNode } from "react";
import { type TuiIconName } from "./TuiIcon";
export interface SideNavProps {
    /**
     * Accessible name for the nav landmark, e.g. "Primary". Required when the
     * page has more than one `<nav>`.
     */
    "aria-label"?: string;
    /** Icon-only rail: labels become accessible names plus tooltips. */
    collapsed?: boolean;
    /** SideNavSection and/or SideNavItem children. */
    children: ReactNode;
    /** Extra classes for the `<nav>` (width, height, borders). */
    className?: string;
}
/**
 * Navigation rail root. Renders a `<nav>` on the container surface. Children
 * are SideNavSection groups, or SideNavItem rows directly.
 */
export declare function SideNav({ "aria-label": ariaLabel, collapsed, children, className }: SideNavProps): import("react/jsx-runtime").JSX.Element;
export declare namespace SideNav {
    var displayName: string;
}
export interface SideNavSectionProps {
    /** Optional section heading. Screen-reader only when the rail is collapsed. */
    heading?: ReactNode;
    /** SideNavItem rows. */
    children: ReactNode;
    /** Extra classes for the section wrapper. */
    className?: string;
}
/** A labelled group of rows inside SideNav. The heading names the group for assistive tech. */
export declare function SideNavSection({ heading, children, className }: SideNavSectionProps): import("react/jsx-runtime").JSX.Element;
export declare namespace SideNavSection {
    var displayName: string;
}
export interface SideNavItemProps {
    /** Row text. Also the accessible name and tooltip in collapsed mode. */
    label: string;
    /** 1-bit icon shown before the label (strongly recommended; required for a useful collapsed rail). */
    icon?: TuiIconName;
    /** Marks the current route: holds the hover fill and sets `aria-current="page"`. */
    active?: boolean;
    /** Destination; renders an `<a>`. */
    href?: string;
    /** Click handler. Without `href`, the row renders as a `<button>`. */
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    /** Custom link component (e.g. a router `<Link>`); its props go in `asProps`. */
    as?: ElementType;
    /** Props spread onto the `as` component (`to`, `state`, ...). */
    asProps?: Record<string, unknown>;
    /** Trailing content at the row end (a count Badge, a Kbd hint). Hidden when collapsed. */
    trailing?: ReactNode;
    /**
     * Nested SideNavItem rows. Turns this row into a collapsible group button
     * with `aria-expanded`; `href` / `onClick` are then ignored.
     */
    children?: ReactNode;
    /** Group open state (controlled). */
    expanded?: boolean;
    /** Initial group open state. Defaults to true when a descendant is `active`. */
    defaultExpanded?: boolean;
    /** Fires when a group row toggles. */
    onExpandedChange?: (expanded: boolean) => void;
    /** Extra classes for the row element. */
    className?: string;
}
/**
 * One navigation row. Renders `<a href>`, a router link (`as`), or a
 * `<button>` (`onClick` only). With nested SideNavItem children it becomes a
 * collapsible group.
 */
export declare function SideNavItem({ label, icon, active, href, onClick, as: As, asProps, trailing, children, expanded: expandedProp, defaultExpanded, onExpandedChange, className, }: SideNavItemProps): import("react/jsx-runtime").JSX.Element;
export declare namespace SideNavItem {
    var displayName: string;
}
//# sourceMappingURL=SideNav.d.ts.map