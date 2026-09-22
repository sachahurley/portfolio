/**
 * SKELETON COMPONENT
 *
 * Placeholder blocks that hold the shape of content while it loads, so the
 * layout does not jump when the real content arrives. Use for loads that
 * take long enough to notice (roughly 300ms and up); for short waits show
 * nothing, for known progress use ProgressBar.
 *
 * SHAPES:
 * - text: one or more text lines (`lines`); the last line of a paragraph is
 *   shorter so it reads as prose
 * - rect: a block (image, card, chart); size it with `className`
 * - avatar: a square plate matching Avatar / control heights (sm, md, lg)
 *
 * MOTION: a stepped pulse (the opacity hops in 4 steps instead of easing),
 * on the pixel-grid voice of the rest of the system. It stops entirely under
 * prefers-reduced-motion.
 *
 * ACCESSIBILITY: every Skeleton is `aria-hidden`; placeholders carry no
 * meaning. Mark the region that is loading instead:
 *
 *   <section aria-busy="true" aria-live="polite">
 *     <span className="sr-only">Loading profile</span>
 *     <Skeleton variant="avatar" />
 *     <Skeleton lines={3} />
 *   </section>
 *
 * and flip `aria-busy` to false when the real content renders.
 *
 * TOKENS USED: surface.muted (block fill), plate.round (rect / avatar
 * silhouette), control-height.sm|md|lg (avatar), duration tokens via the pulse
 */
import { type ControlSizeProp } from "../lib/size";
export interface SkeletonProps {
    /** Placeholder shape: text lines (default), a rect block, or an avatar square. */
    variant?: "text" | "rect" | "avatar";
    /** Number of text lines for `variant="text"` (default 1). The last of several is shorter. */
    lines?: number;
    /** Avatar square size: sm 32px, md 40px (default), lg 48px (control heights). */
    size?: ControlSizeProp;
    /** Turn the pulse off (e.g. many skeletons on one screen). Reduced motion always turns it off. */
    animated?: boolean;
    /** Sizing classes. Rects need a height (e.g. `h-32 w-full`); text lines take the container width. */
    className?: string;
}
/**
 * Skeleton Component
 *
 * @example
 * <Skeleton lines={3} />
 * <Skeleton variant="rect" className="h-40 w-full" />
 * <Skeleton variant="avatar" size="lg" />
 *
 * @param variant - text, rect, or avatar
 * @param lines - Text line count
 * @param size - Avatar size (sm, md, lg)
 */
export declare function Skeleton({ variant, lines, size: sizeProp, animated, className }: SkeletonProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Skeleton {
    var displayName: string;
}
//# sourceMappingURL=Skeleton.d.ts.map