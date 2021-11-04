import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
// 引入公共CSS样式
import './style.css'

Vue.config.productionTip = false
// 引用http.js里的变量
import http from './http'
Vue.prototype.$http = http
// 定义全局
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeader(){
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
