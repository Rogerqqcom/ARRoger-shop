<template>
	<div class="admin-goods">
		<!--顶部导航-->
		<nav-bar class="nav-bg">
			<div slot="left" class="left" @click="back">
				<img src="~assets/img/navbar/back.png" alt="">
			</div>
			<div class="center" slot="center">
				商家管理
			</div>
		</nav-bar>
		<div class="admin-title">选择商品编辑</div>
		<!--商品列表-->
		<goods-content :product="product"  @goDetail="goDetail"/>
	</div>
</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar";
	import GoodsContent from "../../components/content/GoodsContent/GoodsContent";
  import {getProduct} from "../../network/products";
  export default {
    name: "AdminGoods",
    data() {
      return {
        product: []
      }
    },
		components: {
      NavBar,
      GoodsContent
		},
		created() {
      getProduct().then(res => {
       if (this.$store.state.business) {
         //获取属于当前登录商家的商品
         this.product = res.data.filter(item => item.shopName == this.$store.state.business.shopName)
			 }else {
         alert('请先登录')
				 this.$router.push('/login')
			 }
      })
    },
    methods: {
      back() {
        this.$router.back()
			},
      goDetail(index) {
        //根据点击的商品跳转至对应的详情页
        this.$router.push('/editProduct/' + this.product[index].id)
        // console.log('跳转',index);
      },
		}
  }
</script>

<style scoped lang="less">
	.nav-bg {
		width: 100%;
		height: 1.15rem;
		background-color: #1296db;
		.left{
			img {
				width: 0.6rem;
				height: 0.6rem;
				margin-bottom: 0.1em;
				color: #fff;
			}
		}
		.center{
			color: #fff;
			font-size: 0.6rem;
			height: 0.96rem;
			line-height: 0.96rem;
			/*设置字间距*/
			letter-spacing: 0.08rem;
			padding-top: 0.1rem;
			/*padding-left: 0.5rem;*/
		}
	}
	.admin-goods {
		overflow: hidden;
		.admin-title {
			width: 100%;
			height: 1.2rem;
			text-align: center;
			color: #1296db;
			font-size: 0.5rem;
			padding-top: 0.3rem;
			letter-spacing: 1px;
			background-image: linear-gradient(to bottom, #f3f3f3, #c0c0c0);
		}
	}

</style>
