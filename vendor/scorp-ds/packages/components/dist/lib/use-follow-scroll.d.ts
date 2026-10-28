/**
 * FOLLOW SCROLL (internal)
 *
 * Keeps a scroll container pinned to its newest content, like `tail -f`.
 * Scrolling up pauses following so the reader keeps their place, and counts
 * what arrives meanwhile as unseen; scrolling back to the bottom, or calling
 * `resume`, follows again. Shared by LogView and Transcript so the two
 * regions behave the same way.
 *
 * Two triggers re-pin while following:
 * - `content` changing identity (new lines, new turns). `count` is the
 *   number of items in it, used to count unseen arrivals while paused.
 * - the element in `contentRef` changing size, for content that grows in
 *   place (a reply streaming into the last turn). Optional.
 *
 * Not exported from the package barrel.
 */
import { type RefObject } from "react";
/** Distance from the bottom (px) still treated as "at the bottom". */
export declare const FOLLOW_BOTTOM_THRESHOLD = 8;
export interface FollowScrollOptions {
    /** Anything whose change should re-pin to the bottom while following. */
    content: unknown;
    /** Items in `content`; growth while paused is added to `unseen`. */
    count: number;
    /** Follow at all (default true). Off: no scrolling, never pauses. */
    enabled?: boolean;
    /** Fires when following pauses or resumes. */
    onFollowChange?: (following: boolean) => void;
    /** Element whose size changes should also re-pin (content growing in place). */
    contentRef?: RefObject<HTMLElement | null>;
}
export interface FollowScroll<T extends HTMLElement> {
    /** Attach to the scroll container. */
    scrollRef: RefObject<T | null>;
    /** Attach to the scroll container's `onScroll`. */
    onScroll: () => void;
    /** Whether the view is pinned to the bottom. */
    following: boolean;
    /** Items that arrived while paused. */
    unseen: number;
    /** Jump to the bottom and follow again. */
    resume: () => void;
}
export declare function useFollowScroll<T extends HTMLElement = HTMLDivElement>({ content, count, enabled, onFollowChange, contentRef, }: FollowScrollOptions): FollowScroll<T>;
//# sourceMappingURL=use-follow-scroll.d.ts.map