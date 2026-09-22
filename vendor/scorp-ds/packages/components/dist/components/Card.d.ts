/**
 * CARD COMPONENT
 *
 * Reusable card component with header, content, and footer sections
 * Built using design tokens for consistent styling
 *
 * Features:
 * - Optional header with title and subtitle
 * - Flexible content area
 * - Optional footer for actions
 * - Consistent spacing and styling
 * - `layout="flex"` turns the card into a flex column so the content section
 *   fills a fixed height and the footer pins to the bottom
 *
 * TOKENS: section rules are drawn at `--border-width-hairline` (1px), the
 * system's single rule weight.
 */
import { type ReactNode } from "react";
/** How the card distributes its sections vertically. */
export type CardLayout = "block" | "flex";
export interface CardProps {
    /** Card title, rendered as the header heading. */
    title?: string;
    /** Supporting line under the title. */
    subtitle?: string;
    /** Custom header node; replaces `title` / `subtitle` when set. */
    headerContent?: ReactNode;
    /** Main card content. */
    children: ReactNode;
    /** Footer node (buttons, links) behind a hairline rule. */
    footerContent?: ReactNode;
    /**
     * Section layout. `block` (default) lets the card grow with its content.
     * `flex` makes the card a flex column whose content section fills the
     * remaining height, so a fixed-height card can pin its footer to the
     * bottom. Prefer this over the legacy `className` sniff below.
     */
    layout?: CardLayout;
    /** Additional CSS classes (width, height, margin). */
    className?: string;
}
/**
 * Card Component
 *
 * @param title - Card title (shown in header)
 * @param subtitle - Card subtitle/description (shown below title)
 * @param headerContent - Custom header content (overrides title/subtitle if provided)
 * @param children - Main card content
 * @param footerContent - Footer content (buttons, links, etc.)
 * @param layout - "block" (default) or "flex" (content section fills the height)
 * @param className - Additional CSS classes
 */
export declare function Card({ title, subtitle, headerContent, children, footerContent, layout, className, }: CardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Card.d.ts.map