<template>
	<div class="slide">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: "SwiperItem"
  }
</script>

<style scoped lang="less">
	.slide {
		width: 100%;
		/*flex-shrink(默认为1)
		将子元素宽度之和与父元素宽度的差值按照子元素 flex-shrink 的值分配给各个子元素，
		每个子元素原本宽度减去按比例分配的值，其剩余值为实际宽度。*/
		flex-shrink: 0;
		img {
			width: 100%;
		}
	}
</style>
