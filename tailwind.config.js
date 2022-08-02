/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        sm: '768px',
        sm: '976px',
        xl: '1440px'
      },
      colors: {
        whitesmoke: 'whitesmoke'
      }
    },
  },
  plugins: [],
}
