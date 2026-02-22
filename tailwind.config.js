/** @type {import('tailwindcss').Config} */
import tailwindAnimate from "tailwindcss-animate";
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [tailwindAnimate],
};
