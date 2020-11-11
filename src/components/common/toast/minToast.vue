<template>
	<!-- 错误提示框：体型小 速度快 适合少字弹窗 -->
	<div class="Toast-bg">
		{{title}}
	</div>
</template>

<script>
  export default {
    name: "minToast",
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
		width: 2.6rem;
		height: 1.4rem;
		background-color: #525252;
		opacity: .76;
		color: #fff;
		text-align: center;
		line-height: 1.4rem;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-left: -1.3rem;
		margin-top: -0.7rem;
		border-radius: 0.1rem;
		z-index: 10;
		font-size: 0.28rem;
		animation: load 2.4s infinite; /*infinite: 无限的*/
		-webkit-animation:load 2.4s infinite; /* Safari 和 Chrome */
		@keyframes load {
			10% {
				opacity: 0.76;
			}

			50% {
				opacity: 0.76;
			}

			80% {
				opacity: 0.76;
			}

			100% {
				opacity: 0;
			}
		}
	}
</style>

