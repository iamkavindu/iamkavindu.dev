const { heroui } = require("@heroui/react");

module.exports = heroui({
  themes: {
    light: {
      colors: {
        primary: {
          DEFAULT: "oklch(0.65 0.18 150)",
          foreground: "oklch(0.15 0.02 150)",
        },
      },
    },
    dark: {
      colors: {
        primary: {
          DEFAULT: "oklch(0.75 0.20 150)", // Brighter for dark mode
          foreground: "oklch(0.10 0.01 150)",
        },
      },
    },
  },
});
