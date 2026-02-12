/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'md': '600px',
      'xl': '1200px',
    },
    extend: {
      fontFamily: {
        assistant: ['Assistant', 'sans-serif'],
        trajan: ['Trajan Pro', 'serif'],
      },
    },
  },
  plugins: [],
}
