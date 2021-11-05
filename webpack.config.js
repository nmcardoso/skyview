const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    body: './src/index.js'
  },
  output: {
    filename: 'skyview.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: process.env.NODE_ENV || 'development',
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
