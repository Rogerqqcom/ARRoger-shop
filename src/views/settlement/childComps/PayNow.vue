<template>
	<div class="payment-bg">
		<span class="SumPriceTitle">实付款 : </span>
		<span class="SumPrice">￥ {{commodity.sum}}</span>
		<div class="button" @click="sub">
			立即支付
		</div>
	</div>
</template>

<script>
  export default {
    name: "PayNow",
		props: {
      commodity: Array
		},
		methods: {
      sub() {
        this.$emit('sub')
			}
		}
  }
</script>

<style scoped lang="less">
	.payment-bg {
		width: 100%;
		height: 1.1rem;
		background-color: #fff;
		padding: 0 0;
		position: absolute;
		bottom: 0;
		margin: 0;

		.SumPriceTitle {
			display: block;
			width: 1.2rem;
			height: 100%;
			// border: 1px solid red;
			float: left;
			font-size: 0.3rem;
			color: #333;
			text-align: center;
			line-height: 1.1rem;
			margin-left: 0.3rem;
		}

		.SumPrice {
			display: block;
			width: 1.9rem;
			height: 100%;
			// border: 1px solid red;
			float: left;
			font-size: 0.3rem;
			color: #ff2742;
			line-height: 1.1rem;
		}

		.button {
			width: 3rem;
			height: 100%;
			background-color: #ff2742;
			color: #fff;
			font-size: 0.38rem;
			text-align: center;
			line-height: 1.1rem;
			float: right;
		}
	}
</style>
