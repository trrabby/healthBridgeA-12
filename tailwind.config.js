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
        accent: "#204969",
        third: "#4E6987",
        primary: "#FFFF00",
        fourth: "#D2D9E1",
      },
    },
  },
  plugins: [],
});

