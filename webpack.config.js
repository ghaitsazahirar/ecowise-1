const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/scripts/index.js",
    register: "./src/scripts/register.js",
    login: "./src/scripts/login.js",
    homepage: "./src/scripts/homepage.js",
    kategoritantangan: "./src/scripts/kategoritantangan.js",
    detailtantangan: "./src/scripts/detailtantangan.js",
    uploadgambar: "./src/scripts/uploadgambar.js",
    waitverif: "./src/scripts/waitverif.js",
    edukasi: "./src/scripts/edukasi.js",
    detailartikel: "./src/scripts/detailartikel.js",
    faq: "./src/scripts/faq.js",
    lupapassword: "./src/scripts/lupapassword.js",
    reward: "./src/scripts/reward.js",
    confirmation: "./src/scripts/confirmation.js",
    confirmEmail: "./src/scripts/confirm-email.js",
    confirmEmailSuccess: "./src/scripts/confirmEmailSuccess.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      firebase: path.resolve(__dirname, "node_modules/firebase"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: path.resolve(__dirname, 'src/templates/register.html'),
      chunks: ['register'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname, 'src/templates/login.html'),
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      filename: 'homepage.html',
      template: path.resolve(__dirname, 'src/templates/homepage.html'),
      chunks: ['homepage'],
    }),
    new HtmlWebpackPlugin({
      filename: 'kategoritantangan.html',
      template: path.resolve(__dirname, 'src/templates/kategoritantangan.html'),
      chunks: ['kategoritantangan'],
    }),
    new HtmlWebpackPlugin({
      filename: 'detailtantangan.html',
      template: path.resolve(__dirname, 'src/templates/detailtantangan.html'),
      chunks: ['detailtantangan'],
    }),
    new HtmlWebpackPlugin({
      filename: 'uploadgambar.html',
      template: path.resolve(__dirname, 'src/templates/uploadgambar.html'),
      chunks: ['uploadgambar'],
    }),
    new HtmlWebpackPlugin({
      filename: 'waitverif.html',
      template: path.resolve(__dirname, 'src/templates/waitverif.html'),
      chunks: ['waitverif'],
    }),
    new HtmlWebpackPlugin({
      filename: 'edukasi.html',
      template: path.resolve(__dirname, 'src/templates/edukasi.html'),
      chunks: ['edukasi'],
    }),
    new HtmlWebpackPlugin({
      filename: 'detailartikel.html',
      template: path.resolve(__dirname, 'src/templates/detailartikel.html'),
      chunks: ['detailartikel'],
    }),
    new HtmlWebpackPlugin({
      filename: 'faq.html',
      template: path.resolve(__dirname, 'src/templates/faq.html'),
      chunks: ['faq'],
    }),
    new HtmlWebpackPlugin({
      filename: 'lupapassword.html',
      template: path.resolve(__dirname, 'src/templates/lupapassword.html'),
      chunks: ['lupapassword'],
    }),
    new HtmlWebpackPlugin({
      filename:'reward.html',
      template: path.resolve(__dirname, 'src/templates/reward.html'),
      chunks: ['reward'],
    }),
    new HtmlWebpackPlugin({
      filename: 'confirmation.html',
      template: path.resolve(__dirname, 'src/templates/confirmation.html'),
      chunks: ['confirmation'],
    }),
    new HtmlWebpackPlugin({
      filename: 'confirm-email.html',
      template: path.resolve(__dirname, 'src/templates/confirm-email.html'),
      chunks: ['confirmEmail'], // Periksa nama entry di sini
    }),
    new HtmlWebpackPlugin({
      filename: 'confirmEmailSuccess.html',
      template: path.resolve(__dirname, 'src/templates/confirmEmailSuccess.html'),
      chunks: ['confirmEmailSuccess'], // Periksa nama entry di sini
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'node_modules/firebase/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,  // Ganti 3000 dengan port yang Anda inginkan
  },
};
