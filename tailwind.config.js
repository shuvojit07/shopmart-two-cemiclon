/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f59e0b",   // amber-500
          dark: "#d97706",      // amber-600
          light: "#fbbf24",     // amber-400
        },
      },
    },
  },
  plugins: [],
};