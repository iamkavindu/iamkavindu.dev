const { heroui } = require("@heroui/react");

module.exports = heroui({
  themes: {
    light: {
      colors: {
        primary: {
          DEFAULT: "#00b85c",
          foreground: "#13261c",
        },
      },
    },
    dark: {
      colors: {
        primary: {
          DEFAULT: "#00d96d", // Brighter for dark mode
          foreground: "#0c1913",
        },
      },
    },
  },
});
