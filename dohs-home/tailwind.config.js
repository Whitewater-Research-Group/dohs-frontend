/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Poppins', 'sans-serif'],
        cursive: ['Aguafina Script', 'cursive'],
        sans: ['DM Sans'],
        sora: ['Sora'],
      },

      colors: {
        steelBlue: '#527C88',
        whiteSteel: '#1BA9B5',
        cyan: '#026979',
        turquoiseBlue: '#1BA9B5',
        darkCharcoal: '#121212',
        darkCoal: '#161C2D',
        blueGray: '#6C87AE',
      },
    },
  },
  plugins: [],
}

