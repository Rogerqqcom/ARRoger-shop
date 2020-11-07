<template>
	<div class="order-express">
		<!--顶部导航-->
		<nav-bar class="order-nav">
			<div slot="left" class="left" @click="back">
				<img src="~assets/img/navbar/back.png" alt="">
			</div>
			<div slot="center" class="center">订单详情</div>
			<div slot="right" class="right">
				<img @click="toSetUp" v-if="isLogin"  src="~assets/img/home/setUp.png" alt="">
				<span @click="toLogin" v-else>登录</span>
			</div>
		</nav-bar>
		<!--选择栏-->
		<div class="top-bg">
			<span :class="OrderAdmin == true ? 'spanActive':''" @click="OrderAdmin = true">订单信息</span>
			<span :class="OrderAdmin == false ?'spanActive':''" @click="OrderAdmin = false">查看物流</span>
		</div>
		<!--订单信息栏-->
		<div class="order-admin" v-if="OrderAdmin == true">
			<!--商品信息栏-->
			<div class="order-bg">
				<div class="product" v-for="(item, index) in dataInfo.commodity.arr" :key="index">
					<img :src="item.image" alt="" class="img">
					<div class="right-bg">
						<p>{{item.title}}</p>
						<p>{{item.desc}}</p>
						<p>￥{{item.Subtotal}} <span>x{{item.count}}</span></p>
					</div>
				</div>
			</div>
			<!--订单详情栏-->
			<div class="order-info">
				<!--收件人信息-->
				<div class="user-info">
					<p>姓名：{{dataInfo.address.name}}</p>
					<p>地址：{{dataInfo.address.endAddress}}</p>
				<!--支付信息-->
					<p>下单时间：{{dataInfo.created_order}}</p>
					<p>支付方式：{{dataInfo.mode}}</p>
					<p>总数：{{dataInfo.commodity.arr.length}} 件<span>总价：{{dataInfo.commodity.sum}}￥</span></p>
				</div>
				<!--确认收货-->
				<div  class="button-bg">
					<button v-if="dataInfo.is_pay == '待收货' ||dataInfo.is_pay == '已评价' " class="but1"  @click="deleteOrder()">
						删除订单
					</button>
					<button v-if="dataInfo.is_pay == '待收货' " class="but2"  @click="confirm()">
						确认收货
					</button>
					<button v-if="dataInfo.is_pay == '已评价' " class="but2"  @click="toeValuate()">
						已评价
					</button>
				</div>
				<!--去评价-->
				<div v-if="dataInfo.is_pay == '待评价'" class="button-bg">
					<button  class="but1" @click="deleteOrder()">
						删除订单
					</button>
					<button class="but2"  @click="toeValuate()">
						去评价
					</button>
				</div>
			</div>

		</div>
		<!--物流管理栏-->
		<div class="express-admin" v-else>
			<!--收件人信息-->
			<div class="title">
				<div  class="icon">
					<img src="~assets/img/icon/logistics.png"/>
				</div>
				<div class="person-info">
					<span>收货人：{{dataInfo.address.name}}</span>
					<span>收货地址：{{dataInfo.address.endAddress}}</span>
				</div>
			</div>
			<!--物流状态-->
			<div class="bottom-express">
				<div class="exp">
					<div class="express-icon">
						<img src="~assets/img/icon/Arrival.jpg" alt="">
					</div>
					<div class="right">
						<p>快件已到达：{{dataInfo.address.endAddress}}</p>
						<p>签收人：{{dataInfo.address.name}}</p>
						<p>电话：{{dataInfo.address.tel}}</p>
						<p>电话：					{{dataInfo.id}}
						</p>
					</div>
				</div>
					<!--确认收货-->
				<div v-if="dataInfo.is_pay == '待收货'" class="button" @click="confirm()">
					确认收货
				</div>
				<!--去评价-->
				<div v-if="dataInfo.is_pay == '待评价'" class="button" @click="toeValuate()">
					去评价
				</div>
			</div>
		</div>
		<!--提示框-->
		<min-toast v-if="isToast"/>
	</div>
</template>

