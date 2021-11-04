// 资源中间件
module.exports = options => {
  return async (req, res, next) => {
    // 这里我们的查找模型地址其实是不对的，所以我们得下载一个中间件来自动转换大小写,把复数的转为单数同时转为首字母大写的类名形式 npm i inflection
    const modelName = require('inflection').classify(req.params.resource)
    // return res.send({modelName})
    //给请求对象上面挂载一个属性Model
    req.Model = require(`../models/${modelName}`)
    next()
  };
}