<!--读取展示-->
<template>
	<div class="order-bg">
		<nav-bar class="order-nav">
			<div slot="left" class="left" @click="back">
				<img src="~assets/img/navbar/back.png" alt="">
			</div>
			<div slot="center" class="center">我的订单</div>
			<div slot="right" class="right">
				<img @click="toSetUp" v-if="isLogin"  src="~assets/img/home/setUp.png" alt="">
				<span @click="toLogin" v-else>登录</span>
			</div>
		</nav-bar>
		<order-list :orders="orders"/>
	</div>

</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar";

	import OrderList from "./childComps/OrderList";
  import {getOneUser} from "network/user";
  import {getAllOrder} from "../../network/order";
  import Scroll from "../../components/content/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";
  export default {
    name: "Cart",
    data() {
      return {
        isLogin: false,
				isPay: false,
				oneUserId: '',
        orders: [],

        isShowBackTop: false,
      }
    },
		components: {
      NavBar,
      OrderList,
      Scroll,
      BackTop
		},
    created() {
      if (this.$store.state.token || localStorage.getItem('token')) {
        this.isLogin = true
        let token = this.$store.state.token || JSON.parse(localStorage.getItem('token'))
        // getOneUser(token.id).then(res => {
          //获取当前用户的id
          this.oneUserId = token.id
        //获取到路由参数：订单的类型
        // console.log(this.$route.query.uri);
        this.getOrders(this.$route.query.uri)
      }else {
        alert('请先登录！！')
				this.$router.push('/login')
			}

    },
    methods: {
      getOrders(order_type) {
					//获取当前登录用户的所有订单
				let that = this
					if (order_type ==  "allOrder") {
            getAllOrder().then(res => {
              that.orders = res.data.filter(item => item.userId == that.oneUserId)
						})
					}
				//获取当前登录用户的待支付的订单
					if (order_type ==  "waitPay") {
            getAllOrder().then(res => {
              that.orders = res.data.filter(item => item.is_pay == "未支付" && item.userId == that.oneUserId)
            })
						}
					//获取当前登录用户的待收货的订单
					if (order_type ==  "waitRec") {
            getAllOrder().then(res => {
              that.orders = res.data.filter(item => item.is_pay == "待收货" && item.userId == that.oneUserId)
            })
					}
					//获取当前登录用户的待评价的订单
					if (order_type ==  "waitCom") {
            getAllOrder().then(res => {
              that.orders = res.data.filter(item => item.is_pay == "待评价" && item.userId == that.oneUserId)
            })
					}
      },
      back() {
        this.$router.go(-1)
      },
      toSetUp() {
        this.$router.push('/setUp')
      },
      toLogin() {
        this.$router.push('/login')
      },
		}

  }
</script>

<style scoped lang="less">
	.Order {
		display: flex;
	}
	.order-nav {
		background-color: #58a7db;
		height: 1.05rem;
		.left{
			/*background-color: #f00;*/
			img {
				width: 0.5rem;
				height: 0.5rem;
				/*line-height: 0.1rem;*/
				margin-bottom: 0.16rem;
				color: #fff;

			}

		}
		.center {
			color: white;
			font-size: 0.5rem;
			height: 0.86rem;
			line-height: 0.86rem;
			/*设置字间距*/
			letter-spacing: 0.08rem;
			padding-top: 0.12rem;
		}
		.right{
			position: relative;
			img{
				width: 0.58rem;
				height: 0.55rem;
				position: absolute;
				top: 0.28rem;
				left: 0.36rem;
				/*padding-top: 0.3rem;*/
			}
			span{
				color: #f0f0f0;
				font-size: 0.38rem;
				text-align: center;
				position: absolute;
				top: 0.3rem;
				left: 0.2rem;
				letter-spacing: 0.04rem;
			}
		}
	}

/*	!*订单列表*!
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
						!*background-color: #f00;*!
						height: 0.6rem;
						position: relative;
						margin-top: 0.2rem;
						span:nth-child(1) {
							!*margin-top: -0.2rem;*!
							padding-left: 0.2rem;
							position: absolute;
							top: 0;
							left: 1rem;
						}
						span:nth-child(2) {
							!*margin-top: -0.2rem;*!
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
	!*控制滚动内容高度*!
	#tab-content {
		!*!/设置滚动区域的固定高度*!
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
		!*margin: 0.5rem 45%;*!
		color: #1827d9;
		font-size: 0.6rem;
	}*/
</style>

