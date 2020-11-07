<!--读取展示-->
<template>
	<div class="content">
		<scroll id="tab-content"
						ref="scroll"
						:probe-type="3"
						:data="[orders]"
						@scroll="contentScroll"
		>
			<div class="product-box"  v-if="orders" v-for="(item,index) in orders" :key='index'>
				<div class="txt">
					<div class="top-bg">
						<p>{{item.address.name}}{{item.address.tel}}</p>

						<p>{{item.is_pay}}</p>
						<p>{{item.address.address}}</p>
						<hr>
						<div class="box-info">
							<span>总价：￥{{item.commodity.sum}}</span>
							<span>x{{item.commodity.arr.length}}</span>
						</div>


						<div v-if="item.is_pay == '未支付'" class="orders-but" @click="toSettlement(index)">
							<button>去支付</button>
						</div>
						<div v-if="item.is_pay == '待收货'" class="orders-but" @click="goOrderInfo(item.id)">
							<button>订单详情</button>
						</div>
						<div v-if="item.is_pay == '已评价'" class="orders-but">
							<button @click="goOrderInfo(item.id)">订单详情</button>
<!--							<button  @click="toeValuateDetail(index)">评价详情</button>-->
						</div>
						<div v-if="item.is_pay == '待评价'" class="orders-but">
							<button  @click="goOrderInfo(item.id)">订单详情</button>
<!--							<button  @click="toeValuate(index)">去评价</button>-->
						</div>
					</div>
<!--					<p class="bottom-txt" v-if="this.orders.length >= 1">~没有更多商品了~</p>-->
				</div>
			</div>
			<div v-if="this.orders.length == 0" class="tips">Tips:当前没有此类订单</div>
		</scroll>
		<back-top @click.native="backTop" v-show="isShowBackTop"/>
	</div>
</template>

<script>
	import Scroll from "../../../components/content/scroll/Scroll";
	import BackTop from "../../../components/content/backTop/BackTop";
  export default {
    name: "Cart",
		components: {
      Scroll,
      BackTop
		},
    data() {
      return {
        isShowBackTop: false,
				ordersContent: []
      }
    },
		props: {
      orders: Array
		},
    created() {
      this.ordersContent = this.orders
      console.log(this.orders.length);
    },
		// mounted() {
    //   this.ordersContent = this.orders
    // },
    methods: {
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
			//去支付
      toSettlement(index) {
        this.ordersContent = this.orders
        this.$store.state.commodity = this.ordersContent[index].commodity
        //传订单的id过去
        this.$router.push({'path': '/settlement', 'query': {'id': this.ordersContent[index].id}})
        // this.$router.push({'path': '/settlement', 'query': {'id':id}})
      },
      //跳转至订单详情
      goOrderInfo(id) {
        this.ordersContent = this.orders
        // let dataInfo = this.ordersContent[id - 1]
        this.ordersContent = this.ordersContent.filter(item => item.id == id )
        console.log(this.ordersContent);
        this.$router.push({path:'/orderInfo', query:{data: this.ordersContent[0]}})
      },


    }
  }
</script>


<style scoped lang="less">
	.content {
		width: 100%;
		height: 84vh;
		padding-bottom: 16vh;
		background-color: #dddddd;

		.product-box {
			width: 100%;
			height: 2.2rem;
			background-color: #fff;
			margin: 0.1rem auto;
			border-radius: 15px;
			box-shadow: 1px 2px #a9a9a9;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.txt {
				width: 100%;
				height: 1.6rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.top-bg {
					width: 90%;
					height: 1.4rem;
					margin-left: 0.3rem;
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
						font-size: 0.4rem;
						margin-top: 0.1rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #1296db;
						position: absolute;
						top: -0.12rem;
						right: 0;
					}

					p:nth-child(3) {
						font-size: 0.3rem;
						margin-top: 0.2rem;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						color: #333;
						margin-bottom: 0.1rem;
					}
					.box-info {
						/*background-color: #f00;*/
						height: 0.6rem;
						position: relative;
						margin-top: 0.2rem;
						span:nth-child(1) {
							/*margin-top: -0.2rem;*/
							padding-left: 0.2rem;
							position: absolute;
							top: 0;
							left: 1rem;
						}
						span:nth-child(2) {
							/*margin-top: -0.2rem;*/
							padding-left: 0.2rem;
							position: absolute;
							top: 0.05rem;
							left: 0;
						}
					}

					.orders-but {
						position: relative;
					}
					.orders-but button:nth-child(1){
						width: 1.5rem;
						height: 0.5rem;
						position: absolute;
						top: -0.6rem;
						right: 0;
						margin-left: 5rem;
						border-style: none;
						background-color: #1296db;
						color: #fff;
						border-radius: 35px;
						outline: none;
					}
					.orders-but button:nth-child(2){
						width: 1.5rem;
						height: 0.5rem;
						position: absolute;
						top: -0.6rem;
						right: 1.7rem;
						margin-left: 5rem;
						border-style: none;
						background-color: #1296db;
						color: #fff;
						border-radius: 35px;
						outline: none;
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
		top:1.05rem;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.bottom-txt {
		margin-left: 35%;
		padding-bottom: 0.2rem;
	}
	.tips {
		position: absolute;
		width: 85%;
		left:10%;
		top: 25%;
		/*margin: 0.5rem 45%;*/
		color: #eeeeee;
		font-size: 0.6rem;
	}
</style>
