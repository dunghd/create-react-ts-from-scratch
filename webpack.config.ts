const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  mode: 'development',
  output: { // indicates where to put the result after bundling.
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  entry: { // the entrypoint which webpack will come to here firstly to bundle code.
    index: path.join(__dirname, "src/index.tsx"),
  },
  resolve: { // as we support Typescript, we make sure webpack understand what we expect to do when it see import App from './App'.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [ // specfies which loader will handle file extension, we will use the ts-loader to bundle ts and tsx file. Just add it to devDependencies:
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hot: true,
      template: "./public/index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 8080,
  },
}