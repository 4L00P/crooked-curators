const HtmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require("path");

require('dotenv').config();
const { DEBUG_MODE } = process.env;

// const analyzerPlugin = DEBUG_MODE === "true" ? [new BundleAnalyzerPlugin()] : [];
const watcher = DEBUG_MODE === "true" ? true : false;
const mode = DEBUG_MODE === "true" ? "development" : "production";

module.exports = {
  entry: "./src/client/index.tsx",
  mode: mode,
  watch: watcher,
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/client"),
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
      template: "./src/client/index.html",
      filename: "index.html",
     }
    ),
    // ...analyzerPlugin,
  ],
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader"
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["@babel/preset-typescript"],
              ],
            },
          },
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: ["file-loader"]
      },
    ],
  },
};
