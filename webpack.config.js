const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const host = process.env.HOST || "localhost";

module.exports = function (env, argv) {
  const mode = argv.mode || "development";
  return {
    mode: mode,
    entry: "./src/main.js",
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devServer: {
      static: path.resolve(__dirname, "public/index.html"),
      compress: true,
      hot: true,
      host,
      port: 3000,
      devMiddleware: {
        publicPath: "/",
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, "public/index.html"),
      }),
    ],
  };
};