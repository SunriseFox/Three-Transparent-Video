const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const dist = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Test',
      template: './index.html',
      filename: 'index.html'
    }),
  ],
  devServer: {
    contentBase: '.',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
