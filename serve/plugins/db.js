// mongoose数据库页

// 导出app
module.exports = app => {
  // 引用mongoose模块
  const mongoose = require('mongoose');
  // 第一个参数是数据库的地址这里跟localhost是一个意思都是本地地址,node-vue-moba是起的名字这里可以任意起名
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}