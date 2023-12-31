/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "5/100": "5%",
        "10/100": "10%",
        "15/100": "15%",
        "20/100": "20%",
        "25/100": "25%",
        "30/100": "30%",
        "35/100": "35%",
        "40/100": "40%",
        "45/100": "45%",
        "50/100": "50%",
        "55/100": "55%",
        "60/100": "60%",
        "65/100": "65%",
        "70/100": "70%",
        "75/100": "75%",
        "80/100": "80%",
        "85/100": "85%",
        "90/100": "90%",
        "95/100": "95%",
        "100/100": "100%",
      },
      colors: {
        "green-1": "#00B300",
        "gray-1": "#D9D9D9",
        "white-1": "#FFFFFF",
        "black-1": "#000000",
      },
      backgroundImage: (theme) => ({
        "gradient-green-white":
          "repeating-linear-gradient(90deg, #00b300ff 0%, #ffff) ",
      }),
      fontFamily: {
        sans: ["IBM plex sans", "Roboto", "sans-serif"],
      },
      screens: {
        xs: "480px",
        sm: "768px",
        md: "1024px",
      },
    },
    plugins: [],
  },
};
