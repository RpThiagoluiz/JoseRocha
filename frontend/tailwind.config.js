/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in-from-top-4': {
          from: { opacity: '0', transform: 'translateY(-1rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-bottom-2': {
          from: { opacity: '0', transform: 'translateY(0.5rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-left-4': {
          from: { opacity: '0', transform: 'translateX(-1rem)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-700': 'fade-in 700ms ease-out',
        'fade-in-500': 'fade-in 500ms ease-out',
        'slide-in-top-500': 'slide-in-from-top-4 500ms ease-out',
        'slide-in-bottom-500': 'slide-in-from-bottom-2 500ms ease-out',
        'slide-in-left-500': 'slide-in-from-left-4 500ms ease-out',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [],
}
