// eslint-disable-next-line no-undef
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'sans': ['Montserrat', 'sans-serif', 'system-ui']
      },
      fontWeight: {
        'extra-light-var': '200',
        'light-var': '300',
        'regular-var': '400',
        'medium-var': '500',
        'semi-bold-var': '600',
        'bold-var': '700',
        'extra-bold-var': '800',
        'black-var': '900',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
