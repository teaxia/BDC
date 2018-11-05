// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'                       // 国际化插件
import App from './App'
import routes from './router'
import md5 from 'js-md5';
import {zh} from  './common/lang/zh'
import {en} from  './common/lang/en'
import {server} from './common/apis/http-service'    // 定义ajax全局
import storage from './common/storage/storage'       // 本地数据读取
import { Group,Flexbox, FlexboxItem } from 'vux'
import './scss/base/main.scss'
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.component('group', Group)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.prototype.$server=server;                        // ajax组件
Vue.prototype.$storage = storage;                    // 本地数据读取
Vue.prototype.$md5 = md5;                           // md5加密
const router = new VueRouter({
  routes
})

FastClick.attach(document.body)
Vue.config.productionTip = false
// 创建带有选项的 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages:{
    zh,
    en
  }
})
/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app-box')
