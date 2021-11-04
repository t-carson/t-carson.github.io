import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { isPublic: true }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    //这里为Main.vue添加子路由入口
    children: [
      // 分类
      // 新建分类   跳转地址
      // 这里path 对应的是 Main.vue下的router路由状态下index跳转对应的地址
      { path: '/categories/create', component: CategoryEdit },
      // 分类列表
      { path: '/categories/list', component: CategoryList },
      // 编辑页面 props:true的意思是把id注入到此页面里面
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },

      // 新建物品   跳转地址
      { path: '/items/create', component: ItemEdit },
      // 物品列表
      { path: '/items/list', component: ItemList },
      //编辑页
      { path: '/items/edit/:id', component: ItemEdit, props: true },

      // 新建英雄   跳转地址
      { path: '/heroes/create', component: HeroEdit },
      // 物品列表
      { path: '/heroes/list', component: HeroList },
      // 编辑页
      { path: '/heroes/edit/:id', component: HeroEdit, props: true },

      // 新建文章   跳转地址
      { path: '/articles/create', component: ArticleEdit },
      // 文章列表
      { path: '/articles/list', component: ArticleList },
      // 编辑页
      { path: '/articles/edit/:id', component: ArticleEdit, props: true },

      // 新建广告位   跳转地址
      { path: '/ads/create', component: AdEdit },
      // 广告位列表
      { path: '/ads/list', component: AdList },
      // 编辑页
      { path: '/ads/edit/:id', component: AdEdit, props: true },

      // 新建管理员   跳转地址
      { path: '/admin_user/create', component: AdminUserEdit },
      // 管理员列表
      { path: '/admin_user/list', component: AdminUserList },
      // 编辑页
      { path: '/admin_user/edit/:id', component: AdminUserEdit, props: true },
    ]
  },
]

const router = new VueRouter({
  routes
})
// 加一个路由守卫
router.beforeEach((to,from,next)=>{
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  if (to.path === '/login' && localStorage.token) {
    return next('/')
  }
  next()
})

export default router