<script>
	import NavBar from "../../components/common/navbar/NavBar";
	import minToast from "../../components/common/toast/minToast";
  import {getOneUser, putUser} from "../../network/user";
  import {deleteOrder, getOrder, putOrder} from "../../network/order";
  export default {
    name: "OrderInfo",
		components: {NavBar, minToast},
		data() {
      return {
        //获取到的订单信息
        dataInfo: {},
        isLogin: false,
     	 // 是订单管理还是物流管理
      	OrderAdmin:true,
				//获取用户信息内的订单信息
				user: [],
				//提示框
        isToast: false
			}
		},
		created() {
      if (this.$store.state.token || localStorage.getItem('token')) {
        this.isLogin = true
				let token = this.$store.state.token || JSON.parse(localStorage.getItem('token'))
				getOneUser(token.id).then(res => {
				  this.user = res.data
          console.log(this.user);
        })
			}
			//获取传进来的订单数据
      this.dataInfo = this.$route.query.data
      console.log(this.dataInfo);
    },
    methods: {
      back() {
        this.$router.push('/profile')
      },
      toSetUp() {
        this.$router.push('/setUp')
      },
      toLogin() {
        this.$router.push('/login')
      },
      confirm() {
        getOrder(this.dataInfo.id).then(res => {
          let obj = res.data
					obj[0].is_pay = "待评价"
          // console.log(obj[0]);
          putOrder(this.dataInfo.id, obj[0]).then(res => {
            console.log('确认收货成功');
            // this.$router.push('/comment')
						this.$router.back()
          })

        })
        // console.log('confirm');
        // //1.先检索当前订单
        // let userOrder = this.user.Order.filter(item => item.id == this.dataInfo.id)
				// //2.修改订单状态为待评价
				// userOrder[0].is_pay = "待评价"
        // console.log(userOrder);
        // let OrderId
        // //获取当前商品的下标
        // for (let i=0; i<this.user.Order.length;i++) {
        //   if (this.user.Order[i].id == this.dataInfo.id) {
        //     OrderId = i
        //   }
        // }
        // //替换订单栏中的信息
        // this.user.Order.splice(OrderId, 1, userOrder[0])
        // console.log(this.user.Order);
        // //提交到服务器
        // putUser(this.user.id, this.user).then(res => {
        //   console.log("确认收货成功");
        //   this.isToast = true
        //   this.$store.state.title = '确认收货成功'
        //   setTimeout(() => {
				// 		this.isToast = false
        //     this.$router.back()
        //   },1000)
        // })
      },
		//	删除订单
      deleteOrder() {
        console.log(this.dataInfo.id);
        deleteOrder(this.dataInfo.id).then(res => {
          console.log("删除成功");
          this.isToast = true
          this.$store.state.title = '删除成功'
          setTimeout(() => {
            this.isToast = false
            this.$router.back()
          },1000)
				})
        // let OrderId
				// //获取当前商品的下标
        // for (let i=0; i<this.user.Order.length;i++) {
        //   if (this.user.Order[i].id == this.dataInfo.id) {
        //     OrderId = i
				// 	}
				// }
        // this.user.Order.splice(OrderId, 1)
				// //提交到服务器
        // putUser(this.user.id, this.user).then(res => {
        //   console.log("删除订单成功");
        //   this.$router.back()
        // })
      },
      toeValuate() {
        console.log('去评价');
        this.$store.state.productComment = this.dataInfo
				this.$router.push('/comment')
      },
		}
  }
</script>

<style scoped lang="less">
	.order-express {
		height: 100vh;
		background-color: #f3f3f3;
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
	/*选择栏*/
	.top-bg{
		width: 100%;
		height: 0.8rem;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		span{
			display: block;
			width: 2.4rem;
			text-align: center;
			line-height: 0.8rem;
		}
		.spanActive{
			display: block;
			width: 2.4rem;
			color: #1296db;
			border-bottom: 1px solid #1296db;
			text-align: center;
			line-height: 0.8rem;
		}
	}
	/*订单信息栏*/
	.order-admin {
		/*商品信息栏*/
		.order-bg {
			width: 100%;
			height: 6rem;
			background-color: #fff;
			/*border-bottom: 1px solid #eee;*/
			border-bottom: 5px solid #eeee;
			border-top: 2px solid#eee;
			overflow: scroll;
			overflow-x: hidden;

			.product {
				width: 100%;
				height: 1.8rem;
				border-bottom: 1px solid #eee;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.img {
					width: 1.6rem;
					margin-left: 0.2rem;
				}

				.right-bg {
					width: 5.2rem;
					height: 1.5rem;
					margin-right: 0.2rem;

					p:nth-child(1) {
						font-size: 0.3rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					p:nth-child(2) {
						font-size: 0.26rem;
						margin-top: 0.02rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					p:nth-child(3) {
						font-size: 0.3rem;
						margin-top: 0.3rem;
						color: #ff2742;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						span {
							margin-right: 0.5rem;
							float: right;
							color: #6e6e6e;
						}
					}
				}
			}
		}
		/*订单详情栏*/
		.order-info {
			background-color: #fff;
			width: 100%;

			.user-info {
				margin: 0 auto;
				/*border-left: 3px solid #eeeeee;*/
				box-shadow: 0 0 2px 0 #eeeeee;
				p {
					font-size: 0.35rem;
					margin: 0 0 0.2rem 0.8rem;
					span {
						margin-left: 2rem;
						color: #1296db;
						font-size: 0.4rem;
					}
				}
			}
			.button-bg {
				.but1, .but2 {
					background-color: #1296db;
					color: #fff;
					width: 40%;
					outline: none;
					border: none;
					font-size: 0.6rem;
					text-align: center;
					border-radius: 35px;
					margin-left: 7%;
					margin-top: 0;
				}
				.but1 {
					background-color: #f00;
				}
			}
		}
	}
	/*物流管理栏*/
	.express-admin {
		width: 7rem;
		height: 6.2rem;
		background-color: #fff;
		margin: 0.3rem auto 0;
		/*title*/
		.title {
			width: 100%;
			height: 1.6rem;
			border-bottom: 1px solid #eeeeee;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			.icon {
				width: 1.5rem;
				height: 0.8em;
				margin: 0 0.2rem;
				img{
					width: 100%;
				}
			}
			.person-info {
				span {
					display: block;
					margin-top: 0.1rem;
				}
			}
		}
		/*物流*/
		.bottom-express {
			.exp {
				width: 100%;
				display: flex;
				margin-top: 0.3rem;
				align-items: center;
				border-bottom: 2px solid #eee;
				.express-icon {
					width: 1.8rem;
					img {
						width: 1.6rem;
						height: 2rem;
					}
				}
				.right {
					p {
						margin-top: 0.2rem;
					}
					p:nth-child(1) {
						color: #00d30c;
					}
				}
			}
			.button {
				background-color: #1296db;
				color: #fff;
				width: 80%;
				margin-left: 10%;
				margin-top: 0.3rem;
				font-size: 0.6rem;
				text-align: center;
				border-radius: 30px;
			}

		}
	}
</style>
