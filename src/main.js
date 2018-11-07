// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'                       // 国际化插件
import App from './App'
import routes from './router'
import md5 from 'js-md5'
import {zh} from  './common/lang/zh'
import {en} from  './common/lang/en'
import axios from 'axios'
import {server} from './common/apis/http-service'    // 定义ajax全局
import storage from './common/storage/storage'       // 本地数据读取
import jmCode from './common/config/config'       // 加密串
import { Group,Flexbox,FlexboxItem,XInput,XHeader } from 'vux'
import { ToastPlugin } from 'vux'
import './scss/base/main.scss'
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-header', XHeader)
Vue.use(ToastPlugin)
Vue.prototype.$server=server;                        // ajax组件
Vue.prototype.$storage = storage;                    // 本地数据读取
Vue.prototype.$md5 = md5;                            // md5加密
Vue.prototype.$jm  = jmCode;                         // 加密字符串
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
const app = new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app-box')

//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  let data = JSON.parse(response.data.d);
  if(data.Code<0){
    app.$vux.toast.show({
      text: data.Msg,
      type: 'warn'
    })
    return false;
  }else{
    // 成功，跳转到输入验证码页面！
    return data.Data
  }
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
          app.$vux.toast.show({
            text: '错误请求',
            type: 'warn'
          })
          console.log('错误请求')
        break;
      case 401:
      app.$vux.toast.show({
        text: '未授权，请重新登录',
        type: 'warn'
      })
          console.log('未授权，请重新登录')
        break;
      case 403:
      app.$vux.toast.show({
        text: '拒绝访问',
        type: 'warn'
      })
        console.log('拒绝访问')
        break;
      case 404:
      app.$vux.toast.show({
        text: '请求错误,未找到该资源',
        type: 'warn'
      })
        console.log('请求错误,未找到该资源')
        break;
      case 405:
      app.$vux.toast.show({
        text: '请求方法未允许',
        type: 'warn'
      })
        console.log('请求方法未允许')
        break;
      case 408:
      app.$vux.toast.show({
        text: '请求超时',
        type: 'warn'
      })
        console.log('请求超时')
        break;
      case 500:
      app.$vux.toast.show({
        text: '服务器内部错误',
        type: 'warn'
      })
        console.log('服务器内部错误');
        break;
      case 501:
      app.$vux.toast.show({
        text: '网络未实现',
        type: 'warn'
      })
        console.log('网络未实现')
        break;
      case 502:
        app.$vux.toast.show({
          text: '网络错误',
          type: 'warn'
        })
        console.log('网络错误')
        break;
      case 503:
        app.$vux.toast.show({
          text: '服务不可用',
          type: 'warn'
        })
        console.log('服务不可用')
        break;
      case 504:
        app.$vux.toast.show({
          text: '网络超时',
          type: 'warn'
        })
        console.log('网络超时')
        break;
      case 505:
        app.$vux.toast.show({
          text: 'http版本不支持该请求',
          type: 'warn'
        })
        console.log('http版本不支持该请求')
        break;
      default:
        app.$vux.toast.show({
          text: '连接错误',
          type: 'warn'
        })
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    app.$vux.toast.show({
      text: '连接到服务器失败',
      type: 'warn'
    })
  }
  return Promise.resolve(err.response)
})
