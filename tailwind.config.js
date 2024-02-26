/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      'sans' : ['Prompt', 'sans-serif']
    },
    extend: {
      colors : {
        'azul' : {
          100 : '#80E9FF',
          200 : '#00D4FF',
          300 : '#0A2540'
        },
        'magenta' : {
          100 : '#FF80FF',
          200 : '#FF00FF',
          300 : '#3D0A42'
        },
        'w' : {
          100 : '#FEF0FC'
        }
      }
    },
  },
  plugins: [],
}