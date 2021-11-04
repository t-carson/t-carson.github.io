// 登录校验中间件
module.exports = options => {
  const AdminUser = require('../models/AdminUser')
  // 这里我们需要安装一个模块 npm i jsonwebtoken
  // 用于做web的token验证
  const jwt = require('jsonwebtoken')
  // 用于给用户显示自定义的错误信息  npm i http-assert
  const assert = require('http-assert')
  return async (req, res, next) => {
    // 获取请求头的密钥
    // 这里的意思就是将我们之前在http加的'Bearer'类型和密钥分割开,因为中间有个空格,所以我们用空格分割开,pop()表示提取最后那一段数据
    const token = String(req.headers.authorization || '').split(' ').pop()
    // 校验token是否为空
    assert(token, 401, '请先登录(jwt token)')
    // verify()表示校验然后把app.get('secret')传给它
    // const {tokenData} = jwt.verify(token, app.get('secret'))
    // 解构赋值
    const { id } = jwt.verify(token, req.app.get('secret'))
    // 校验ID
    assert(id, 401, '请先登录(jwt token)')
    // findById通过findById去数据库找是不是真的有这个用户
    req.user = await AdminUser.findById(id)
    // 校验用户名
    assert(req.user, 401, '请先登录(user)')
    await next()
  }
}