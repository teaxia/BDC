import axios from 'axios';
axios.defaults.timeout = 5000;
//axios.defaults.baseURL ='http://107.150.127.54:50009/WebService1.asmx'; //  填写域名
axios.defaults.baseURL ='http://107.150.127.54:50004/WebService1.asmx';   //  测试接口地址
//http request 拦截器
axios.interceptors.request.use(
  config => {
    // 项目里如果用get好像解析json会有问题
    // if(config.method == 'get') {
    //     config.data = true
    // }
    //请求拦截器，调用loading插件
    // 显示loading
    // 判断是否重复提交请求，也就是loading是否还存在，如果存在则不显示新的loading
    let isShow = window.app.$vux.loading.isVisible()
    if(!isShow&&config.showLoading){
       window.app.$vux.loading.show({
          text: 'Loading'
       })
    }
    if(config.upload){
      config.headers = {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
      }
    }else{
      config.data = JSON.stringify(config.data);
      config.headers = {
          'Content-Type': 'application/json',
      }
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


//响应拦截器即异常处理
axios.interceptors.response.use(response => {
  if(response.data.d){
      // 非上传接口
      var data = JSON.parse(response.data.d);
  }else{
      // 上传接口
      var data = response;
  }
  
  // 隐藏loading
  window.app.$vux.loading.hide()
  if(data.Code==-1){
    window.app.$vux.toast.show({
      text: data.Msg,
      type: 'warn'
    })
    return false;
  }else if(data.Code==-2){
    window.app.$vux.toast.show({
      text: data.Msg,                 //登陆失败，被踢下线
      type: 'warn'
    })
    localStorage.clear();
    //跳转登陆页面
    window.app.$router.push({
      path:"/user/login",
    });
    return false;
  }else{
    // 成功
    //return data.Data
    if(response.data.d){
      // 非上传接口
        return JSON.parse(data.Data);
    }else{
        // 上传接口
        return data.data
    }
  }
}, err => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
         window.app.$vux.toast.show({
            text: '错误请求',
            type: 'warn'
          })
          window.app.$vux.loading.hide()
          console.log('错误请求')
        break;
      case 401:
          window.app.$vux.toast.show({
            text: '未授权，请重新登录',
            type: 'warn'
          })
          window.app.$vux.loading.hide()
          console.log('未授权，请重新登录')
        break;
      case 403:
        window.app.$vux.toast.show({
          text: '拒绝访问',
          type: 'warn'
        })
        window.app.$vux.loading.hide()
        console.log('拒绝访问')
        break;
      case 404:
        window.app.$vux.toast.show({
          text: '请求错误,未找到该资源',
          type: 'warn'
        })
        window.app.$vux.loading.hide()
        console.log('请求错误,未找到该资源')
        break;
      case 405:
        window.app.$vux.toast.show({
          text: '请求方法未允许',
          type: 'warn'
        })
        window.app.$vux.loading.hide()
        console.log('请求方法未允许')
        break;
      case 408:
        window.app.$vux.toast.show({
          text: '请求超时',
          type: 'warn'
        })
        window.app.$vux.loading.hide()
        console.log('请求超时')
        break;
      case 500:
        window.app.$vux.toast.show({
          text: '服务器内部错误',
          type: 'warn'
        })
        window.app.$vux.loading.hide()
        //跳转登陆页面
        window.app.$router.push({
          path:"/user/login",
        });
        console.log('服务器内部错误');
        break;
      case 501:
        window.app.$vux.toast.show({
          text: '网络未实现',
          type: 'warn'
        })
        window.app.$vux.loading.hide()
        console.log('网络未实现')
        break;
      case 502:
        window.app.$vux.toast.show({
          text: '网络错误',
          type: 'warn'
        })
        window.app.$vux.loading.hide()
        console.log('网络错误')
        break;
      case 503:
        window.app.$vux.toast.show({
            text: '服务不可用',
            type: 'warn'
        })
        window.app.$vux.loading.hide()
        console.log('服务不可用')
        break;
      case 504:
        window.app.$vux.toast.show({
          text: '网络超时',
          type: 'warn'
        })
        window.app.$vux.loading.hide()
        console.log('网络超时')
        break;
      case 505:
        window.app$vux.toast.show({
          text: 'http版本不支持该请求',
          type: 'warn'
        })
        window.app.$vux.loading.hide()
        console.log('http版本不支持该请求')
        break;
      default:
        window.app$vux.toast.show({
          text: '连接错误',
          type: 'warn'
        })
        window.app.$vux.loading.hide()
        console.log(`连接错误${err.response.status}`)
    }
  } else {
    window.app.$vux.toast.show({
      text: '连接到服务器失败',
      type: 'warn'
    })
    window.app.$vux.loading.hide()
  }
  return Promise.resolve(err.response)
})

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
            headers: {
                'Content-Type': 'application/json'
            },
            params:params,
            responseType: 'json'
        },
    )
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @headers
 * @returns {Promise}
 */

 export function post(url,data = {},config = {showLoading:true,upload:false}){
   return new Promise((resolve,reject) => {
     axios.post(url,data,config)
        .then(response => {
            resolve(response);
        },err => {
            reject(err)
        })
   })
 }


/**
* 下面是获取数据的接口
*/
/** 
* 测试接口
* 名称：exam
* 参数：paramObj/null
* 方式：fetch/post/patch/put
*/
export const server = {
    get: function(api,paramObj,config){
        return get(api,paramObj,config);
    },
    post: function(api,paramObj,config){
        return post(api,paramObj,config);
    },
}