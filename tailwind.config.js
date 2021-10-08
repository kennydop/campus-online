module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'blue-grey': '#f6f9fb',
        'blue-grey-50': '#e9f0f4',
        'bdark-50': '#181818',
        'bdark-100': '#1f1f1f',
        'bdark-200': '#111111',
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
