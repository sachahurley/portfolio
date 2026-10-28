/**
 * AUTOSIZE (internal)
 *
 * Grows a textarea with its content, from `minRows` to `maxRows`, then lets
 * it scroll. Heights are measured from the element's own computed line
 * height, padding and border, so they follow whatever size classes the
 * component applies; nothing here is a fixed pixel value.
 *
 * Re-measures when `value` changes and when the element's width changes
 * (narrower means more wrapped lines). Written for Composer; Textarea can
 * adopt it as `autoGrow`.
 *
 * Not exported from the package barrel.
 */
import { type RefObject } from "react";
export interface AutosizeOptions {
    /** The current text. Each change re-measures. */
    value: string;
    /** Rows shown when empty (default 1). */
    minRows?: number;
    /** Rows before the field scrolls instead of growing. Omit to grow without limit. */
    maxRows?: number;
    /** Turn sizing off, leaving the element's own height alone (default true). */
    enabled?: boolean;
}
export declare function useAutosize(ref: RefObject<HTMLTextAreaElement | null>, { value, minRows, maxRows, enabled }: AutosizeOptions): void;
//# sourceMappingURL=use-autosize.d.ts.map