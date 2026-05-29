module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        calm: {
          50: "#f8f9fa",
          100: "#EEF2F5",
          200: "#DCE4EB",
          300: "#B8CCDB",
          400: "#8AAFCA",
          500: "#5B91B3",
          600: "#3D6B8F",
          700: "#2D5273",
          800: "#1F3A52",
          900: "#142A38",
        },
        mindful: {
          50: "#f5faf7",
          100: "#d4e8dd",
          200: "#a8d4b9",
          300: "#7dbf95",
          400: "#51aa71",
          500: "#389654",
          600: "#2a7642",
          700: "#1e5731",
          800: "#143820",
          900: "#0a1f12",
        },
      },
      fontFamily: {
        sans: ["var(--font-family-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-gentle": "pulse-gentle 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-gentle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
