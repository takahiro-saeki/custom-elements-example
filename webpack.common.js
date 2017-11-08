const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
  rules: [
    {
      test: /(\.jsx|\.js)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom Elements Example 1',
      template: path.join(__dirname, './src/index.ejs')
    }),
    new HtmlWebpackPlugin({
      title: 'Custom Elements Example 2',
      template: path.join(__dirname, './src/tab.ejs'),
      filename: 'tab.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Custom Elements Example 3',
      template: path.join(__dirname, './src/card.ejs'),
      filename: 'card.html'
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.HotModuleReplacementPlugin()
  ]
};
