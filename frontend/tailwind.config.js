/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 important fix
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}