const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      'dd': '992px',
      ...defaultTheme.screens,
    },
    extend: {
      fontFamily: {
        roboto: "'Roboto', sans-serif",
        themify: "'themify'",
      },
      colors: {
        red:{
          200: "#FF6868",
          300: "#EED6D0",
          400: "#AC3318",
          500: "#CD8474",
        },
        gray:{
          100: "#FBFBFB",
          300: "#B5B5B5",
          400: "#454545",
        },
        green:{
          100: "#A1E6CB",
          200: "#A1E5CB",
          300: "#00D285",
          400: "#00A654"
        },
        yellow:{
          300: "#FFBA00",
          400: "#FFC100"
        },
        skyblue: {
          200: "#1BABFE",
        },
      },
      letterSpacing: {
        wide: '1px',
      },
      borderRadius: {
        DEFAULT: '5px',
      },
      dropShadow: {
        'md': '0px 2px 16px rgba(0, 0, 0, 0.08)',
        'dd': '0px 8px 16px rgba(69, 69, 69, 0.08)',
        'yellow': '0px 10px 20px rgba(255, 218, 117, 0.3)',
      },
      backgroundPosition: {
        'center-right-default': 'center right',
        'center-right': 'center right 10px',
      },
    },
  },
  plugins: [],
}
