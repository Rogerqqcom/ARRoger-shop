<template>
	<div class="search">
		<input type="search" placeholder="请输入您要搜索的内容">
		<span @click="cancel">X</span>

	</div>
</template>

<script>
  export default {
    name: "Search",
		methods: {
      cancel() {
        //发送一个取消搜索的事件
        this.$emit('cancel')
      }
		}
  }
</script>

<style scoped>

</style>
