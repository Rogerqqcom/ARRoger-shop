<template>
	<nav-bar  class="recommend-nav">
		<div class="left" slot="left" @click="back">
			<img src="~assets/img/navbar/back.png" alt="">
		</div>
		<div class="center" slot="center">热门推荐</div>
		<div slot="right" class="right">
			<img @click="toSetUp" v-if="isLogin"  src="~assets/img/home/setUp.png" alt="">
			<span @click="toLogin" v-else>登录</span>
		</div>
	</nav-bar>
</template>

<script>
	import NavBar from "../../../components/common/navbar/NavBar";
  export default {
    name: "Nav",
		data() {
      return {
        isLogin: false
			}
		},
		components: {
      NavBar
		},
		created() {
      if (this.$store.state.token || localStorage.getItem('token')) {
        this.isLogin = true
      }
    },
		methods: {
      back() {
        this.$router.push('/home')
			},
      toSetUp() {
        this.$router.push('/setUp')
      },
      toLogin() {
        this.$router.push('/login')
      },
		}
  }
</script>

<style scoped lang="less">
	.recommend-nav {
		background-color: #58a7db;
		height: 1.05rem;
		.left{
			/*background-color: #f00;*/
			img {
				width: 0.5rem;
				height: 0.5rem;
				/*line-height: 0.1rem;*/
				margin-bottom: 0.16rem;
				color: #fff;

			}

		}
		.center {
			color: white;
			font-size: 0.5rem;
			height: 0.86rem;
			line-height: 0.86rem;
			/*设置字间距*/
			letter-spacing: 0.08rem;
			padding-top: 0.12rem;
		}
		.right{
			position: relative;
			img{
				width: 0.58rem;
				height: 0.55rem;
				position: absolute;
				top: 0.28rem;
				left: 0.36rem;
				/*padding-top: 0.3rem;*/
			}
			span{
				color: #f0f0f0;
				font-size: 0.38rem;
				text-align: center;
				position: absolute;
				top: 0.3rem;
				left: 0.2rem;
				letter-spacing: 0.04rem;
			}
		}
	}
</style>
