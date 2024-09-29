/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E69A41",
        secondary: "#3A3531",
        tertiary: "#656565",
        tertquaternaryiary: "#656565",
      },
    },
  },
  plugins: [],
};
