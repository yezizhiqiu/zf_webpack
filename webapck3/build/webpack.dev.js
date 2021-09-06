const webapck  = require('webpack')
module.exports={
  mode:"development",
  plugins:[
    new webapck.HotModuleReplacementPlugin(),//局部热更新
  ]
}