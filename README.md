# 启动事项：

#### 1、所需环境（不够详细的话自行百度）

Nodejs环境：https://blog.csdn.net/qq_25857899/article/details/115159704

MongoDB环境：https://blog.csdn.net/crsitin_spade/article/details/121383699

#### 2、数据库配置

1. 启动 MongoDB，随后 Navicat 连接数据库，所有配置默认
2. 创建名为 **node-vue-moba** 的数据库，点击node-vue-moba-运行脚本文件（导入基础用户信息）：serve/node-vue-moba.sql

#### 3、启动项目

- 前台（wangzherongyao\web）：**npm run serve**
- 后台（wangzherongyao\admin）：**npm run serve**
- 后端（wangzherongyao\serve）：**node index.js**

# 技术栈：

1、官网：Vue.js  swiper插件（Vant UI）axios fetch  

2、后台：Vue.js  Element-UI  

3、后端：Node.js  MongoDB Express框架 其他插件等依赖包  



本项目的自定义错误是:

422：用户名或密码错误

401：账号或密码的异常处理

### 所用中间件集合

#### npm i --save vue2-editor

副文本编辑器

#### npm i bcrypt

在这里做一个散列 需要使用一个模块

这里默认是异步方法,加个这个模块之后就会变成同步方法,第一个要散列的值,第二个是安全指数值,指数越高越耗时,建议10~12

```javascript
set(val) {
      //这里默认是异步方法,加个这个模块之后就会变成同步方法,第一个要散列的值,第二个是安全指数值,指数越高越耗时,建议10~12
      return require('bcrypt').hashSync(val,10)
}

```



#### npm i multer

express本身是获取不到文件数据的所以我们要下载一个中间件来使用

```javascript
  const multer = require('multer')
  //定义一个上传中间件 dest 目标地址, __dirname 当前模块的绝对路径
  // 这里我们一定要加上__dirname绝对定位本文件的../../uploads
  const upload = multer({ dest: __dirname + '/../../uploads' })

```

#### npm i jsonwebtoken 

用于返回token

用于做web的token验证

```javascript
const jwt = require('jsonwebtoken')
    // 用它来生成一个token 第一个参数是你要加密的payload第二个参数是secretOrPrivateKey(密钥)
    // 如果只有一个参数就是获取配置
const token = jwt.sign({ id: user._id }, app.get('secret'))
res.send({ token })

```

#### npm i inflection

用于自动转换大小写,把复数的转为单数同时转为首字母大写的类名形式

```javascript
const modelName = require('inflection').classify(req.params.resource)
req.Model = require(`../../models/${modelName}`)

```

#### npm i http-assert

用于给用户显示自定义的错误信息

```javascript
const assert = require('http-assert')

assert(user, 422, '用户不存在')
// 错误处理函数
  app.use(async(err,req,res,next)=>{
    res.status(err.statusCode).send({
      message: err.message
    })
  })

```

