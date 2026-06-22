import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Mwala Earth Tone Palette
        cream: "#F5F1ED",
        beige: "#A89968",
        khaki: "#B8956A",
        "british-khaki": "#9B8B6B",

        // Utility colors
        foreground: "#1a1a1a",
        background: "#ffffff",
        card: "#f9f9f9",
        "card-foreground": "#1a1a1a",
        primary: "#9B8B6B",
        "primary-foreground": "#ffffff",
        secondary: "#A89968",
        "secondary-foreground": "#ffffff",
        muted: "#9CA3AF",
        "muted-foreground": "#6B7280",
        accent: "#B8956A",
        "accent-foreground": "#ffffff",
        destructive: "#EF4444",
        "destructive-foreground": "#ffffff",
        border: "#E5E7EB",
        input: "#E5E7EB",
        ring: "#9B8B6B",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
