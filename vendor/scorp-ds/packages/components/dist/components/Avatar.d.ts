/**
 * AVATAR COMPONENT
 *
 * Reusable avatar component for user profiles, comments, and team displays
 * Built entirely from design tokens defined in tokens.json
 *
 * VARIANTS:
 * - image: Display user image (src prop)
 * - initials: Display user initials (initials prop)
 * - icon: Display icon (icon prop)
 *
 * SIZES:
 * - small: 24px × 24px
 * - medium: 40px × 40px (default)
 * - large: 64px × 64px
 * - xl: 96px × 96px
 *
 * FEATURES:
 * - Status indicator (online/offline dot)
 * - Fallback to initials if image fails to load
 * - Full light/dark theme support
 * - Accessible (alt text support)
 */
import { type ReactNode } from "react";
export interface AvatarProps {
    src?: string;
    alt?: string;
    initials?: string;
    icon?: ReactNode;
    size?: "small" | "medium" | "large" | "xl";
    status?: "online" | "offline" | "away";
    className?: string;
    onError?: () => void;
}
/**
 * Avatar Component
 *
 * @param src - Image source URL (if using image variant)
 * @param alt - Alt text for image (accessibility)
 * @param initials - User initials (if using initials variant)
 * @param icon - Custom icon element (if using icon variant)
 * @param size - Avatar size (default: "medium")
 * @param status - Status indicator (online/offline/away)
 * @param className - Additional CSS classes
 * @param onError - Callback when image fails to load
 */
export declare function Avatar({ src, alt, initials, icon, size, status, className, onError, }: AvatarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map