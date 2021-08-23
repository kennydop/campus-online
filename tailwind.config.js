module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'blue-grey': '#f6f9fb',
        'blue-grey-50': '#e9f0f4',
      },
      fontFamily: {
        default: ['Montserrat']
      },
      spacing: {
        '70': '17rem',
        '100': '28rem',
        '102': '30rem',
        '105':'34rem',
      },
      borderWidth: {
        '2.5': '2.5px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
