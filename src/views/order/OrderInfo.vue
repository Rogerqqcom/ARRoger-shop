<template>
	<div class="order-info">
		<router-link  to="/allOrder">
			<div class="icon">
				<img src="~assets/img/icon/Order.png" alt="" class="icon-Order">
				<span>全部订单</span>
			</div>
		</router-link>
		<router-link  to="/waitPay">
			<div class="icon">
				<img src="~assets/img/icon/Order.png" alt="" class="icon-Order">
				<span>待付款</span>
			</div>
		</router-link>
		<router-link  to="/waitRec">
			<div class="icon">
				<img src="~assets/img/icon/Order.png" alt="" class="icon-Order">
				<span>待收货</span>
			</div>
		</router-link>
		<router-link to="/address">
			<div class="icon">
				<img src="~assets/img/icon/Order.png" alt="" class="icon-Order">
				<span>地址管理</span>
			</div>
		</router-link>
	</div>
</template>

<script>
  export default {
    name: "OrderInfo"
  }
</script>

<style scoped lang="less">
	.order-info {
		/*margin-left: 0.5rem;*/
		font-size: 0.3rem;
		width: 100%;
		height: 1.4rem;
		background-color: #f5f5f5;
		display: flex;
		/*justify-content: space-between;*/
		justify-content: space-evenly;
		align-items: center;
		div {
			margin: 0  0.2rem;
		}
		/*div:nth-child(1) {*/
		/*	margin-left: 0.3rem;*/
		/*}*/
		/*div:nth-child(4) {*/
		/*	margin-right: 0.3rem;*/
		/*}*/
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
