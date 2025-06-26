// tailwind.config.js
module.exports = {
  darkMode: "class", // Enables class-based dark mode switching
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        light: {
          background: "#F5F7FA",
          navbar: "#FFFFFF",
          card: "#FFFFFF",
          text: "#1A1A1A",
          primary: "#2563EB",
          secondary: "#10B981",
          accent: "#D946EF",
          border: "#E5E7EB",
        },

        // Dark Mode Colors
        dark: {
          background: "#0D1117",
          navbar: "#161B22",
          card: "#1C2128",
          text: "#C9D1D9",
          primary: "#238636",
          secondary: "#2F81F7",
          accent: "#F778BA",
          border: "#30363D",
        },
      },
    },
  },
  plugins: [],
};
