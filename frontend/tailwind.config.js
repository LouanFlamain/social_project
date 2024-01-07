/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral_dark: "#040707",
        neutral_white: "#F8FBFC",
        primary: "#31BBDD",
        secondary: "#A1CED9",
        accent: "#73BBCD",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
    },
  },
  plugins: [require("daisyui")],
};
/*
https://www.realtimecolors.com/?colors=f9fbfb-030607-1a98b7-26535e-32798b&fonts=Poppins-Poppins
*/
