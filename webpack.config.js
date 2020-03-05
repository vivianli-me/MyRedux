const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    // demo: "./example/demo/index.js",
    counter: "./example/counter/index.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "[name].bundle.[hash:8].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    hotOnly: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './template.html',
      title: 'Demo',
      filename: 'demo.html'
    }),
    new HtmlWebpackPlugin({
      template: './template.html',
      title: 'Counter',
      filename: 'counter.html'
    })
  ]
};
