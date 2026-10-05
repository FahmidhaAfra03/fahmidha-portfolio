/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgLight: '#fbfbfb',
        charcoal: '#121316',
        mutedBlue: '#2c3e50',
        softTeal: '#0f766e',
        tealAccent: '#14b8a6',
        subtleBurgundy: '#4c1d24',
        burgundyGlow: '#831843'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
