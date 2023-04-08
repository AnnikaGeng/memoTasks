/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fef6e4",
        headline: "#001858",
        paragraph: "#172c66",
        button: "#f582ae",
        buttonText: "#001858",
        stroke: "#001858",
        main: "#f3d2c1",
        highlight: "#fef6e4",
        secondary: "#8bd3dd",
        tertiary: "#f582ae",
      },
    },
  },
  plugins: [],
}

