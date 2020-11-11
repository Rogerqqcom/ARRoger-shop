<template>
	<div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 0.2rem;
    bottom: 1.9rem;
  }
  .back-top img {
    width: 0.9rem;
    height: 0.9rem;
		opacity: 0.75;
  }
</style>
