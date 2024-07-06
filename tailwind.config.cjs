/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/index.css", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        gajraj: ["Gajraj+One", "sans-serif"],
        phudu: ['Phudu', "cursive"],
        waiting: ['Waiting for the Sunrise', "cursive"],
        montserrat: ['Montserrat', "sans-serif"],
        jost: ["Jost", "sans-serif"]
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};