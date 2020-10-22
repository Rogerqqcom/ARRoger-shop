<!--<template>
  <div id="shop-item">
    <div class="item-selector">
      &lt;!&ndash;      <CheckButton @checkBtnClick="checkedChange" v-model="itemInfo.checked"></CheckButton>&ndash;&gt;
      <CheckButton :is-checked="oneItem.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="oneItem.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{oneItem.title}}</div>
      <div class="item-desc">{{oneItem.desc}}</div>
      <div class="info-bottom">
        <div class="item-price">¥{{oneItem.Subtotal}}</div>
        <div class="item-count">
          <button @click="reduce()">-</button>
          <span>x{{oneItem.num}}</span>
          <button @click="add()">+</button>
        </div>
      </div>
    </div>
  </div>
</template>-->
<template>
  <div id="shop-item">
    <div class="item-selector">
      <!--      <CheckButton @checkBtnClick="checkedChange" v-model="itemInfo.checked"></CheckButton>-->
      <CheckButton :is-checked="itemInfo.checked" @click.native="checkClick"/>
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
          <button @click="reduce()">-</button>
          <span>x{{itemInfo.count}}</span>
          <button @click="add()">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  export default {
    // 在App.vue中声明后，注入依赖刷新
    inject: ['reload'],
    name: "CartListItem",
    components: {
      CheckButton
    },
    data() {
      return {
        flag: false
      }
    },
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      checkClick() {
        // //点击时让页面进行刷新，解决无法点击新增商品的选中按钮
        // if (!this.flag) {
        //   this.reload()
        //   this.flag = true
        // }
        this.itemInfo.checked = !this.itemInfo.checked
        // for (let i=0; i<this.$store.state.cartList.length; i++) {
        //   if (this.itemInfo.id == this.$store.state.cartList[i].id) {
        //     // this.reload()
        //     this.itemInfo.checked = !this.$store.state.cartList[i].checked
        //   }
        // }
      },
      reduce() {
        console.log('----------1');
      },
      add() {
        console.log('++++++++++++++1');
      }
    },
    mounted() {
      // this.reload()
    }
  }
</script>
<!--<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {getOneUser, putUser} from "../../../network/user";

  export default {
    name: "CartListItem",
    data() {
      return {
        oneItem: {
        },
        oneUser: {}
      }
    },
    components: {
      CheckButton,
    },
    props: {
      itemInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    created() {
      this.oneItem = this.itemInfo
      console.log(this.oneItem);
      if (localStorage.getItem('token')) {
        let token = JSON.parse(localStorage.getItem('token'))
        console.log(token.id);
        getOneUser(token.id).then(res => {
          this.oneUser = res.data
          // console.log(res.data);
          console.log(this.oneUser);
        })
      }
    },
    methods: {
      //是否选中
      checkClick() {
        this.oneItem.checked = !this.oneItem.checked
        console.log(this.oneItem);
      },
      //减一
      reduce() {
        // if (this.oneItem.num > 1) {
        //   this.oneItem.Subtotal = (this.oneItem.Subtotal / this.oneItem.num)
        //   this.oneItem.num&#45;&#45;
          console.log('减一');
          this.$emit('reduce', this.oneItem)
          // this.oneItem =  this.itemInfo
          console.log(this.oneItem);
        // }
      },
      //加1
      add() {
        // this.oneItem.num += 1
        // this.oneItem.Subtotal = (this.oneItem.num * this.oneItem.Subtotal)
        this.$emit('reduce', this.oneItem)
        console.log(this.oneItem);
      },
      /* del() {
				 let arr = []
				 arr = this.oneUser.cartList.filter(item => item.checked == false)
				 this.oneUser.cartList = arr
				 // console.log(this.oneUser.cartList);
				 putUser(this.oneUser.id, this.oneUser).then(res => {
					 console.log("删除数据成功,cartList剩下",res.data.cartList);
				 })
			 },*/
    },
    mounted() {
      /*this.del = () => {
        let arr = []
        arr = this.oneUser.cartList.filter(item => item.checked == false)
        this.oneUser.cartList = arr
        // console.log(this.oneUser.cartList);
        putUser(this.oneUser.id, this.oneUser).then(res => {
          console.log("删除数据成功,cartList剩下",res.data.cartList);
        })
      }
      this.$bus.$on('del', this.del)*/
    },
    updated() {
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
      getOneUser(this.oneUser.id).then(res => {
        for (let i=0; i<res.data.cartList.length; i++) {
          //如果商品列表的id跟目前修改的商品id相等
          if (this.itemInfo.id === res.data.cartList[i].id) {
            //将当前修改的商品替换到用户的购物车列表中
            this.itemInfo = res.data.cartList[i]
          }
        }
      })

    }
  }
</script>-->

<style scoped lang="less">
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
  }
  .info-bottom .item-price {
    color: orangered;
    width: 2.8rem;
    /*background-color: #f00;*/
  }
  .info-bottom  .item-count {
    display: inline-block;
    width: 1.7rem;
    /*background-color: #ffff00;*/

  }
  .info-bottom  .item-count span {
    margin: 0.08rem 0.15rem 0 0.15rem;
  }




  .info-bottom  .item-count button {
    outline: none;
    border: none;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #58a7db;
    /*margin-left: 0.3rem;*/
    font-weight: bolder;
  }


</style>
