const webpack = require("webpack");
const path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  entry: {
    index: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader'],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        // For loading custom styles
        test: /\.styl$/,
        include: path.join(__dirname, 'src'),
        use: [
          "style-loader",
          {
            loader: "typings-for-css-modules-loader",
            options: {
              sourceMap: true,
              namedExport: true,
              camelCase: true,
              modules: true,
            }
          },
          {
            loader: "stylus-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.styl', '.css', '.json.js'],
  },
  plugins: [
    new webpack.WatchIgnorePlugin([
      /css\.d\.ts$/,
      /styl\.d\.ts$/,
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'dist'),
      }
    ])

  ]
};

module.exports = config