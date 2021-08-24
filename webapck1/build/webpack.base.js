const path =require('path')
const merge = require('webpack-merge')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
module.exports = (env)=>{
  let base = {
    entry:[path.resolve(__dirname,'../src/index.js')],
    output:{
      filename:"bundle[hash:8].js",
      path:path.resolve(__dirname,"../dist")//返回绝对路径
    },
    devServer: {
      hot: true,
      port: 9999,
      // open:true,
      compress: true,
      contentBase:'aa',//aa目录下得静态资源文件也可以访问
    },
    plugins:[
      new MiniCssExtractPlugin({
        filename:'css/[name][hash:8].css',
        // chunkFilename: "[id].css",
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html'),
        filename:'index.html',
      }),
    ],
    module:{//确定下对什么文件去转换 怎么转换 需要哪些加载器
      // 从下往上 从右往左
      rules:[
        { 
          test: /\.css$/,
          use:[
            // "style-loader"
            {
              loader:MiniCssExtractPlugin.loader
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
  if(env.development){
    return merge(base,dev)
  }else{
    return merge(base,prod)
  }
};

// npx webpack
// 每次打包后的js要插入到html中,在浏览器查看
// webpack-dev-server 配置开发服务器
// css-loader style-loader
//less less-loader
// node-sass sass-loader
//stylus stylus-loader
// postcss-loader 样式处理工具 可以借助自定义插件 从而重新定义css
//加私有前缀插件 autoprefixer
// clean-webpack-plugin清理输出的目录
// html-withimg-loader 处理html文件中的图片的