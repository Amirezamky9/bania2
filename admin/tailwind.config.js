/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // To enable dark mode based on a class in the HTML tag
    theme: {
      extend: {
        fontFamily: {
          sans: ['Vazirmatn', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }
  