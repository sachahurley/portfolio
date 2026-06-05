// PostCSS processes your CSS files before they reach the browser.
// These two plugins are required for Tailwind CSS to work:
//   - tailwindcss: converts Tailwind classes into actual CSS
//   - autoprefixer: adds browser-specific prefixes (e.g., -webkit-)
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
