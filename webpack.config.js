var path = require('path');

module.exports = {
  entry: './app/index.jsx',
  
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },

  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'app/utils/'),
      reactReduxUtils: path.resolve(__dirname, 'app/utils/reactReduxUtils'),
      jsUtils: path.resolve(__dirname, 'app/utils/jsUtils'),
      framework: path.resolve(__dirname, 'app/framework/'),
    }
  },

  devtool: 'source-map',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
