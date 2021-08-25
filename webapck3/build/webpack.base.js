const path =require('path')
const merge = require('webpack-merge')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin =require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webapck  = require('webpack')
let htmlPlugs=["index","other"].map(chunkName=>{
  return new HtmlWebpackPlugin({
    template:path.resolve(__dirname,`../public/${chunkName}.html`),
    filename:`${chunkName}.html`,
    chunks:[`${chunkName}`]
  })
})
module.exports = (env)=>{
  let base = {
    // devtool:"cheap-module-eval-source-map",
    // externals:{
    //   "jquery":"$",//如果是第三方库 就不需要重复打包
    // },
    entry:{
      index:path.resolve(__dirname,'../src/index.js'),
      //other:path.resolve(__dirname,'../src/other.js')
    },
    output:{
      // filename:"bundle[hash:8].js",
      // path:path.resolve(__dirname,"../dist")//返回绝对路径
      filename:'[name].js',
      path: path.resolve(__dirname,'../dist'),
      chunkFilename:"[name].min.js" //异步请求的文件名字
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
      new webapck.HotModuleReplacementPlugin(),//局部热更新
      // new webapck.ProvidePlugin({// 可以把变量变成每个模块都可使用 ，但不是放在window上 结合cdn使用
      //   "$":'jquery'
      // }),
      // new MiniCssExtractPlugin({
      //   filename:'css/[name][hash:8].css',
      //   // chunkFilename: "[id].css",
      // }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template:path.resolve(__dirname,'../public/index.html'),
        filename:'index.html',
        //chunks:["index"]
      }),
      // new HtmlWebpackPlugin({
      //   template:path.resolve(__dirname,'../public/other.html'),
      //   filename:'other.html',
      //   chunks:["other"]
      // }),
      //...htmlPlugs
      // new BundleAnalyzerPlugin()
    ],
    module:{//确定下对什么文件去转换 怎么转换 需要哪些加载器
      // 从下往上 从右往左
      rules:[
        //  {
        //   test:/\.js$/,
        //   use:"eslint-loader",
        //   exclude:/node_moudules/,// 不包含三方包
        //   //include:path.resolve(__dirname,"src/**/*"),
        //   enforce:'pre'//在所有规则之前校验代码
        // },
        // {
        //   test:require.resolve("jquery"),
        //   use:{
        //     loader:"expose-loader",
        //     options:"$"
        //   }
          
        // },
        {
          test:/\.html$/,
          use:"html-withimg-loader"
        },
        { 
          test: /\.css$/,
          use:[
            "style-loader"
            // {
            //   loader:MiniCssExtractPlugin.loader,
            //   options:{
            //     publicPath:'../../'
            //   }
            // }
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
          use:[
            {
            loader:"url-loader",//10kb通过url-loader转换base64 大于的通过file-loader拷贝放在dist下
            options:{
              limit:1024*10,//100kb
              name:'[name].[hash:8].[ext]',
              outputPath:'img',
              //publicPath:'https://zhilu.cn/img',
            }
          },
          {
            loader: 'image-webpack-loader',//图片压缩
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ]
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
      splitChunks: {
        chunks: 'all',//async异步代码 all所有
        minSize: 3000,//30kb才抽离
        minChunks: 1,//至少引用模块一次
        maxAsyncRequests: 5,//请求最多不超过5次
        maxInitialRequests: 3,//首屏请求次数不超过3次
        automaticNameDelimiter: '~',//抽离模块 名称连接符
        name: true,//可以更改模块名
        cacheGroups: {//自己设定规则
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 1,
            priority: -2,
            reuseExistingChunk: true
          }
        }
      }
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