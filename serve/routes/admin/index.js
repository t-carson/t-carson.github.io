//路由页
// 注意通用属性添加之后一定要注意其他板块的变化，如果发生了全局污染我们就要采取更小的范围去更改

//导出app
module.exports = app => {
  const express = require('express')
  // 1.根据用户名找用户
  // 3.返回token
  // 1.根据用户名找用户
  const AdminUser = require('../../models/AdminUser')
  // 3.返回token
  // 这里我们需要安装一个模块 npm i jsonwebtoken
  // 用于做web的token验证
  const jwt = require('jsonwebtoken')
  // 用于给用户显示自定义的错误信息  npm i http-assert
  const assert = require('http-assert')
  // express本身是获取不到文件数据的所以我们要下载一个中间件 npm i multer
  const multer = require('multer')
  //定义一个上传中间件 dest 目标地址, __dirname 当前模块的绝对路径
  // 这里我们一定要加上__dirname绝对定位本文件的../../uploads
  const upload = multer({ dest: __dirname + '/../../uploads' })

  // 这里是express的子路由，当我们需要子路由的时候就用它
  const router = express.Router({
    // 表示合并url参数
    mergeParams: true,
  })

  // 创建资源
  // 用于往数据库存入所有的要存入的数据
  router.post('/', async (req, res) => {
    //req.body是内容,这里不懂的可参考  nodejs取参
    const model = await req.Model.create(req.body)
    // 发回给客户端让客户端知道已经创建成功
    res.send(model)
  })

  // 资源列表
  router.get('/', async (req, res) => {
    //这里的populate需要注意的是要把分类的上级找出来所以这里需要特殊操作-有的接口上需要关联查找一个东西但有的就不需要
    // const items = await req.Model.find().populate('parent').limit(10)
    let queryOptions = {}
    //如果它的模型是个分类的话就给它加一个populate否则就不会加任何东西
    if (req.Model.modelName == 'Category') {
      queryOptions.populate = 'parent'
    }
    // 限制添加100个物品
    const items = await req.Model.find().setOptions(queryOptions)//.limit(100)
    // 发回给客户端让客户端知道已经创建成功
    res.send(items)
  })

  //更新资源
  router.put('/:id', async (req, res) => {
    // findByIdAndUpdate 使用 update 子句更新符合指定条件的文档，更新数据在发送到数据库服务器之前会改变模型的类型
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  //获取详情页某一个分类详情的数据用于修改数据
  router.get('/:id', async (req, res) => {
    //req.params 
    // 官方翻译:包含映射到指定的路线“参数”属性的对象。
    // 例如，如果你有route/user/：name，那么“name”属性可作为req.params.name。
    // 该对象默认为{}。
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  //-------------------------------------------------------- 
  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  // 资源中间件
  const resourceMiddleware = require('../../middleware/resource')
  //-------------------------------------------------------- 

  //文件上传
  //               upload.single接收单个文件的上传
  app.post('/admin/api/upload', async (req, res, next) => {
    // 获取请求头的密钥
    // 这里的意思就是将我们之前在http加的'Bearer'类型和密钥分割开,因为中间有个空格,所以我们用空格分割开,pop()表示提取最后那一段数据
    const token = String(req.headers.authorization || '').split(' ').pop()
    // 校验token是否为空
    assert(token, 401, '请先登录(jwt token)')
    // verify()表示校验然后把app.get('secret')传给它
    // const {tokenData} = jwt.verify(token, app.get('secret'))
    // 解构赋值
    const { id } = jwt.verify(token, app.get('secret'))
    // 校验ID
    assert(id, 401, '请先登录(jwt token)')
    // findById通过findById去数据库找是不是真的有这个用户
    req.user = await AdminUser.findById(id)
    // 校验用户名
    assert(req.user, 401, '请先登录(user)')
    await next()
  }, upload.single('file'), authMiddleware(), async (req, res) => {
    // 把请求的值放在常量里
    //其实req本事是没有file这个东西的是因为我们用了upload这个中间件
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    // 然后把响应的值返回回来
    res.send(file)
  })

  // 模型
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
  //登录接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body

    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   // 设置一个状态码再发送
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }

    // 1.根据用户名找用户(已挪至最上方)
    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token(已挪至最上方)
    // 用它来生成一个token 第一个参数是你要加密的payload第二个参数是secretOrPrivateKey(密钥)
    // 如果只有一个参数就是获取配置
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // 如果没有状态码就报500错误
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })

}