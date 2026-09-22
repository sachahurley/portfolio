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
 * - sm: 24px × 24px
 * - md: 40px × 40px (default)
 * - lg: 64px × 64px
 * - xl: 96px × 96px
 *
 * FEATURES:
 * - Status indicator (online/offline dot)
 * - Fallback to initials if image fails to load
 * - Full light/dark theme support
 * - Accessible (alt text support)
 */
import { type ReactNode } from "react";
import { type ControlSizeProp } from "../lib/size";
export interface AvatarProps {
    src?: string;
    alt?: string;
    initials?: string;
    icon?: ReactNode;
    /** Diameter: sm 24px, md 40px (default), lg 64px, xl 96px. Legacy names are deprecated aliases. */
    size?: ControlSizeProp | "xl";
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
 * @param size - Avatar size (default: "md")
 * @param status - Status indicator (online/offline/away)
 * @param className - Additional CSS classes
 * @param onError - Callback when image fails to load
 */
export declare function Avatar({ src, alt, initials, icon, size: sizeProp, status, className, onError, }: AvatarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map