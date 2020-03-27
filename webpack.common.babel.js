import path from 'path'
import os from 'os'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HappyPack from 'happypack'
import WebpackBar from 'webpackbar'

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) || 1
const env = process.env.NODE_ENV

const config = {
  mode: env,
  devtool: env === 'development' ? 'inline-source-map' : 'eval',
  stats:  env === 'development' ? 'errors-only' : 'minimal',
  context: path.resolve(__dirname, 'src'),
  entry: {
    'index': ['@babel/polyfill', './index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          enforce: true,
          priority: 10
        }
      }
    }
  },
  plugins: [
    new WebpackBar({
      color: 'green',
      profile: true
    }),
    new HtmlWebpackPlugin({
      template: `index.pug`,
      filename: `index.html`,
      chunks: ['vendor', 'index']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    // new CopyPlugin([
    //   {
    //     from: 'assets/Cathaynbaquiz/public',
    //     to: 'assets/Cathaynbaquiz/public'
    //   }
    // ]),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(sass)$/,
        use: () => ( env === 'development' ?
          [
            'style-loader',
            'css-loader?sourceMap=true',
            'postcss-loader?sourceMap=true',
            'sass-loader?sourceMap=true'
          ] :
          [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        )
      },
      {
        test: /\.(css)$/,
        use: () => ( env === 'development' ?
          [
            'style-loader',
            'css-loader?sourceMap=true',
          ] :
          [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ]
        )
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp|woff|woff2|eot|ttf|otf|aac|mp3|mp4|flac|wav|ogg|html)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              emitFile: env === 'development' && true
            }
          }
        ]
      },
      {
        test: /\.(m?jsx?)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'happypack/loader?id=babel&preset=react'
      },
      {
        test: /\.(pug)$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: env === 'development' ? true : false
            }
          }
        ]
      }
    ]
  },
}
export default config
