// import axios from 'axios'
// //配置请求的根路径
// axios.defaults.baseURL = 'http://localhost:3000'
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.localStorage.getItem('token')
//   //在最后必须 return
//   return config
// })
//
// export default axios



import axios from 'axios'
// //常用
export function request(config) {
    // 1.创建axios的实例
    const instance =axios.create({   //create的返回值本身就是Promise,所以下面直接return就可以
      // baseURL: 'http://152.136.185.210:8000/api/z8',
      // baseURL: 'https://api-hmugo-web.itheima.net/api/public/v1',
      // baseURL: 'http://10.51.161.232:3000',
      // baseURL: 'http://localhost:3000',
      baseURL: 'http://192.168.0.6:3000',
      timeout:5000
    })

    //2.axios的拦截器（interceptors：拦截器）
  //1）请求拦截
  instance.interceptors.request.use(config => {
    //配置请求头
    // config.headers = 'Content-Type’: ‘application/x-www-form-urlencoded;charset=UTF-8'
    return config  //拦截做完处理后一定得返回,不然其他组件请求不到数据
  }, err => {
    // console.log(err);
  })
  //2）响应的拦截,响应的成功拦截中，主要是对数据进行过滤。
  instance.interceptors.response.use(res => {
    // console.log('来到了response拦截success中');
    // return res.data //只返回data数据
    return res
  }, err => {
    console.log('来到了response拦截failure中',err);
    if(err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权的访问'
          break
      }
    }
  })
    //3.发送真正的网络请求
    return instance(config)  //instance本身的返回值就是Promise
}

