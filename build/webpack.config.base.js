const path = require('path')
const ExtractPlugin = require('extract-text-webpack-plugin')
const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/src/client-entry.js'),
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'bundle.[hash:8].js',
    publicPath: 'http://localhost:8080/public/'
  },
  module: {
    rules: [
      // {
      //   test: /\.(vue|js)$/,//eslint语法校验
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   enforce: 'pre'
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|gif|png|jpeg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      },
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
  }
}
module.exports = config
