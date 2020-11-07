<template>
	<div class="phone">
		<Nav/>
		<sort-button @BySales="BySales" @ByPrice="ByPrice"/>
		<sort-content :product="product" @goDetail="goDetail"/>
	</div>
</template>

<script>
  import Nav from "./childComps/Nav";
  import SortButton from "./childComps/SortButton";
  import SortContent from "./childComps/SortContent";

  import {getProduct} from "../../network/products";

  export default {
    name: "phone",
    data() {
      return {
        product: []
      }
    },
    components: {
      Nav,
      SortButton,
      SortContent
    },
    created() {
      getProduct().then(res => {
        this.product = res.data.filter(item => item.category == "手机类")
        console.log(this.product);
      })
    },
    methods: {
      BySales() {
        // console.log('按销量');
        //按销量从高到低排序
        //sort()内部是利用递归进行冒泡排序的；凡是返回大于0的正数的时候就要交换位置。（内部实现）
        this.product = this.product.sort(function (a,b) {return b.sale - a.sale})
      },
      ByPrice() {
        //按价格从低到高排序
        this.product = this.product.sort(function (a,b) {return a.price - b.price})
      },
      goDetail(index) {
        //根据点击的商品跳转至对应的详情页
        this.$router.push('/detail/' + this.product[index].id)
      },
    },
    //如果想刷新部分内容要启用activated函数，用法同created，activated只有在被keep-alive包裹时会触发，activated函数一进入页面就触发
    activated() {
      console.log("profile-activated");
      if (this.$store.state.token) {
        this.isLogin = true
      }
    }
  }
</script>

<style scoped>
	.phone {
		overflow: hidden;

	}

</style>
