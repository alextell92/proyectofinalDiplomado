const path = require("path");
const yaml = require("yamljs");
const json5 = require("json5");

const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: 
    "./src/index.js",

  plugins: [
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Archivos JavaScript
        exclude: /node_modules/,
       use: {
          loader: "babel-loader",
          options: {
            // forzar conversión de ESM a CommonJS y detectar sourceType automáticamente
            presets: [
              [
                "@babel/preset-env",
                { modules: "commonjs" }
              ]
            ],
            sourceType: "unambiguous"
          }
        }
      },
      {
        test: /\.css$/, // Archivos CSS
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i, // Archivos SCSS/SASS
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.ya?ml$/, // Archivos YAML
        type: "json",
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/, // Archivos JSON5
        type: "json",
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".yaml", ".yml", ".json5"], 
  },
  mode: "development", 
};


