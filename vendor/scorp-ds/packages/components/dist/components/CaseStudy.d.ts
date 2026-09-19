/**
 * CASE STUDY BLOCKS
 *
 * The long-form section library upstreamed from the portfolio's case-study
 * pages: a typed, data-driven set of nine blocks (meta grid, headlines,
 * prose, placeholder figures with wide/full breakouts, callout grids,
 * numbered insights, pull quotes, definition lists). Author content as a
 * `CaseStudyBlock[]` array; one renderer draws them all.
 *
 * Don't use this for: app UI or dashboards — these are editorial layout
 * blocks for narrative pages. Compose app screens from components instead.
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
} | {
    type: "imagePair";
    captions?: [string, string];
    width?: "wide" | "full";
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
/**
 * CaseStudyBlocks Component
 *
 * @param blocks - The page's sections in order (see {@link CaseStudyBlock})
 * @param className - Additional classes on the wrapper (e.g. a column width)
 */
export declare function CaseStudyBlocks({ blocks, className, }: {
    blocks: CaseStudyBlock[];
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CaseStudy.d.ts.map