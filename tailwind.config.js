const plugin = require("tailwindcss/plugin");

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: false,
  theme: {
    extend: {
      screens: {
        "dark-mode": { raw: "(prefers-color-scheme: dark)" }
      }
    }
  },
  variants: {
    letterSpacing: ["responsive", "hover", "focus"]
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant("important", ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`;
          rule.walkDecls(decl => {
            decl.important = true;
          });
        });
      });
    })
  ]
};
