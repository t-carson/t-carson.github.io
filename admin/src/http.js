import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  // 配置请求的基准URL地址--全局
  baseURL: 'http://localhost:3000/admin/api'
})
//这里我们给请求头加一个参数用于显示登录密钥信息
http.interceptors.request.use((config) => {
  if (localStorage.token) {
    //注意'Bearer '这里有空格用于接下来做的分割处理
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

//给http加一个拦截器
http.interceptors.response.use(res => {
  return res
}, err => {
  //这是一个通用的错误处理提示
  if (err.response.data.message) {
    console.log(err.response.data.message);
    // $message时Element的一个方法，弹窗
    Vue.prototype.$message({
      // 红色的警告色提示
      type: 'error',
      // 把返回的错误值用弹窗的方式提示出来
      message: err.response.data.message
    })
  }
  // 如果后端相应过来的状态码为401账号或密码的异常处理
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)
})

//导出变量
export default http

// console.log(http.defaults);

// 前台访问后台数据
// :resource是自己在后台配的动态地址后面跟着参数
//http://locathost:3000/admin/api/rest/:resource/:id

// 后台
//categories
//http://localhost:3000/admin/api/rest/categories/${this.id}
