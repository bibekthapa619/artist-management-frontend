/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          fade: "#3B82F6",
          hover: "#1E3A8A",
        },
      },
    },
  },
  plugins: [],
};
