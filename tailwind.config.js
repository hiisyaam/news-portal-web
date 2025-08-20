/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'medium-green': '#1a8917',
          'medium-dark': '#242424',
          'medium-gray': '#6b6b6b',
          'medium-light': '#f7f4ed'
        },
        fontFamily: {
          'charter': ['Charter', 'Georgia', 'serif'],
          'sohne': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
        }
      },
    },
    plugins: [],
  }