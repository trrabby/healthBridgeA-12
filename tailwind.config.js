/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8ecae6",
        accent: "#219ebc",
        third: "#023047",
        fourth: "#ffb703",
      },
    },
  },
  plugins: [],
});

