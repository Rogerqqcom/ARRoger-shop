<template>
	<div class="product-bg">
		<div class="product" v-for="(item,index) in commodity" :key='index'>
			<img :src="item.image" alt="" class="img">
			<div class="right-bg">
				<p>{{item.title}}</p>
				<p>{{item.titleTwo}}</p>
				<p>￥{{item.Subtotal}} <span>x{{item.count}}</span></p>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "ProductList",
		props: {
      commodity: Array
		}
  }
</script>

<style scoped lang="less">
	.product-bg {
		width: 100%;
		height: 6.8rem;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		overflow: scroll;
		overflow-x: hidden;

		.product {
			width: 100%;
			height: 1.8rem;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.img {
				width: 1.6rem;
				margin-left: 0.2rem;
			}

			.right-bg {
				width: 5.2rem;
				height: 1.5rem;
				margin-right: 0.2rem;

				p:nth-child(1) {
					font-size: 0.3rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				p:nth-child(2) {
					font-size: 0.26rem;
					margin-top: 0.02rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				p:nth-child(3) {
					font-size: 0.3rem;
					margin-top: 0.3rem;
					color: #ff2742;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					span {
						margin-right: 0.5rem;
						float: right;
						color: #6e6e6e;
					}
				}
			}
		}
	}
</style>
