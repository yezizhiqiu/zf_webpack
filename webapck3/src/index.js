// import $ from 'jquery'
// require("expose-loader?$!jquery");
// import './a';
// console.log(window.$);

// import test from"./test"//是副作用
// import "./index.css"
// let foo = "bar";
// function sun(){
//   // /console.log(a);
//   return a+b;
// }
// sun()
console.log(11111111111111);
let btn = document.createElement('button')
let  p = document.createElement('p')
btn.innerHTML = "BUTTON";
// 懒加载是使用到了之后才去加载import()
btn.addEventListener('click',function(){
  import(/*webpackChunkName:"c"*/"./test").then(({default:m})=>{
    p.innerHTML = m(20,10)
  })
},false)
document.body.appendChild(btn)
document.body.appendChild(p) 