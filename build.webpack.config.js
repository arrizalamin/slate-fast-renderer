const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  ...require('./webpack.config'),
  devtool: 'source-maps',
  entry: path.resolve('./src'),
  output: {
    path: path.resolve('./dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    library: '@slate-react-renderer',
  },
  externals: [nodeExternals()],
  plugins: [],
  optimization: {
    minimize: true,
  },
};
