const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackEnv = process.env.NODE_ENV || 'development'

const { presets } = require(`${__dirname}/babel.config.js`)

const babelLoaderConfiguration = {
  test: /\.(tsx|ts|js)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets,
      plugins: ['react-native-web']
    }
  }
}

module.exports = {
  mode: webpackEnv,
  entry: {
    app: path.join(__dirname, './index.web.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app-[hash].bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js'
    ],
    alias: Object.assign({
      'react-native$': 'react-native-web'
    })
  }
}
