module.exports = function(api) {
  // Only execute this file once and cache the resulted config object below for the next babel uses.
  // more info about the babel config caching can be found here: https://babeljs.io/docs/en/config-files#apicache
  api.cache.using(() => process.env.NODE_ENV === 'development')

  return {
    presets: [
      '@babel/preset-react',
      [ 
        '@babel/preset-env',
        {
          targets: {
            chrome: '58',
            ie: '11'
          }
        }
      ]
    ],
    plugins: ['@babel/plugin-syntax-dynamic-import']
  }
}
