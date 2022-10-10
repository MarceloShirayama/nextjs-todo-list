/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-green-700",
    "bg-green-500",
    "bg-cyan-500",
    "bg-cyan-700",
    "bg-zinc-500",
    "bg-zinc-700",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
