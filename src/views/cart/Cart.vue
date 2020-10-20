<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
      <div slot="right" class="nav-right" v-if="isShow" @click="AdminShopCart">
        完成
      </div>
      <div slot="right" class="nav-right" v-else @click="AdminShopCart">管理</div>

    </nav-bar>
    <!--商品列表-->
    <!--    当state中有商品时才展示-->
    <cart-list-item v-if="this.length !== 0"/>
    <span v-else>Tips:当前购物车为空</span>

    <!--底部汇总-->
    <cart-bottom-bar :cartList="cartList" :isShow="isShow" @sub="sub" ref="cartBottomBar"/>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartListItem from "./childComps/CartListItem";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {getOneUser, putUser} from "network/user";

  export default {
    name: "Cart",
    data() {
      return {
        isShow: false,
        //当前登录用户信息
        oneUser: {},
        //购物车列表信息
        cartList: [],
        //是否全选
        isCheckedAll: false,
        //总价
        sum: 0,
        //商品条数
        length: 0,
        update: 0
      }
    },
    components: {
      NavBar,
      CartListItem,
      CartBottomBar
    },
    created() {
      if (localStorage.getItem('token')) {
        let id = JSON.parse(localStorage.getItem('token'))
        getOneUser(id.id)
          .then(res => {
            if (res.status == 200) {
              this.oneUser = res.data
              this.isCheckedAll = true
              this.cartList = this.oneUser.cartList
              this.length = this.oneUser.cartList.length
              // console.log(this.data)

              // 默认全选
              if (this.isCheckedAll == true) {
                for (let i = 0; i < this.oneUser.cartList.length; i++) {
                  this.oneUser.cartList[i].checked = true
                }
              } else {
                for (let i = 0; i < this.oneUser.cartList.length; i++) {
                  this.oneUser.cartList[i].checked = false
                }
              }
              // 将操作同步到服务器
              putUser(this.oneUser.id, this.oneUser).then(res => {
                console.log('同步', res.data);
              })
            }
          })
      }else {
        console.log("请先登录");
      }
    },
    methods: {
      AdminShopCart() {
        this.isShow = !this.isShow
      },
   /*   del() {
        if (this.update > 0) {
          let arr = []
          arr = this.oneUser.cartList.filter(item => item.checked == false)
          this.oneUser.cartList = arr
          // console.log(this.oneUser.cartList);
          putUser(this.oneUser.id, this.oneUser).then(res => {
            console.log("删除数据成功,cartList剩下",res.data.cartList);
          })
          // getOneUser(this.oneUser.id)
          //   .then(res => {
          //     if (res.status == 200) {
          //       this.oneUser = res.data
          //       this.isCheckedAll = true
          //       this.cartList = this.oneUser.cartList
          //       this.length = this.oneUser.cartList.length
          //     }
          //   })
        }
        console.log(this.update);
      },*/
      sub() {
        if (this.sum > 0) {
          let checkedItem = {
            arr:[]
          }
          checkedItem.arr.push(this.oneUser.cartList.filter(item => item.checked == true))
          checkedItem.sum = this.sum
          // this.oneUser.cartList = arr
          // console.log(this.oneUser.cartList);
          // putUser(this.oneUser.id, this.oneUser).then(res => {
          //   console.log("提交数据成功,cartList剩下",res.data.cartList);
          // })
        }
      },

    },
    mounted() {
      // this.$nextTick(() => {
      //   this.update = this.$refs.cartBottomBar.update
      //   console.log(this.update);
        // this.del()
      // })
      // this.del = () => {
        // 移除组件
        // this.update = false
        // 在组件移除后，重新渲染组件
        // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      // this.$nextTick(() => {
			// 	 setTimeout(() =>{
			// 		 this.update = true
			// 	 },1000)
			//  })
        /*let arr = []
        arr = this.oneUser.cartList.filter(item => item.checked == false)
        this.oneUser.cartList = arr
        // console.log(this.oneUser.cartList);
        putUser(this.oneUser.id, this.oneUser).then(res => {
          console.log("删除数据成功,cartList剩下",res.data.cartList);
        })
        this.update = true
        console.log(this.update);*/

        // }
        // this.oneItem = this.oneUser.cartList

      // this.$bus.$on('del', this.del)
      // let that = this
      // this.$bus.$on('del', d => {
      //   console.log(d);
      //   that.click = d
      //   console.log(that.click);
      //
      //
      //
      // })
      // this.click = that.click
      // console.log('asjfsaipokjf', this.click);

    },
    updated() {

      // let id = JSON.parse(localStorage.getItem('token'))
      // getOneUser(id.id)
      //   .then(res => {
      //     if (res.status == 200) {
      //       this.oneUser = res.data
      //       this.isCheckedAll = true
      //       this.cartList = this.oneUser.cartList
      //       this.length = this.oneUser.cartList.length
      //     }
      //   })
      this.$nextTick(() => {
        this.sum = this.$refs.cartBottomBar.sum
        console.log( this.sum);
        this.sub()
      })
      //
      // console.log(this.update);
      // if (this.update === 2) {
      //   getOneUser(this.oneUser.id)
      //     .then(res => {
      //       if (res.status == 200) {
      //         this.oneUser = res.data
      //         this.cartList = this.oneUser.cartList
      //         console.log(this.cartList);
      //       }
      //     })
      //
      // }
    }
  }
</script>

<style scoped lang="less">
  .cart {
    height: 100vh;
    position: relative;
  }
  .nav-bar {
    background-color: #58a7db;
    color: #ffffff;
    letter-spacing: 0.1rem;
    height: 1.05rem;
    div {
      font-size: 0.5rem;
      padding-top: 0.15rem;
    }

  }
  span {
    /*background-color: #f00;*/
    position: absolute;
    width: 80%;
    left: 13%;
    top: 25%;
    /*margin: 0.5rem 45%;*/
    color: #d9d9d9;
    font-size: 0.6rem;
  }
</style>
