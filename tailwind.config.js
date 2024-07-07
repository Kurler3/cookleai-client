/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-text-green': '#62E004',
        'app-green': '#16a34a',
        'app-green-hover': '#127F3A'
      }
    },
  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: ["dark"]
  }
}