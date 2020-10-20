<template>
<!--  <div class="cart-list" v-for="(oneItem,index) in cartList" :key="index">-->
    <div id="shop-item" >
      <div class="item-selector" v-for="(oneItem,index) in oneUser.cartList" :key="'item-selector'+index">
        <!--      <CheckButton @checkBtnClick="checkedChange" v-model="itemInfo.checked"></CheckButton>-->
        <CheckButton :is-checked="oneItem.checked" @click.native="checkClick"/>
      </div>
      <div class="item-img"  v-for="(oneItem,index) in oneUser.cartList" :key="'item-img'+index">>
        <img :src="oneItem.image" alt="商品图片">
      </div>
      <div class="item-info"  v-for="(oneItem,index) in oneUser.cartList" :key="index">
        <div class="item-title">{{oneItem.title}}</div>
        <div class="item-desc">{{oneItem.desc}}</div>
        <div class="info-bottom">
          <div class="item-price">¥{{oneItem.Subtotal}}</div>
          <div class="item-count">
            <button @click="reduce(index)">-</button>
            <span>x{{oneItem.num}}</span>
            <button @click="add(index)">+</button>
          </div>
        </div>
      </div>
    </div>
<!--  </div>-->

</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";

  import {getOneUser, putUser} from "../../../network/user";
  // import {mapActions} from 'vuex'
  export default {
    name: "CartListItem",
    data() {
      return {
        oneUser: {},
        click: 0,
        oneItem: {}
      }
    },
    components: {
      CheckButton,
    },
    // props: {
    //   itemInfo: {
    //     type: Object,
    //     default() {
    //       return {}
    //     }
    //   }
    // },
    created() {
      // this.oneItem = this.itemInfo
      // console.log(this.oneItem);
      if (localStorage.getItem('token')) {
        let token = JSON.parse(localStorage.getItem('token'))
        console.log(token.id);
        getOneUser(token.id).then(res => {
          this.oneUser = res.data
          this.cartList = res.data.cartList
        })
      }

    },
    methods: {
      // ...mapActions(['addCart']),

      //是否选中
      checkClick() {
        // for (let i =0;i<this.oneUser.cartList.length; i++) {
        //   this.oneUser.cartList[i] = !this.oneUser.cartList[i]
        // }
        this.oneItem.checked = !this.oneItem.checked
        // console.log(this.oneItem);
      },
      //减一
      reduce(index) {
        if (this.oneUser.cartList[index].num > 1) {
          this.oneUser.cartList[index].Subtotal = (this.oneUser.cartList[index].Subtotal / this.oneUser.cartList[index].num)
          this.oneUser.cartList[index].num --
          console.log('减一');
          // this.$emit('reduce')
          // this.oneItem =  this.itemInfo
          this.oneItem = this.oneUser.cartList[index]
          console.log(this.oneItem);
          this.click = 1

          for (let i=0; i<this.oneUser.cartList.length; i++) {
            //如果商品列表的id跟目前修改的商品id相等
            if (this.oneItem.id === this.oneUser.cartList[i].id) {
              //将当前修改的商品替换到用户的购物车列表中
              this.oneUser.cartList.splice(i, 1, this.oneItem)
            }
          }
          // 将操作同步到服务器
          putUser(this.oneUser.id, this.oneUser).then(res => {
            console.log('同步更改数据', res.data.cartList);
          })
        }
      },
      //加1
      add(index) {
        this.oneUser.cartList[index].num += 1
        this.oneUser.cartList[index].Subtotal = (this.oneUser.cartList[index].num * this.oneUser.cartList[index].Subtotal)
        // this.oneItem =  this.itemInfo
        this.oneItem = this.oneUser.cartList[index]
        console.log(this.oneItem);
        // console.log( this.oneItem.Subtotal);
        this.click = 1

        for (let i=0; i<this.oneUser.cartList.length; i++) {
          //如果商品列表的id跟目前修改的商品id相等
          if (this.oneItem.id === this.oneUser.cartList[i].id) {
            //将当前修改的商品替换到用户的购物车列表中
            this.oneUser.cartList.splice(i, 1, this.oneItem)
          }
        }
        // 将操作同步到服务器
        putUser(this.oneUser.id, this.oneUser).then(res => {
          console.log('同步更改数据', res.data.cartList);
        })

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
        this.click = 2
        // this.oneItem = this.oneUser.cartList
      }
      this.$bus.$on('del', this.del)*/
      console.log('asjfsaipokjf', this.click);

      let that = this
      this.$bus.$on('del', d => {
        console.log(d);
        that.click = d
        console.log(that.click);
        getOneUser(this.oneUser.id)
          .then(res => {
            if (res.status == 200) {
              this.oneUser = res.data
              this.oneItem = this.oneUser.cartList
              console.log(this.oneItem);
            }
        })
      })
      this.click = that.click
      console.log('asjfsaipokjf', this.click);
    },
    updated() {
      if (this.click === 1) {
        for (let i=0; i<this.oneUser.cartList.length; i++) {
          //如果商品列表的id跟目前修改的商品id相等
          if (this.oneItem.id === this.oneUser.cartList[i].id) {
            //将当前修改的商品替换到用户的购物车列表中
            this.oneUser.cartList.splice(i, 1, this.oneItem)
          }
        }
        // 将操作同步到服务器
        putUser(this.oneUser.id, this.oneUser).then(res => {
          console.log('同步更改数据', res.data.cartList);
        })
      }
      // console.log(this.click);

      if (this.click === 2) {
        getOneUser(this.oneUser.id)
          .then(res => {
            if (res.status == 200) {
              this.oneUser = res.data
              this.oneItem = this.oneUser.cartList
              // console.log(this.oneItem);
            }
          })
      }
  //2.将商品加到购物车（先将商品保存到vuex中）
  // this.$store.cartList.push(product) //此法不建议，应该通过mutations修改
  //   this.$store.commit('addCart', this.itemInfo); //此方法不能很好的跟踪添加方法的变化

  }
}
</script>

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
