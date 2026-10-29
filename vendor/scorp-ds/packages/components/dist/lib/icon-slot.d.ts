import type { ReactElement, ReactNode } from "react";
import { type TuiIconName, type TuiIconProps } from "../components/TuiIcon";
/**
 * What an icon prop accepts (decision 0024): a TuiIcon name, which renders that
 * 1-bit icon, or an element you have already built (a sized `TuiIcon`, an SVG).
 *
 * Every icon prop in the system reads the same way, so `iconLeft="Check"` on a
 * Button and `icon="Check"` on an EmptyState mean the same thing.
 */
export type IconSlot = TuiIconName | ReactElement;
/** True when a value is the name of a TuiIcon. */
export declare function isTuiIconName(value: unknown): value is TuiIconName;
/**
 * Renders an icon prop: a TuiIcon name becomes `<TuiIcon name size className />`,
 * anything else (an element, or a legacy string that is not an icon name) is
 * returned unchanged.
 */
export declare function renderIconSlot(slot: ReactNode, iconProps?: Omit<TuiIconProps, "name">): ReactNode;
//# sourceMappingURL=icon-slot.d.ts.map