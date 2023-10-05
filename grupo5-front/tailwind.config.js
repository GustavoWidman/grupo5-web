/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#FF7AC6",
          "secondary": "#BF95F9",
          "accent": "#FFB86B",
          "neutral": "#212121",
          "base-100": "#23282f",
          "info": "#0092d6",
          "success": "#6cb288",
          "warning": "#daad58",
          "error": "#ab3d30",
        },
      },
    ]
  }
}