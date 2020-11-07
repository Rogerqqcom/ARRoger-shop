<template>
	<div class="search">
		<div class="in">
			<input type="search" v-model="search" placeholder="请输入您要搜索的内容">
			<div class="cancel" @click="cancel">X</div>
		</div>
<!--		<category-content :product="newProduct" @goDetail="goDetail"/>-->
<!--		<category-content class="content" :product="newProduct"  @goDetail="goDetail"/>-->
		<scroll v-if="search"
						class="content"
						ref="scroll"
						:probe-type="3"
						@scroll="contentScroll"
		>
			<good-list class="goods" :goods="newProduct"/>
			<p  v-if="this.newProduct.length >= 2">没有更多商品了~</p>
		</scroll>
		<!--    监听整个组件(加监听原生事件时的修饰符 .native)-->
		<back-top @click.native="backTop" v-show="isShowBackTop"/>

	</div>
</template>

<script>
	import CategoryContent from "../../../views/category/childComps/CategoryContent";
	import GoodList from "../goods/GoodList";
	import Scroll from "../scroll/Scroll";
	import BackTop from "../backTop/BackTop";
  export default {
    name: "Search",
		data() {
      return {
        // 搜索关键字
        search: '',
        //父组件传过来的商品数据
        products: [],
				//搜索得到的商品数据
				newProduct: [],
        isShowBackTop: false,
      }
		},
		components: {
      CategoryContent,
      GoodList,
      Scroll,
      BackTop
		},
		props: {
      goods:Array
		},
		created() {
      this.products = this.goods
    },
    methods: {
      cancel() {
        //发送一个取消搜索的事件
        this.$emit('cancel')
      },
      goDetail(index) {
        console.log('godetail');
        this.$router.push('/detail/' + this.products[index].id)
      },
      /**
       *置顶
       **/
      backTop() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 500
      },
		},
    watch: {
      //侦听器监听search数据的变化
      search(value) {
        if (value !== '') {
					let arr = this.products.filter(item => item.title.match(value))
					//2、然后将数组arr赋值给需要展示商品数据的newProduct
          // console.log(arr);
          this.newProduct = arr
        }
     /*   else {
          this.newProduct = this.products
        }*/
      }
    }
  }
</script>

<style scoped lang="less">
	.search {
		width: 100%;
		background-color: #fff;
		.in {
			display: flex;
			margin: 0 0.2rem;
			input {
				margin: 0.3rem 0 0.3rem 10%;
				width: 80%;
				height: 0.65rem;
				border-radius: 20px;
				text-align: center;
				background-color: #e3e3e3;
			}
			.cancel {
				border-radius: 50%;
				font-size: 0.5rem;
				color: #f00;
				/*width: 0.85rem;*/
				/*height: 0.85rem;*/
				margin: 0.06rem 0 0 0.4rem;
			}
		}

	}
	.content {
		/*//设置滚动区域的固定高度*/
		overflow: hidden;
		position: absolute;
		top:2.3rem;
		bottom: 1.1rem;
		left: 0;
		right: 0;

		p {
			text-align: center;
			color: #1296db;
			/*border-top: 1px solid #1296db;*/
			/*position: absolute;*/
			/*bottom: 0;*/
			/*left: 40% ;*/
		}
	}
	.goods {
		background-color: #fff;
	}
</style>
