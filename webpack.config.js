const { join, resolve } = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  devtool: 'eval-source-map',
  devServer: {
    open: true,
    port: 3000,
    overlay: true,
    stats: {
      warnings: false,
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: ['url-loader?limit=10000', 'img-loader'],
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: join('src', 'index.html'),
      filename: './index.html',
    }),
    new CleanWebpackPlugin(['dist']),
  ],
}
