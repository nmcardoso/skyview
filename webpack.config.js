const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const regeneratorRuntime = require("regenerator-runtime/runtime")

module.exports = {
  entry: {
    body: './src/index.js'
  },
  output: {
    filename: 'skyview.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: path.resolve(__dirname, 'public/index.html'),
      files: {
        css: [path.resolve(__dirname, 'src/style.css')],
        js: ['skyview.bundle.js']
      }
    })
  ]
}
