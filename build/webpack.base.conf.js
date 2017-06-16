var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

var webpack = require('webpack')
// var ExtractTextPlugin = require("extract-text-webpack-plugin")
// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
// CSS浏览器前缀问题
// var autoprefixer = require('autoprefixer')
// var precss = require('precss')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  plugins: [
    // 全局依赖jQuery
    new webpack.ProvidePlugin({
      $ : "jquery",
      jQuery : "jquery",
      "window.jQuery" : "jquery"
    })
    // // 提取依赖的jQuery通用插件
    // new CommonsChunkPlugin({
    //   name : "vendor",
    //   minChunks : Infinity
    // }),
    // // 提取CSS文件
    // new ExtractTextPlugin("[name].css"),
    // // 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
    // new webpack.optimize.DedupePlugin()
  ],
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
