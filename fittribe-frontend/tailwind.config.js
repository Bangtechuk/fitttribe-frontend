/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3f0',
          100: '#e6e0d8',
          200: '#d2c7b8',
          300: '#bba894',
          400: '#a68c75',
          500: '#8d7055',
          600: '#735c46',
          700: '#5a4837',
          800: '#433628',
          900: '#2d241b',
        },
        secondary: {
          50: '#f0f9f6',
          100: '#d8ede5',
          200: '#b8dcd0',
          300: '#94c7b8',
          400: '#75b3a0',
          500: '#559c87',
          600: '#467d6c',
          700: '#376152',
          800: '#28463c',
          900: '#1b2f28',
        },
        accent: {
          50: '#fdf3f0',
          100: '#f9dfd8',
          200: '#f3c2b8',
          300: '#eba094',
          400: '#e27f6f',
          500: '#d85a46',
          600: '#b84838',
          700: '#93382c',
          800: '#6e2921',
          900: '#491c16',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair-display)', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.05)',
        medium: '0 6px 30px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}
