// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'                                  // 国际化插件
import math from 'mathjs'
import App from './App'
import routes from './router'
import md5 from 'js-md5'
import {zh} from  './common/lang/zh'
import {en} from  './common/lang/en'
import {server} from './common/apis/http-service'               // 定义ajax全局
import storage from './common/storage/storage'                  // 本地数据读取
import {jmCode,currency} from './common/config/config'          // 加密串
import VueQriously from 'vue-qriously'                          // 二维码生成
import VueClipboard from 'vue-clipboard2'                       // 复制内容到剪切板
import html2canvas from 'html2canvas'                           // dom转换图片
import vselect from './components/vselect.vue'                  // 自定义下拉框搜索组件
import vfooter from './components/vfooter.vue'                  // 自定义底部组件
import myScroll from './components/myScroll.vue'                // 下拉刷新，上拉加载
import vpopup from './components/popup.vue'                     // 弹出层组件
import vgrid from './components/vgrid.vue'
import strcut from './common/utils/strcut'                    // 截取字符串首字母，中英文适用
import { Group,Flexbox,FlexboxItem,XInput,XHeader,Grid,GridItem,Cell,XTextarea,Radio as NRadio,numberComma} from 'vux'
import { ToastPlugin } from 'vux'
import  { LoadingPlugin } from 'vux'
import { DatePicker,Select,Option,Radio,RadioGroup,Input,Modal,Panel,Collapse,Dropdown,DropdownMenu,DropdownItem,Table,Avatar} from 'iview';
import 'iview/dist/styles/iview.css';
import './scss/base/iviewthem.less';
import './scss/base/main.scss'
// import 'swiper/dist/css/swiper.min.css';
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
Vue.component('my-scroll',myScroll)
Vue.component('cell',Cell)
Vue.component('DatePicker',DatePicker)
Vue.component('Select',Select)
Vue.component('Option',Option)
Vue.component('Radio',Radio)
Vue.component('RadioGroup',RadioGroup)
Vue.component('Input',Input)
Vue.component('Modal',Modal)
Vue.component('Collapse',Collapse)
Vue.component('Panel',Panel)
Vue.component('x-textarea', XTextarea)
Vue.component('vselect', vselect)
Vue.component('vpopup', vpopup)
Vue.component('Dropdown', Dropdown)
Vue.component('DropdownMenu', DropdownMenu)
Vue.component('DropdownItem', DropdownItem)
Vue.component('Table', Table)
Vue.component('Avatar', Avatar)
Vue.component('radio', NRadio)


Vue.prototype.$server       =   server;                         // ajax组件
Vue.prototype.$storage      =   storage;                        // 本地数据读取
Vue.prototype.$md5          =   md5;                            // md5加密
Vue.prototype.$jm           =   jmCode;                         // 加密字符串
Vue.prototype.$math         =   math;                           // 精度计算
Vue.prototype.$html2canvas  =   html2canvas;                    // 图片生成
Vue.prototype.$currency     =   currency;                       // 有图标的币种
Vue.prototype.$numberComma  =   numberComma;                    // 用于分割数字，默认为3位分割，一般用于格式化金额
Vue.prototype.$strcut       =   strcut;                         // 截取字符串的首字母（中英文适用）
const router = new VueRouter({
  routes
})


FastClick.attach(document.body)
FastClick.prototype.onTouchEnd = function(event) {
  if(event.target.hasAttribute("type") && event.target.getAttribute("type") == "text") {
    event.preventDefault();　　　
    return false;　　
  }
}
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