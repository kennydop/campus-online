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
      boxShadow: {
        'mdt': '-1.5px -3px 4px rgba(0, 0, 0, 0.1), -0.5px -1px 4px rgba(0, 0, 0, 0.06)',
      },
      fontSize: {
        'xxs': '.65rem'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
