/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': 'hsl(220 14% 98%)',
        'accent': {
          DEFAULT: 'hsl(202 86% 55%)',
          'dark': 'hsl(202 86% 45%)',
        },
        'primary': 'hsl(220 48% 32%)',
        'surface': 'hsl(0 0% 100%)',
        'text-primary': 'hsl(220 14% 14%)',
        'text-secondary': 'hsl(220 14% 44%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220 14% 14% / 0.08)',
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'xxl': '24px',
      },
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      transitionTimingFunction: {
        'default': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'default': '200ms',
        'fast': '100ms',
        'slow': '400ms',
      },
    },
  },
  plugins: [],
}

