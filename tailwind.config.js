/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f6f5f3',
          100: '#e9e7e3',
          200: '#d1cdc6',
          300: '#b0a99f',
          400: '#8a8275',
          500: '#6e6657',
          600: '#574f43',
          700: '#463f35',
          800: '#3a342c',
          900: '#2b2620',
          950: '#1a1612',
        },
        accent: {
          50: '#fdf6f0',
          100: '#fae8d8',
          200: '#f4d0b0',
          300: '#edb07f',
          400: '#e58a4f',
          500: '#dd6f2e',
          600: '#cc5a21',
          700: '#a9461d',
          800: '#86391d',
          900: '#6d301a',
        },
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(2deg)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(-3deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'float-medium': 'float-medium 5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
