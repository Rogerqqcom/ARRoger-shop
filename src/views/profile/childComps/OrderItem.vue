<template>
	<div class="order-info">
<!--		<router-link  :to="{path:'/order', query:{uri: 'allOrder'}}" @click="allOrder">-->
			<div class="icon" @click="allOrder">
				<img src="~assets/img/icon/allOrder.svg" alt="" class="icon-Order">
				<span>全部订单</span>
			</div>
<!--		</router-link>-->
<!--		<router-link  :to="{path:'/order', query:{uri: 'waitPay'}}" @click="waitPay">-->
			<div class="icon" @click="waitPay">
				<img src="~assets/img/icon/waitPay.svg" alt="" class="icon-Order">
				<span>待付款</span>
			</div>
<!--		</router-link>-->
<!--		<router-link  :to="{path:'/order', query:{uri: 'waitRec'}}" @click="waitRec">-->
			<div class="icon" @click="waitRec">
				<img src="~assets/img/icon/waitRec.svg" alt="" class="icon-Order">
				<span>待收货</span>
			</div>
<!--		</router-link>-->
<!--		<router-link :to="{path:'/order', query:{uri: 'waitCom'}}" @click="waitCom">-->
			<div class="icon" @click="waitCom">
				<img src="~assets/img/icon/waitVe.svg" alt="" class="icon-Order">
				<span>待评价</span>
			</div>
<!--		</router-link>-->
	</div>
</template>

<script>
  export default {
    name: "OrderInfo",
		methods: {
      allOrder() {
        this.$store.state.ordersUri = 'allOrder'
				this.$router.push('/order')
			},
			waitPay() {
        this.$store.state.ordersUri = 'waitPay'
        this.$router.push('/order')

      },
			waitRec() {
        this.$store.state.ordersUri = 'waitRec'
        this.$router.push('/order')

      },
			waitCom() {
        this.$store.state.ordersUri = 'waitCom'
        this.$router.push('/order')

      }
		}
  }
</script>

<style scoped lang="less">
	.order-info {
		/*margin-left: 0.5rem;*/
		font-size: 0.3rem;
		width: 100%;
		height: 1.4rem;
		background-color: #ffffff;
		display: flex;
		/*justify-content: space-between;*/
		justify-content: space-evenly;
		align-items: center;
		box-shadow: 0 1px #adadad;
		div {
			margin: 0  0.2rem;
		}
		.icon {
			width: 1.5rem;
			height: 1rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.icon-Order {
				width: 0.5rem;
			}
		}
		span {
			width: 100%;
			text-align: center;
			font-size: 0.24rem;
			margin-top: 0.06rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: #646566;
		}
	}
</style>
