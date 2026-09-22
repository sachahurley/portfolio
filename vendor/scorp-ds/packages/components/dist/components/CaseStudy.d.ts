/**
 * CASE STUDY BLOCKS
 *
 * The long-form section library upstreamed from the portfolio's case-study
 * pages: a typed, data-driven set of eleven blocks (meta grid, headlines,
 * prose, figures with wide/full breakouts, box-drawing diagrams, live
 * slots, callout grids, numbered insights, pull quotes, definition lists).
 * Author content as a `CaseStudyBlock[]` array; one renderer draws them all.
 *
 * Figures degrade in one direction: every figure block renders the hatch
 * placeholder until it is given real content (an `src`, or a filled slot),
 * so a page can be laid out before its art exists and swapped a figure at
 * a time.
 *
 * Don't use this for: app UI or dashboards — these are editorial layout
 * blocks for narrative pages. Compose app screens from components instead.
 * The `slot` block is the escape hatch when a page needs a live component
 * inside the narrative: the page owns that markup, not this library.
 *
 * TOKENS USED:
 * - plate.round + border.hairline (figure/placeholder ring recipe)
 * - surface.subtle / surface.muted (theme-aware hatch placeholder stripes)
 * - accent (insight numerals, quote glyph), text.primary, secondary scale
 *   in AA theme pairs (700/600 labels+captions, 800/500 body)
 * - Avatar component (quote attribution)
 *
 * Breakout figures (`width: "wide" | "full"`) size against the nearest
 * inline-size container (100cqw); give an ancestor `container-type:
 * inline-size` (or rely on the viewport fallback).
 */
import type { ReactNode } from "react";
/** One section of a case-study page. The union is the authoring format. */
export type CaseStudyBlock = {
    type: "meta";
    items: {
        label: string;
        value: string;
    }[];
} | {
    type: "headline";
    kicker?: string;
    title: string;
    text?: string;
} | {
    type: "prose";
    text: string;
} | {
    type: "image";
    aspect?: string;
    caption?: string;
    width?: "wide" | "full";
    /** Real artwork. Omit for the hatch placeholder. */
    src?: string;
    /** Alt text. Empty string marks the image decorative (the default when
     *  a caption already describes it). */
    alt?: string;
} | {
    type: "imagePair";
    captions?: [string, string];
    width?: "wide" | "full";
    /** Real artwork per side; either entry may be omitted for the placeholder. */
    srcs?: [string | undefined, string | undefined];
    alts?: [string | undefined, string | undefined];
} | {
    /** A box-drawing / monospace diagram, rendered as preformatted text
     *  rather than an image so it stays selectable and retints with the
     *  theme. Pair with @scorp-ds/tui-art to generate the string. */
    type: "ascii";
    text: string;
    caption?: string;
    width?: "wide" | "full";
    /** What the diagram says, for screen readers, which cannot read box
     *  characters. Falls back to the caption. */
    label?: string;
} | {
    /** A live region the page fills via the `slots` prop — a component
     *  specimen, a chart, an embed. Renders the hatch placeholder when the
     *  named slot is empty. */
    type: "slot";
    name: string;
    caption?: string;
    width?: "wide" | "full";
    /** Reserve space at the placeholder stage; omit once the slot is filled
     *  and should size to its content. */
    aspect?: string;
} | {
    type: "callouts";
    items: {
        title: string;
        text: string;
    }[];
} | {
    type: "insights";
    items: {
        title: string;
        text: string;
    }[];
} | {
    type: "quote";
    text: string;
    name?: string;
    role?: string;
    image?: string;
} | {
    type: "list";
    items: {
        title: string;
        text: string;
    }[];
};
/** Live content for `slot` blocks, keyed by the block's `name`. */
export type CaseStudySlots = Record<string, ReactNode>;
/**
 * CaseStudyBlocks Component
 *
 * @param blocks - The page's sections in order (see {@link CaseStudyBlock})
 * @param slots - Live content for `slot` blocks; a name with no entry falls
 *   back to the hatch placeholder
 * @param className - Additional classes on the wrapper (e.g. a column width)
 */
export declare function CaseStudyBlocks({ blocks, slots, className, }: {
    blocks: CaseStudyBlock[];
    slots?: CaseStudySlots;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CaseStudy.d.ts.map