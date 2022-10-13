const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const NodemonPlugin = require('nodemon-webpack-plugin')
const WebpackNodeExternals = require('webpack-node-externals')

const mode = process.env.MODE || 'development'
const paths = require('./webpack-utils/paths')

module.exports = {
  target: 'node',
  entry: [paths.src + '/index.js'],
  mode,
  output: {
    path: paths.build,
    filename: 'index.js',
  },
  externals: [WebpackNodeExternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '.env',
          to: '.',
          noErrorOnMissing: false,
        },
        {
          from: 'package.json',
          to: '.',
          noErrorOnMissing: false,
        },
        {
          from: 'package-lock.json',
          to: '.',
          noErrorOnMissing: false,
        },
        {
          from: 'yarn.lock',
          to: '.',
          noErrorOnMissing: false,
        },
      ],
    }),
    new NodemonPlugin(),
  ],
  module: {
    rules: [{ test: /\.js$/, use: ['babel-loader'] }],
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@app': paths.src,
      '@build': paths.build,
    },
  },
}
