import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 每次刷新页面，先从本地存储拿到cartList数值
// var oneUser = JSON.parse(localStorage.getItem("token"));
// var oldCartList = oneUser.cartList;

export default new Vuex.Store({
  state: {
    //小弹窗的文字
    tilde: '',
    //token存储用户信息,测试（页面刷新后变成无登录状态）
    token: '',
    //保存当前需要修改的地址数组id
    addressId:'',
    //购物车列表数据
    // cartList: []
  },
  mutations: {
    //编辑地址
    editAddr(state, payload) {
      payload = payload + 1
      state.addressId = payload
    },
    // addCart(state, payload) {
      //payload为新添加的商品

  /*    let oldProduct = null
      for (let item of state.cartList) { //遍历cartList里面的商品
        if (item.iid === payload.iid) { //如果cartList的商品iid等于新加入的商品的iid
          oldProduct = item //将此商品赋给oldProduct这个变量
        }
      }
      if (oldProduct) { ///oldProduct有值
        oldProduct.count += 1  //让之前那个商数量加1
      } else {
        payload.count = 1 //否则（即之前没有此商品），给新的商品数量赋值为1
        //并把它添加到cartList中
        state.cartList.push(payload)
      }*/

      //方法2   //查找是否有该商品
      /*let oldProduct = state.cartList.find(item => item.id === payload.id)

      if(oldProduct) { ///oldProduct有值
        oldProduct.num += 1  //让之前那个商数量加1
      } else {
        payload.count = 1 //否则（即之前没有此商品），给新的商品数量赋值为1
        //并把它添加到cartList中
      }*/
      // state.cartList.push(payload)
    // }


/*    //商品数量+!
    addCounter(state, payload) {
      payload.count++
    },
    //添加到购物车列表
    addToCart(state, payload) {
      //添加商品时的默认选中属性
      payload.checked = true

      state.cartList.push(payload)
    }*/
  },
/*  actions: {
    addCart(context, payload) {
      //这里是异步操作，可以返回一个Promise对象
      return new Promise((resolve, reject) => {
        //1.查找之前数组中是否有该商品
        let oldProduct = context.state.cartList.find(item => item.id === payload.id)
        //2.判断oldProduct
        if(oldProduct) { ///oldProduct有值
          // oldProduct.count += 1  //让之前那个商数量加1
          context.commit("addCounter", oldProduct)
          resolve('当前的商品数量+1')
        } else {//添加新的商品
          payload.count = 1 //否则（即之前没有此商品），给新的商品数量赋值为1
          //并把它添加到cartList中
          context.commit("addToCart", payload)
          resolve('添加了新的商品')
        }
      })
    }
  },
  getters: {
    cartLength(state) {
      //可以直接拿，当拿的次数比较多的话，可以在vuex中封装一个getters
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  }*/
})
