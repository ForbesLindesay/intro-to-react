const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'static/js/[name].[chunkhash:8].js',
    publicPath: '/'
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: __dirname + '/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ].concat(
    process.env.NODE_ENV === 'production'
      ? [
          new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false, comparisons: false },
            output: { comments: false, ascii_only: true }
          })
        ]
      : []
  )
};
