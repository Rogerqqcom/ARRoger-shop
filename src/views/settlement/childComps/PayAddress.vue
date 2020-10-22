<template>
	<div class="address-bg" @click="$router.push('/address')">
		<img src="~assets/img/settlement/position.png" alt="" class="icon">
		<div class="center-box">
			<p class="title">
				<span>{{address.name || '请选择您的地址'}}</span>
				<span>{{address.tel || 'null'}}</span>
			</p>
			<p class="address">
				{{address.address || 'null'}}
			</p>
		</div>
	</div>
</template>

<script>
  export default {
    name: "PayAddress",
		props: {
      address: Object
		}
  }
</script>

<style scoped lang="less">
	/*地址*/
	.address-bg {
		width: 100%;
		height: 1.6rem;
		background-color: #fff;
		border-top: 1px solid #eee;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.icon{
			width: 0.6rem;
			margin-left: 0.2rem;
			opacity: 0.6;
		}
		.center-box {
			width: 6rem;
			height: 1.2rem;
			.title {
				display: block;
				height: 0.4rem;
				display: flex;
				align-items: center;
				margin-top: 0.1rem;

				span:nth-child(1) {
					font-size: 0.3rem;
					font-weight: 600;
				}
				span:nth-child(2) {
					font-size: 0.28rem;
					margin-left: 0.1rem;
				}
			}

			.address {
				font-size: 0.28rem;
				margin-top: 0.1rem;
			}
		}
	}
</style>
