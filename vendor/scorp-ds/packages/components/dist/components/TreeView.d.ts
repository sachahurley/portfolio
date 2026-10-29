/**
 * TREE VIEW COMPONENT
 *
 * Hierarchical list with expandable branches: file trees, outlines, org
 * charts. Implements the WAI-ARIA tree pattern: `role="tree"` with
 * `treeitem` nodes, `group` children, `aria-expanded` on branches,
 * `aria-level` / `aria-setsize` / `aria-posinset` on every node, and
 * `aria-selected` for the (single) selection.
 *
 * KEYBOARD (one tab stop, roving focus):
 * - Up / Down: previous / next visible node
 * - Right: expand a closed branch; on an open branch, move to its first child
 * - Left: collapse an open branch; otherwise move to the parent
 * - Home / End: first / last visible node
 * - Enter / Space: select the focused node (Enter also fires `onActivate`)
 * - Printable characters: type-ahead to the next node whose label starts
 *   with the typed text
 *
 * MOUSE: clicking a row selects it; clicking a branch row also toggles it.
 *
 * STATE: `expanded` and `selected` are each controlled or uncontrolled
 * (`defaultExpanded` / `defaultSelected`).
 *
 * DISCLOSURE ICONS: 1-bit ChevronRight (closed) and ChevronDown (open).
 *
 * TOKENS USED:
 * - surface.muted (hover and selected fill), accent (selected text)
 * - text.primary / text.secondary, plate.round, focus inset ring
 * - duration.fast, touch.target (row height), spacing.4 (indent step)
 */
import { type ReactNode } from "react";
import { type IconSlot } from "../lib/icon-slot";
/** One node of the tree. Nodes with `children` are branches. */
export interface TreeNode {
    /** Unique, stable id across the whole tree. */
    id: string;
    /** Row content. */
    label: ReactNode;
    /** Plain-text label for type-ahead when `label` is not a string. */
    textValue?: string;
    /** Optional icon before the label: a TuiIcon name or an element. */
    icon?: IconSlot;
    /** Child nodes. An empty array still renders a (childless) branch. */
    children?: TreeNode[];
    /** Skip this node for selection and activation (it stays focusable). */
    disabled?: boolean;
}
/** Every TreeView prop except the requirement that one accessible name is set. */
interface TreeViewOwnProps {
    /** Root nodes. */
    nodes: TreeNode[];
    /** Accessible name of the tree, such as "Files"; this or `aria-labelledby` is required. */
    "aria-label"?: string;
    /** Id of a visible heading naming the tree; use it instead of `aria-label` when such a heading exists. */
    "aria-labelledby"?: string;
    /** Ids of open branches (controlled). */
    expanded?: string[];
    /** Ids of branches open on first render (uncontrolled). */
    defaultExpanded?: string[];
    /** Fires with the next list of open branch ids. */
    onExpandedChange?: (expanded: string[]) => void;
    /** Selected node id (controlled). `null` for no selection. */
    selected?: string | null;
    /** Node selected on first render (uncontrolled). */
    defaultSelected?: string | null;
    /** Fires when the selection changes. */
    onSelectedChange?: (id: string) => void;
    /** Fires when a node is activated with Enter or a click (open the file, go to the route). */
    onActivate?: (id: string) => void;
    /** Type-ahead on printable keys (default true). */
    typeahead?: boolean;
    /** Extra classes for the tree root. */
    className?: string;
}
/**
 * The name a TreeView is announced by. The type requires one: a screen reader
 * entering an unnamed tree says only "tree".
 */
type TreeViewName = {
    "aria-label": string;
} | {
    "aria-labelledby": string;
};
/** Props of `TreeView`: its own props plus a required accessible name, given as `aria-label` or `aria-labelledby`. */
export type TreeViewProps = TreeViewOwnProps & TreeViewName;
/**
 * TreeView
 *
 * ```tsx
 * <TreeView
 *   aria-label="Files"
 *   defaultExpanded={["src"]}
 *   nodes={[{ id: "src", label: "src", children: [{ id: "index", label: "index.ts" }] }]}
 *   onActivate={(id) => open(id)}
 * />
 * ```
 */
export declare function TreeView({ nodes, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, expanded: expandedProp, defaultExpanded, onExpandedChange, selected: selectedProp, defaultSelected, onSelectedChange, onActivate, typeahead, className, }: TreeViewProps): import("react").JSX.Element;
export declare namespace TreeView {
    var displayName: string;
}
export {};
//# sourceMappingURL=TreeView.d.ts.map