/** @type {import('tailwindcss').Config} */

// Tailwind preset from @scorp-ds/tokens (design tokens → Tailwind theme).
module.exports = {
  presets: [require('@scorp-ds/tokens/tailwind.preset')],

  darkMode: ['class'],

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@scorp-ds/components/dist/**/*.{js,ts,jsx,tsx}',
  ],
}
