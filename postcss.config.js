const purgecss = require("@fullhuman/postcss-purgecss");

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:/]+/g);
  }
}

module.exports = {
  plugins: [
    require("tailwindcss"),
    require("autoprefixer"),

    process.env.NODE_ENV === "production"
      ? purgecss({
          content: ["./public/**/*.html", "./src/**/*.vue"],
          extractors: [
            {
              extractor: TailwindExtractor,
              extensions: ["vue"]
            }
          ],
          whitelist: ["html", "body"]
        })
      : ""
  ]
};
