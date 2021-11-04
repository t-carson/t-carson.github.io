const mongoose = require('mongoose')

// 创建mongo的schema(概要)(初始框架)
const schema = new mongoose.Schema({
  // 管理員账号密码
  username: { type: String },
  password: {
    type: String,
    // 这个意思是我们再次编辑的时候密码就不会显示再密码框内了
    select: false,
    // 在这里做一个散列 需要使用一个模块 npm i bcrypt
    set(val) {
      //这里默认是异步方法,加个这个模块之后就会变成同步方法,第一个要散列的值,第二个是安全指数值,指数越高越耗时,建议10~12
      return require('bcrypt').hashSync(val,10)
    }
  }
})

//                 导出名为schema的mongoose模型
module.exports = mongoose.model('AdminUser', schema)
