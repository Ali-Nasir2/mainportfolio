/** @type {import('tailwindcss').Config} */
module.exports = {
  // Paths to all of your template files
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // React source files
    "./public/index.html",        // HTML entry
  ],

  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#aaa6c3",
        tertiary: "#1E1E1E",
        "black-100": "#101010",
        "black-200": "#000000",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
    },
  },

  plugins: [],
};
