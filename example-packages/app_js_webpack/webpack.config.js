const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
  target: ["web", "es5"],
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.template.html",
      filename: "index.html",
    }),
  ],
  devServer: {
    port: 3000,
  },
};
