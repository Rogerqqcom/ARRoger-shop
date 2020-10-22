<template>
	<div class="pay-method">
		<div class="wx" @click="Mode = '1'">
			<span>
				<img src="~assets/img/settlement/wx.png" alt="">微信支付
			</span>
			<img src="~assets/img/settlement/Correct.png" alt="" class="icon-Correct" v-if="Mode=='1'">
		</div>
		<div class="alipay" @click="Mode = '2'">
			<span>
				<img src="~assets/img/settlement/alipay.png" alt="">
				支付宝
			</span>
			<img src="~assets/img/settlement/Correct.png" alt="" class="icon-Correct" v-if="Mode=='2'">
		</div>
	</div>
</template>

<script>
  export default {
    name: "PayMethod",
		data() {
      return {
        Mode: 0
			}
		},
		props: {
      mode: String
		},
		created() {
      this.Mode = this.mode
    }
  }
</script>

<style scoped lang="less">
	.pay-method {
		.icon-Correct{
			width: 0.38rem;
			margin-right: 0.3rem;
		}

		.wx {
			height: 1rem;
			line-height: 1rem;
			background-color: #fff;
			font-size: 0.3rem;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-between;

			span {
				display: flex;
				align-items: center;

				img {
					width: 0.38rem;
					margin-right: 0.12rem;
					margin-left: 0.2rem;
				}
			}

			.icon {
				margin: 0.2rem;
			}
		}

		.alipay {
			height: 1rem;
			line-height: 1rem;
			font-size: 0.3rem;
			background-color: #fff;
			border-bottom: 1px solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-between;

			span {
				display: flex;
				align-items: center;

				img {
					width: 0.38rem;
					margin-right: 0.12rem;
					margin-left: 0.2rem;
				}
			}

			.icon {
				margin: 0.2rem;
			}
		}
	}
</style>
