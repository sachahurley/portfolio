/** @type {import('tailwindcss').Config} */

// Tailwind preset from @scorp-ds/tokens (design tokens → Tailwind theme).
module.exports = {
  presets: [require('@scorp-ds/tokens/tailwind.preset')],

  // hover: utilities compile inside @media (hover: hover) and (pointer:
  // fine), so touch taps can't strand a row in its hover state after an
  // SPA navigation (mobile browsers re-apply :hover at the last tap point).
  future: { hoverOnlyWhenSupported: true },

  darkMode: ['class'],

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@scorp-ds/components/dist/**/*.{js,ts,jsx,tsx}',
  ],
}
