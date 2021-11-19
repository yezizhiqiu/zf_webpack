let express = require("express")
let app = express()
app.get('/user', function (req, res) {
  res.json({ name: 'zf' })
  console.log(req.headers);
})
app.listen(6000, () => {
  console.log("服务启动成功。")
})