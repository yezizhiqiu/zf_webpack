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
      before(app){//after 以9999创建一个服务 没有跨域
        app.get('/api/user',function(req,res){
          res.json({name:'zf'})
          console.log(req.headers);
        })
      },
      // proxy:{
      //   "/api":{
      //     target:"http://localhost:6000",// 设置请求服务器地址
      //     //secure:false,//代理服务器是https
      //     changeOrigin:true,// 把请求头里的host的地址改为服务器地址
      //     pathRewrite:{"/api":""}
      //   }
      // }
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
          test:/\.html$/,
          use:"html-withimg-loader"
        },
        { 
          test: /\.css$/,
          use:[
            // "style-loader"
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
        {
          test: /\.(jpe?g|png|gif)$/i, //图片文件
          use:{
            loader:"url-loader",//10kb通过url-loader转换base64 大于的通过file-loader拷贝放在dist下
            options:{
              limit:1024*10,//100kb
              name:'[name].[hash:8].[ext]',
              outputPath:'img',
              //publicPath:'https://zhilu.cn/img',
            }
          }
        },
        {
          test:/\.(eot|svg|ttf|woff|woff2)$/, // 字体
          exclude: [/^node_modules$/, path.resolve(__dirname, '../src/svg')],
          use:[
            {
              loader:"file-loader",
              options:{
                outputPath: "css/icon"
              }
            }
          ],
        },
        {
          test:/\.js$/,
          use:[
            {
              loader:"babel-loader",
              // options:{
              //   presets:["@babel/preset-env"],
              //   plugins:[]
              // }
            }
          ]
        }
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