const path = require('path')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseConfig = require('./webpack.config.base')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new ExtractPlugin('styles.[chunkhash:8].css'),
  new VueClientPlugin()
]
const devServer = {
  port: '8080',
  host: '0.0.0.0',
  overlay: {
    error: true
  },
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: {
    index: '/public/index.html'
  }
//重要加history就不认识了要加他
}
let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/src/client-entry.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name]-[chunkhash:8].js',
      publicPath: '/public/'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'vendor',
            chunks: 'initial',
            minChunks: 1
          },
          last: {
            name: 'runtime',
            chunks: 'initial',
            minChunks: 1
          }
        }
      }
    },
    plugins: defaultPlugins
  })
}
module.exports = config
