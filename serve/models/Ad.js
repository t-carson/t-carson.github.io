const mongoose = require('mongoose')

// 创建mongo的schema(概要)(初始框架)
const schema = new mongoose.Schema({
  // 广告位
  name: { type: String },
  items: [{
    image: { type: 'String' },
    url: { type: 'String' },
    
  }]
})

//                 导出名为schema的mongoose模型
module.exports = mongoose.model('Ad', schema)
