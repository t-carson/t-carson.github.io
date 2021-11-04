const mongoose = require('mongoose')

// 创建mongo的schema(概要)(初始框架)
const schema = new mongoose.Schema({
  // 文章
  title: { type: String },
  // 这里有的角色定位不是一个而是多个的话我们就得定位多个分类
  // 加中括号之后在mongoose里的categories就代表是一个数组,数组里面就是内容,这样从数据上我们就可以实现多选
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  body: { type: String },

})

//                 导出名为schema的mongoose模型
module.exports = mongoose.model('Article', schema)
