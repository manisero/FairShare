var path = require('path');

module.exports = {
  entry: './app/index.jsx',
  
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file-loader'
      }
    ]
  },

  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'app/utils/'),
      jsUtils: path.resolve(__dirname, 'app/utils/jsUtils'),
      reactReduxUtils: path.resolve(__dirname, 'app/utils/reactReduxUtils'),
      framework: path.resolve(__dirname, 'app/framework/'),
      model: path.resolve(__dirname, 'app/store/model'),
      compUtils: path.resolve(__dirname, 'app/components/compUtils/'),
      inputs: path.resolve(__dirname, 'app/components/inputs/'),
    }
  },

  devtool: 'source-map',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
