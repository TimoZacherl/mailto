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
  variants: {},
  plugins: []
};
