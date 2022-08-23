const Path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const ESLintWebPackPlugin = require('eslint-webpack-plugin');

const myEslintOptions = {
  extensions: [`js`, `jsx`, `ts`],
  exclude: [`node_modules`],
  // eslintOptions: {
  //   test: /\.(js)$/,
  //   include: Path.resolve(__dirname, "../src"),
  //   enforce: "pre",
  //   loader: "eslint-webpack-plugin",
  //   // exclude: "/node_modules/",
  //   options: {
  //     emitWarning: true,
  //   },
  // },
};

module.exports = merge.merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    chunkFilename: "js/[name].chunk.js",
  },
  devServer: {
    // inline: true,
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new ESLintWebPackPlugin(myEslintOptions),
  ],
  module: {
    rules: [
      // {
      //   test: /\.(js)$/,
      //   include: Path.resolve(__dirname, "../src"),
      //   enforce: "pre",
      //   loader: "eslint-webpack-plugin",
      //   // exclude: "/node_modules/",
      //   options: {
      //     emitWarning: true,
      //   },
      // },
      {
        test: /\.(js)$/,
        include: Path.resolve(__dirname, "../src"),
        loader: "babel-loader",
      },
    ],
  },
});
