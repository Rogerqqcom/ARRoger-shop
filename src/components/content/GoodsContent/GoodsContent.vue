<template>
	<div class="content">
		<scroll id="tab-content"
						ref="scroll"
						:probe-type="3"
						:data="[product]"
						@scroll="contentScroll"
		>
			<div class="product-box" v-for="(item,index) in product" :key='index' @click="goDetail(index)">
				<img v-lazy="item.imgStr[0]" alt="" class="banner">
				<div class="txt">
					<div class="top-bg">
						<p>{{item.title}}</p>
						<p>{{item.titleTwo}}</p>
						<p>￥{{item.price}}</p>
						<p>销量：{{item.sale}}</p>
					</div>
				</div>
			</div>
			<p class="bottom-txt" v-if="this.product.length >= 1">~没有更多商品了~</p>
		</scroll>
		<back-top @click.native="backTop" v-show="isShowBackTop"/>
	</div>
</template>

<script>
  import Scroll from "components/content/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";
  export default {
    name: "Content",
		components: {
      Scroll,
      BackTop
		},
    data() {
      return {
        isShowBackTop: false
      }
    },
    props: {
      product: Array
    },
    methods: {
      //跳转至详情页
      goDetail(index) {
        // console.log(index);
        this.$emit('goDetail', index)
      },
      /**
       *置顶
       **/
      backTop() {
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 400
      },
    }
  }
</script>

<style scoped lang="less">
	.content {
		width: 100%;
		height: 84vh;
		padding-bottom: 16vh;
		overflow: scroll;
		background-color: #f4f4f4;

		.product-box {
			width: 100%;
			height: 2.2rem;
			background-color: #fff;
			margin: 0.1rem auto;
			/*margin-bottom: 0.16rem;*/
			display: flex;
			justify-content: space-around;
			align-items: center;

			.banner {
				display: block;
				width: 1.6rem;
				height: 1.6rem;
				margin: 0 0;
			}

			.txt {
				width: 60%;
				height: 1.6rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.top-bg {
					width: 100%;
					height: 1.4rem;
					position: relative;

					// border: 1px solid red;
					p:nth-child(1) {
						width: 100%;
						height: 0.36rem;
						// border: 1px solid red;
						font-size: 0.3rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #333;
					}

					p:nth-child(2) {
						font-size: 0.28rem;
						margin-top: 0.14rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #888;
					}

					p:nth-child(3) {
						font-size: 0.3rem;
						margin-top: 0.36rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #1296db;
					}
					p:nth-child(4) {
						/*display: inline-block;*/
						position: absolute;
						top: 1.2rem;
						right: 0;
						bottom: 0;
						color: #6e6e6e;
					}
				}
			}
		}
	}
	/*控制滚动内容高度*/
	#tab-content {
		/*//设置滚动区域的固定高度*/
		overflow: hidden;
		position: absolute;
		top:2.3rem;
		bottom: 0;
		left: 0;
		right: 0;
		flex: 1;
	}
	.bottom-txt {
		margin-left: 35%;
		padding-bottom: 0.2rem;
	}
</style>
