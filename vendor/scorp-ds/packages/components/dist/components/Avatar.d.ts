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
    /** Image URL. Shown when set and it loads; otherwise the avatar falls back to `initials`, then `icon`, then an `@` glyph. */
    src?: string;
    /** Alt text for the image, usually the person's name. Defaults to "Avatar", so pass it whenever `src` is set. */
    alt?: string;
    /** One or two letters shown when there is no image, or the image fails to load. */
    initials?: string;
    /** Icon shown when there is neither an image nor initials (for a team, a bot, a system account). */
    icon?: ReactNode;
    /** Diameter: sm 24px, md 40px (default), lg 64px, xl 96px. Legacy names are deprecated aliases. */
    size?: ControlSizeProp | "xl";
    /** Presence dot in the corner, announced as "Status: online" and so on. Omit it to show no dot. */
    status?: "online" | "offline" | "away";
    /** Extra classes on the outer wrapper (margin, positioning). */
    className?: string;
    /** Called when `src` fails to load (to log it, or swap the URL); the avatar shows its fallback either way. */
    onError?: () => void;
}
/**
 * Shows a person or entity as an image, initials or an icon, with an optional presence dot; an image that fails to load falls back to `initials`, then `icon`.
 */
export declare function Avatar({ src, alt, initials, icon, size: sizeProp, status, className, onError, }: AvatarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map