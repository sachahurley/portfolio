/**
 * THEME PROVIDER
 *
 * Manages light/dark theme switching using next-themes
 * This wraps your app and provides theme context to all components
 */
import { type ThemeProviderProps } from "next-themes";
/**
 * Wraps an app and supplies the light/dark theme context every component reads.
 *
 * Mount it once, as high in the tree as possible. It writes the theme onto
 * `<html>` as a class, which is what the `.dark` block in `tokens.css` keys off,
 * so without it every semantic token falls back to its light value.
 *
 * Dark is the canonical theme; light is available as a secondary one. System
 * preference is honoured, so `resolvedTheme` is what consumers should read when
 * they need to know what is actually on screen. Any `next-themes` prop can be
 * passed through to override these defaults.
 */
export declare function ThemeProvider({ children, ...props }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ThemeProvider.d.ts.map