<template>
	<div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
<!--		<p v-if="goods.length > 1">没有更多数据啦~</p>-->
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods {
    display: flex;
    /*根据宽度的大小，在一行显示多少个*/
    flex-wrap: wrap;
    justify-content: space-evenly;
		margin: 0.2rem 0 1rem;
		width: 100%;
	}
	/*p {*/
	/*	text-align: center;*/
	/*	color: #1296db;*/
	/*	width: 48%;*/
	/*	!*border-top: 1px solid #1296db;*!*/
	/*	!*left: 35% ;*!*/
	/*}*/


</style>
