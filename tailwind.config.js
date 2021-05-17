const colors = require("tailwindcss/colors");
module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.vue", "./public/**/*.html"],
  },
  theme: {
    extend: {
      colors: {
        rose: colors.rose,
        green: {
          light: "#40DCA5",
        },
      },
      padding: {
        "2/3": "66.66667%",
      },
    },
    flex: {
      new: "1 0 auto",
    },
  },
  variants: {
    extend: {
      animation: ["motion-safe"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
