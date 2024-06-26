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
      screens: {
        'xl' : '1366px'
      },
      colors : {
        'green' : {
          500 : '#02B576'
        },
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
        },
        'b' : {
          500 : '#0061B6'
        },
        'ab': {
          500: '#FF0548'
        },
        'accent' : {
          500 : '#FCBC1A'
        },
        'stripe' : {
          500 : '#635BFF'
        }
      }
    },
  },
  plugins: [],
}