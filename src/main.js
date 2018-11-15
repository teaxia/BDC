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
import {server} from './common/apis/http-service'    // 定义ajax全局
import storage from './common/storage/storage'       // 本地数据读取
import jmCode from './common/config/config'          // 加密串
import VueQriously from 'vue-qriously'               // 二维码生成
import VueClipboard from 'vue-clipboard2'             // 复制内容到剪切板
import vfooter from './components/vfooter.vue'
import vgrid from './components/vgrid.vue'
import { Group,Flexbox,FlexboxItem,XInput,XHeader,Grid,GridItem,Cell } from 'vux'
import { ToastPlugin } from 'vux'
import  { LoadingPlugin } from 'vux'
import { DatePicker,Select,Option,Radio,RadioGroup,Input } from 'iview';
import 'iview/dist/styles/iview.css';
import './scss/base/iviewthem.less';
import './scss/base/main.scss'
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(VueQriously)
Vue.use(VueClipboard)
Vue.component('group', Group)
Vue.component('x-input', XInput)
Vue.component('flexbox', Flexbox)
Vue.component('flexbox-item', FlexboxItem)
Vue.component('x-header', XHeader)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('v-footer',vfooter)
Vue.component('v-grid',vgrid)
Vue.component('cell',Cell)
Vue.component('DatePicker',DatePicker)
Vue.component('Select',Select)
Vue.component('Option',Option)
Vue.component('Radio',Radio)
Vue.component('RadioGroup',RadioGroup)
Vue.component('Input',Input)




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
window.app = new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app-box')