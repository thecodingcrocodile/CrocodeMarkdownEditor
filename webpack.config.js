const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const isProduction = (process.argv.indexOf('-p') !== -1);

module.exports = {
  target: 'electron',
  entry: path.resolve(__dirname, 'client', 'js', 'index.js'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'windows','static', 'js'),
    library: 'crocode',
    libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-es2015'],
          plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-proposal-object-rest-spread']
        }
      }
    }, {
      test: /\.sass$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')({ browsers: 'last 10 versions' })
              ]
            }
          },
          'sass-loader'
        ]
      })
    }, {
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=../fonts/[name].[ext]'
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader?name=../img/[name].[ext]'
    }, {
      test: /\.css$/,
      use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
    }]
  },
  plugins: [
    new ExtractTextPlugin('../css/[name].css'),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
      }
    }),
  ],
  externals: [
    {
      'isomorphic-fetch': {
        root: 'isomorphic-fetch',
        commonjs2: 'isomorphic-fetch',
        commonjs: 'isomorphic-fetch',
        amd: 'isomorphic-fetch'
      }
    }
  ],
  devtool: 'source-map',
};
