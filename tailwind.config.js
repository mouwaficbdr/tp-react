/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 10px 25px -12px rgb(0 0 0 / 0.25)',
      },
    },
  },
  plugins: [],
}
