/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'
import { color } from 'framer-motion'

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'amaranth': ['Amaranth', 'sans-serif'],
        'onest': ['OnestVariable', 'sans-serif'],
      },
      colors: {
        'primary': "#FAC215"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

