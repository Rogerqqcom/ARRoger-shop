<template>
	<div class="user-info">
		<div class="toux" @click="toLogin">
			<img src="~assets/img/profile/toux.jpg" alt="">
			<span class="login" v-if="!userData.name">
					点击登录
				</span>
		</div>
		<div class="info">
			<div class="name">昵称：{{userData.name || "null"}}</div>
			<div class="address">地址：{{address || "null"}}</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "MyInfo",
		props: {
      userData: {
        // type: Object
      },
			address: ''
		},
		methods: {
      toLogin() {
        this.$router.push('/login')
      }
		}
  }
</script>

<style scoped lang="less">
	.user-info {
		background-color: #e1e1e1;
		display: inline-block;
		width: 100%;
		height: 3rem;
		box-shadow: 0 0.5px  0 0 #9c9c9c;
		/*border-bottom: 1px solid #6e6e6e;*/
		.toux {
			display: inline-block;
			margin-left: 0;
			img {
				width: 2rem;
				height: 2rem;
				border-radius: 50%;
				position: relative;
				left: 0.35rem;
				top: 0.5rem;
			}
			.login {
				width: 2rem;
				height: 2rem;
				border-radius: 50%;
				position: absolute;
				left: 0.35rem;
				top: 1.55rem;
				/*display: block;*/
				/*width: 100%;*/
				/*height: 100%;*/
				font-size: 0.3rem;
				background-color: rgba(133, 133, 133, 0.8);
				color: #f5f5f5;
				line-height: 1.8rem;
				text-align: center;
			}
		}
		.info {
			/*background-color: #f00;*/
			display: inline-block;
			position: relative;
			left: 0.8rem;
			top: 0.08rem;
			font-size: 0.35rem;
			.name {
				display: block;
				margin-bottom: 0.2rem;
			}
			.address {
				display: block;
			}
		}
	}
</style>
