<!--<template>
	<div class="cart-list">
		<scroll class="content" ref="scroll" >
			<cart-list-item ref="cartListItem" v-for="(item,index) in cartList"
											:item-info="item" :key="index" @reduce="reduce" @add="add"/>
		</scroll>
	</div>
</template>-->
<template>
	<div class="cart-list">
		<scroll class="content" ref="scroll" >
			<cart-list-item ref="cartListItem" v-for="(item,index) in cartList"
											:item-info="item" :key="index"/>
		</scroll>
	</div>
</template>

<script>
  import Scroll from "components/content/scroll/Scroll";

  import CartListItem from "./CartListItem";
  import {mapGetters} from 'vuex'
  export default {

    name: "CartList",
		// data() {
    //   return {
    //     cartList:[]
		// 	}
		// },
    components: {
      Scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      if(this.cartList.length !== 0) {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>
<!--<script>
  import Scroll from "components/content/scroll/Scroll";

  import CartListItem from "./CartListItem";
  import {getOneUser, putUser} from "../../../network/user";
  // import {mapGetters} from 'vuex'
  export default {
    name: "CartList",
		data() {
      return {
        oneUser: {},
        cartList: [],
				newItem: []
			}
		},
    components: {
      Scroll,
      CartListItem
    },
		// props: {
    //   cartList: Array,
		// },
    created() {
      // this.oneItem = this.cartList
      // console.log(this.oneItem);
      if (localStorage.getItem('token')) {
        let token = JSON.parse(localStorage.getItem('token'))
        console.log(token.id);
        getOneUser(token.id).then(res => {
          this.oneUser = res.data
          this.cartList = res.data.cartList
          console.log(this.oneUser);
        })
      }
    },
		methods: {
      reduce(payload) {
        this.newItem = payload
        for (let i=0; i<this.oneUser.cartList.length; i++) {
          if (this.oneUser.cartList[i].id === payload.id){
            this.oneUser.cartList[i] = payload
            console.log(this.oneUser.cartList[i]);
            if (this.oneUser.cartList[i].num > 1) {
              this.oneUser.cartList[i].Subtotal = (this.oneUser.cartList[i].Subtotal / this.oneUser.cartList[i].num)
              this.oneUser.cartList[i].num&#45;&#45;
            }
					}
        }
      },
			add(payload) {
        this.newItem = payload
        for (let i=0; i<this.oneUser.cartList.length; i++) {
          if (this.oneUser.cartList[i].id === payload.id) {
            this.oneUser.cartList[i] = payload
            this.oneUser.cartList[i].num += 1
            this.oneUser.cartList[i].Subtotal = this.oneUser.cartList[i].num * this.oneUser.cartList[i].Subtotal
          }
				}
			}
		},
    mounted() {
      // this.$nextTick(() => {
      //   console.log(this.$refs.cartListItem.oneItem);
			//
      // })
      // console.log(this.oneItem);
      /*let that = this
      this.$bus.$on('del', d => {
        // console.log(d);
        that.click = d
        console.log(that.click);

        let arr = []
        arr = this.oneUser.cartList.filter(item => item.checked == false)
        this.oneUser.cartList = arr
        // console.log(this.oneUser.cartList);
        putUser(this.oneUser.id, this.oneUser).then(res => {
          console.log("删除数据成功,cartList剩下", res.data.cartList);
          this.oneItem = res.data.cartList
        })
          console.log('asjfsaipokjf', this.click);
      })
*/
        //   // getOneUser(this.oneUser.id)
        //   //   .then(res => {
        //   //     if (res.status == 200) {
        //   //       this.oneUser =res.data
        //   //       this.cartList = this.oneUser.cartList
        //   //       console.log(this.cartList);
        //   //     }
        //   //   })
        // })
        // this.click = that.click

    },
/*		watch: {
      cartList() {
        this.click = false
				this.$nextTick(() => {
				  this.click = true
				})
			}
		},*/
/*		updated() {
      if (this.click) {
        getOneUser(this.oneUser.id)
          .then(res => {
            if (res.status == 200) {
              this.oneUser = res.data
              this.cartList = this.oneUser.cartList
              console.log(this.cartList);
            }
          })
      }
    },*/
/*		updated() {
      if (this.click === 1) {
        for (let i=0; i<this.oneUser.cartList.length; i++) {
          //如果商品列表的id跟目前修改的商品id相等
          if (this.itemInfo.id === this.oneUser.cartList[i].id) {
            //将当前修改的商品替换到用户的购物车列表中
            this.oneUser.cartList.splice(i, 1, this.oneItem)
          }
        }
        // 将操作同步到服务器
        putUser(this.oneUser.id, this.oneUser).then(res => {
          console.log('同步更改数据', res.data.cartList);
        })
      }
		},*/
		updated() {
      for (let i=0; i<this.oneUser.cartList.length; i++) {
        //如果商品列表的id跟目前修改的商品id相等
        if (this.newItem.id === this.oneUser.cartList[i].id) {
          //将当前修改的商品替换到用户的购物车列表中
          this.oneUser.cartList.splice(i, 1, this.newItem)
        }
      }
      // 将操作同步到服务器
      putUser(this.oneUser.id, this.oneUser).then(res => {
        console.log('同步更改数据', res.data.cartList);
      })
      getOneUser(this.oneUser.id).then(res => {
        for (let i=0; i<res.data.cartList.length; i++) {
          //如果商品列表的id跟目前修改的商品id相等
          if (this.newItem.id === res.data.cartList[i].id) {
            //将当前修改的商品替换到用户的购物车列表中
            this.cartList[i] = res.data.cartList[i]
          }
        }
      })
    },

    activated() {
      //如果购物车列表的长度不等于0, 调用refresh重新计算高度
      if(this.cartList.length !== 0) {
        this.$refs.scroll.refresh()
      }
    },

  }
</script>-->

<style scoped>
  .cart-list {
		/*background-color: #ffff00;*/
  }
  .content {
    /*height: 100%;*/
    overflow: hidden;/*//关闭原生滚动*/
		height:  calc(100% - 1.05rem - 1rem - 0.9rem);

	}
</style>
