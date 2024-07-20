/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightRed: "#FFEEEE",
      },
      boxShadow: {
        "custom-light-red": "0px 0px 22px 2px #FF202040",
      },
    },
  },
  plugins: [],
};
