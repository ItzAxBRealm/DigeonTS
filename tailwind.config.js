/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      
      },
    },
    extend: {
      colors: {
        'primary-1' : '#7c3aed',
        'primary-light' : '#9b69f1',
        'primary-dark' : '#5f14e0',
        'secondary-1' : '#3aed7c',
        'secondary-light' : '#69f19b',
        'secondary-dark' : '#14e05f',
        'secondary-content' : '#032510',
        'background-main' : '#070F2B',
        'background-2' : '#31363F',
        'background-3' : '#4B5D67',
        'extra-1' : '#00224D',
        'purple-dark' : '#27005D',
        'purple-1' : '#836FFF',
        'skyline-1' : '#AED2FF',
        'skyline-2' : '#E4F1FF'
      },
      screens: {
        'xs': '480px',
      
      },
      width: {
        '420': '420px',
        '465': '465px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],

      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
}