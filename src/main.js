import './common/rem'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'

//1.安装-npm install vue-lazyload
//2.导入
import VueLazyload from "vue-lazyload";

//创建Vue的空实例绑定到Vue原型上
Vue.prototype.$bus = new Vue()

//3.使用懒加载的插件  //4.修改img的src  :src="showImg" -> v-lazy="showImg"
Vue.use(VueLazyload, {
  loading:  require('./assets/img/common/imageLazy.jpg') //导入占位图
})

//4.解决移动端300ms延迟问题
FastClick.attach(document.body)


/*
手机app用到的调取图片的
Vue.prototype.$base64Img = (e)=>{
  return new Promise(function(resolve, reject) {      //使用Promise进行异步处理
    let fileSize = 0;
    let fileMaxSize = 1024;                 //设置图片最大为 1M
    fileSize = e.target.files[0].size;           //获取图片大小
    let size = fileSize / 1024;
    let file = e.target.files[0];           //获取图片文件对象
    let reader = new FileReader();          //实例化一个对象
    if (size > fileMaxSize) {
      e.target.value  = ''                //内容清空
      resolve({err:'图片大小必须小于1M！'})
    }else if (size <= 0) {
      e.target.value  = ''                //内容清空
      resolve({err:'图片大小大小不能为0M！'})
    }else{
      reader.readAsDataURL(file);             //把图片文件对象转换base64
      reader.onload = function(e) {
        resolve(e.target.result)           //回到函数返回base64值
      }
    }
  })
}
*/




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
