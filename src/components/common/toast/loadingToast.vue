<template>
	<div>
		<!--执行时间长 适合业务处理页面 -->
		<div class="Toast-bg">
			<div class="box">

			</div>
			<p>{{title}}</p>
		</div>
	</div>
</template>

<script>
  export default {
    name: "loadingToast",
		data() {
      return {
        title: 'My Toast'
			}
		},
		created() {
      this.title = this.$store.state.title
    }
  }
</script>

<style lang="less" scoped>
	.Toast-bg {
		width: 3.6rem;
		height: 2.2rem;
		background-color: #6e6e6e;
		opacity: 0.76;
		color: #fff;
		position: absolute;
		left: 50%;
		top: 70%;
		margin-left: -1.6rem;
		margin-top: -0.5rem;
		border-radius: 10px;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		.box{
			width: 0.8rem;
			height: 0.8rem;
			border-top: 0.04rem solid #fff;
			margin-top: 0.3rem;
			border-radius: 50%;
			animation: rotate 1.2s infinite;
			-webkit-animation: rotate 1.2s infinite;
		}
		@keyframes rotate {
			10% {
				transform: rotate(0deg)
			}
			100% {
				//变换旋转角度
				transform: rotate(720deg)
			}
		}
		p{
			text-align: center;
			font-size: 0.3rem;
			color: #fff;
			margin-top: 0.25rem;
		}
	}
</style>
