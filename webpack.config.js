var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const projects = require('./projects');

var config = projects.map(p => {
  return {
    entry: './src/graphics/' + p + '/index.js',
    name: p,
    output: {
      path: path.resolve(__dirname, './dist', p),
      filename: 'index_bundle.js',
      publicPath: '/' + p
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.join(__dirname, 'src/graphics', p, 'src')
      }
    },
    mode: 'development',
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   loader: 'eslint-loader',
        //   enforce: 'pre',
        //   include: [path.join(__dirname, 'src/graphics/' + p)],
        //   exclude: [path.join(__dirname, 'src/graphics/' + p + '/node_modules')],
        //   options: {
        //     formatter: require('eslint-friendly-formatter')
        //   }
        // },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(s*)css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        { test: /\.csv$/, loader: 'dsv-loader' },
        { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 200000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader',
          exclude: [path.join(__dirname, 'src/common/styles/logo')],
          options: {
            removingTagAttrs: ['id'],
            classPrefix: 'prefix-[sha512:hash:hex:5]-'
          }
        },
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          loader: 'url-loader',
          exclude: [path.join(__dirname, 'src/graphics', p, 'ai2html-output')],
          options: {
            limit: 50000,
            name: '/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          loader: 'url-loader',
          include: [path.join(__dirname, 'src/graphics', p, 'ai2html-output')],
          options: {
            limit: 900000,
            name: '/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.svg$|png/,
          include: [path.join(__dirname, 'src/common/styles/logo')],
          loader: 'url-loader',
          options: {
            limit: 600000,
            name: 'img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':src']
            }
          }
        },
        {
          test: /\.(csv|xlsx)$/i,
          include: [path.join(__dirname, 'src/graphics/' + p + '/export')],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: '/export/'
              }
            }
          ]
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/graphics/' + p + '/index.html'
      }), // TODO: put a template here that has the project id on a div
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  };
});

module.exports = config
