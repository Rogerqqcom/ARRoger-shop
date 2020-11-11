<template>
	<div>
		<!--顶部导航-->
		<nav-bar class="nav-bg">
			<div slot="left" class="left" @click="back">
				<img src="~assets/img/navbar/back.png" alt="">
			</div>
			<div class="center" slot="center">
				订单管理
			</div>
		</nav-bar>
		<!--读取展示-->
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
							<p>{{item.address.name}}  {{item.address.tel}}</p>

							<p>{{item.is_pay}}</p>
							<p>{{item.address.address}}</p>
							<hr>
							<div class="box-info">
								<span>总价：￥{{item.commodity.sum}}</span>
								<span>x{{item.commodity.arr.length}}</span>
							</div>

							<div v-if="item.is_pay == '待收货' || item.is_pay == '已评价'
							|| item.is_pay == '待评价' ||  item.is_pay == '未支付'"
									 class="orders-but" @click="goOrderInfo(item.id)">
								<button>订单详情</button>
							</div>
						</div>
					</div>
				</div>
				<div v-if="this.orders.length == 0" class="tips">Tips:当前没有此类订单</div>
			</scroll>
			<back-top @click.native="backTop" v-show="isShowBackTop"/>
		</div>
	</div>
</template>

<script>
	import Scroll from "components/content/scroll/Scroll";
	import BackTop from "components/content/backTop/BackTop";
  import NavBar from "../../components/common/navbar/NavBar";

  import {getAllOrder} from "../../network/order";
  export default {
    name: "AdminOrder",
    components: {
      Scroll,
      BackTop,
      NavBar
    },
    data() {
      return {
        isShowBackTop: false,
        orders: []
      }
    },
		created() {
      getAllOrder().then(res => {
        console.log(res.data);
        this.orders = res.data.filter(item => item.commodity.arr[0].shopName == this.$store.state.business.shopName)
        console.log(this.orders);
      })
    },
		methods: {
      back() {
        this.$router.back()
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
			//根据点击的订单id跳转至订单详情页
      goOrderInfo(id) {
        let ordersContent = this.orders.filter(item => item.id == id )
        console.log('asofjiao',ordersContent);
        this.$router.push({path:'/adminOrderDetail', query:{data: ordersContent[0]}})
      }
		}
  }
</script>

<style scoped lang="less">
	.nav-bg {
		width: 100%;
		height: 1.15rem;
		background-color: #1296db;
		.left{
			img {
				width: 0.6rem;
				height: 0.6rem;
				margin-bottom: 0.1em;
				color: #fff;
			}
		}
		.center{
			color: #fff;
			font-size: 0.6rem;
			height: 0.96rem;
			line-height: 0.96rem;
			/*设置字间距*/
			letter-spacing: 0.08rem;
			padding-top: 0.1rem;
			/*padding-left: 0.5rem;*/
		}
	}
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
</style>
