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
        // Institutional Dark Palette
        background: "#0B1220",
        surface: "#111B31",
        "elevated-surface": "#161F38",
        border: "#263043",
        
        // Typography
        foreground: "#F8FAFC",
        "muted-foreground": "#94A3B8",
        
        // Brand & Accents
        "accent-gold": "#E0B03B",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",

        // Map shadcn/ui defaults to institutional palette
        card: "#111B31",
        "card-foreground": "#F8FAFC",
        primary: "#E0B03B",
        "primary-foreground": "#0B1220",
        secondary: "#161F38",
        "secondary-foreground": "#F8FAFC",
        muted: "#161F38",
        accent: "#161F38",
        "accent-foreground": "#F8FAFC",
        destructive: "#EF4444",
        "destructive-foreground": "#F8FAFC",
        input: "#263043",
        ring: "#E0B03B",
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
        'glow-gold': '0 0 60px rgba(212, 160, 23, 0.15)',
        'glow-emerald': '0 0 60px rgba(16, 185, 129, 0.12)',
        'card-dark': '0 32px 64px rgba(0,0,0,0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'ticker': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'fade-up-delay-1': 'fade-up 0.7s ease-out 0.15s forwards',
        'fade-up-delay-2': 'fade-up 0.7s ease-out 0.3s forwards',
        'fade-up-delay-3': 'fade-up 0.7s ease-out 0.45s forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.7s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.7s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'marquee': 'marquee 30s linear infinite',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      backgroundSize: {
        '200%': '200%',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config

