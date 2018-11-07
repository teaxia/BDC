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
    config.data = JSON.stringify(config.data);
    config.headers = {
        'Content-Type': 'application/json',
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

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

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
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
    get: function(api,paramObj){
        return get(api,paramObj);
    },
    post: function(api,paramObj){
        return post(api,paramObj);
    },
}