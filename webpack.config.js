var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/module.js',

  module: {
    rules: [
      // use babel-loader for js files
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      // use vue-loader for .vue files
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.svg/,
        use: {
          loader: 'url-loader',
          loader: 'svg-url-loader',
          loader: 'file-loader',
          options: {},
        },
      }
    ]
  },
  // default for pretty much every project
  context: __dirname,
  // specify your entry/main file
  output: {
    // specify your output directory...
    path: path.resolve(__dirname, './dist'),
    // and filename
    filename: 'vue-conversational-form.js'
  }
}



if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
