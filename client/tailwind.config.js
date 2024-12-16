/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

const { fontFamily } = require("tailwindcss/defaultTheme");
import tailwindScrollbar from "tailwind-scrollbar";

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "app/**/*.{js,ts,jsx,tsx}",
    "components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      aspectRatio: {
        3.91: "3.91 / 1", // Aspect ratio 3.91:1
      },
      fontFamily: {
        amaranth: ["Amaranth", "sans-serif"],
        onest: ["OnestVariable", "sans-serif"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        "tulip-tree": {
          50: "#fef9e8",
          100: "#fef0c3",
          200: "#fee28a",
          300: "#fdd147",
          400: "#fac215",
          500: "#eab308",
          600: "#ca9a04",
          700: "#a17c07",
          800: "#85680e",
          900: "#715a12",
          950: "#423306",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      primary: "#FAC215",
      screens: {
        "1/2xl": "1350px",
        "1/2lg": "1150px",
      },
    },
  },
  darkMode: ["class"],
  plugins: [
    nextui(),
    require("tailwindcss-animate"),
    tailwindScrollbar({ nocompatible: true }),
  ],
};
