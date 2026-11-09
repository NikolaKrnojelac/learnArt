/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FAFAFF",
        surface: "#EEF0F2",
        border: "#DADDD8",
        primary: "#1C1C1C",
      },
      fontFamily: {
        display: ["PlayfairDisplay_600SemiBold"],
      },
    },
  },
  plugins: [],
}