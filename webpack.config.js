var webpack = require("webpack");
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
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      }
    ]
  },

  resolve: {
    alias: {
      // utils:
      utils: path.resolve(__dirname, 'app/1_utils/'),
      jsUtils: path.resolve(__dirname, 'app/1_utils/jsUtils'),
      reactReduxUtils: path.resolve(__dirname, 'app/1_utils/reactReduxUtils'),
      // framework:
      framework: path.resolve(__dirname, 'app/2_framework/'),
      // state:
      state: path.resolve(__dirname, 'app/3_state/'),
      model: path.resolve(__dirname, 'app/3_state/model'),
      queries: path.resolve(__dirname, 'app/3_state/queries'),
      validators: path.resolve(__dirname, 'app/3_state/validators'),
      // store:
      store: path.resolve(__dirname, 'app/4_store/'),
      actions: path.resolve(__dirname, 'app/4_store/actions'),
      // logic:
      logic: path.resolve(__dirname, 'app/5_logic/'),
      // components:
      components: path.resolve(__dirname, 'app/6_components/'),
      compUtils: path.resolve(__dirname, 'app/6_components/compUtils/'),
      inputs: path.resolve(__dirname, 'app/6_components/inputs/'),
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
  ],

  devtool: 'source-map',

  watch: true,

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
