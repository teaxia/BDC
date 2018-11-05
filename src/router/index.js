import Vue from 'vue'
import Router from 'vue-router'
// 用户中心，注册登陆
import user from './views/user.vue'
    import regist from './views/user/regist.vue'             //  注册
    import login from './views/user/login.vue'               //  登陆
    import vindex from './views/user/regist.vue'
import Home from './views/home.vue'
import NotFound from './views/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/index',
          component: vindex,
          name: '',
          hidden: true,
          meta:{
              isIndex: 0                                      //  底部导航图标索引0 1 2 3
          },
      },
      {
          path: "/",
          component: user,
          name: "login",
          redirect: '/user/login',
          children: [
              { path: '/user/regist', component: regist, name: 'regist' },
              { path: '/user/login', component: login, name: 'login' },
          ]
      },
      {
          path: '/home',
          component: Home,
          name: '导航一',
          iconCls: 'el-icon-message',//图标样式class
          children: [
              { path: '/home/table', component: vindex, name: 'Table' },
              { path: '/home/form', component: vindex, name: 'Form' },
              { path: '/home/user', component: vindex, name: '列表' },
          ]
      },
      {
          path: '*',
          hidden: true,
          component: NotFound,
      }
  ]
})



export default routes;