/** @type {import('tailwindcss').Config} */
export default {
  // This 'content' array tells Tailwind which files to scan
  // for class names. It's the most important part.
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
