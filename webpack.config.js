const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerWebpackPlugin = require("html-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ESLintWebpackPlugin = require('eslint-webpack-plugin');


//getting mode, development or production
const mode = process.env.NODE_ENV === 'development'

module.exports = {
  //file i/o settings
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.sass']
  },

  //webpack settings
  mode: mode ? 'development' : 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        // Use multiprocessing parallel running to improve the build speed
        parallel: true,
      }),
      new CssMinimizerWebpackPlugin()
    ]
  },
  devtool: mode ? 'eval-source-map' : 'nosources-source-map',

  //dev server
  devServer: {
    port: 4250,
  },

  //loaders
  module: {
    rules: [

      //scss loaders
      {
        test: /.s[ac]ss/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },

      //js + jsx loaders
      {
        test: /.js$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /.jsx$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },

      //ts + tsx loaders
      {
        test: /.ts$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /.tsx$/i,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
          }
        }
      },

    ]
  },

  // plugins
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, 'src/index.html'),
        },

        // Only for production
        mode ? undefined :
          {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          }
      )
    ),
    new CssMinimizerWebpackPlugin({
      minimizerOptions: {
        presets: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets')
        }
      ]
    }),
    new HtmlMinimizerWebpackPlugin(),
    new ESLintWebpackPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx',]
    }),
  ]
}