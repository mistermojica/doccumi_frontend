const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../src/scripts/decoupled.js"),
  },
  output: {
    path: path.join(__dirname, "../build"),
    filename: "js/[name].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: false,
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "../public"), to: "public" }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ["raw-loader"],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true
              }
            },
          },
          'css-loader',
          {
            loader: "postcss-loader",
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve("@ckeditor/ckeditor5-theme-lark"),
              },
              minify: true,
            }),
          },
        ],
      },
    ],
  },
};
