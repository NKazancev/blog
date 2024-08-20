const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'build'),
    assetModuleFilename: 'assets/[name][ext]',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve(__dirname, '..', 'src'), 'node_modules'],
    alias: {
      assets: path.resolve(__dirname, '..', 'src', 'assets'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(woff|ttf|otf|eot|svg)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
    }),
  ],
};
