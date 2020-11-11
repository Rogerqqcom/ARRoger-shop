<template>
	<div>
		<Nav/>
		<sort-button @BySales="BySales" @ByPrice="ByPrice"/>
		<sort-content :product="product"  @goDetail="goDetail"/>
	</div>
</template>

<script>
  import Nav from "./childComps/Nav";
  import SortButton from "./childComps/SortButton";
  import SortContent from "../../components/content/GoodsContent/GoodsContent";

  import {getProduct} from "../../network/products";

  export default {
    name: "Clothes",
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
      this.getRecommend(this.$route.query.recommend_type)
    },
    methods: {
      /**
			 * 网络请求
			 * */
      getRecommend(recommend_type) {
        //获取水果类
        if (recommend_type == 'fruit') {
          getProduct().then(res => {
            this.product = res.data.filter(item => item.category == "水果类")
            // console.log(this.product);
          })
				}
        //获取服装类
        if (recommend_type == 'clothes') {
          getProduct().then(res => {
            this.product = res.data.filter(item => item.category == "服装类")
            // console.log(this.product);
          })
				}
        //获取鞋类
        if (recommend_type == 'shoes') {
          getProduct().then(res => {
            this.product = res.data.filter(item => item.category == "鞋类")
            // console.log(this.product);
          })
				}
        //获取手机类
        if (recommend_type == 'phone') {
          getProduct().then(res => {
            this.product = res.data.filter(item => item.category == "手机类")
            // console.log(this.product);
          })
				}
			},
      BySales() {
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
    }
  }
</script>


<style scoped lang="less">
	.clothes {
		width: 100%;
		height: 100vh;
		background-color: #ffff00;
		overflow: hidden;
	}
</style>
