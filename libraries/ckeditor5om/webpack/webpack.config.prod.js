const path = require("path");
const Webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const common = require("./webpack.common.js");

module.exports = merge.merge(common, {
  mode: "production",
  devtool: "source-map",
  stats: "errors-only",
  bail: true,
  output: {
    filename: "js/ckeditor.[chunkhash:8].js",
    chunkFilename: "js/ckeditor.[chunkhash:8].chunk.js",
  },
  // output: {
	// 	// The name under which the editor will be exported.
	// 	library: 'CKSource',

	// 	path: path.resolve( __dirname, 'build' ),
	// 	filename: 'ckeditor.js',
	// 	libraryTarget: 'umd',
	// 	libraryExport: 'default'
	// },
  plugins: [
    new Webpack.DefinePlugin({
      "import.meta.env.NODE_ENV": JSON.stringify("production"),
    }),
    // new Webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: "bundle.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  optimization: {
    minimize: true,
    // minimizer: [new UglifyJsPlugin({
    //   include: /\.min\.js$/
    // })]
  }
});
