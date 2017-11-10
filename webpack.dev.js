const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Merge(common, {
  output: {
    filename: 'app.bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: '#source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
    open: true,
    openPage: '',
    port: 8080,
    inline: true,
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
