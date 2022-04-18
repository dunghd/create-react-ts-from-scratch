const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

let plugins = [
  new HtmlWebpackPlugin({
    hot: true,
    template: "./public/index.html",
  }),
  new BundleAnalyzerPlugin(),
];

module.exports = {
  mode: "development",
  output: {
    // indicates where to put the result after bundling.
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  entry: {
    // the entrypoint which webpack will come to here firstly to bundle code.
    index: path.join(__dirname, "src/index.tsx"),
  },
  resolve: {
    // as we support Typescript, we make sure webpack understand what we expect to do when it see import App from './App'.
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      // specfies which loader will handle file extension, we will use the ts-loader to bundle ts and tsx file. Just add it to devDependencies:
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  optimization: {
    // splitChunks: {
    //   cacheGroups: {
    //     defaultVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10,
    //       reuseExistingChunk: true,
    //     },
    //   },
    // },
    // runtimeChunk: "single",
    concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2,
        },
      },
    },
  },
  plugins: plugins,
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 8081,
    historyApiFallback: true,
  },
  devtool: "source-map",
};
