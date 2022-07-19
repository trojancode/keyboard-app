/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors:{
        deepBlue:'#0b1953',
        warmWhite:'#f9f2e7',
        green:{
          600:'#098f35'
        },
        rose:{
          500:'#f1416d'
        }
      }
    },
  },
  plugins: [],
}
