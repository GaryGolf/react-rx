const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const outPath = path.join(__dirname, './dist')
const sourcePath = path.join(__dirname, './src')
const PRODUCTION = process.argv.indexOf('-p') >= 0

module.exports = {
  context: sourcePath,
  entry: {
    main: './index.tsx'
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // https://github.com/Microsoft/TypeScript/issues/11677 
    mainFields: ['main']
  },
  module: {
    loaders: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
          loader: PRODUCTION ? 'ts-loader' : ['react-hot-loader', 'ts-loader']
      },
      // css 
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !PRODUCTION,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      // static assets 
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.png$/, loader: 'url-loader?limit=10000' },
      { test: /\.jpg$/, loader: 'file-loader' },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: sourcePath,
        postcss: [
          require('postcss-smart-import')({ addDependencyTo: webpack }),
          require('postcss-cssnext')(),
          require('postcss-reporter')(),
          require('postcss-browser-reporter')({ disabled: PRODUCTION }),
        ]
      }
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION),
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !PRODUCTION
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    stats: {
      warnings: false
    },
  },
  node: {
    // workaround for webpack-dev-server issue 
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
}