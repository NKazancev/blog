const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    compress: true,
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[path][name]__[local]',
              },
            },
          },
        ],
      },
    ],
  },
});
