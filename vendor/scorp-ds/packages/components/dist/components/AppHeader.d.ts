/**
 * APP HEADER COMPONENT (top bar)
 *
 * The application's top bar: a `<header>` with three slots, brand on the
 * left, primary navigation in the middle, actions on the right. Below the
 * `md` breakpoint the navigation folds behind a menu toggle (the 1-bit Menu
 * icon) that opens a panel under the bar; the toggle carries
 * `aria-expanded` and `aria-controls` pointing at that panel.
 *
 * STICKY: `sticky` pins the bar to the top of its scroll container on the
 * `z-index.sticky` layer (above content, below dropdowns and modals).
 *
 * NAVIGATION SLOT: pass links (Link, Button href, router links). The slot is
 * wrapped in a `<nav>` named by `navLabel`, once inline for wide screens and
 * once inside the mobile panel (only one is displayed at a time, so only one
 * landmark is exposed).
 *
 * TOKENS USED:
 * - surface.container (bar and panel), border.hairline (bottom edge)
 * - z-index.sticky (sticky layer)
 * - button.ghost.* (menu toggle, via Button), touch.target (toggle size)
 */
import { type ReactNode } from "react";
export interface AppHeaderProps {
    /** Left slot: logo, product name, or a home link. */
    brand: ReactNode;
    /** Middle slot: primary navigation links. Folds into the mobile menu below `md`. */
    navigation?: ReactNode;
    /** Right slot: actions such as ThemeToggle, search, or an Avatar menu. Always visible. */
    actions?: ReactNode;
    /**
     * Content of the mobile menu panel. Defaults to `navigation`, laid out as
     * a vertical list. Pass this when the phone menu needs different content.
     */
    mobileMenu?: ReactNode;
    /** Pin the bar to the top of its scroll container (z-index.sticky). */
    sticky?: boolean;
    /** Mobile menu open state (controlled). */
    menuOpen?: boolean;
    /** Initial mobile menu state when uncontrolled (default closed). */
    defaultMenuOpen?: boolean;
    /** Fires when the menu toggle opens or closes the mobile panel. */
    onMenuOpenChange?: (open: boolean) => void;
    /** Accessible name of the menu toggle (default "Menu"). */
    menuLabel?: string;
    /** Accessible name of the navigation landmark (default "Main"). */
    navLabel?: string;
    /** Extra classes for the `<header>`. */
    className?: string;
}
/**
 * AppHeader
 *
 * ```tsx
 * <AppHeader
 *   sticky
 *   brand={<Link href="/" variant="quiet">scorp</Link>}
 *   navigation={<><Link href="/docs" variant="quiet">Docs</Link><Link href="/blog" variant="quiet">Blog</Link></>}
 *   actions={<ThemeToggle />}
 * />
 * ```
 */
export declare function AppHeader({ brand, navigation, actions, mobileMenu, sticky, menuOpen: menuOpenProp, defaultMenuOpen, onMenuOpenChange, menuLabel, navLabel, className, }: AppHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare namespace AppHeader {
    var displayName: string;
}
//# sourceMappingURL=AppHeader.d.ts.map