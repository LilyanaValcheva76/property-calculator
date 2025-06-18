/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",       // сканира файловете в src/
    "./components/**/*.{js,ts,jsx,tsx}" // ако имаш папка components/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
