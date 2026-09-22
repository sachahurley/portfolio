/**
 * EMPTY STATE COMPONENT
 *
 * What a view shows when it has nothing to show: no results, no items yet,
 * or a cleared inbox. It says what happened and, when there is one, offers
 * the next step (create the first item, clear filters).
 *
 * SIZES:
 * - sm: inline, inside a card, table body, or panel (smaller icon and title)
 * - md: page-level, the main content of an empty screen (default)
 *
 * CONTENT GUIDANCE: the title names the situation in plain words ("No
 * projects yet"), the description says why or what to do, and actions are
 * at most one primary plus one secondary Button. Errors that block the
 * user belong in Alert, not here.
 *
 * TOKENS USED:
 * - surface.subtle (icon plate), text.primary (title), text.secondary
 *   (description, icon), plate.round, Button tokens for actions
 */
import type { ReactNode } from "react";
import { type TuiIconName } from "./TuiIcon";
/** A Button rendered by EmptyState. */
export interface EmptyStateAction {
    /** Button text; start with a verb ("Create project"). */
    label: string;
    /** Click handler. */
    onClick?: () => void;
    /** Renders the button as a link instead. */
    href?: string;
    /** Optional 1-bit icon before the label. */
    icon?: TuiIconName;
}
export interface EmptyStateProps {
    /** 1-bit icon shown above the title (default "Archive"). Pass `null` for none. */
    icon?: TuiIconName | null;
    /** Short statement of the situation, e.g. "No results". */
    title: ReactNode;
    /** One or two sentences: why it is empty and what to do. */
    description?: ReactNode;
    /** The main next step, rendered as a primary Button. */
    primaryAction?: EmptyStateAction;
    /** An alternative step (e.g. "Clear filters"), rendered as a secondary Button. */
    secondaryAction?: EmptyStateAction;
    /** sm for inline use in cards and tables; md (default) for a whole page or panel. */
    size?: "sm" | "md";
    /** Heading element for the title, to fit the page outline (default "h2"). */
    titleAs?: "h2" | "h3" | "h4" | "p";
    /** Extra content under the actions (a help link, a hint). */
    children?: ReactNode;
    /** Extra classes for the root. */
    className?: string;
}
/**
 * EmptyState Component
 *
 * @example
 * <EmptyState
 *   icon="Search"
 *   title="No results"
 *   description="Try a shorter search or clear the filters."
 *   secondaryAction={{ label: "Clear filters", onClick: clear }}
 * />
 *
 * @param icon - TuiIcon name above the title
 * @param title - Plain statement of what is empty
 * @param primaryAction / secondaryAction - Optional Buttons
 * @param size - sm inline, md page
 */
export declare function EmptyState({ icon, title, description, primaryAction, secondaryAction, size, titleAs: Title, children, className, }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
export declare namespace EmptyState {
    var displayName: string;
}
//# sourceMappingURL=EmptyState.d.ts.map