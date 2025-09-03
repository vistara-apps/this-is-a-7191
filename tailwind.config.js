/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220 14% 98%)',
        accent: 'hsl(202 86% 55%)',
        primary: 'hsl(220 48% 32%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(220 14% 14%)',
        'text-secondary': 'hsl(220 14% 44%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      spacing: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'xxl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220 14% 14% / 0.08)',
      },
    },
  },
  plugins: [],
}