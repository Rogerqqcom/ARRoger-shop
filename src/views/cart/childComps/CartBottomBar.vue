<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-all"
                    @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="totalPrice">
      <span>合计：￥{{sum}}</span>
    </div>
    <div class="calculate">
      <span v-if="isShow" @click="del()">删除</span>
      <span v-else @click="sub()">去计算({{checkLength}})</span>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartBottomBar",
    data() {
      return {
        //总价
        sum: 0,
        update: false
      }
    },
		props: {
      cartList: Array,
      isShow: Boolean
		},
    components: {
      CheckButton
    },
    updated() {
      /*//全选汇总价格
        if(this.cartList.length !== 0){
          //1.通过ES6的高级数组.filter()方法，返回item.cheched的元素并组成一个新数组
          //2.补充：ES6的高级数组.map()方法为原始数组元素调用函数处理后的值组成新数组。
          let arr = []
          arr.push(this.cartList.filter(item => item.checked))
          // console.log(arr);
          //拿到为选中的对象

          //3.对上面filter拿到的数组进行数组内的对象内的某个属性进行累加,
          let Sum = 0
          for(let i=0; i<arr[0].length; i++) {
            // console.log(arr[0].[i].Subtotal);
            Sum += arr[0].[i].Subtotal
          }
          // console.log(typeof(Sum));
          this.sum = Sum
          // console.log(this.sum);
        }*/
      let arr = []
      arr.push(this.cartList.filter(item => item.checked))
      console.log(arr);
      //3.对上面filter拿到的数组进行数组内的对象内的某个属性进行累加,
      let Sum = 0
      for(let i=0; i<arr[0].length; i++) {
        // console.log(arr[0].[i].Subtotal);
        Sum += arr[0].[i].Subtotal
      }
      // console.log(typeof(Sum));
      this.sum = Sum
      // console.log(this.sum);
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
        //1.会遍历所有的元素，性能低
        // return this.$store.state.cartList.length === 0 ? false : !(this.$store.state.cartList.filter(item => !item.checked).length)  //如果查找到没有被选中的，说明有长度，取反为false
        //2.使用find(), 性能高一点
        // if (this.$store.state.cartList.length === 0) return false
        //如果cartList.length === 0 返回false， 否则，若有些没被选中则返回false
        return this.cartList.length === 0 ? false : !(this.cartList.find(item => !item.checked))

       /* //3.也可以直接遍历
        if (this.$store.state.cartList.length === 0) return false
        for (let item of this.$store.state.cartList) {
          if(!item.checked) {
            return false
          }
        }
        return true*/
      }
    },
    methods: {

      checkClick() {
        if (this.isSelectAll) { //默认全部选中
          // 通过forEach遍历是，点击按钮后将对象里面的checked改为false
          this.cartList.forEach(item => item.checked = false)
        } else { //当部分或全部不选中，点击按钮后将对象里面的checked改为true
          this.cartList.forEach(item => item.checked = true)
        }
      },
      /*clacClick() {
        if (!this.isSelectAll) {
          alert('请选择商品')
        }
      /!*  else if(this.$store.state.cartList.length !== 0){
          // this.$store.state.cartList = ''
          //跳转前将选中商品保存下来
          this.selectGoods =  this.$store.state.cartList.filter(item => item.checked)
          // this.$store.state.cartList.filter(item => item.checked).remove(this.selectGoods[0])
          this.$router.push('/profile')
          // console.log(this.$store.state.cartList);

          // console.log(this.$store.state.cartList.filter(item => item.checked));
        }*!/
      },*/
      del() {
        this.update = true
        // this.$emit('del')
        this.$bus.$emit('del', this.update)
        // this.$bus.$emit('reload')
      },
      sub() {
        this.$emit('sub')
      }
    }
  }
</script>

<style scoped lang="less">
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
    margin-left: 10px;
    width: 100px;
		.check-all {
			width: 0.45rem;
			height: 0.45rem;
			display: flex;
			justify-content: center;
		}
		span {
			margin-left: 0.15rem;
		}
  }

  .totalPrice {
    flex: 1;
		position: relative;
		left: 0.2rem;
		span {
			position: absolute;
			bottom: 0.02rem;
		}
  }
  .calculate {
		width: 1.8rem;
    text-align: center;
    color: white;
		position: relative;
    span:nth-child(1) {
      background-color:  #58a7db;
      width: 1.5rem;
      border-radius: 10px;
      position: absolute;
      bottom: 0.01rem;
      left: 0.2rem;
      color: white;
    }
  }
</style>
