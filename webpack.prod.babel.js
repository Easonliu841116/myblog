import merge from 'webpack-merge'
import common from './webpack.common.babel.js'
import TerserJSPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const prodConfig = {
  optimization: {
    minimizer: [
      new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
}
export default merge(common, prodConfig)
