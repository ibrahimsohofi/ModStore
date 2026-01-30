/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
      },
      colors: {
        'dark': {
          50: '#f6f6f7',
          100: '#e1e2e6',
          200: '#c2c5cd',
          300: '#9ea3b0',
          400: '#797f92',
          500: '#606679',
          600: '#4d5261',
          700: '#3d414d',
          800: '#2c2f3a',
          900: '#1a1b22',
        },
        'primary': {
          50: '#eef9ff',
          100: '#d9f1ff',
          200: '#bce8ff',
          300: '#8edaff',
          400: '#56c3ff',
          500: '#30a5ff',
          600: '#1d83f3',
          700: '#1b6ae0',
          800: '#1c56b5',
          900: '#1d4b8e',
        },
        'secondary': {
          500: '#6EE7B7',
        },
        // Light mode specific colors
        'light': {
          50: '#ffffff',
          100: '#f9f9f9',
          200: '#f1f1f1',
          300: '#e8e8e8',
          400: '#d9d9d9',
          500: '#b7b7b7',
          600: '#949494',
          700: '#757575',
          800: '#5e5e5e',
          900: '#2c2c2c',
        },
      },
      backgroundImage: {
        'app-pattern': "url('src/assets/patterns/app-bg.png')",
      },
    },
  },
  plugins: [],
}
