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
 */
import { type ReactNode } from "react";
export interface CardProps {
    title?: string;
    subtitle?: string;
    headerContent?: ReactNode;
    children: ReactNode;
    footerContent?: ReactNode;
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
 * @param className - Additional CSS classes
 */
export declare function Card({ title, subtitle, headerContent, children, footerContent, className, }: CardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Card.d.ts.map