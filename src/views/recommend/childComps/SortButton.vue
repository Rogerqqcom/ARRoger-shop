<template>
<!--	筛选按钮-->
<!--	<div class="bg">-->
		<!--默认展示全部-->
		<div class="sort-bg">
			<span class="button" :class="active1 ? {active : true} : false">全部</span>
			<span class="button" @click="BySales" :class="active2 ? {active : true} : false">按销量</span>
			<span class="button" @click="ByPrice"  :class="active3 ? {active : true} : false">按价格</span>
		</div>
<!--	</div>-->
</template>

<script>
  export default {
    name: "SortButton",
    data() {
      return {
        active1: true,
        active2: false,
        active3: false,
      }
    },
		methods: {
      BySales() {
        console.log('按销量高到低排序');
        //点击后修改默认的颜色
				//1.关闭全部按钮的颜色
        this.active1 = false
				//打开点击按价格后显示的颜色
				this.active2 = true
				//关闭按销量的颜色
				this.active3 = false
				//发布点击事件
				this.$emit('BySales')
      },
      ByPrice() {
        console.log('按价格低到高排序');
        //1.关闭全部按钮的颜色
        this.active1 = false
        //打开点击按销量后显示的颜色
        this.active3 = true
        //关闭按价格的颜色
        this.active2 = false
        //发布点击事件
        this.$emit('ByPrice')
      }
		}
  }
</script>

<style scoped>
	.sort-bg {
		border-bottom: 2px solid #6e6e6e;
		height: 1.2rem;
		overflow: hidden;
	}
	.button {
		width: 1.5rem;
		height: 1rem;
		font-size: 0.6rem;
		text-align: center;
		border-radius: 1rem;
		margin: 0.2rem 0.1rem 0 0.6rem;
	}
  .button.active {
		color: #1296db;
		/*background-color: #ffff00;*/
	}

</style>
