const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const BrotliPlugin = require('brotli-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('public'),
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js',
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
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
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10000,
              name: '/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.ttf$/,
        use: ['url-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/images/favicon.ico',
    }),
    new CopyPlugin([
      {
        from: './manifest.json',
        to: './',
      },
      {
        from: './service-worker.js',
        to: './',
      },
      {
        from: './_redirects',
        to: './',
      },
    ]),
    new ReactLoadablePlugin({
      filename: path.resolve(process.cwd(), 'public/react-loadable.json'),
    }),
    () => {
      const { NODE_ENV = 'production' } = process.env;
      if (NODE_ENV === 'production') {
        return new BrotliPlugin({
          asset: '[path].br[query]',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        });
      }
    },
  ],
};
