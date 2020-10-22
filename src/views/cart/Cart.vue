<!--<template>
  <div class="cart">
    &lt;!&ndash;导航&ndash;&gt;
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
      <div slot="right" class="nav-right" v-if="isShow" @click="AdminShopCart">
        完成
      </div>
      <div slot="right" class="nav-right" v-else @click="AdminShopCart">管理</div>

    </nav-bar>
    &lt;!&ndash;商品列表&ndash;&gt;
    &lt;!&ndash;    当state中有商品时才展示&ndash;&gt;
&lt;!&ndash;    <cart-list v-if="this.length !== 0" :cart-list="cartList"/>&ndash;&gt;
    <cart-list v-if="this.length !== 0"/>
    <span v-else>Tips:当前购物车为空</span>

    &lt;!&ndash;底部汇总&ndash;&gt;
    <cart-bottom-bar :cartList="cartList" :isShow="isShow" @sub="sub" ref="cartBottomBar"/>

  </div>
</template>-->
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
    <!--    当有商品时才展示-->
<!--    <cart-list v-if="this.length !== 0"/>-->
    <div  v-if="this.length !== 0" class="cart-list">
<!--      <scroll class="content" ref="scroll" >-->
      <div id="shop-item" v-for="(itemInfo,index) in cartList" :key="index">
        <div class="item-selector">
          <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick(index)"/>
        </div>
        <div class="item-img">
          <img :src="itemInfo.image" alt="商品图片">
        </div>
        <div class="item-info">
          <div class="item-title">{{itemInfo.title}}</div>
          <div class="item-desc">{{itemInfo.desc}}</div>
          <div class="info-bottom">
            <div class="item-price">¥{{itemInfo.Subtotal}}</div>
            <div class="item-count">
              <div @click="reduce(index)">-</div>
              <div>x{{itemInfo.count}}</div>
              <div @click="add(index)">+</div>
            </div>
          </div>
        </div>
      </div>
<!--      </scroll>-->
    </div>
    <span v-else>Tips:当前购物车为空</span>

    <!--底部汇总-->
