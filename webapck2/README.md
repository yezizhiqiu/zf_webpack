## webpack模块化规范
- 主流有两种  ES6 和commonjs
- JS 标准是es6 module import vs export
- commonjs  require module.exports
- webpack最标准的实现commonjs
- 也可以支持 es6 module

## 异步加载流程
1.先加载主代码块，主代码块里包含入口模块和入口模块直接依赖的模块

2.点击按钮的，会通过JSONP其它 代码块，其它代码里包含其它额外的模块。

3.先创建一个script标签，然后把它的src指向要异步加载 的代码块的文件的路径。然后把这个script标签添加页面里面去。

4.然后浏览器会立刻马上请求对应的资源。

5.资源返回后异步加载的脚本会立刻执行。[].webpackJsonpCallback

6.webpackJsonpCallback里面会把对应的代码块的加载状态设置为0，然后把新取到的模块的定义合并到原来的模块总的对象上。

7.promise完成就，异步加载也就是完成，然后就是调用t进行require这个模块了，然后就可以后续调用了


## 起步
1. 安装webapck webapck-cli
    npm i webpack@4.41.1 webpack-cli@3.3.1 --D

    npx webapck 
2. 配置概览
    入口(entry) 输出(output) loader(解析器)  插件(plugin) 模式(mode)
    详见 https://v4.webpack.docschina.org/concepts/

    package.json 文件


    安装webpack-merge 用来分离开发和生产环境配置/ webpack.dev.js /webpack.prod.js
    公用webpack.base.js

    npm i webpack-merge@4.2.2 --D


    安装clean-webpack-plugin 清除dist里的打包文件

    npm i clean-webpack-plugin--D

    安装 html-webpack-plugin 用于编译 Webpack 项目中的 html 类型的文件

    npm i html-webpack-plugin --D

    安装 webpack-dev-server 配置开发服务器 

    npm i webpack-dev-server --D

    安装css less sass stylus等解析器 

    npm i style-loader@1 css-loader@3 --D

    npm i less@3 less-loader@5 --D

    安装 postcss-loader autoprefixer 给css3加私有前缀

    npm i autoprefixer@8 postcss-loader@4 --D

    autoprefixer需要配置.browserslistrc文件

    安装mini-css-extract-plugin 分离css

    npm i mini-css-extract-plugin --D

    安装optimize-css-assets-webpack-plugin terser-webpack-plugin 压缩css和js

    npm i terser-webpack-plugin@2 optimize-css-assets-webpack-plugin@5 

    安装html-withimg-loader

    npm i html-withimg-loader --D

    安装babel-loader @bable/core @babel/preset-env

    npm i babel-loader @bable/core @babel/preset-env --D

    安装core-js@3

    npm i core-js@3

    安装 @babel/plugin-transform-runtime 去除冗余代码

