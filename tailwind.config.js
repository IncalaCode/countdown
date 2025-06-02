/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-once': 'pulseOnce 0.5s ease-out',
      },
    },
  },
  plugins: [],
}