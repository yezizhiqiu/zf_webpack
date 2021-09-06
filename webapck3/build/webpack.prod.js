const webapck  = require('webpack')
const TerserWebpackPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin =require('mini-css-extract-plugin')
module.exports={
  mode:"production",
  plugins:[
    new MiniCssExtractPlugin({
      filename:'css/[name][hash:8].css',
      // chunkFilename: "[id].css",
    }),
  ],
  module:{
    rules:[
      { 
        test: /\.css$/,
        use:[
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              publicPath:'../../'
            }
          }
          ,{
          loader: "css-loader",
          options: {
            importLoaders: 1//用后面几个加载器来解析
          },
        }, "postcss-loader", "less-loader"]
      },
      // { 
      //   test: /\.css$/,
      //   use:["css-loader",]
      // },
      { 
        test: /\.less$/,
        use:["style-loader","css-loader","less-loader"]
      },
    ]
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin(),
    ],
  },
}