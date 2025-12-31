/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Supermercado: ['Supermercado', 'sans-serif'],      
      },
    },
  },
  plugins: [],
}