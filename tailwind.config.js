/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Customize existing colors
        blue: {
          '100': '#ebf8ff',
          '200': '#bee3f8',
          '300': '#90cdf4',
          '400': '#63b3ed',
          '500': '#4299e1',
          '600': '#3182ce',
          '700': '#2b6cb0',
          '800': '#2c5282',
          '900': '#2a4365',
        },
        // Add new custom colorsS
        prime: '#eaeff3',
       // secondd: '#1f8969',
        blue: {
          '100': '#ebf8ff',
          '200': '#bee3f8',
          '300': '#90cdf4',
          '400': '#63b3ed',
          '500': '#4299e1',
          '600': '#3182ce',
          '700': '#2b6cb0',
          '800': '#2c5282',
          '900': '#2a4365',
        },
        third:'#FFFEFC',
        fourth: '#E2E8F0',
        //secondd: 'hsl(39, 30%, 85%)',
        //secondd: 'hsl(39, 40%, 85%)',
       // secondd: 'hsl(20, 80%, 85%)',
       secondd: 'hsl(27.5, 80%, 80%)', //hsl (color,saturation, ligtness)
        danger: '#4CAF50',
      },
    },
  },
  plugins: [],
}
