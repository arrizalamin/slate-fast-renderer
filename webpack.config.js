const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
        options: JSON.parse(fs.readFileSync('./.babelrc')),
        exclude: /node_modules/,
      },
    ],
  },
  entry: path.resolve('./src'),
  output: {
    path: path.resolve('./dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    library: 'slate-fast-renderer',
  },
  externals: [nodeExternals()],
  optimization: {
    minimize: true,
  },
};
