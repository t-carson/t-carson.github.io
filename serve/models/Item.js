// 创建gongo的schema，哪里需要用哪里就引用
// 引入mongoose
const mongoose = require('mongoose')

// 创建mongo的schema(概要)(初始框架)
const schema = new mongoose.Schema({
  name: { type: String },
  //假设上传的图片很大，我们就只存储图片的地址
  icon: { type: String }
})

//                 导出名为schema的mongoose模型
module.exports = mongoose.model('Item', schema)
