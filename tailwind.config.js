const colors = require("tailwindcss/colors");
module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.vue", "./public/**/*.html"],
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      animation: ["motion-safe"],
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
