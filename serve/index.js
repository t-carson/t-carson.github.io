//模拟服务器页

const express = require("express")

const app = express()


app.set('secret','1s9s421d2sa4p3sc')

// 引用跨域模块
app.use(require('cors')())
// 引用中间件用于接收json数据类型的数据
app.use(express.json())
//表示的是uploads下面的路径都是静态文件
//将静态文件目录设置为：项目根目录+/uploads
app.use('/uploads', express.static(__dirname + '/uploads'))

// 引用数据库和后台路由
// 这里是routes/admin和db数据库所传过来的app
require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://locathost:3000端口启动完成!!!')
});