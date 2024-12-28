/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["winter", "dark", "cmyk", "luxury", "fantasy", "dracula", "night"],
  },
  darkMode: ["selector", "data-theme=''"],
  plugins: [require("daisyui")],
};
