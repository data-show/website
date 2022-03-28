module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography')
  ],
}
