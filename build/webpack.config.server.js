const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const isDev = process.env.NODE_ENV === 'development'
console.log(isDev + 'aaaaaaaaaa')

// let plugins = [
//   new ExtractPlugin('styles.[chunkhash:8].css'),
//   new VueLoaderPlugin(),
//   new webpack.DefinePlugin({
//     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
//     'process.env.VUE_ENV': '"server"'
//   })
// ]
let config

// if (isDev) {
//   plugins.push(new VueServerPlugin())
// }

config = merge(baseConfig, {
  target: 'node',
  mode: 'development',
  entry: path.join(__dirname, '../client/src/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[chunkhash:8].css'),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})

module.exports = config
