const webpack = require('webpack');
// ...
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
    ? [new webpack.optimize.UglifyJsPlugin()]
    : []
);
