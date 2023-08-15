/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        background: "url('/images/background.jpg')",
      },
      backgroundColor: {
        "light-background-primary": "#BEADFA",
        "light-background-secondary": "#D0BFFF",
        "light-background-tertiary": "#DFCCFB",
        "light-background-quaternary": "#FFF3DA",
      },
    },
    plugins: [],
  },
};