<!--    <cart-bottom-bar  :isShow="isShow" :cartList="cartList"/>-->
    <div class="bottom-bar">
      <div class="check-content">
        <check-button :is-checked="isSelectAll"
                      class="check-all"
                      @click.native="checkAll"
        />
        <div id="all" @click="checkAll">全选</div>
      </div>
      <div class="totalPrice">
        <span>合计：￥{{sum}}</span>
      </div>
      <div class="calculate">
        <span v-if="isShow" @click="del()">删除</span>
        <span v-else @click="sub()">去计算({{checkLength}})</span>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  // import CartList from "./childComps/CartList";
  import CheckButton from "../../components/content/checkButton/CheckButton";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {getOneUser, putUser} from 'network/user'


  export default {
    name: "Cart",
    data() {
      return {
        // 是否显示删除
        isShow: false,
        oneUser: {},
        cartList: [],
        length: 0,
        //总价
        sum: 0,
        flag: false,
        oldPrice: 0
      }
    },
    mounted() {
      // if (!this.flag) {
      //   this.reload()
      //   this.flag = true
      // }
    },
    components: {
      NavBar,
      CheckButton,
      CartBottomBar
    },
    created() {
      if (localStorage.getItem('token')) {
        let token = JSON.parse(localStorage.getItem('token'))
        getOneUser(token.id)
          .then(res => {
            if (res.status == 200) {
              this.oneUser = res.data
              // this.isCheckedAll = true
              this.cartList = this.oneUser.cartList
              this.length = this.oneUser.cartList.length
              console.log(this.length)

              // 默认全选
              // if (this.isCheckedAll == true) {
              //   for (let i = 0; i < this.oneUser.cartList.length; i++) {
              //     this.oneUser.cartList[i].checked = true
              //   }
              // } else {
              //   for (let i = 0; i < this.oneUser.cartList.length; i++) {
              //     this.oneUser.cartList[i].checked = false
              //   }
              // }
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
    computed: {
      //获取商品选中的数量
      checkLength() {
        if(this.cartList.length !== 0){
          return this.cartList.filter(item => item.checked).length
        }
      },
      //判断是否全部选中
      isSelectAll() {
        //如果cartList.length === 0 返回false， 否则，若有些没被选中则返回false
        return this.cartList.length === 0 ? false : !(this.cartList.find(item => !item.checked))
      }
    },
    methods: {
      AdminShopCart() {
        this.isShow = !this.isShow
      },
      //单选
      checkClick(index) {
        this.cartList[index].checked = !this.cartList[index].checked

        //将操作同步到服务器，后面结算会用到
        for (let i=0; i<this.oneUser.cartList.length; i++) {
          this.oneUser.cartList[index].checked = this.cartList[index].checked
        }
        putUser(this.oneUser.id, this.oneUser).then(res => {
          // console.log(res.data.cartList);
        })

      },

      //加1
      add(index) {
        this.cartList[index].count += 1
        // if (!this.flag) {
        //   this.oldPrice = this.cartList[index].price
        //   this.flag = true
        // }
        // console.log(this.oldPrice);
        console.log(this.oneUser.cartList[index].price);
        this.cartList[index].Subtotal = (this.cartList[index].count *  this.cartList[index].price)
        console.log('+++++++++1',this.cartList);
      },
      //减一
      reduce(index) {
        if (this.cartList[index].count > 1) {
          // if (!this.flag) {
          //   this.oldPrice = this.cartList[index].oldPrice
          //   this.flag = true
          // }
          this.cartList[index].count--
          this.cartList[index].Subtotal = this.cartList[index].count *  this.cartList[index].price


          // this.cartList[index].Subtotal = (this.cartList[index].Subtotal * this.cartList[index].count)
          // console.log('-----1');
        }
      },
      //全选按钮

      checkAll() {
        if (this.isSelectAll) { //默认全部选中
          // 通过forEach遍历是，点击按钮后将对象里面的checked改为false
          this.cartList.forEach(item => item.checked = false)
        } else { //当部分或全部不选中，点击按钮后将对象里面的checked改为true
          this.cartList.forEach(item => item.checked = true)
        }
      },
      del() {
        let arr = []
        arr = this.oneUser.cartList.filter(item => item.checked == false)
        this.oneUser.cartList = arr
        // console.log(this.oneUser.cartList);
        putUser(this.oneUser.id, this.oneUser).then(res => {
          console.log("删除数据成功,cartList剩下", res.data.cartList);
          this.length = res.data.cartList.length
          this.cartList = res.data.cartList
        })
      },
      sub() {
        // this.$emit('sub')
        if (this.sum > 0) {
          let checkedItem = []
          checkedItem = this.cartList.filter(item => item.checked == true)
          checkedItem.sum = this.sum
          console.log(checkedItem);
          this.$store.state.commodity = checkedItem
          this.$router.push('/settlement')


          // this.oneUser.cartList = arr
          // console.log(this.oneUser.cartList);
          // putUser(this.oneUser.id, this.oneUser).then(res => {
          //   console.log("提交数据成功,cartList剩下",res.data.cartList);
          // })
        }else {
          alert('请先选择商品')
        }
      },

    },
    updated() {
      let arr = []
      for (let i=0;i<this.cartList.length;i++) {
        if (this.cartList[i].checked == true) {
          arr.push(this.cartList[i])
        }
      }
      let Sum = 0
      for (let j=0; j<arr.length; j++) {
        Sum += arr[j].Subtotal
      }
      this.sum = Sum
    }
  }
  // import NavBar from "components/common/navbar/NavBar";
  // import CartList from "./childComps/CartList";
  // import CartBottomBar from "./childComps/CartBottomBar";

  // import {getOneUser, putUser} from "network/user";

  // export default {
  //   name: "Cart",
  //   data() {
  //     return {
  //       isShow: false,
  //       //当前登录用户信息
  //       oneUser: {},
  //       //购物车列表信息
  //       cartList: [],
  //       //是否全选
  //       isCheckedAll: false,
  //       //总价
  //       sum: 0,
  //       //商品条数
  //       length: 0,
  //       update: 0
  //     }
  //   },
  //   components: {
  //     NavBar,
  //     CartList,
  //     CartBottomBar
  //   },
  //   // created() {
  //   //   if (localStorage.getItem('token')) {
  //   //     let id = JSON.parse(localStorage.getItem('token'))
  //   //     getOneUser(id.id)
  //   //       .then(res => {
  //   //         if (res.status == 200) {
  //   //           this.oneUser = res.data
  //   //           this.isCheckedAll = true
  //   //           this.cartList = this.oneUser.cartList
  //   //           this.length = this.oneUser.cartList.length
  //   //           // console.log(this.data)
  //   //
  //   //           // 默认全选
  //   //           if (this.isCheckedAll == true) {
  //   //             for (let i = 0; i < this.oneUser.cartList.length; i++) {
  //   //               this.oneUser.cartList[i].checked = true
  //   //             }
  //   //           } else {
  //   //             for (let i = 0; i < this.oneUser.cartList.length; i++) {
  //   //               this.oneUser.cartList[i].checked = false
  //   //             }
  //   //           }
  //   //           // 将操作同步到服务器
  //   //           putUser(this.oneUser.id, this.oneUser).then(res => {
  //   //             console.log('同步', res.data);
  //   //           })
  //   //         }
  //   //       })
  //   //   }else {
  //   //     console.log("请先登录");
  //   //   }
  //   // },
  //   methods: {
  //     AdminShopCart() {
  //       this.isShow = !this.isShow
  //     },
  //  /*   del() {
  //       if (this.update > 0) {
  //         let arr = []
  //         arr = this.oneUser.cartList.filter(item => item.checked == false)
  //         this.oneUser.cartList = arr
  //         // console.log(this.oneUser.cartList);
  //         putUser(this.oneUser.id, this.oneUser).then(res => {
  //           console.log("删除数据成功,cartList剩下",res.data.cartList);
  //         })
  //         // getOneUser(this.oneUser.id)
  //         //   .then(res => {
  //         //     if (res.status == 200) {
  //         //       this.oneUser = res.data
  //         //       this.isCheckedAll = true
  //         //       this.cartList = this.oneUser.cartList
  //         //       this.length = this.oneUser.cartList.length
  //         //     }
  //         //   })
  //       }
  //       console.log(this.update);
  //     },*/
  //     sub() {
  //       if (this.sum > 0) {
  //         let checkedItem = {
  //           arr:[]
  //         }
  //         checkedItem.arr.push(this.oneUser.cartList.filter(item => item.checked == true))
  //         checkedItem.sum = this.sum
  //         // this.oneUser.cartList = arr
  //         // console.log(this.oneUser.cartList);
  //         // putUser(this.oneUser.id, this.oneUser).then(res => {
  //         //   console.log("提交数据成功,cartList剩下",res.data.cartList);
  //         // })
  //       }
  //     },
  //
  //   },
  //   mounted() {
  //     // this.$nextTick(() => {
  //     //   this.update = this.$refs.cartBottomBar.update
  //     //   console.log(this.update);
  //       // this.del()
  //     // })
  //     // this.del = () => {
  //       // 移除组件
  //       // this.update = false
  //       // 在组件移除后，重新渲染组件
  //       // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
  //     // this.$nextTick(() => {
	// 		// 	 setTimeout(() =>{
	// 		// 		 this.update = true
	// 		// 	 },1000)
	// 		//  })
  //       /*let arr = []
  //       arr = this.oneUser.cartList.filter(item => item.checked == false)
  //       this.oneUser.cartList = arr
  //       // console.log(this.oneUser.cartList);
  //       putUser(this.oneUser.id, this.oneUser).then(res => {
  //         console.log("删除数据成功,cartList剩下",res.data.cartList);
  //       })
  //       this.update = true
  //       console.log(this.update);*/
  //
  //       // }
  //       // this.oneItem = this.oneUser.cartList
  //
  //     // this.$bus.$on('del', this.del)
  //     // let that = this
  //     // this.$bus.$on('del', d => {
  //     //   console.log(d);
  //     //   that.click = d
  //     //   console.log(that.click);
  //     //
  //     //
  //     //
  //     // })
  //     // this.click = that.click
  //     // console.log('asjfsaipokjf', this.click);
  //
  //   },
  //   updated() {
  //
  //     // let id = JSON.parse(localStorage.getItem('token'))
  //     // getOneUser(id.id)
  //     //   .then(res => {
  //     //     if (res.status == 200) {
  //     //       this.oneUser = res.data
  //     //       this.isCheckedAll = true
  //     //       this.cartList = this.oneUser.cartList
  //     //       this.length = this.oneUser.cartList.length
  //     //     }
  //     //   })
  //     this.$nextTick(() => {
  //       this.sum = this.$refs.cartBottomBar.sum
  //       console.log( this.sum);
  //       this.sub()
  //     })
  //     //
  //     // console.log(this.update);
  //     // if (this.update === 2) {
  //     //   getOneUser(this.oneUser.id)
  //     //     .then(res => {
  //     //       if (res.status == 200) {
  //     //         this.oneUser = res.data
  //     //         this.cartList = this.oneUser.cartList
  //     //         console.log(this.cartList);
  //     //       }
  //     //     })
  //     //
  //     // }
  //   }
  // }
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

  //商品列表
  #shop-item {
    width: 100%;
    display: flex;
    font-size: 0;
    padding: 0.1rem;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
  .item-selector {
    width: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-img {
    padding: 5px;
    /*border: 1px solid #ccc;*/
  }
  .item-img img {
    width: 1.5rem;
    height: 1.8rem;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    font-size: 0.35rem;
    color: #333;
    padding: 0.1rem 0.2rem;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 0.25rem;
    color: #666;
    margin-top: 0.15rem;
  }
  .info-bottom {
    display: flex;
    margin-top: 0.3rem;
    overflow: hidden;
  }
  .info-bottom .item-price {
    color: orangered;
    width: 2.8rem;
    /*background-color: #f00;*/
  }
  .info-bottom  .item-count {
    /*display: inline-block;*/
    display: flex;
    width: 2rem;
    /*background-color: #ffff00;*/
    position: relative;
    padding-bottom: 0.2rem;
    overflow: hidden;
    text-align: center;
    div:nth-child(2) {
      color: #6e6e6e;
      width: 0.6em;
      font-size: 0.4rem;
      /*background-color: #f00;*/
      position: absolute;
      top: 15%;
      left: 35%;
    }
    div:nth-child(1), div:nth-child(3) {
      outline: none;
      border: none;
      width: 0.5rem;
      height: 0.5rem;
      background-color: #58a7db;
      color: white;
    }
    div:nth-child(1) {
      position: absolute;
      left: 0;
      top: 15%;
    }
    div:nth-child(3) {
      position: absolute;
      right:  0;
      left: 60%;
      top: 15%;
    }
  }

  //底部导航
  .bottom-bar {
    height: 0.8rem;
    width: 100vw;
    background-color: #ffffff;

    /*position: relative;*/
    line-height: 0.8rem;
    display: flex;
    position: fixed;
    bottom: 1.05rem;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 0.1rem;
    width: 1.6rem;
    .check-all {
      width: 0.45rem;
      height: 0.45rem;
      display: flex;
      justify-content: center;
    }
    #all {
      margin-left: 0.1rem;
      font-size: 0.4rem;
    }
  }

  .totalPrice {
    flex: 1;
    position: relative;
    left: 0.2rem;
    span {
      position: absolute;
      top: 0;
      color: #717171;
      font-size: 0.35rem;
    }
  }
  .calculate {
    width: 1.8rem;
    text-align: center;
    color: white;
    position: relative;
    span:nth-child(1) {
      background-color:  #58a7db;
      /*width: 1.5rem;*/
      border-radius: 15px;
      position: absolute;
      top: 0;
      left: 0.1rem;
      color: white;
      font-size: 0.2rem;
    }
  }
/*
  .info-bottom  .item-count span {
    display: block;

    color: black;
    !*margin: 0 0.15rem 1rem 0.15rem;*!
    width: 0.8rem;
    font-size: 0.4rem;
    background-color: #f00;
    text-align: center;
  }
  .info-bottom  .item-count button {
    display: block;
    outline: none;
    border: none;
    width: 0.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    background-color: #58a7db;
    !*margin-left: 0.3rem;*!
    font-weight: bolder;
    justify-content: space-around;
  }
  .info-bottom  .item-count button:nth-child(1) {
    justify-content: center;
    align-content: center;
    align-self: center;
    align-items: center;

  }
  .info-bottom  .item-count button:nth-child(2) {
    margin-left: 0.3rem;
  }
*/

</style>
