/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{ejs,html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
