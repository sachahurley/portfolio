/**
 * CASE STUDY
 *
 * Long-form, narrative pages (case studies, write-ups, project pages)
 * authored as data. A page is a structured `CaseStudy`: a header every page
 * has to fill (title and a one-line summary; outcomes, meta and a cover when
 * there are any), then an ordered list of sections.
 *
 * - Reorder a section by moving it in `sections`; hide one with
 *   `hidden: true`. Section numbers and figure numbers are counted over the
 *   visible sections only, so hiding one renumbers the rest.
 * - Each section opens on its number and name (`02 THE PROBLEM`), so authors
 *   never type numbers or headings as blocks. Sections are set apart by
 *   space alone, no rule between them.
 * - Every content block has one shape per meaning: steps and principles
 *   (`list`) read as a tree, findings (`insights`) carry large numerals,
 *   pillars (`callouts`) are cards, a testimonial (`quote`) hangs off an
 *   accent rule, a thesis (`statement`) is set large between rules, and
 *   results (`outcomes`) are accent figures.
 *
 * Figures degrade in one direction: every figure renders the hatch
 * placeholder until it has an `src` or a filled slot, so a page can be laid
 * out before its art exists and swapped a figure at a time.
 *
 * Don't use this for: app UI or dashboards. These are editorial blocks. The
 * `slot` block is the escape hatch when a page needs a live component inside
 * the narrative: the page owns that markup, not this library.
 *
 * Replaces CaseStudyBlocks (a flat block list); see
 * docs/decisions/0014-case-studies-are-structured-pages.md.
 *
 * TOKENS USED:
 * - text.primary, accent, secondary scale in AA theme pairs (700/600 labels,
 *   800/500 body), surface.muted (cards), surface.container-stroke (rules)
 * - plate.round + border.hairline (figure ring), surface.subtle/muted (hatch)
 * - border.width.hairline (the one rule weight)
 * - font.size.pageTitle (the h1 at sm and up); outcome figures stay at 2xl
 *   so the title is always the largest type on the page
 * - Avatar component (quote attribution)
 *
 * Breakout figures (`width: "wide" | "full"`) size against the nearest
 * inline-size container (100cqw); give an ancestor `container-type:
 * inline-size` (or rely on the viewport fallback).
 */
import type { ReactNode } from "react";
/** Live content for `slot` blocks, keyed by the block's `name`. */
export type CaseStudySlots = Record<string, ReactNode>;
/** A title + blurb pair, shared by list, insights and callouts. */
export interface CaseStudyItem {
    title: string;
    text: string;
}
/** One big result figure: `{ value: "43", label: "components" }`. */
export interface CaseStudyOutcome {
    value: string;
    label: string;
}
/** A single picture: real art via `src`, the hatch placeholder without. */
export interface CaseStudyFigure {
    src?: string;
    /** Empty string (the default) marks the image decorative. */
    alt?: string;
    /** CSS aspect-ratio, e.g. "21 / 9". Defaults to "16 / 9". */
    aspect?: string;
    caption?: string;
    width?: "wide" | "full";
}
/** What a section can contain. Headings are not blocks: sections own them. */
export type CaseStudyContentBlock = {
    type: "prose";
    text: string;
} | ({
    type: "image";
} & CaseStudyFigure) | {
    type: "imagePair";
    captions?: [string, string];
    width?: "wide" | "full";
    srcs?: [string | undefined, string | undefined];
    alts?: [string | undefined, string | undefined];
} | {
    /** A box-drawing diagram kept as live text (generate with
     *  @scorp-ds/tui-art). `label` says what it shows, for screen readers. */
    type: "ascii";
    text: string;
    caption?: string;
    width?: "wide" | "full";
    label?: string;
} | {
    /** A live region filled through the `slots` prop, keyed by `name`. */
    type: "slot";
    name: string;
    caption?: string;
    width?: "wide" | "full";
    aspect?: string;
}
/** Steps, flows or principles: a connected tree, title over text. */
 | {
    type: "list";
    items: CaseStudyItem[];
}
/** Findings: the loudest block, large numerals and ruled rows. */
 | {
    type: "insights";
    items: CaseStudyItem[];
}
/** Pillars or options: cards, two up, or three up (wide) for three. */
 | {
    type: "callouts";
    items: CaseStudyItem[];
}
/** A testimonial: hangs off an accent rule, optional attribution. */
 | {
    type: "quote";
    text: string;
    name?: string;
    role?: string;
    image?: string;
}
/** The thesis or challenge, set large between rules. */
 | {
    type: "statement";
    text: string;
    kicker?: string;
}
/** Results as big accent figures. */
 | {
    type: "outcomes";
    items: CaseStudyOutcome[];
};
/** One numbered section of the page. */
export interface CaseStudySection {
    /** Short section name shown in the rule: "the problem". */
    kicker: string;
    title: string;
    /** Optional lead paragraph under the title. */
    intro?: string;
    blocks?: CaseStudyContentBlock[];
    /** Leave the section out of the page (and out of the numbering). */
    hidden?: boolean;
    /** Anchor id. Defaults to the kicker, slugified. */
    id?: string;
}
/** The whole page. `title` and `summary` are the fields every study needs. */
export interface CaseStudy {
    title: string;
    /** One line: what this was and what it achieved. */
    summary: string;
    outcomes?: CaseStudyOutcome[];
    meta?: {
        label: string;
        value: string;
    }[];
    cover?: CaseStudyFigure;
    sections: CaseStudySection[];
}
/** The shrink-to-fit font size for an `ascii` diagram: text-xs, or smaller
 *  when the longest line would not fit the figure. Exported for tests. */
export declare const asciiFontSize: (text: string) => string;
/**
 * CaseStudyContent: content blocks with no section chrome. Use it for a
 * short page that does not need numbered sections; `CaseStudyPage` uses it
 * inside every section.
 *
 * @param blocks - Content blocks in order
 * @param slots - Live content for `slot` blocks
 * @param figureStart - First figure number (pages count across sections)
 */
export declare function CaseStudyContent({ blocks, slots, figureStart, className, }: {
    blocks: CaseStudyContentBlock[];
    slots?: CaseStudySlots;
    figureStart?: number;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * CaseStudyHeader: the page's `<h1>`, one-line summary, outcomes strip,
 * label/value meta rows and optional wide cover. The largest type on the
 * page, so it always outranks the section titles below it.
 */
export declare function CaseStudyHeader({ study, className, }: {
    study: Pick<CaseStudy, "title" | "summary" | "outcomes" | "meta" | "cover">;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * CaseStudySections: the visible sections, numbered, each with its
 * header and content, set apart by generous space rather than rules. `CaseStudyPage` is this plus `CaseStudyHeader`; use
 * it alone when a page draws its own header.
 *
 * @param sections - Sections in reading order; `hidden` ones are skipped
 *   and do not take a number
 * @param slots - Live content for `slot` blocks
 */
export declare function CaseStudySections({ sections, slots, className, }: {
    sections: CaseStudySection[];
    slots?: CaseStudySlots;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * CaseStudyPage Component
 *
 * Renders a whole case study: the header, then each visible section with a
 * numbered header and its content blocks.
 *
 * @param study - The page (see {@link CaseStudy})
 * @param slots - Live content for `slot` blocks; a name with no entry falls
 *   back to the hatch placeholder
 * @param className - Additional classes on the wrapper (e.g. a column width)
 */
export declare function CaseStudyPage({ study, slots, className, }: {
    study: CaseStudy;
    slots?: CaseStudySlots;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=CaseStudy.d.ts.map