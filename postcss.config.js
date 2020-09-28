const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),

    process.env.NODE_ENV === "production"
      ? purgecss({
          content: ["./public/**/*.html", "./src/**/*.vue"],
          extractors: [
            {
              extractor: class TailwindExtractor {
                static extract(content) {
                  // eslint-disable-next-line no-useless-escape
                  return content.match(/[A-z0-9-:\/]+/g) || [];
                }
              },
              extensions: ["vue"]
            }
          ]
        })
      : ""
  ]
};
