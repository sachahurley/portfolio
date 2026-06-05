/**
 * MODAL COMPONENT
 *
 * A reusable modal dialog component with backdrop overlay
 * Built entirely from design tokens defined in tokens.json
 *
 * FEATURES:
 * - Fixed header with title and close button (always visible)
 * - Scrollable content area (max-height: 66vh)
 * - Fade in/out animations (200ms duration)
 * - Backdrop scrim (semi-transparent overlay)
 * - Drop shadow using elevation tokens
 * - Click outside to close
 * - ESC key to close
 * - Full light/dark theme support
 *
 * DIMENSIONS:
 * - Width: 740px fixed
 * - Max height: 80% of viewport height
 * - Border radius: 24px (radius.container token)
 *
 * TOKENS USED:
 * - surface.card, surface.container-stroke, surface.overlay
 * - text.primary (title)
 * - radius.container: 24px border radius
 * - elevation.2: Drop shadow
 */
import { type ReactNode } from "react";
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}
/**
 * Modal Component
 *
 * @param isOpen - Whether the modal is currently visible
 * @param onClose - Callback function triggered when user closes modal
 * @param title - Header title text
 * @param children - Modal content (will be scrollable if it exceeds max-height)
 */
export declare function Modal({ isOpen, onClose, title, children }: ModalProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=Modal.d.ts.map