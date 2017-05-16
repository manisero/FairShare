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
      utils: path.resolve(__dirname, 'app/utils/')
    }
  },

  devtool: 'source-map',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
