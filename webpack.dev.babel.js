import merge from 'webpack-merge'
import path from 'path'
import common from './webpack.common.babel.js'
import webpack from 'webpack'

const devConfig = {
  plugins: [
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    compress: false,
    watchContentBase: true,
    contentBase: path.resolve(__dirname, 'src'),
    hot: true,
    port: process.env.PORT || 80,
    disableHostCheck: true
  }
}
module.exports = merge(common, devConfig)
