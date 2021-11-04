// 创建gongo的schema，哪里需要用哪里就引用
// 引入mongoose
const mongoose = require('mongoose')

// 创建mongo的schema(概要)(初始框架)
const schema = new mongoose.Schema({
  name: { type: String },
  //这里不能写上面的类型,要写一个特殊的数据类型 mongo数据类型
  parent: { type:mongoose.SchemaTypes.ObjectId,ref: 'Category' }
})

//                 导出名为schema的mongoose模型
module.exports = mongoose.model('Category', schema)
