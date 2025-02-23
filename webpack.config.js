const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'examples/src/index.html'),
  filename: './index.html',
})
const faviconPlugin = new HtmlWebpackPlugin({
  favicon: 'examples/src/favicon.ico',
})

module.exports = {
  entry: path.join(__dirname, 'examples/src/index.tsx'),
  output: {
    path: path.join(__dirname, 'examples/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [htmlPlugin, faviconPlugin],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    port: 3001,
  },
}
