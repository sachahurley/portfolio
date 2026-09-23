/**
 * THEME TOGGLE COMPONENT
 *
 * A sliding toggle switch to switch between light and dark themes
 * Uses the Switch component with small size for consistency with the design system
 * Includes Moon/Sun icons inside the knob to indicate current theme
 *
 * It reads `resolvedTheme`, not `theme`: ThemeProvider runs with
 * `enableSystem`, so `theme` can be "system" while the page actually renders
 * dark. The knob, the visible label and the aria-label all derive from the
 * same resolved value, so what the toggle says is always what is on screen,
 * and pressing it pins the opposite concrete theme.
 */
/**
 * A switch that flips the app between the light and dark themes.
 *
 * Drop it into a header, a settings row or a toolbar. It needs a `ThemeProvider`
 * above it in the tree, and it renders a neutral placeholder until mounted so the
 * markup matches on hydration.
 *
 * It reads `resolvedTheme`, not `theme`: the provider runs with `enableSystem`, so
 * `theme` can be "system" while the page actually renders dark. The knob, the
 * visible label and the accessible name all derive from that one resolved value,
 * so what the toggle says is always what is on screen, and pressing it pins the
 * opposite concrete theme.
 */
export declare function ThemeToggle(): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ThemeToggle.d.ts.map