module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        neppharm_green: {
          light: "#1aa870",
          DEFAULT: "#008e56",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
