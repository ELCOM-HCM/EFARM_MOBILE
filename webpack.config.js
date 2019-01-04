const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveStrictPlugin = require("remove-strict-webpack-plugin");
// const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const outputDirectory = "dist";
module.exports = {
  //"development" "production"
  mode: process.env.NODE_ENV || "production",
  entry: [
    // quiet=true turn off warning, stop HRM when build production
    //"webpack-hot-middleware/client?reload=true&quiet=true",
    "babel-polyfill",
    "./src/index"
  ],
  watch: true,
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: "/",
    filename: "dangtm_bundle.js"
  },
  devServer: {
    contentBase: "./dist",
    // Display only errors to reduce the amount of output.
    stats: "errors-only",
    // Parse host and port from env to allow customization.
    //
    // If you use Docker, Vagrant or Cloud9, set
    // host: options.host || "0.0.0.0";
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
    watchContentBase: true,
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new RemoveStrictPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico"
    }),
    // new webpack.DefinePlugin({
    //   "process.env.NODE_ENV": '"production"'
    // }),
    new webpack.HotModuleReplacementPlugin(),
    // new uglifyJsPlugin()
    new MiniCssExtractPlugin({
      filename: "styles.css"
    })
    // new MiniCssExtractPlugin()
  ]
};
