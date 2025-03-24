/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      animation: {
        pulse: "pulse 5s infinite",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
