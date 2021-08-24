// import sum from "./sum"
// import './index.css'
// import './a.less'
// console.log(sum(10,5));

// import url from "./timg.jpeg";
// let img = new Image();
// img.src= url;
// document.body.appendChild(img)


// file-loader(拷贝到dist目录下) url-loader(base64)

// import "./icon/iconfont.css"
// let i = document.createElement('i')
// i.className = "iconfont icon-dianyingpiao"
// document.body.appendChild(i)


// class Son{
//   constructor(){
//     this.a = 1;
//   }
// }
// let s= new Son()
// console.log(s.a);

// let p = new Promise((resolve,reject)=>{
//   console.log(1);
// })

// console.log("test".includes("s"));

// import A from './a'
// class Son{
//   constructor(){
//     this.a = 1;
//   }
// }
// let s= new Son()
// console.log(s.a);

// 草案语法 装饰器@fn

// @fn 
// class Son{
//   a=1;
// }
// function fn (target){
//   console.log(target);
//   target.b = 5
// }
// let s = new Son()
// console.log(s.b);

let xhr = new XMLHttpRequest()
xhr.open('get',"/api/user",true)
xhr.onreadystatechange=function(){
  console.log(xhr.response);
}
xhr.send()

// babel
// babel-loader babel和webpack桥梁
//@bable/core babel核心模块
//@babel/preset-env 主要把es6转换es5 插件的集合